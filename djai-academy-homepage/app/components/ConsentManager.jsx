"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "djai_consent_v1";
const STORAGE_VERSION = 1;
const MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
const subscribeToHydration = () => () => {};

const copy = {
  en: {
    title: "Your privacy choices",
    summary:
      "We use optional Google Analytics cookies to understand site usage. Advertising cookies and ad serving are disabled during publisher approval recovery.",
    necessary: "Necessary storage",
    necessaryHelp: "Always on. Remembers your privacy choice and supports website security.",
    analytics: "Analytics",
    analyticsHelp: "Helps us understand visits, pages used, approximate location, and device/browser information.",
    accept: "Accept analytics",
    reject: "Reject optional",
    customize: "Customize",
    save: "Save choices",
    back: "Back",
    policy: "Privacy & Cookie Policy",
    dialogLabel: "Cookie consent settings"
  },
  th: {
    title: "ตัวเลือกความเป็นส่วนตัวของคุณ",
    summary:
      "เราใช้คุกกี้ Google Analytics แบบไม่บังคับเพื่อทำความเข้าใจการใช้งานเว็บไซต์ ขณะนี้ปิดการใช้คุกกี้โฆษณาและการแสดงโฆษณาระหว่างปรับปรุงเว็บไซต์เพื่อขออนุมัติจากผู้เผยแพร่โฆษณา",
    necessary: "พื้นที่จัดเก็บที่จำเป็น",
    necessaryHelp: "เปิดเสมอ ใช้จดจำตัวเลือกความเป็นส่วนตัวและสนับสนุนความปลอดภัยของเว็บไซต์",
    analytics: "การวิเคราะห์",
    analyticsHelp: "ช่วยให้เราเข้าใจจำนวนการเข้าชม หน้าที่ใช้ ตำแหน่งโดยประมาณ และข้อมูลอุปกรณ์/เบราว์เซอร์",
    accept: "ยอมรับการวิเคราะห์",
    reject: "ปฏิเสธคุกกี้เสริม",
    customize: "ปรับแต่ง",
    save: "บันทึกตัวเลือก",
    back: "ย้อนกลับ",
    policy: "นโยบายความเป็นส่วนตัวและคุกกี้",
    dialogLabel: "การตั้งค่าความยินยอมคุกกี้"
  },
  vi: {
    title: "Lựa chọn quyền riêng tư của bạn",
    summary:
      "Chúng tôi dùng cookie Google Analytics không bắt buộc để hiểu cách website được sử dụng. Cookie quảng cáo và việc phân phối quảng cáo đang bị tắt trong thời gian khắc phục để xin phê duyệt nhà xuất bản.",
    necessary: "Lưu trữ cần thiết",
    necessaryHelp: "Luôn bật để ghi nhớ lựa chọn quyền riêng tư và hỗ trợ bảo mật website.",
    analytics: "Phân tích",
    analyticsHelp: "Giúp chúng tôi hiểu lượt truy cập, trang được sử dụng, vị trí gần đúng và thông tin về thiết bị, trình duyệt.",
    accept: "Đồng ý phân tích",
    reject: "Từ chối cookie không bắt buộc",
    customize: "Tùy chỉnh",
    save: "Lưu lựa chọn",
    back: "Quay lại",
    policy: "Chính sách quyền riêng tư và cookie",
    dialogLabel: "Cài đặt chấp thuận cookie"
  }
};

function consentPayload(analytics) {
  return {
    analytics,
    advertising: false,
    savedAt: Date.now(),
    version: STORAGE_VERSION
  };
}

function readStoredConsent() {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    if (
      value?.version !== STORAGE_VERSION ||
      typeof value.analytics !== "boolean" ||
      typeof value.advertising !== "boolean" ||
      !Number.isFinite(value.savedAt) ||
      Date.now() - value.savedAt > MAX_AGE_MS
    ) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return value;
  } catch {
    return null;
  }
}

function updateGoogleConsent({ analytics }) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });
  window.gtag("set", "ads_data_redaction", true);
}

function loadAnalytics(gaId) {
  if (document.getElementById("djai-google-analytics")) return;

  const script = document.createElement("script");
  script.id = "djai-google-analytics";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", gaId);
}

function removeAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((part) => part.split("=")[0].trim())
    .filter((name) => name.startsWith("_ga"));

  for (const name of cookieNames) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.djai.academy; SameSite=Lax`;
  }
}

export default function ConsentManager({ gaId, locale = "en" }) {
  const text = copy[locale] || copy.en;
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const persistedConsent = useMemo(() => (hydrated ? readStoredConsent() : null), [hydrated]);
  const [storedConsent, setStoredConsent] = useState(null);
  const activeConsent = storedConsent || persistedConsent;
  const [visible, setVisible] = useState(null);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  const activate = useCallback(
    (choice) => {
      updateGoogleConsent(choice);
      if (choice.analytics) loadAnalytics(gaId);
    },
    [gaId]
  );

  useEffect(() => {
    if (activeConsent) activate(activeConsent);
  }, [activate, activeConsent]);

  useEffect(() => {
    function openSettings() {
      setAnalytics(Boolean(activeConsent?.analytics));
      setCustomizing(true);
      setVisible(true);
    }

    window.addEventListener("djai:open-consent", openSettings);
    return () => window.removeEventListener("djai:open-consent", openSettings);
  }, [activeConsent]);

  function save(analyticsAllowed) {
    const choice = consentPayload(analyticsAllowed);
    const requiresReload = Boolean(
      activeConsent &&
        !analyticsAllowed && activeConsent.analytics
    );

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
    if (!analyticsAllowed) removeAnalyticsCookies();
    activate(choice);
    setStoredConsent(choice);
    setVisible(false);
    setCustomizing(false);

    if (requiresReload) window.location.reload();
  }

  if (!hydrated || visible === false || (visible === null && activeConsent)) return null;

  return (
    <div className="consent-backdrop">
      <section className="consent-dialog" role="dialog" aria-label={text.dialogLabel} aria-live="polite">
        <div className="consent-heading">
          <div>
            <p className="consent-kicker">DJAI Academy</p>
            <h2>{text.title}</h2>
          </div>
          {activeConsent && (
            <button className="consent-close" type="button" aria-label="Close" onClick={() => setVisible(false)}>
              ×
            </button>
          )}
        </div>

        <p className="consent-summary">{text.summary}</p>

        {customizing && (
          <div className="consent-options">
            <div className="consent-option">
              <div>
                <strong>{text.necessary}</strong>
                <span>{text.necessaryHelp}</span>
              </div>
              <span className="consent-required" aria-label="Always enabled">✓</span>
            </div>
            <label className="consent-option">
              <div>
                <strong>{text.analytics}</strong>
                <span>{text.analyticsHelp}</span>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
              />
            </label>
          </div>
        )}

        <a className="consent-policy-link" href={locale === "th" ? "/privacy/" : `/privacy/${locale}/`}>
          {text.policy}
        </a>

        <div className="consent-actions">
          {customizing ? (
            <>
              <button className="consent-button secondary-choice" type="button" onClick={() => setCustomizing(false)}>
                {text.back}
              </button>
              <button className="consent-button primary-choice" type="button" onClick={() => save(analytics)}>
                {text.save}
              </button>
            </>
          ) : (
            <>
              <button className="consent-button secondary-choice" type="button" onClick={() => save(false)}>
                {text.reject}
              </button>
              <button className="consent-button secondary-choice" type="button" onClick={() => setCustomizing(true)}>
                {text.customize}
              </button>
              <button className="consent-button primary-choice" type="button" onClick={() => save(true)}>
                {text.accept}
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
