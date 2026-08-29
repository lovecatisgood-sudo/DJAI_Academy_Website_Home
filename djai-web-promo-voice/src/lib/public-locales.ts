export type PublicLocale = "th" | "en" | "vi" | "zh-CN" | "zh-TW";

export function publicLocaleFromPath(pathname: string): PublicLocale {
  if (/\/zh-cn(?:\/|$)/i.test(pathname)) return "zh-CN";
  if (/\/zh-tw(?:\/|$)/i.test(pathname)) return "zh-TW";
  if (/\/vi(?:\/|$)/i.test(pathname)) return "vi";
  return "th";
}

export const chinesePromoCopy = {
  "zh-CN": {
    segment: "zh-cn", title: "企业网站开发与 AI 语音助手服务", description: "DJAI 提供企业网站、落地页、技术 SEO、响应式设计、托管，以及可选的 AI 聊天机器人和语音咨询助手。", eyebrow: "DJAI Academy 网站开发服务", intro: "选择高转化落地页、为现有网站增加业务页面，或构建完整的五页企业网站。每个方案都包含技术 SEO 基础、移动端适配和托管。", localIntro: "从内容结构、设计到部署，DJAI 会明确说明起步价格和交付范围，再由团队跟进具体需求。", packagesTitle: "网站开发优惠方案", packages: ["落地页 — 优惠价 5,000 THB", "新增页面 — 每页优惠价 3,000 THB", "五页企业网站 — 优惠价 10,000 THB"], voucherTitle: "价值 10,000 THB 的新客户优惠券", voucher: "新访客可领取价值 10,000 THB 的网站开发优惠券，并保留 4 小时。完整金额适用于原价 20,000 THB 的 Complete Website 方案；其他方案最高可抵扣标准价格的 50%。", agentTitle: "与 DJAI AI 语音咨询助手交流", agent: "可用英语或泰语提问。语音助手会说明方案、帮助梳理需求，并记录项目信息，交由 DJAI 团队人工跟进。"
  },
  "zh-TW": {
    segment: "zh-tw", title: "企業網站開發與 AI 語音助理服務", description: "DJAI 提供企業網站、登陸頁、技術 SEO、響應式設計、主機代管，以及可選的 AI 聊天機器人與語音諮詢助理。", eyebrow: "DJAI Academy 網站開發服務", intro: "選擇高轉換登陸頁、為現有網站新增商業頁面，或建立完整的五頁企業網站。每個方案都包含技術 SEO 基礎、行動裝置適配與主機代管。", localIntro: "從內容架構、設計到部署，DJAI 會先清楚說明起始價格與交付範圍，再由團隊跟進具體需求。", packagesTitle: "網站開發優惠方案", packages: ["登陸頁 — 優惠價 5,000 THB", "新增頁面 — 每頁優惠價 3,000 THB", "五頁企業網站 — 優惠價 10,000 THB"], voucherTitle: "價值 10,000 THB 的新客優惠券", voucher: "新訪客可領取價值 10,000 THB 的網站開發優惠券，並保留 4 小時。完整金額適用於原價 20,000 THB 的 Complete Website 方案；其他方案最高可折抵標準價格的 50%。", agentTitle: "與 DJAI AI 語音諮詢助理交流", agent: "可使用英語或泰語提問。語音助理會說明方案、協助整理需求，並記錄專案資訊，交由 DJAI 團隊人工跟進。"
  }
} as const;
