import { loadNeon } from "./neon-client.mjs";
import { redactError, requireDatabaseUrl } from "./env-utils.mjs";
import { loadLocalEnv } from "./local-env.mjs";

loadLocalEnv();

const legacyKnowledgeMarkdown = `# DJAI Academy Voice Agent Knowledge

## Services
- Landing pages
- Business websites
- AI chatbots
- AI voice agents
- Custom software
- Mobile and web apps
- Games
- Automation workflows
- In-person vibe-coding courses

## Pricing Posture
- Only state prices that are explicitly listed in this knowledge document.
- If the visitor asks for a price that is not listed here, say a human will confirm after reviewing the scope.
- Custom software, apps, games, automation, and voice agents are quotation-based unless a specific package is listed here.

## Course Info
- DJAI Academy offers in-person vibe-coding courses in Bangkok.
- Course details, schedules, and prices must be confirmed by the DJAI team unless listed here.

## Contact Policy
- When a visitor shows meaningful interest, collect their name, one usable contact method, project need, and preferred callback time.
- Tell visitors the DJAI team will contact them. Do not claim a booking is confirmed.
`;

const initialKnowledgeMarkdown = `# DJAI Academy Voice Agent Knowledge

## Services
- Landing pages
- Business websites
- AI chatbots
- AI voice agents
- Custom software
- Mobile and web apps
- Games
- Automation workflows
- In-person vibe-coding courses

## Website Packages Published On The Landing Page

### Landing Page
- Promotional price: 5,000 THB.
- Original listed price: 10,000 THB.
- Best for a single product, campaign, lead generation, ads, promotions, menus, portfolios, and simple business launches.
- Includes: 1 custom-designed page, SEO optimization, AI Chat Bot (Auto CTA) 1-month free trial, first-year hosting, mobile responsive layout, and fast turnaround.
- Renewal note: 3,000 THB/year after the first year.

## Guaranteed Welcome Voucher
- The welcome wheel always awards a 10,000 THB web-development voucher; it is a guaranteed reveal, not a random prize draw.
- The visitor has four hours from the first visit to reserve the voucher by email.
- The full 10,000 THB value applies to the Complete Website package, reducing its standard 20,000 THB price to 10,000 THB.
- For other packages, the voucher discount is capped at 50% of the standard package price. The Landing Page is therefore 5,000 THB instead of 10,000 THB.
- Other labels on the wheel preview campaign rewards and are not available in this welcome spin.
- One voucher is available per customer, and the DJAI team confirms final scope and eligibility.

### Additional Page
- Promotional price: 3,000 THB/page.
- Original listed price: 5,000 THB/page.
- Best for expanding an existing website with extra pages.
- Includes: design consistency, SEO optimization, AI Chat Bot 1-month free trial, quick turnaround, and mobile responsive layout.
- Renewal note: covered under the customer's maintenance plan.

### Complete Website
- Promotional price: 10,000 THB.
- Original listed price: 20,000 THB.
- Best for a full 5-page business website.
- Includes: 5 custom-designed pages, responsive design, SEO-ready structure, professional UI, contact page, gallery, business information, contact form, social media integration, first-year hosting, mobile responsive layout, and priority support.
- Landing page comparison states that buying 5 pages individually would be 15,000 THB, the bundle price is 10,000 THB, and the customer saves 5,000 THB.
- Renewal note: 3,000 THB/year after the first year.

## AI Sales Chatbot
- Acts like a professional salesperson on the website.
- Can answer questions, recommend products or services, handle objections, collect leads, qualify prospects, and help book appointments.
- Available 24/7.
- Supports multiple languages.
- Useful when paid traffic is being lost, visitors have questions before buying, or staff cannot respond instantly.

## AI Voice Agent
- Works like an AI receptionist or AI phone sales assistant.
- Can answer calls, handle FAQs, qualify customers, book appointments, transfer leads, and collect information.
- Supports multiple languages.
- Useful when the business misses calls, needs faster first response, needs multilingual reception, or wants to qualify leads before a human call.

## Custom Development And Automation Signals
- Investigate further if the visitor mentions Excel, paper, manual work, inventory, POS, CRM, scheduling, membership, booking, reports, multiple branches, internal systems, many employees, or repetitive tasks.
- Custom development, apps, games, automation, and voice agents are quotation-based unless a specific package is listed here.
- Do not immediately pitch software. First ask how they do the process today and what the business impact is.

## Trust And Included-Service Claims
- The landing page states: no hidden fees, money-back guarantee, and free revisions.
- Every package includes custom web design, SEO optimization, AI Chat Bot (Auto CTA) 1-month free trial, and first-year hosting where the package states hosting is included.
- Hosting after the first year is listed as 3,000 THB/year where the package states that renewal note.

## Pricing Posture
- Only state prices that are explicitly listed in this knowledge document.
- If the visitor asks for a price that is not listed here, say a human will confirm after reviewing the scope.
- Custom software, apps, games, automation, and voice agents are quotation-based unless a specific package is listed here.

## Course Info
- DJAI Academy offers in-person vibe-coding courses in Bangkok.
- Course details, schedules, and prices must be confirmed by the DJAI team unless listed here.

## Contact Policy
- When a visitor shows meaningful interest, collect their name, company or business name if available, one or more usable contact methods, project need, and preferred callback or consultation time.
- Tell visitors the DJAI consultant will review their business context before the consultation so the call can focus on specific opportunities.
- Do not claim a booking is fully confirmed.
`;

async function migrate() {
  const sql = (await loadNeon())(requireDatabaseUrl());

  await sql.transaction((tx) => [
    tx`create extension if not exists pgcrypto`,
    tx`
      create table if not exists settings (
        id int primary key default 1,
        agent_enabled boolean default true,
        greeting text,
        voice text default 'marin',
        voice_provider text default 'openai',
        language_mode text default 'auto_th_en',
        knowledge_md text,
        knowledge_version int default 1,
        max_call_seconds int default 600,
        daily_session_cap int default 100,
        model_id text default 'gpt-realtime-2.1',
        transcription_model text default 'gpt-realtime-whisper',
        analysis_enabled boolean default true,
        analysis_model_id text default 'gpt-4o-mini',
        updated_at timestamptz default now()
      )
    `,
    tx`
      alter table settings
      add column if not exists transcription_model text default 'gpt-realtime-whisper'
    `,
    tx`
      alter table settings
      add column if not exists voice_provider text default 'openai'
    `,
    tx`
      alter table settings
      add column if not exists analysis_enabled boolean default true
    `,
    tx`
      alter table settings
      add column if not exists analysis_model_id text default 'gpt-4o-mini'
    `,
    tx`alter table settings alter column model_id set default 'gpt-realtime-2.1'`,
    tx`alter table settings alter column transcription_model set default 'gpt-realtime-whisper'`,
    tx`alter table settings alter column analysis_enabled set default true`,
    tx`alter table settings alter column analysis_model_id set default 'gpt-4o-mini'`,
    tx`
      create table if not exists conversations (
        id uuid primary key default gen_random_uuid(),
        started_at timestamptz default now(),
        ended_at timestamptz,
        duration_seconds int,
        language text,
        page_url text,
        transcript jsonb,
        had_lead boolean default false,
        summary text,
        business_type text,
        main_problem text,
        business_goal text,
        interest_level text default 'unknown',
        concern_or_objection text,
        recommended_service text,
        next_action text,
        analysis_status text default 'pending',
        analysis_error text,
        analysis_model_id text,
        analysis_updated_at timestamptz,
        starred boolean default false,
        deleted_at timestamptz
      )
    `,
    tx`alter table conversations add column if not exists summary text`,
    tx`alter table conversations add column if not exists business_type text`,
    tx`alter table conversations add column if not exists main_problem text`,
    tx`alter table conversations add column if not exists business_goal text`,
    tx`alter table conversations add column if not exists interest_level text default 'unknown'`,
    tx`alter table conversations add column if not exists concern_or_objection text`,
    tx`alter table conversations add column if not exists recommended_service text`,
    tx`alter table conversations add column if not exists next_action text`,
    tx`alter table conversations add column if not exists analysis_status text default 'pending'`,
    tx`alter table conversations add column if not exists analysis_error text`,
    tx`alter table conversations add column if not exists analysis_model_id text`,
    tx`alter table conversations add column if not exists analysis_updated_at timestamptz`,
    tx`alter table conversations add column if not exists starred boolean default false`,
    tx`alter table conversations add column if not exists deleted_at timestamptz`,
    tx`alter table conversations alter column interest_level set default 'unknown'`,
    tx`alter table conversations alter column analysis_status set default 'pending'`,
    tx`alter table conversations alter column starred set default false`,
    tx`
      create table if not exists leads (
        id uuid primary key default gen_random_uuid(),
        conversation_id uuid references conversations(id),
        created_at timestamptz default now(),
        name text,
        contact text,
        contact_type text,
        need text,
        preferred_time text,
        status text default 'pending_follow_up',
        client_name text,
        company_name text,
        phone text,
        email text,
        line_id text,
        whatsapp text,
        other_contact text,
        preferred_contact_method text,
        preferred_meeting_day text,
        preferred_meeting_time text,
        admin_notes text,
        updated_at timestamptz default now()
      )
    `,
    tx`alter table leads add column if not exists client_name text`,
    tx`alter table leads add column if not exists company_name text`,
    tx`alter table leads add column if not exists phone text`,
    tx`alter table leads add column if not exists email text`,
    tx`alter table leads add column if not exists line_id text`,
    tx`alter table leads add column if not exists whatsapp text`,
    tx`alter table leads add column if not exists other_contact text`,
    tx`alter table leads add column if not exists preferred_contact_method text`,
    tx`alter table leads add column if not exists preferred_meeting_day text`,
    tx`alter table leads add column if not exists preferred_meeting_time text`,
    tx`alter table leads add column if not exists admin_notes text`,
    tx`alter table leads add column if not exists updated_at timestamptz default now()`,
    tx`alter table leads alter column status set default 'pending_follow_up'`,
    tx`alter table leads alter column updated_at set default now()`,
    tx`
      create unique index if not exists leads_conversation_contact_unique
      on leads (conversation_id, contact)
    `,
    tx`
      create index if not exists conversations_started_at_idx
      on conversations (started_at desc)
    `,
    tx`
      create index if not exists conversations_had_lead_idx
      on conversations (had_lead)
    `,
    tx`
      create index if not exists leads_created_at_idx
      on leads (created_at desc)
    `,
    tx`
      create index if not exists leads_status_idx
      on leads (status)
    `,
    tx`
      create index if not exists conversations_starred_idx
      on conversations (starred)
    `,
    tx`
      create index if not exists conversations_deleted_at_idx
      on conversations (deleted_at)
    `,
    tx`
      create index if not exists conversations_analysis_status_idx
      on conversations (analysis_status)
    `,
    tx`
      create index if not exists leads_updated_at_idx
      on leads (updated_at desc)
    `,
    tx`
      insert into settings (
        id,
        agent_enabled,
        greeting,
        voice,
        voice_provider,
        language_mode,
        knowledge_md,
        knowledge_version,
        max_call_seconds,
        daily_session_cap,
        model_id,
        transcription_model,
        analysis_enabled,
        analysis_model_id
      )
      values (
        1,
        true,
        'Hi, this is DJAI Academy. Tell me what you want to build, and I will help you choose the right next step.',
        'marin',
        'openai',
        'auto_th_en',
        ${initialKnowledgeMarkdown},
        1,
        600,
        100,
        'gpt-realtime-2.1',
        'gpt-realtime-whisper',
        true,
        'gpt-4o-mini'
      )
      on conflict (id) do nothing
    `,
    tx`
      update settings set
        voice_provider = case when voice_provider is null or voice_provider not in ('openai', 'gemini') then 'openai' else voice_provider end,
        model_id = case when model_id = 'gpt-realtime' then 'gpt-realtime-2.1' else model_id end,
        transcription_model = case when transcription_model = 'gpt-4o-mini-transcribe' then 'gpt-realtime-whisper' else transcription_model end,
        analysis_enabled = coalesce(analysis_enabled, true),
        analysis_model_id = coalesce(nullif(analysis_model_id, ''), 'gpt-4o-mini'),
        greeting = case
          when greeting = 'Hi, this is DJAI Academy. Tell me what you want to build, and I will help you choose the right next step.'
            then 'Hi, I am DJ from DJAI Academy. What kind of business are you running, and what are you trying to improve right now?'
          else greeting
        end,
        knowledge_md = replace(
          case when knowledge_md = ${legacyKnowledgeMarkdown} then ${initialKnowledgeMarkdown} else knowledge_md end,
          '- Promotion is valid for July and August 2026.',
          '- The fixed July-August window has been replaced by a guaranteed welcome voucher that the visitor can reserve for four hours. The full 10,000 THB value applies to the Complete Website package; discounts on other packages are capped at 50% of standard price.'
        ),
        updated_at = now()
      where id = 1
    `,
    tx`
      update leads set
        status = case
          when status = 'new' then 'pending_follow_up'
          when status = 'contacted' then 'follow_up_later'
          when status = 'closed' then 'deal_closed'
          when status in ('pending_follow_up', 'appointment_set', 'follow_up_later', 'deal_closed', 'no_deal') then status
          else 'pending_follow_up'
        end,
        client_name = coalesce(nullif(client_name, ''), nullif(name, '')),
        preferred_meeting_time = coalesce(nullif(preferred_meeting_time, ''), nullif(preferred_time, '')),
        phone = case when contact_type = 'phone' then coalesce(nullif(phone, ''), contact) else phone end,
        email = case when contact_type = 'email' then coalesce(nullif(email, ''), contact) else email end,
        line_id = case when contact_type = 'line' then coalesce(nullif(line_id, ''), contact) else line_id end,
        other_contact = case when contact_type = 'other' then coalesce(nullif(other_contact, ''), contact) else other_contact end,
        updated_at = coalesce(updated_at, created_at, now())
    `,
  ]);
}

migrate()
  .then(() => {
    console.log("Migrations applied and settings row seeded.");
  })
  .catch((error) => {
    console.error(`Migration failed: ${redactError(error)}`);
    process.exit(1);
  });
