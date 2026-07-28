"use client";

import { useEffect } from "react";

const ADSENSE_CLIENT = "ca-pub-3624708289866566";
const AD_UNITS = {
  display: {
    slot: "7772358393",
    props: {
      "data-ad-format": "auto",
      "data-full-width-responsive": "true"
    },
    style: { display: "block" }
  },
  display2: {
    slot: "2939100040",
    props: {
      "data-ad-format": "auto",
      "data-full-width-responsive": "true"
    },
    style: { display: "block" }
  },
  inArticle: {
    slot: "9915306007",
    props: {
      "data-ad-layout": "in-article",
      "data-ad-format": "fluid"
    },
    style: { display: "block", textAlign: "center" }
  },
  multiplex: {
    slot: "7214075331",
    props: {
      "data-ad-format": "fluid",
      "data-ad-layout-key": "-ef+6k-30-ac+ty"
    },
    style: { display: "block" }
  }
};

export default function AdSenseAd({ label = "Advertisement", variant = "display" }) {
  const unit = AD_UNITS[variant] || AD_UNITS.display;

  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or delayed AdSense loading can block the push. The page should continue normally.
    }
  }, []);

  return (
    <section className={`ad-section ad-${variant}`} aria-label={label}>
      <ins
        className="adsbygoogle"
        style={unit.style}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={unit.slot}
        {...unit.props}
      />
    </section>
  );
}
