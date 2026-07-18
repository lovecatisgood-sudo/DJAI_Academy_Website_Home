# DJAI Blog Autoposting API

The blog API supports machine posting for Codex, Hermes, OpenClaw, or another harness agent.
Keep the key out of Git and configure it in the production environment as `DJAI_BLOG_API_KEY`.

## Endpoint

```text
GET  /api/admin/blog
POST /api/admin/blog
```

## Authentication

Use one of these headers:

```http
Authorization: Bearer YOUR_DJAI_BLOG_API_KEY
X-DJAI-Blog-API-Key: YOUR_DJAI_BLOG_API_KEY
```

The browser admin form still works with `DJAI_BLOG_ADMIN_PASSWORD`.

## Categories

Allowed category values:

```text
News
Guides
Tutorial
```

## Create Or Update A Multilingual Post

`translationGroupId` is the stable shared ID connecting the English and Thai versions. Posting the
same `translationGroupId` again updates that group.

```bash
curl -X POST "https://www.djai.academy/api/admin/blog" \
  -H "Authorization: Bearer YOUR_DJAI_BLOG_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "post": {
      "translationGroupId": "how-to-use-djai-token-counter",
      "category": "Tutorial",
      "author": "DJAI Academy",
      "translations": {
        "en": {
          "title": "How to Use the DJAI Token Counter for Vibe Coding",
          "slug": "how-to-use-djai-token-counter",
          "status": "published",
          "excerpt": "Learn how to count tokens, words, and characters before sending project context to AI coding tools.",
          "seoTitle": "How to Use the DJAI Token Counter for Vibe Coding",
          "seoDescription": "A practical guide to using DJAI Token Counter for prompt planning, context windows, and AI coding workflows.",
          "readingTime": "5 min read",
          "keywords": ["token counter", "vibe coding", "AI coding tools"],
          "content": "## Why token counting matters\n\nWrite the article body in Markdown-style text."
        },
        "th": {
          "title": "วิธีใช้ DJAI Token Counter สำหรับ Vibe Coding",
          "slug": "how-to-use-djai-token-counter",
          "status": "draft",
          "excerpt": "เรียนรู้วิธีนับ token จำนวนคำ และจำนวนตัวอักษรก่อนส่ง context ให้เครื่องมือ AI coding",
          "seoTitle": "วิธีใช้ DJAI Token Counter สำหรับ Vibe Coding",
          "seoDescription": "คู่มือใช้ DJAI Token Counter เพื่อวางแผน prompt, context window และงานเขียนโค้ดด้วย AI",
          "readingTime": "อ่าน 5 นาที",
          "keywords": ["token counter", "vibe coding", "AI coding"],
          "content": "## ทำไมการนับ token จึงสำคัญ\n\nเขียนเนื้อหาด้วยรูปแบบ Markdown-style"
        }
      }
    }
  }'
```

## Required Fields Before Publishing

For each published language:

- `title`
- `slug` or a title that can generate a slug
- `excerpt`
- `content`

Draft languages can be saved with partial content. English and Thai publishing status is controlled
separately.

## Read Existing Posts

```bash
curl "https://www.djai.academy/api/admin/blog" \
  -H "Authorization: Bearer YOUR_DJAI_BLOG_API_KEY"
```

## Generate A Key

Run this locally and store the output in Hostinger as `DJAI_BLOG_API_KEY`:

```bash
node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"
```
