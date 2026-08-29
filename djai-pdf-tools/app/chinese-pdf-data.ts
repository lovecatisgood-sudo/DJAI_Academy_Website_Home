import { BASE_PATH, toolSlugs, type ToolSlug } from "./tool-data";

export type ChinesePdfLocale = "zh-CN" | "zh-TW";
type Copy = { label: string; title: string; description: string; guide: string[] };

const names: Record<ToolSlug, [string, string]> = {
  "merge-pdf": ["合并 PDF", "合併 PDF"], "split-pdf": ["拆分 PDF", "分割 PDF"], "compress-pdf": ["压缩 PDF", "壓縮 PDF"],
  "images-to-pdf": ["图片转 PDF", "圖片轉 PDF"], "pdf-to-images": ["PDF 转图片", "PDF 轉圖片"], "rotate-pdf": ["旋转 PDF", "旋轉 PDF"],
  "watermark-pdf": ["给 PDF 添加水印", "為 PDF 加上浮水印"], "protect-pdf": ["给 PDF 设置密码", "為 PDF 設定密碼"],
  "organize-pdf": ["整理 PDF 页面", "整理 PDF 頁面"], "add-page-numbers": ["给 PDF 添加页码", "為 PDF 加上頁碼"],
  "remove-pdf-metadata": ["删除 PDF 元数据", "移除 PDF 中繼資料"]
};

function build(locale: ChinesePdfLocale): Record<ToolSlug, Copy> {
  const tw = locale === "zh-TW";
  return Object.fromEntries(toolSlugs.map((slug) => {
    const name = names[slug][tw ? 1 : 0];
    return [slug, {
      label: name,
      title: tw ? `${name}免費線上工具` : `${name}免费在线工具`,
      description: tw ? `${name}，檔案會在瀏覽器記憶體中處理，不必註冊、不會上傳到 DJAI，也不加浮水印。` : `${name}，文件在浏览器内存中处理，无需注册、不会上传到 DJAI，也不加水印。`,
      guide: tw ? ["選擇要處理的 PDF 或圖片", "確認頁面、格式或安全設定", "在裝置上處理並下載結果"] : ["选择要处理的 PDF 或图片", "确认页面、格式或安全设置", "在设备上处理并下载结果"]
    }];
  })) as Record<ToolSlug, Copy>;
}

export const chinesePdfCopy = { "zh-CN": build("zh-CN"), "zh-TW": build("zh-TW") };
export const chinesePdfUi = {
  "zh-CN": { title: "免费 PDF 工具", intro: "合并、拆分、压缩、转换、旋转、加水印、加密和整理 PDF。所有处理都在当前设备的浏览器中完成。", tools: "PDF 工具", selectPdf: "选择 PDF", selectImages: "选择图片", selected: "已选择文件", settings: "输出设置", process: "处理文件", processing: "正在浏览器中处理…", clear: "重新开始", ready: "文件已可下载", download: "下载文件", privacy: "PDF、图片和密码仅存在于浏览器内存中。关闭或刷新页面后，当前工作数据会消失。", error: "无法处理该文件。请检查文件格式、密码或页面设置后重试。", how: "使用方法", switch: "繁體中文" },
  "zh-TW": { title: "免費 PDF 工具", intro: "合併、分割、壓縮、轉檔、旋轉、加浮水印、加密與整理 PDF。所有處理都在目前裝置的瀏覽器中完成。", tools: "PDF 工具", selectPdf: "選擇 PDF", selectImages: "選擇圖片", selected: "已選檔案", settings: "輸出設定", process: "處理檔案", processing: "正在瀏覽器中處理…", clear: "重新開始", ready: "檔案已可下載", download: "下載檔案", privacy: "PDF、圖片與密碼只存在於瀏覽器記憶體中。關閉或重新整理頁面後，目前工作資料會消失。", error: "無法處理此檔案。請檢查檔案格式、密碼或頁面設定後再試一次。", how: "使用方式", switch: "简体中文" }
};

export function chinesePdfHref(slug: ToolSlug | undefined, locale: ChinesePdfLocale) {
  const segment = locale === "zh-CN" ? "zh-cn" : "zh-tw";
  return slug ? `${BASE_PATH}/${slug}/${segment}/` : `${BASE_PATH}/${segment}/`;
}
