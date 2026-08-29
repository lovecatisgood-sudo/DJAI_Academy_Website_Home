"use client";

import { useState } from "react";

const copyByLocale = {
  th: {
    label: "Newsletter",
    title: "รับข่าวสารรายสัปดาห์จาก DJAI",
    intro: "รับอัปเดตคอร์ส เครื่องมือฟรี community และบันทึกการสร้างโปรเจกต์จาก DJAI",
    emailLabel: "อีเมล",
    emailPlaceholder: "อีเมล",
    subscribe: "สมัครรับข่าวสาร",
    closeAria: "ปิด popup newsletter",
    subscribed: "สมัครแล้ว",
    thanks: "ขอบคุณที่เข้าร่วม",
    success: "คำขอรับข่าวสารของคุณพร้อมสำหรับอัปเดตจาก DJAI Academy",
    close: "ปิด",
    weekly: "DJAI Weekly",
    complete: "ยืนยันการสมัครรับข่าวสาร",
    confirmCopy: "ยืนยันช่องทางที่ DJAI Academy จะส่งข่าวคอร์ส community และเครื่องมือให้คุณ",
    name: "ชื่อ",
    namePlaceholder: "ชื่อของคุณ",
    email: "อีเมล",
    confirm: "ยืนยันการสมัคร"
  },
  en: {
    label: "Newsletter",
    title: "Subscribe to our weekly newsletter",
    intro: "Get DJAI course updates, tools, community drops, and build notes.",
    emailLabel: "Email address",
    emailPlaceholder: "Email address",
    subscribe: "Subscribe",
    closeAria: "Close newsletter popup",
    subscribed: "Subscribed",
    thanks: "Thanks for joining.",
    success: "Your newsletter request is ready for DJAI Academy updates.",
    close: "Close",
    weekly: "DJAI Weekly",
    complete: "Complete your subscription",
    confirmCopy: "Confirm where DJAI Academy should send weekly course, community, and tool updates.",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    confirm: "Confirm Subscription"
  },
  vi: {
    label: "Bản tin", title: "Nhận tin mới hằng tuần từ DJAI", intro: "Cập nhật khóa học, công cụ miễn phí, hoạt động cộng đồng và ghi chép xây sản phẩm.", emailLabel: "Địa chỉ email", emailPlaceholder: "Địa chỉ email", subscribe: "Đăng ký", closeAria: "Đóng cửa sổ đăng ký bản tin", subscribed: "Đã đăng ký", thanks: "Cảm ơn bạn đã tham gia.", success: "Yêu cầu nhận bản tin DJAI Academy của bạn đã sẵn sàng.", close: "Đóng", weekly: "DJAI Weekly", complete: "Hoàn tất đăng ký", confirmCopy: "Xác nhận email mà DJAI Academy sẽ dùng để gửi tin khóa học, cộng đồng và công cụ.", name: "Tên", namePlaceholder: "Tên của bạn", email: "Email", confirm: "Xác nhận đăng ký"
  },
  "zh-CN": { label: "邮件订阅", title: "获取 DJAI 每周更新", intro: "接收课程、免费工具、学习社区与产品实践内容。", emailLabel: "电子邮箱", emailPlaceholder: "电子邮箱", subscribe: "订阅", closeAria: "关闭订阅窗口", subscribed: "已订阅", thanks: "感谢加入", success: "你的 DJAI Academy 邮件订阅请求已提交。", close: "关闭", weekly: "DJAI Weekly", complete: "完成订阅", confirmCopy: "确认用于接收 DJAI 课程、社区和工具更新的邮箱。", name: "姓名", namePlaceholder: "你的姓名", email: "电子邮箱", confirm: "确认订阅" },
  "zh-TW": { label: "電子報", title: "接收 DJAI 每週更新", intro: "取得課程、免費工具、學習社群與產品實作內容。", emailLabel: "電子郵件", emailPlaceholder: "電子郵件", subscribe: "訂閱", closeAria: "關閉訂閱視窗", subscribed: "已訂閱", thanks: "感謝加入", success: "你的 DJAI Academy 電子報訂閱請求已送出。", close: "關閉", weekly: "DJAI Weekly", complete: "完成訂閱", confirmCopy: "確認用來接收 DJAI 課程、社群與工具更新的電子郵件。", name: "姓名", namePlaceholder: "你的姓名", email: "電子郵件", confirm: "確認訂閱" }
};

export default function NewsletterSignup({ locale = "th" }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const copy = copyByLocale[["th", "en", "vi", "zh-CN", "zh-TW"].includes(locale) ? locale : "th"];

  function openPopup(event) {
    event.preventDefault();
    setIsSubmitted(false);
    setIsOpen(true);
  }

  function submitPopup(event) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  function closePopup() {
    setIsOpen(false);
  }

  return (
    <div className="newsletter-card">
      <div>
        <span className="mini-label">{copy.label}</span>
        <h3>{copy.title}</h3>
        <p>{copy.intro}</p>
      </div>

      <form className="newsletter-inline-form" onSubmit={openPopup}>
        <label className="sr-only" htmlFor="newsletter-email">
          {copy.emailLabel}
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          placeholder={copy.emailPlaceholder}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button className="button" type="submit">
          {copy.subscribe}
        </button>
      </form>

      {isOpen ? (
        <div className="newsletter-modal-backdrop" role="presentation">
          <div
            className="newsletter-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-modal-title"
          >
            <button
              className="newsletter-modal-close"
              type="button"
              onClick={closePopup}
              aria-label={copy.closeAria}
            >
              ×
            </button>

            {isSubmitted ? (
              <div className="newsletter-success">
                <span className="mini-label">{copy.subscribed}</span>
                <h3>{copy.thanks}</h3>
                <p>{copy.success}</p>
                <button className="button" type="button" onClick={closePopup}>
                  {copy.close}
                </button>
              </div>
            ) : (
              <form className="newsletter-popup-form" onSubmit={submitPopup}>
                <span className="mini-label">{copy.weekly}</span>
                <h3 id="newsletter-modal-title">{copy.complete}</h3>
                <p>{copy.confirmCopy}</p>

                <label>
                  {copy.name}
                  <input
                    type="text"
                    value={name}
                    placeholder={copy.namePlaceholder}
                    onChange={(event) => setName(event.target.value)}
                  />
                </label>

                <label>
                  {copy.email}
                  <input
                    type="email"
                    value={email}
                    placeholder="you@example.com"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </label>

                <button className="button" type="submit">
                  {copy.confirm}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
