import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const source = join(root, 'djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen/privacy/policy-content.json');
const targetDir = join(root, 'djai-academy-homepage/public/Cam_PDF_Scan_Signer_QR-Gen/privacy');
const policy = JSON.parse(readFileSync(source, 'utf8'));
const escape = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const inline = (value) => escape(value)
  .replace(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g, '<a href="$2">$1</a>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
function block(item) {
  if (item.type === 'paragraph') return `<p>${inline(item.text)}</p>`;
  if (item.type === 'heading') return `<h3>${inline(item.text)}</h3>`;
  if (item.type === 'list') return `<ul>${item.items.map((value) => `<li>${inline(value)}</li>`).join('')}</ul>`;
  if (item.type === 'table') return `<div class="table"><table>${item.rows.map((row, index) => `<tr>${row.map((value) => `<${index ? 'td' : 'th'}>${inline(value)}</${index ? 'td' : 'th'}>`).join('')}</tr>`).join('')}</table></div>`;
  throw new Error(`Unknown privacy policy block: ${item.type}`);
}
const sections = policy.sections.map((section) => `<section><h2>${inline(section.title)}</h2>${section.blocks.map(block).join('')}</section>`).join('');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="index,follow"><title>${escape(policy.title)}</title><meta name="description" content="Privacy policy for Cam PDF Scanner: Sign & QR on iOS and Android."><style>body{margin:0;background:#f7f8fb;color:#1b2330;font:16px/1.65 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:820px;margin:0 auto;padding:36px 22px 72px}h1{font-size:2.1rem;line-height:1.2}h2{font-size:1.35rem;margin-top:2.2rem;border-top:1px solid #dce2eb;padding-top:1.2rem}h3{font-size:1.05rem;margin-top:1.3rem}p,li{max-width:75ch}li{margin:.45rem 0}a{color:#155bd5}strong{font-weight:650}.date{color:#5e6878}.table{overflow:auto}table{border-collapse:collapse;width:100%}th,td{border:1px solid #dce2eb;padding:.6rem;text-align:left;vertical-align:top}th{background:#eaf0fa}</style></head><body><main><p><a href="/Cam_PDF_Scan_Signer_QR-Gen/">Cam PDF Scanner: Sign &amp; QR</a></p><h1>${inline(policy.title)}</h1><p class="date">${inline(policy.date)}</p>${policy.intro.map(block).join('')}${sections}</main></body></html>`;
mkdirSync(targetDir, { recursive: true });
writeFileSync(join(targetDir, 'index.html'), html);
console.log(`Generated static Cam PDF privacy page (${Buffer.byteLength(html)} bytes).`);
