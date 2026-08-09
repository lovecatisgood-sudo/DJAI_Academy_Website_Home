const TRANSFORMERS_URL = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1/+esm";
const MODEL_IDS = {
  tiny: "Xenova/whisper-tiny",
  base: "Xenova/whisper-base",
  small: "Xenova/whisper-small"
};

let pipelineFactory;
let activePipeline;
let activeKey;

function post(type, payload = {}) {
  self.postMessage({ type, ...payload });
}

async function getPipeline(model, preferWebGpu) {
  const device = preferWebGpu ? "webgpu" : "wasm";
  const key = `${model}:${device}`;
  if (activePipeline && activeKey === key) return { transcriber: activePipeline, device };

  if (!pipelineFactory) {
    const transformers = await import(TRANSFORMERS_URL);
    pipelineFactory = transformers.pipeline;
  }

  post("status", { message: preferWebGpu ? "Loading local AI model with WebGPU…" : "Loading local AI model with CPU…", engine: preferWebGpu ? "WebGPU" : "CPU" });
  const transcriber = await pipelineFactory("automatic-speech-recognition", MODEL_IDS[model], {
    device,
    progress_callback: (event) => {
      if (event.status === "progress") {
        post("progress", { phase: "model", loaded: event.loaded || 0, total: event.total || 0, file: event.file || "model" });
      } else if (event.status === "download") {
        post("status", { message: "Downloading the local AI model…", engine: preferWebGpu ? "WebGPU" : "CPU" });
      }
    }
  });
  activePipeline = transcriber;
  activeKey = key;
  return { transcriber, device };
}

async function transcribe({ samples, model, language }) {
  let chosen;
  const preferWebGpu = Boolean(self.navigator && self.navigator.gpu);
  try {
    chosen = await getPipeline(model, preferWebGpu);
  } catch (error) {
    if (!preferWebGpu) throw error;
    post("status", { message: "WebGPU was unavailable; switching to local CPU…", engine: "CPU" });
    chosen = await getPipeline(model, false);
  }

  post("status", { message: "Transcribing on this device…", engine: chosen.device === "webgpu" ? "WebGPU" : "CPU" });
  const options = {
    return_timestamps: "word",
    chunk_length_s: 30,
    stride_length_s: 5
  };
  if (language && language !== "auto") options.language = language;
  const output = await chosen.transcriber(new Float32Array(samples), options);
  const chunks = Array.isArray(output.chunks) ? output.chunks : [];
  const segments = chunks.map((chunk, index) => {
    const timestamp = Array.isArray(chunk.timestamp) ? chunk.timestamp : [null, null];
    return {
      id: index + 1,
      start: Number.isFinite(timestamp[0]) ? timestamp[0] : 0,
      end: Number.isFinite(timestamp[1]) ? timestamp[1] : null,
      text: String(chunk.text || "").trim()
    };
  }).filter((segment) => segment.text);
  if (!segments.length && output.text) {
    segments.push({ id: 1, start: 0, end: null, text: String(output.text).trim() });
  }
  post("complete", { text: String(output.text || "").trim(), segments, engine: chosen.device === "webgpu" ? "WebGPU" : "CPU" });
}

self.onmessage = async ({ data }) => {
  if (data.type !== "transcribe") return;
  try {
    await transcribe(data);
  } catch (error) {
    post("error", { message: error instanceof Error ? error.message : String(error) });
  }
};
