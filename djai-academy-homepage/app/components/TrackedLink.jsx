"use client";

import { trackSeoEvent } from "../lib/seoAnalytics";

export default function TrackedLink({
  eventName,
  eventParams,
  onClick,
  children,
  ...anchorProps
}) {
  function handleClick(event) {
    trackSeoEvent(eventName, eventParams);
    onClick?.(event);
  }

  return (
    <a {...anchorProps} onClick={handleClick}>
      {children}
    </a>
  );
}
