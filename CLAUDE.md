# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Zak Edmundson's nutrition website - a single-page site for a nutrition consultant specialising in IBS and the low FODMAP diet. Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4. Uses Tailwind Catalyst UI components.

**Live URL**: TBD (Vercel deployment)

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

## Site Sections

The single-page site includes these sections (defined in `src/components/nav-links.tsx`):
- **Home** - Hero with PillBadge, intro text, and CTA buttons
- **FODMAP** - Information about the FODMAP approach
- **Recipe Book** - Recipe book promotion/download
- **Consultations** - Consultation services offered
- **Approach** - Zak's methodology (Three Stages)
- **My Story** - Personal background
- **Instagram** - Social media integration
- **Contact** - Contact form

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
import { PillBadge } from '@/components/pill-badge'
```

Documentation: https://catalyst.tailwindui.com/docs

## Contact Form

The contact form (`src/components/contact-form.tsx`) handles:
- Form fields: First name, Last name, Email, Message (required)
- Form validation with error messages on blur and submit
- Spam protection via honeypot field and form load time check
- Saves submissions to EP CRM via Supabase (contacts, companies, activities tables)
- Sends confirmation email to submitter via Mailgun
- Sends notification email to site owner
- Newsletter subscription checkbox (Beehiiv integration) - only shows if user not already subscribed

### API Routes

- `POST /api/contact` - Submit contact form, save to DB, send emails
- `POST /api/newsletter/check` - Check if email is subscribed to Beehiiv newsletter
- `POST /api/subscribe` - Subscribe email to Beehiiv newsletter

**Note**: The Mailgun client uses lazy initialization to avoid build-time errors when environment variables aren't set.

## Email Templates

Email templates are in `src/lib/email-templates/`:
- `contact-confirmation.ts` - Sent to form submitter
- `contact-notification.ts` - Sent to site owner

Both use HTML tables for email client compatibility with responsive design.

## Environment Variables

Required in `.env.local` (and Vercel):
```
MAILGUN_API_KEY=           # Mailgun API key
MAILGUN_DOMAIN=            # Mailgun domain
MAILGUN_FROM_EMAIL=        # From email address
CONTACT_FORM_RECIPIENT=    # Email to receive form submissions

NEXT_PUBLIC_SUPABASE_URL=  # Supabase project URL
SUPABASE_SERVICE_ROLE_KEY= # Supabase service role key

BEEHIIV_API_TOKEN=         # Beehiiv API token
BEEHIIV_PUBLICATION_ID=    # Beehiiv publication ID
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

### Fonts
- Uses `next/font/google` for Inter and Playfair Display (self-hosted, no render-blocking)
- CSS variables `--font-inter` and `--font-playfair` defined in `layout.tsx`
- Referenced in `globals.css` via `var(--font-inter)` and `var(--font-playfair)`
- Headings use Playfair Display (serif), body uses Inter (sans-serif)

### Images
- All images use Next.js `<Image>` component for automatic optimization
- Hero image (`zak-xl.webp`) has `priority` prop for LCP optimization
- Responsive variants: `zak-xl.webp` (2000x2665), `zak-800.webp`, `zak-400.webp`
- Hero uses 3:4 aspect ratio
- Below-fold images lazy load automatically

### Preconnect
- YouTube thumbnails preconnected in `layout.tsx`
- Remote images configured in `next.config.ts` for `img.youtube.com`

## Deployment Notes

- **Case sensitivity**: Vercel uses Linux (case-sensitive). Ensure all file references match exact case.
- **Environment variables**: Must be configured in Vercel project settings for production.

## Git Repository

https://github.com/mattedmundson/zak.git
