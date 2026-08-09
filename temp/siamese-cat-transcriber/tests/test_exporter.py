from app.services.exporter import timestamp, render_srt, render_vtt


def test_timestamp_formats():
    assert timestamp(65.432) == "00:01:05,432"
    assert timestamp(65.432, False) == "00:01:05.432"


def test_subtitle_rendering():
    job={"result":{"segments":[{"start":0,"end":1.2,"speaker":"Alice","text":"Hello"}]}}
    assert b"00:00:00,000 --> 00:00:01,200" in render_srt(job)
    assert render_vtt(job).startswith(b"WEBVTT")
