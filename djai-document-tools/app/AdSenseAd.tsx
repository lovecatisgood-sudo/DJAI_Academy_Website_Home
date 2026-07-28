"use client";

import { useEffect } from "react";

const ADSENSE_CLIENT = "ca-pub-3624708289866566";
const RESPONSIVE_DISPLAY_SLOT = "7772358393";

export default function AdSenseAd({ label = "Advertisement" }: { label?: string }) {
  useEffect(() => {
    try {
      const adsWindow = window as Window & { adsbygoogle?: unknown[] };
      adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
      adsWindow.adsbygoogle.push({});
    } catch {
      // Continue normally if ads are blocked or delayed.
    }
  }, []);

  return (
    <section className="ad-section" aria-label={label}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={RESPONSIVE_DISPLAY_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </section>
  );
}
