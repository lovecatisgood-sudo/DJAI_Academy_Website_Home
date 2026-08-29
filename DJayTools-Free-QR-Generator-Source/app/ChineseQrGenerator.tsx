"use client";

import { useEffect, useRef, useState } from "react";
import type { CornerSquareType, DotType } from "qr-code-styling";
import QrTaskFields from "./QrTaskFields";
import { qrToolCopy, qrToolHref, qrToolSlugs, type QrLanguage, type QrPageCopy, type QrToolSlug } from "./qr-tool-data";

const COLORS = ["#D97757", "#0B32A4", "#00BFD8", "#5630C8", "#071E3D", "#F2A65A", "#2E8B57", "#D7467D"];
const BASE_PATH = "/tools/qrgen";
const assetPath = (path: string) => `${BASE_PATH}/${path}`;

const ui = {
  "zh-CN": {
    free: "完全免费 · 无需注册", hero: "快速生成清晰、可直接使用的二维码", intro: "自定义颜色、图案、边角与边框，再下载 PNG 或 SVG。静态二维码不会过期，生成过程在浏览器中完成。",
    create: "开始生成二维码", nav: "主导航", academy: "DJAI Academy", tools: "更多在线工具", community: "加入学习社区", switch: "繁體中文",
    generator: "免费二维码生成器", seconds: "几秒钟完成设置", promise: "无需账户 · 无水印 · 不设有效期", enter: "输入二维码内容", pattern: "图案", corners: "边角", color: "选择颜色", frame: "添加边框", optional: "可选",
    none: "无", simple: "简洁", label: "带文字", preview: "实时预览", ready: "可以扫描", forever: "这是静态二维码，不会因 DJAI 服务停止而失效。", download: "下载二维码", format: "下载格式", error: "请填写要生成二维码的内容。",
    unlimited: "不限生成次数", private: "浏览器内处理", instant: "立即下载", how: "三个步骤完成", steps: [["填写内容", "输入网址、Wi-Fi、联系人或其他对应信息。"], ["调整样式", "选择图案、边角、颜色，也可以加入 Logo。"], ["下载并测试", "保存 PNG 或 SVG，并在打印或发布前用多部手机测试。"]],
    privacy: "输入内容和 Logo 在浏览器中处理。静态二维码会直接保存你输入的信息；若内容敏感，请先判断是否适合公开印刷或分享。", footer: "DJAI Academy 为社区制作的实用数字工具。"
  },
  "zh-TW": {
    free: "完全免費 · 不必註冊", hero: "快速製作清楚、可直接使用的 QR Code", intro: "自訂顏色、圖樣、邊角與外框，再下載 PNG 或 SVG。靜態 QR Code 不會到期，製作過程在瀏覽器中完成。",
    create: "開始製作 QR Code", nav: "主選單", academy: "DJAI Academy", tools: "更多線上工具", community: "加入學習社群", switch: "简体中文",
    generator: "免費 QR Code 產生器", seconds: "幾秒完成設定", promise: "不必登入 · 無浮水印 · 沒有期限", enter: "輸入 QR Code 內容", pattern: "圖樣", corners: "邊角", color: "選擇顏色", frame: "加入外框", optional: "選填",
    none: "無", simple: "簡潔", label: "含文字", preview: "即時預覽", ready: "可供掃描", forever: "這是靜態 QR Code，不會因 DJAI 服務停止而失效。", download: "下載 QR Code", format: "下載格式", error: "請填寫要製作成 QR Code 的內容。",
    unlimited: "不限製作次數", private: "在瀏覽器內處理", instant: "立即下載", how: "三個步驟完成", steps: [["填寫內容", "輸入網址、Wi-Fi、聯絡人或其他對應資訊。"], ["調整樣式", "選擇圖樣、邊角、顏色，也能加入 Logo。"], ["下載並測試", "儲存 PNG 或 SVG，列印或發布前請用多支手機測試。"]],
    privacy: "輸入內容與 Logo 會在瀏覽器中處理。靜態 QR Code 會直接保存你輸入的資訊；若內容敏感，請先判斷是否適合公開印刷或分享。", footer: "DJAI Academy 為社群製作的實用數位工具。"
  }
} as const;

export default function ChineseQrGenerator({ language, toolSlug, pageCopy }: { language: Extract<QrLanguage, "zh-CN" | "zh-TW">; toolSlug?: QrToolSlug; pageCopy?: QrPageCopy }) {
  const copy = ui[language];
  const qrMount = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<import("qr-code-styling").default | null>(null);
  const [payload, setPayload] = useState("https://www.djai.academy");
  const [taskError, setTaskError] = useState("");
  const [logo, setLogo] = useState("");
  const [dots, setDots] = useState<DotType>("rounded");
  const [corners, setCorners] = useState<CornerSquareType>("extra-rounded");
  const [color, setColor] = useState(COLORS[0]);
  const [frame, setFrame] = useState<"none" | "simple" | "label">("label");
  const [format, setFormat] = useState<"png" | "svg">("png");
  const [error, setError] = useState("");
  const title = pageCopy?.title || copy.hero;
  const segment = language === "zh-CN" ? "zh-cn" : "zh-tw";

  useEffect(() => {
    let active = true;
    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      if (!active || !qrMount.current) return;
      const instance = new QRCodeStyling({ width: 280, height: 280, type: "svg", data: payload || "https://www.djai.academy", image: logo || undefined, margin: 12, qrOptions: { errorCorrectionLevel: "Q" }, dotsOptions: { type: dots, color }, cornersSquareOptions: { type: corners, color }, cornersDotOptions: { type: "dot", color }, backgroundOptions: { color: "#ffffff" }, imageOptions: { hideBackgroundDots: true, imageSize: 0.32, margin: 5 } });
      qrMount.current.innerHTML = ""; instance.append(qrMount.current); qrInstance.current = instance;
    });
    return () => { active = false; };
  }, [payload, logo, dots, corners, color]);

  function download() {
    if (!payload || taskError || !qrInstance.current) { setError(taskError || copy.error); return; }
    setError(""); qrInstance.current.download({ name: "DJayTools-QR-Code", extension: format });
  }

  return <main lang={language}>
    <header className="site-header">
      <a className="brand" href="#top"><img src={assetPath("djai-academy-logo-display.webp")} alt="DJAI Academy" width="384" height="206" /><span><strong>DJayTools</strong><small>by DJAI Academy</small></span></a>
      <nav aria-label={copy.nav}><a href={`https://www.djai.academy/${segment}/`}>{copy.academy}</a><a href={`https://www.djai.academy/tools/${segment}/`}>{copy.tools}</a><a href={language === "zh-CN" ? `${BASE_PATH}/zh-tw/` : `${BASE_PATH}/zh-cn/`} hrefLang={language === "zh-CN" ? "zh-TW" : "zh-CN"}>{copy.switch}</a><a className="nav-cta" href={`https://www.djai.academy/academy/${segment}/`}>{copy.community}</a></nav>
    </header>
    <section className="hero" id="top"><div className="eyebrow"><span>{copy.free}</span></div><h1>{title}</h1><p>{pageCopy?.description || copy.intro}</p><button className="primary hero-button" onClick={() => document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })}>{copy.create} <span>↘</span></button></section>
    <nav className="qr-task-links" aria-label={copy.tools}>{qrToolSlugs.map((slug) => <a key={slug} href={qrToolHref(slug, language)} aria-current={slug === toolSlug ? "page" : undefined}>{qrToolCopy[slug][language].title}</a>)}</nav>
    <section className="generator-shell" id="generator">
      <div className="generator-head"><div><span className="step-tag">{copy.generator}</span><h2>{copy.seconds}</h2></div><p>{copy.promise}</p></div>
      <div className="generator-card"><div className="controls">
        <div className="control-block"><label><b>1</b> {copy.enter}</label><QrTaskFields mode={pageCopy?.mode || "url"} language={language} onPayload={setPayload} onError={setTaskError} onLogo={setLogo} />{error && <p className="error" role="alert">{error}</p>}</div>
        <div className="control-block split-options"><fieldset><legend><b>2</b> {copy.pattern}</legend><div className="option-row">{(["square", "rounded", "dots"] as DotType[]).map((value) => <button key={value} aria-label={`${copy.pattern} ${value}`} aria-pressed={dots === value} onClick={() => setDots(value)} className={`pattern-option ${dots === value ? "selected" : ""}`}><span className={`pattern-preview ${value}`} /></button>)}</div></fieldset><fieldset><legend>{copy.corners}</legend><div className="option-row">{(["square", "extra-rounded"] as CornerSquareType[]).map((value) => <button key={value} aria-label={`${copy.corners} ${value}`} aria-pressed={corners === value} onClick={() => setCorners(value)} className={`corner-option ${corners === value ? "selected" : ""}`}><span className={value} /></button>)}</div></fieldset></div>
        <fieldset className="control-block"><legend><b>3</b> {copy.color}</legend><div className="colors">{COLORS.map((item) => <button key={item} aria-label={`${copy.color} ${item}`} aria-pressed={color === item} onClick={() => setColor(item)} className={color === item ? "selected" : ""} style={{ backgroundColor: item }} />)}</div></fieldset>
        <fieldset className="control-block"><legend><b>4</b> {copy.frame} <span>({copy.optional})</span></legend><div className="frame-options"><button className={frame === "none" ? "selected" : ""} onClick={() => setFrame("none")}><span className="no-frame">×</span><small>{copy.none}</small></button><button className={frame === "simple" ? "selected" : ""} onClick={() => setFrame("simple")}><span className="simple-frame" /><small>{copy.simple}</small></button><button className={frame === "label" ? "selected" : ""} onClick={() => setFrame("label")}><span className="label-frame">SCAN</span><small>{copy.label}</small></button></div></fieldset>
      </div><div className="preview-panel"><div className="preview-top"><span>{copy.preview}</span><i><span /> {copy.ready}</i></div><div className={`qr-frame frame-${frame}`}><div ref={qrMount} className="qr-mount" role="img" aria-label={copy.preview} />{frame === "label" && <strong>SCAN</strong>}</div><p>{copy.forever}</p><div className="download-controls"><div className="format-switch" aria-label={copy.format}><button className={format === "png" ? "active" : ""} onClick={() => setFormat("png")}>PNG</button><button className={format === "svg" ? "active" : ""} onClick={() => setFormat("svg")}>SVG</button></div><button className="primary download" onClick={download}>{copy.download} <span>↓</span></button></div></div></div>
    </section>
    <section className="trust-strip"><div><b>∞</b><span><strong>{copy.unlimited}</strong></span></div><div><b>◌</b><span><strong>{copy.private}</strong></span></div><div><b>↯</b><span><strong>{copy.instant}</strong></span></div></section>
    <section className="how-section"><div className="section-intro"><span className="step-tag">{copy.how}</span><h2>{copy.how}</h2><p>{copy.privacy}</p></div><div className="steps">{copy.steps.map(([name, text], index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{text}</p></article>)}</div></section>
    <footer><div className="footer-identity"><a className="brand footer-brand" href="#top"><img src={assetPath("djai-academy-logo-display.webp")} alt="DJAI Academy" width="384" height="206" /><span><strong>DJayTools</strong><small>by DJAI Academy</small></span></a><p>{copy.footer}</p></div><p className="copyright">© 2026 DJAI Academy</p></footer>
  </main>;
}
