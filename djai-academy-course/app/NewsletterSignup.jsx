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
  }
};

export default function NewsletterSignup({ locale = "th" }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const copy = copyByLocale[locale === "en" ? "en" : "th"];

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
