# DJAI AdSense Setup

Use this as the shared AdSense reference for DJAI sites and tool pages.

## Current operating state

Ad serving is paused for approval recovery. The site retains publisher verification
metadata and `ads.txt`; it intentionally emits no loader or manual ad units. This
pause is an engineering setting, not proof of Google's current approval decision.
The account's site status, issue details, Auto ads setting and Policy center must
be read in AdSense before making account changes or requesting another review.

Run `npm run audit:adsense -- --report audits/adsense-recovery-2026-10-26/live-check.json`
for a passive public-site crawl. Use a new report filename for each run. The report
checks access, page metadata, canonical links, locale reciprocity, discovery, and
publisher configuration. It cannot certify content quality, a certified CMP,
account ownership, review submission, or actual ad delivery.

The loader and ad unit examples below are reference configuration for a future
controlled rollout. Do not paste them into the recovery build.

## Account

- AdSense client ID: `ca-pub-3624708289866566`
- ads.txt publisher ID: `pub-3624708289866566`
- Canonical ads.txt line:

```txt
google.com, pub-3624708289866566, DIRECT, f08c47fec0942fa0
```

## Required Head Tags

Add this meta tag in the document head:

```html
<meta name="google-adsense-account" content="ca-pub-3624708289866566">
```

After the site is confirmed `Ready` and the required consent setup is verified,
load the AdSense script once on each deliberately approved monetized page:

```html
<script async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3624708289866566"
  crossorigin="anonymous"></script>
```

## Ad Units

Display ad:

```html
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-3624708289866566"
  data-ad-slot="7772358393"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
```

Second display ad:

```html
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-3624708289866566"
  data-ad-slot="2939100040"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
```

In-article ad:

```html
<ins class="adsbygoogle"
  style="display:block;text-align:center"
  data-ad-client="ca-pub-3624708289866566"
  data-ad-slot="9915306007"
  data-ad-layout="in-article"
  data-ad-format="fluid"></ins>
```

Multiplex / related content ad:

```html
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-3624708289866566"
  data-ad-slot="7214075331"
  data-ad-format="fluid"
  data-ad-layout-key="-ef+6k-30-ac+ty"></ins>
```

After each ad unit is mounted client-side, call:

```html
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

## Placement Policy Notes

- Do not auto-refresh, rotate, slide, or reload ads to create extra impressions.
- Do not place ads where they can be confused with navigation, download buttons, form controls, or tool results.
- Keep ads away from course checkout, payment, login, account, admin, and other conversion-critical pages unless there is a deliberate reason.
- Good pages for ads: blog articles, blog indexes, free tool hubs, and free tool result/support sections.

## Approval review and later rollout

Keep Auto ads off during recovery and the initial controlled rollout. Do not
restore the former site-wide ad pattern. After `Ready` and consent verification,
start with one manual responsive unit on a reviewed public page, after substantive
article content or the completed tool task. Keep the School subdomain ad-free.

Google accepts publisher connection through a meta tag or ads.txt as well as the
AdSense script; a recovery pause does not by itself prevent ownership verification.
Ad units can only serve once the account/site is eligible. If the site says
`Getting ready`, do not remove and re-add it or repeatedly request review.

Candidate sections for a later page-specific review (not a blanket allowlist):

- `/blog/`
- `/blog/en/`
- `/tools/`
- `/tools/en/`
- `/tools/PDFTools/`
- `/tools/document/`
- `/tools/qrgen/`
- `/tools/resizeimg/`

Recommended excluded sections:

- `/course/`
- `/course/en/`
- `/course/detail/`
- `/service/`
- `/service/en/`
- `/portfolio/`
- `/admin/`
- checkout/payment/login/account paths

Official references:

- [Site statuses](https://support.google.com/adsense/answer/12170222)
- [Connecting a site](https://support.google.com/adsense/answer/12169212)
- [Site approval troubleshooting](https://support.google.com/adsense/answer/12176698)
- [Publisher policies](https://support.google.com/adsense/answer/10502938)
