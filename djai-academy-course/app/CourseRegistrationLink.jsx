"use client";

import { useState } from "react";
import { courseRegistrationUrls } from "./lib/courseRegistration";

const SESSION_TIMEOUT_MS = 2000;

export default function CourseRegistrationLink({ children, className = "button" }) {
  const [checkingSession, setCheckingSession] = useState(false);

  async function continueRegistration(event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    if (checkingSession) return;

    setCheckingSession(true);
    let destination = courseRegistrationUrls.signup;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), SESSION_TIMEOUT_MS);

    try {
      const response = await fetch(courseRegistrationUrls.session, {
        credentials: "include",
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: controller.signal
      });

      if (response.ok) {
        const session = await response.json();
        if (session?.authenticated === true) {
          destination = courseRegistrationUrls.reserve;
        }
      }
    } catch {
      // If the session check is unavailable, continue through the safe signup flow.
    } finally {
      window.clearTimeout(timeout);
      window.location.assign(destination);
    }
  }

  return (
    <a
      className={className}
      href={courseRegistrationUrls.signup}
      onClick={continueRegistration}
      aria-busy={checkingSession || undefined}
    >
      {children}
    </a>
  );
}
