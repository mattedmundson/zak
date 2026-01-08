# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page website built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4. Uses Tailwind Catalyst UI components.

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

## Catalyst Components

Import from `@/components/`:
```tsx
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Field, Label } from '@/components/fieldset'
```

Documentation: https://catalyst.tailwindui.com/docs
