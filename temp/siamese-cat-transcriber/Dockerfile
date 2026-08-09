FROM python:3.12-slim
ARG INSTALL_ML=1
ARG INSTALL_DIARIZATION=0
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 TRANSCRIBER_DATA_DIR=/app/data
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg libgomp1 && rm -rf /var/lib/apt/lists/*
COPY requirements.txt requirements-ml.txt requirements-diarization.txt ./
RUN pip install --no-cache-dir -r requirements.txt && if [ "$INSTALL_ML" = "1" ]; then pip install --no-cache-dir -r requirements-ml.txt; fi && if [ "$INSTALL_DIARIZATION" = "1" ]; then pip install --no-cache-dir -r requirements-diarization.txt; fi
COPY app ./app
RUN mkdir -p /app/data/uploads /app/data/processed /app/data/exports
EXPOSE 8000
CMD ["uvicorn","app.main:app","--host","0.0.0.0","--port","8000"]
