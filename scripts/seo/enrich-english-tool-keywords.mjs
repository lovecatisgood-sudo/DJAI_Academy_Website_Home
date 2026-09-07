const PRIMARY_QUERY_BY_ROUTE = {
  "/tools/video-to-text/en/": "transcribe video to text in browser without upload",

  "/tools/qrgen/url-qr-code-generator/en/": "create a free URL QR code without sign up",
  "/tools/qrgen/wifi-qr-code-generator/en/": "create a Wi-Fi password QR code for guests",
  "/tools/qrgen/vcard-qr-code-generator/en/": "create a vCard contact QR code for business cards",
  "/tools/qrgen/text-qr-code-generator/en/": "turn text into a free QR code online",
  "/tools/qrgen/email-qr-code-generator/en/": "create a free email QR code with subject and message",
  "/tools/qrgen/whatsapp-qr-code-generator/en/": "create a WhatsApp chat QR code with preset message",
  "/tools/qrgen/qr-code-generator-with-logo/en/": "create a branded QR code with logo without upload",

  "/tools/resizeimg/jpg-to-png/en/": "convert JPG to PNG in browser without upload",
  "/tools/resizeimg/png-to-jpg/en/": "convert PNG to JPG and reduce file size online",
  "/tools/resizeimg/jpg-to-webp/en/": "convert JPG to WebP for a faster website",
  "/tools/resizeimg/png-to-webp/en/": "convert transparent PNG to WebP in browser",
  "/tools/resizeimg/webp-to-jpg/en/": "convert WebP to JPG for upload forms",
  "/tools/resizeimg/webp-to-png/en/": "convert WebP to PNG with transparency online",
  "/tools/resizeimg/compress-image/en/": "compress JPG PNG or WebP to a target KB size",
  "/tools/resizeimg/resize-image/en/": "resize image by pixels or percentage without upload",
  "/tools/resizeimg/image-to-100kb/en/": "compress an image to approximately 100 KB online",
  "/tools/resizeimg/image-to-500kb/en/": "compress an image to approximately 500 KB online",
  "/tools/resizeimg/heic-to-jpg/en/": "convert HEIC to JPG in browser without upload",
  "/tools/resizeimg/remove-image-metadata/en/": "remove EXIF metadata from an image in browser",
  "/tools/resizeimg/remove-background-image/en/": "remove an image background free without uploading",
  "/tools/resizeimg/resize-image-to-200kb/en/": "resize an image to approximately 200 KB online",
  "/tools/resizeimg/avif-to-jpg/en/": "convert AVIF to JPG in browser without upload",
  "/tools/resizeimg/avif-to-png/en/": "convert AVIF to PNG with transparency online",
  "/tools/resizeimg/passport-photo-resizer/en/": "resize a passport photo to 35 x 45 mm online",

  "/tools/PDFTools/merge-pdf/en/": "merge PDF files in browser without upload",
  "/tools/PDFTools/split-pdf/en/": "split selected PDF pages in browser without upload",
  "/tools/PDFTools/compress-pdf/en/": "reduce PDF file size privately in browser",
  "/tools/PDFTools/images-to-pdf/en/": "combine JPG PNG and WebP into one PDF",
  "/tools/PDFTools/pdf-to-images/en/": "convert PDF pages to JPG images in browser",
  "/tools/PDFTools/rotate-pdf/en/": "rotate selected PDF pages in browser free",
  "/tools/PDFTools/watermark-pdf/en/": "add a text watermark to PDF in browser",
  "/tools/PDFTools/protect-pdf/en/": "password protect PDF with AES 256 encryption",
  "/tools/PDFTools/organize-pdf/en/": "reorder and delete PDF pages by page number",
  "/tools/PDFTools/add-page-numbers/en/": "add page numbers to PDF in browser free",
  "/tools/PDFTools/remove-pdf-metadata/en/": "remove PDF document metadata in browser",
  "/tools/PDFTools/jpg-to-pdf/en/": "convert multiple JPG images to one PDF",
  "/tools/PDFTools/pdf-to-jpg/en/": "convert every PDF page to JPG and ZIP",
  "/tools/PDFTools/png-to-pdf/en/": "combine multiple PNG images into one PDF",
  "/tools/PDFTools/webp-to-pdf/en/": "convert multiple WebP images into one PDF",
  "/tools/PDFTools/pdf-to-png/en/": "convert PDF pages to PNG and download ZIP",
  "/tools/PDFTools/extract-pdf-pages/en/": "extract selected pages into a new PDF",
  "/tools/PDFTools/delete-pages-from-pdf/en/": "delete selected pages from PDF in browser",
  "/tools/PDFTools/reorder-pdf-pages/en/": "reorder PDF pages by dragging in browser",

  "/tools/media/mp3-to-wav/en/": "convert MP3 to WAV in browser without upload",
  "/tools/media/wav-to-mp3/en/": "convert WAV to MP3 in browser without upload",
  "/tools/media/m4a-to-mp3/en/": "convert M4A to MP3 in browser without upload",
  "/tools/media/mp4-to-mp3/en/": "extract MP3 audio from MP4 in browser",
  "/tools/media/extract-audio-from-video/en/": "extract audio from video in browser without upload",
  "/tools/media/video-converter/en/": "convert video formats locally without uploading",
  "/tools/media/mkv-to-mp4/en/": "convert MKV to MP4 in browser without upload",
  "/tools/media/avi-to-mp4/en/": "convert AVI to MP4 in browser without upload",
  "/tools/media/mp4-to-mov/en/": "convert MP4 to MOV in browser without upload",
  "/tools/media/mp4-to-webm/en/": "convert MP4 to WebM for website video",
  "/tools/media/webm-to-mp4/en/": "convert WebM to MP4 for wider compatibility",
  "/tools/media/mov-to-mp4/en/": "convert MOV to MP4 in browser without upload",
  "/tools/media/video-cutter/en/": "cut video by start and end time in browser",
  "/tools/media/compress-video/en/": "compress MP4 MOV or WebM to a target size",
  "/tools/media/compress-video-to-10mb/en/": "compress video toward 10 MB without upload",
  "/tools/media/compress-video-to-25mb/en/": "compress video toward 25 MB without upload",
  "/tools/media/compress-video-to-50mb/en/": "compress video toward 50 MB without upload",
  "/tools/media/compress-video-to-100mb/en/": "compress video toward 100 MB without upload",
  "/tools/media/video-cropper/en/": "crop video to 16 9 or 9 16 in browser",
  "/tools/media/video-resizer/en/": "resize video to 1080p 720p or 480p online",
  "/tools/media/video-merger/en/": "merge multiple video clips in browser without upload",
  "/tools/media/video-to-gif/en/": "convert a short video clip to GIF in browser",
  "/tools/media/gif-to-mp4/en/": "convert animated GIF to smaller MP4 without upload",
  "/tools/media/remove-audio-from-video/en/": "remove the audio track from video in browser",
  "/tools/media/add-audio-to-video/en/": "add a new audio track to video in browser",
  "/tools/media/video-speed-changer/en/": "speed up or slow down video in browser",
  "/tools/media/extract-frames-from-video/en/": "extract video frames at timed intervals to JPG or PNG",
  "/tools/media/rotate-video/en/": "rotate video 90 degrees in browser without upload",

  "/tools/document/docx-to-pdf/en/": "convert DOCX to PDF in browser without upload",
  "/tools/document/docx-to-html/en/": "convert DOCX to clean semantic HTML in browser",
  "/tools/document/docx-to-markdown/en/": "convert DOCX to Markdown for AI and GitHub",
  "/tools/document/docx-to-text/en/": "extract plain text from DOCX in browser",
  "/tools/document/pdf-to-text/en/": "extract selected PDF pages to text without upload",
  "/tools/document/pdf-to-word/en/": "convert selectable PDF text to editable Word DOCX",
  "/tools/document/ocr/en/": "OCR scanned PDF and images to text in browser",

  "/tools/ai/token-counter/en/": "count document tokens for AI without upload",
  "/tools/ai/pdf-to-ai-markdown/en/": "convert PDF to clean Markdown for RAG",
  "/tools/ai/context-optimizer/en/": "clean document text for AI context windows",
  "/tools/ai/rag-chunk-calculator/en/": "calculate RAG chunk size and overlap with preview",
  "/tools/ai/prompt-packager/en/": "combine multiple files into one AI prompt package",

  "/tools/spreadsheet/csv-to-json/en/": "convert CSV to JSON in browser without upload",
  "/tools/spreadsheet/json-to-csv/en/": "convert a JSON array to CSV in browser",
  "/tools/spreadsheet/csv-cleaner/en/": "remove duplicate and empty rows from CSV",
  "/tools/spreadsheet/merge-csv/en/": "merge multiple CSV files by matching columns",
  "/tools/spreadsheet/split-csv/en/": "split a large CSV by row count and ZIP",
  "/tools/spreadsheet/csv-to-xlsx/en/": "convert CSV to Excel XLSX in browser",
  "/tools/spreadsheet/xlsx-to-csv/en/": "convert an Excel worksheet to CSV in browser",

  "/tools/brand/favicon-generator/en/": "generate a complete favicon ICO and PWA icon package",
};

const VERIFIED_GSC_ROUTES = new Set([
  "/tools/media/gif-to-mp4/en/",
  "/tools/media/compress-video-to-10mb/en/",
  "/tools/media/compress-video-to-25mb/en/",
  "/tools/media/compress-video-to-50mb/en/",
  "/tools/media/compress-video-to-100mb/en/",
  "/tools/media/extract-frames-from-video/en/",
  "/tools/media/video-cropper/en/",
  "/tools/media/video-resizer/en/",
  "/tools/resizeimg/resize-image-to-200kb/en/",
  "/tools/qrgen/email-qr-code-generator/en/",
  "/tools/brand/favicon-generator/en/",
]);

const SUPPORTING_QUERY_OVERRIDES = {
  "/tools/media/gif-to-mp4/en/": [
    "free GIF to MP4 converter no watermark",
    "make an animated GIF smaller as MP4",
    "browser GIF to MP4 converter no sign up",
  ],
  "/tools/media/extract-frames-from-video/en/": [
    "extract JPG frames from video at intervals",
    "save PNG frames from video as ZIP",
    "video frame extractor every 1 2 5 or 10 seconds",
  ],
  "/tools/qrgen/email-qr-code-generator/en/": [
    "mailto QR code with recipient subject and body",
    "static email QR code PNG or SVG",
    "email QR code generator without sign up",
  ],
  "/tools/brand/favicon-generator/en/": [
    "convert PNG to favicon ICO with multiple sizes",
    "generate Apple touch and PWA icons from one image",
    "download favicon manifest and HTML package ZIP",
  ],
};

function routeSlug(route) {
  return route.split("/").filter(Boolean).at(-2).replaceAll("-", " ");
}

function targetSizeSupportingQueries(route, primary) {
  const match = route.match(/(?:to-|image-to-)(\d+)(kb|mb)/i);
  if (!match) return null;
  const size = `${match[1]} ${match[2].toUpperCase()}`;
  const subject = route.includes("video") ? "video" : "image";
  return [
    `${subject} compressor for a ${size} upload limit`,
    `reduce ${subject} toward ${size} in browser`,
    `${primary} free online`,
  ];
}

function genericSupportingQueries(row) {
  const slug = routeSlug(row.route);
  const object = row.cluster === "media" ? "media file"
    : row.cluster === "pdf" ? "PDF"
      : row.cluster === "image" ? "image"
        : row.cluster === "document" ? "document"
          : row.cluster === "spreadsheet" ? "data file"
            : "content";
  return [
    `${slug} online free`,
    `${slug} without sign up`,
    `${slug} browser tool for private ${object} processing`,
  ];
}

export function enrichEnglishToolKeyword(row) {
  if (row.locale !== "en" || row.pageRole !== "working_tool" || !row.indexable) return row;

  const primaryQueryFamily = PRIMARY_QUERY_BY_ROUTE[row.route];
  if (!primaryQueryFamily) {
    throw new Error(`${row.route}: missing English working-tool query assignment`);
  }

  const supportingQueries = SUPPORTING_QUERY_OVERRIDES[row.route]
    || targetSizeSupportingQueries(row.route, primaryQueryFamily)
    || genericSupportingQueries(row);

  return {
    ...row,
    primaryQueryFamily,
    supportingQueries,
    evidenceStatus: VERIFIED_GSC_ROUTES.has(row.route) ? "verified_gsc" : "directional_external",
    evidenceSource: VERIFIED_GSC_ROUTES.has(row.route)
      ? "gsc_page_performance_and_feature_validation_2026-09-06"
      : "feature_validation_and_long_tail_serp_patterns_2026-09-06",
    validatedAt: "2026-09-06",
  };
}

export function assignedEnglishToolRoutes() {
  return Object.keys(PRIMARY_QUERY_BY_ROUTE).sort();
}
