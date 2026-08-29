export const consentCopy = {
  "zh-CN": {
    title: "你的隐私选择",
    summary:
      "我们使用可选的 Google Analytics Cookie 了解网站使用情况，并使用 Google AdSense Cookie 展示和衡量广告。你可以全部接受、拒绝可选 Cookie，或按类别选择。",
    necessary: "必要存储",
    necessaryHelp: "始终开启，用于记住隐私选择并支持网站安全。",
    analytics: "分析",
    analyticsHelp: "帮助我们了解访问量、使用页面、大致位置以及设备和浏览器信息。",
    advertising: "广告",
    advertisingHelp: "允许 Google 展示、限制频率、防止欺诈并衡量非个性化广告。",
    accept: "全部接受",
    reject: "拒绝可选 Cookie",
    customize: "自定义",
    save: "保存选择",
    back: "返回",
    policy: "隐私政策与 Cookie",
    dialogLabel: "Cookie 同意设置",
    close: "关闭",
    alwaysEnabled: "始终开启"
  },
  "zh-TW": {
    title: "你的隱私選擇",
    summary:
      "我們使用選用的 Google Analytics Cookie 了解網站使用情況，並使用 Google AdSense Cookie 顯示與衡量廣告。你可以全部接受、拒絕選用 Cookie，或依類別選擇。",
    necessary: "必要儲存空間",
    necessaryHelp: "永遠開啟，用來記住隱私選擇並支援網站安全。",
    analytics: "分析",
    analyticsHelp: "協助我們了解瀏覽次數、使用頁面、大致位置，以及裝置與瀏覽器資訊。",
    advertising: "廣告",
    advertisingHelp: "允許 Google 顯示、限制頻率、防止詐騙並衡量非個人化廣告。",
    accept: "全部接受",
    reject: "拒絕選用 Cookie",
    customize: "自訂",
    save: "儲存選擇",
    back: "返回",
    policy: "隱私權政策與 Cookie",
    dialogLabel: "Cookie 同意設定",
    close: "關閉",
    alwaysEnabled: "永遠開啟"
  }
};

export function privacyPathForLocale(locale) {
  if (locale === "th") return "/privacy/";
  if (locale === "zh-CN") return "/privacy/zh-cn/";
  if (locale === "zh-TW") return "/privacy/zh-tw/";
  return `/privacy/${locale}/`;
}
