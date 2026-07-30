export async function readJsonBody(request: Request, maxBytes: number) {
  const contentLength = Number(request.headers.get("content-length") || 0);

  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new Error("Request body is too large.");
  }

  const text = await request.text();

  if (Buffer.byteLength(text, "utf8") > maxBytes) {
    throw new Error("Request body is too large.");
  }

  return text ? JSON.parse(text) : {};
}
