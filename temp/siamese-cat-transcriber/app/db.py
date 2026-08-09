from __future__ import annotations

import json
import sqlite3
import threading
from contextlib import contextmanager
from pathlib import Path
from typing import Any, Iterator


SCHEMA = """
CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    owner_id TEXT,
    filename TEXT NOT NULL,
    stored_name TEXT NOT NULL,
    media_type TEXT,
    size_bytes INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL,
    progress INTEGER NOT NULL DEFAULT 0,
    message TEXT NOT NULL DEFAULT '',
    error TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    options_json TEXT NOT NULL,
    result_json TEXT,
    duration_seconds REAL,
    detected_language TEXT,
    backend TEXT
);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
"""


class Database:
    def __init__(self, path: Path):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self._lock = threading.RLock()
        self.init()

    @contextmanager
    def connect(self) -> Iterator[sqlite3.Connection]:
        conn = sqlite3.connect(self.path, timeout=30, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        try:
            yield conn
            conn.commit()
        finally:
            conn.close()

    def init(self) -> None:
        with self.connect() as conn:
            conn.executescript(SCHEMA)
            columns = {row["name"] for row in conn.execute("PRAGMA table_info(jobs)").fetchall()}
            if "owner_id" not in columns:
                conn.execute("ALTER TABLE jobs ADD COLUMN owner_id TEXT")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_jobs_owner_created_at ON jobs(owner_id, created_at DESC)")
            conn.execute("UPDATE jobs SET status='queued', progress=0, message='Recovered after restart' WHERE status='processing'")

    def insert_job(self, row: dict[str, Any]) -> None:
        keys = ",".join(row.keys())
        placeholders = ",".join(["?"] * len(row))
        with self._lock, self.connect() as conn:
            conn.execute(f"INSERT INTO jobs ({keys}) VALUES ({placeholders})", tuple(row.values()))

    def update_job(self, job_id: str, **fields: Any) -> None:
        if not fields:
            return
        assignments = ",".join(f"{k}=?" for k in fields)
        with self._lock, self.connect() as conn:
            conn.execute(f"UPDATE jobs SET {assignments} WHERE id=?", (*fields.values(), job_id))

    def get_job(self, job_id: str, owner_id: str | None = None) -> dict[str, Any] | None:
        with self.connect() as conn:
            if owner_id is None:
                row = conn.execute("SELECT * FROM jobs WHERE id=?", (job_id,)).fetchone()
            else:
                row = conn.execute("SELECT * FROM jobs WHERE id=? AND owner_id=?", (job_id, owner_id)).fetchone()
        return self._decode(row) if row else None

    def list_jobs(self, limit: int = 100, owner_id: str | None = None) -> list[dict[str, Any]]:
        with self.connect() as conn:
            if owner_id is None:
                rows = conn.execute("SELECT * FROM jobs ORDER BY created_at DESC LIMIT ?", (limit,)).fetchall()
            else:
                rows = conn.execute("SELECT * FROM jobs WHERE owner_id=? ORDER BY created_at DESC LIMIT ?", (owner_id, limit)).fetchall()
        return [self._decode(r) for r in rows]

    def delete_job(self, job_id: str, owner_id: str | None = None) -> dict[str, Any] | None:
        row = self.get_job(job_id, owner_id)
        if not row:
            return None
        with self._lock, self.connect() as conn:
            if owner_id is None:
                conn.execute("DELETE FROM jobs WHERE id=?", (job_id,))
            else:
                conn.execute("DELETE FROM jobs WHERE id=? AND owner_id=?", (job_id, owner_id))
        return row

    @staticmethod
    def _decode(row: sqlite3.Row) -> dict[str, Any]:
        data = dict(row)
        data.pop("owner_id", None)
        data["options"] = json.loads(data.pop("options_json") or "{}")
        raw_result = data.pop("result_json")
        data["result"] = json.loads(raw_result) if raw_result else None
        return data

    @staticmethod
    def encode(value: Any) -> str:
        return json.dumps(value, ensure_ascii=False, separators=(",", ":"))
