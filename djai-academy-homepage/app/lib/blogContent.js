const CONTROL_OR_WHITESPACE = /[\u0000-\u001f\u007f\s]/;

export function normalizeBlogHref(value, { allowMailto = true } = {}) {
  const href = String(value || "").trim();
  if (!href || CONTROL_OR_WHITESPACE.test(href)) {
    return "";
  }

  if (href.startsWith("/") && !href.startsWith("//") && !href.includes("\\")) {
    return href;
  }

  if (allowMailto && href.startsWith("mailto:")) {
    return /^mailto:[^@\s]+@[^@\s]+$/i.test(href) ? href : "";
  }

  try {
    const url = new URL(href);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
}

export function normalizeInternalBlogHref(value) {
  const href = normalizeBlogHref(value, { allowMailto: false });
  return href.startsWith("/") && !href.startsWith("//") ? href : "";
}
