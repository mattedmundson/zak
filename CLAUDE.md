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
- Form validation with error messages on blur and submit
- Saves submissions to Supabase `aurion_contact` table (shared with Aurion sister site)
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

Uses Supabase (same instance as Aurion site). Contact form submissions go to `aurion_contact` table with fields:
- first_name, last_name, email, message
- subscribed_to_newsletter (boolean)
- source (set to 'Matt Edmundson Website')
- created_at

## Git Repository

https://github.com/aurioncompany/me26.git
