# DJAI AdSense Setup

Use this as the shared AdSense reference for DJAI sites and tool pages.

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

Load the AdSense script once per page:

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

## Recommended Auto Ads Targeting

In AdSense, turn Auto ads on for the site, then use Page exclusions to keep Auto ads off pages where ads would hurt conversions or user trust.

Recommended allowed sections:

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
