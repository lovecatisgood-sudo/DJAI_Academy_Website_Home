"use client";

export default function CookieSettingsButton({ children }) {
  return (
    <button
      className="footer-legal-button"
      type="button"
      onClick={() => window.dispatchEvent(new Event("djai:open-consent"))}
    >
      {children}
    </button>
  );
}
