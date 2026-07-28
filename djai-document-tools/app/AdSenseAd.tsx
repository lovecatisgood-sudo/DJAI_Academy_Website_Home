"use client";

import { useEffect } from "react";

const ADSENSE_CLIENT = "ca-pub-3624708289866566";
const AD_UNITS = {
  display: {
    slot: "7772358393",
    props: {
      "data-ad-format": "auto",
      "data-full-width-responsive": "true"
    }
  },
  display2: {
    slot: "2939100040",
    props: {
      "data-ad-format": "auto",
      "data-full-width-responsive": "true"
    }
  },
  multiplex: {
    slot: "2012765259",
    props: {
      "data-ad-format": "autorelaxed"
    }
  }
};

export default function AdSenseAd({ label = "Advertisement", variant = "display" }: { label?: string; variant?: "display" | "display2" | "multiplex" }) {
  const unit = AD_UNITS[variant] || AD_UNITS.display;

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
        data-ad-slot={unit.slot}
        {...unit.props}
      />
    </section>
  );
}
