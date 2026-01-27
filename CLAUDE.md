# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Matt Edmundson's personal website - a single-page site built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4. Uses Tailwind Catalyst UI components.

**Live URL**: https://mattedmundson.com

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

- **App Router**: Pages in `src/app/` using Next.js App Router conventions
- **Styling**: Tailwind CSS 4 with `@import "tailwindcss"` syntax and `@theme` for custom properties
- **UI Components**: Tailwind Catalyst components in `src/components/` - pre-built, accessible components using Headless UI and React Aria

## Key Dependencies

- `@headlessui/react` - Unstyled accessible UI primitives (used by Catalyst)
- `react-aria-components` - Adobe's accessible component primitives (used by some Catalyst components)
- `motion` - Animation library (Framer Motion)
- `clsx` - Conditional class name utility
- `mailgun.js` - Email sending via Mailgun
- `@supabase/supabase-js` - Database client for Supabase

## Catalyst Components

Import from `@/components/`:
```tsx
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Field, Label } from '@/components/fieldset'
```

Documentation: https://catalyst.tailwindui.com/docs

## Contact Form

The contact form (`src/components/contact-form.tsx`) handles:
- Form fields: First name, Last name, Email, Company (required), Phone (optional), Message
- Form validation with error messages on blur and submit
- Spam protection via honeypot field and form load time check
- Saves submissions to EP CRM via Supabase (contacts, companies, activities tables)
- Sends confirmation email to submitter via Mailgun
- Sends notification email to site owner (matt@mattedmundson.com)
- Newsletter subscription checkbox (Beehiiv integration) - only shows if user not already subscribed

### API Routes

- `POST /api/contact` - Submit contact form, save to DB, send emails
- `POST /api/newsletter/check` - Check if email is subscribed to Beehiiv newsletter
- `POST /api/subscribe` - Subscribe email to Beehiiv newsletter

## Email Templates

Email templates are in `src/lib/email-templates/`:
- `contact-confirmation.ts` - Sent to form submitter
- `contact-notification.ts` - Sent to site owner

Both use HTML tables for email client compatibility with:
- Black header bar with logo and navigation links
- Matt's signature image
- Responsive design

### Email Assets (Supabase Storage)
- Logo: `https://xqtdcodyrimenmnairgk.supabase.co/storage/v1/object/public/general-images/1767900744839-sv94qy6omf.png`
- Signature: `https://xqtdcodyrimenmnairgk.supabase.co/storage/v1/object/public/general-images/1767023756101-ty3ucftisj.png`

## Environment Variables

Required in `.env.local`:
```
MAILGUN_API_KEY=           # Mailgun API key
MAILGUN_DOMAIN=mg.mattedmundson.com
MAILGUN_FROM_EMAIL=matt@mattedmundson.com
CONTACT_FORM_RECIPIENT=matt@mattedmundson.com

NEXT_PUBLIC_SUPABASE_URL=https://xqtdcodyrimenmnairgk.supabase.co
SUPABASE_SERVICE_ROLE_KEY= # Supabase service role key

BEEHIIV_API_TOKEN=         # Beehiiv API token
BEEHIIV_PUBLICATION_ID=pub_d115163f-1278-4825-8449-5f357d7c1f4a
```

## Database

Uses Supabase (EP CRM instance). Contact form submissions create records in multiple tables:

### Tables Used
- **contacts** - Main contact record with first_name, last_name, email, phone, contact_type ('lead'), lead_source ('contact_form'), follow_up (true)
- **companies** - Company record (created if new, matched by name if existing)
- **contact_companies** - Links contact to company with relationship_type ('employee'), is_primary (true)
- **contact_emails** - Email record with email_type ('work'), is_primary (true)
- **activities** - Form message stored with activity_type ('form_submission'), content (the message), source ('contact_form')

### Existing Contact Handling
If a contact with the same email already exists:
- New activity is created with the form message
- follow_up flag is set to true
- Company is linked if not already present

## Performance Optimizations

The site is optimized for PageSpeed Insights (Mobile: 93, Desktop: 99).

### Fonts
- Uses `next/font/google` for Inter and Playfair Display (self-hosted, no render-blocking)
- CSS variables `--font-inter` and `--font-playfair` defined in `layout.tsx`
- Referenced in `globals.css` via `var(--font-inter)` and `var(--font-playfair)`

### Images
- All images use Next.js `<Image>` component for automatic optimization
- Hero image (`matt-hero.webp`) has `priority` prop for LCP optimization
- Responsive variants exist: `matt-hero.webp`, `matt-hero-1200.webp`, `matt-hero-800.webp`
- Gallery images use `sizes` attribute for responsive loading
- Below-fold images lazy load automatically

### Preconnect
- YouTube thumbnails preconnected in `layout.tsx`
- Remote images configured in `next.config.ts` for `img.youtube.com`

## Git Repository

https://github.com/aurioncompany/me26.git
