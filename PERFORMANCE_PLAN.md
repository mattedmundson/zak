# Mobile Performance Improvement Plan

**Current Score: 71 → Target: 90+**

Based on the PageSpeed Insights report, here are the key issues and the plan to fix them.

---

## Summary of Issues

| Metric | Current | Issue |
|--------|---------|-------|
| FCP | 3.0s | Render-blocking fonts and CSS |
| LCP | 5.0s | Large hero image (342KB), no priority hints, element render delay |
| Speed Index | 5.9s | Slow progressive rendering |
| TBT | 10ms | Good |
| CLS | 0 | Good |

---

## Priority 1: Fix LCP (Largest Impact)

### 1.1 Hero Image Optimization

**Problem**: The hero image (`matt-hero.webp`) is 342KB and serves 2000x2665px to mobile devices that only display 412x618px.

**Solution**:
- Use Next.js `<Image>` component with `priority` prop for above-fold images
- Use responsive `sizes` attribute to serve appropriately sized images
- Add `fetchpriority="high"` for the hero image

**Files to modify**: `src/app/page.tsx`

### 1.2 Add preconnect for External Resources

**Problem**: No preconnect hints for Google Fonts or YouTube thumbnails.

**Solution**: Add preconnect links in layout.tsx:
```tsx
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link rel="preconnect" href="https://img.youtube.com" />
```

**Files to modify**: `src/app/layout.tsx`

---

## Priority 2: Fix Render-Blocking Resources (Est. 1,760ms savings)

### 2.1 Optimize Font Loading

**Problem**: CSS `@import` for Google Fonts blocks rendering. Both fonts load all weights.

**Solution**:
- Use `next/font/google` for automatic font optimization
- This handles preload, font-display, and subsetting automatically
- Only load the weights actually used (Inter: 400, 500, 600, 700; Playfair: 700)

**Files to modify**:
- `src/app/layout.tsx` - add font configuration
- `src/app/globals.css` - remove @import statements, use CSS variables

### 2.2 CSS Delivery

**Problem**: Main CSS chunk (27.5KB) is render-blocking.

**Solution**: Next.js handles CSS optimization automatically with `next/font`. No additional action needed beyond font optimization.

---

## Priority 3: Image Optimization (Est. 1,128KB savings)

### 3.1 Use Next.js Image Component

**Problem**: All images use plain `<img>` tags with no optimization.

**Solution**: Replace `<img>` with `<Image>` from `next/image`:
- Automatic WebP/AVIF conversion
- Responsive `srcset` generation
- Lazy loading by default (except `priority` images)
- Prevents layout shift with width/height

**Images to convert**:

| Image | Current Size | Action |
|-------|--------------|--------|
| matt-hero.webp | 342KB | Use `priority`, responsive sizes |
| Woodworker-*.webp | 36-182KB each | Lazy load, responsive sizes |
| Speaker-*.webp | 46-59KB each | Lazy load, responsive sizes |
| family-*.webp | 49-299KB each | Lazy load, responsive sizes |
| Podcast images | 13-23KB each | Lazy load |

**Files to modify**: `src/app/page.tsx`, `src/components/guest-appearances.tsx`

### 3.2 Configure Next.js Image Domains

**Problem**: External images from `img.youtube.com` need configuration.

**Solution**: Add to `next.config.ts`:
```ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'img.youtube.com',
    },
  ],
},
```

**Files to modify**: `next.config.ts`

---

## Priority 4: Below-the-Fold Optimization

### 4.1 Add Native Lazy Loading

**Problem**: Carousel images (woodworker, speaker, family) load eagerly.

**Solution**: Next.js `<Image>` component lazy loads by default. Just ensure `priority` is NOT set on below-fold images.

### 4.2 Guest Appearances Thumbnails

**Problem**: 14 podcast thumbnails load without lazy loading.

**Solution**: Replace `<img>` with `<Image>` in `guest-appearances.tsx`. They'll lazy load automatically.

---

## Implementation Checklist

### Phase 1: Quick Wins (High Impact, Low Effort)
- [ ] Add preconnect hints to layout.tsx
- [ ] Switch to `next/font/google` for font loading
- [ ] Remove CSS @import statements

### Phase 2: Hero Image
- [ ] Convert hero image to Next.js Image component
- [ ] Add `priority` prop
- [ ] Configure responsive `sizes`

### Phase 3: All Other Images
- [ ] Configure `next.config.ts` for remote images
- [ ] Convert all gallery images to Image component
- [ ] Convert guest appearances thumbnails to Image component
- [ ] Convert logo images to Image component (or keep as `<img>` for small SVGs)

### Phase 4: Verification
- [ ] Run local build and test
- [ ] Deploy to Vercel
- [ ] Re-run PageSpeed Insights
- [ ] Verify LCP, FCP, and Speed Index improvements

---

## Expected Results

| Metric | Before | After (Est.) |
|--------|--------|--------------|
| FCP | 3.0s | ~1.5s |
| LCP | 5.0s | ~2.5s |
| Speed Index | 5.9s | ~3.0s |
| Performance Score | 71 | 90+ |

---

## Technical Notes

### Next.js Image Component Benefits
- Automatic responsive images with `srcset`
- Automatic WebP/AVIF format selection
- Lazy loading by default
- Prevents Cumulative Layout Shift (CLS)
- Image optimization at build time

### Font Loading with next/font
- Zero layout shift
- Self-hosted fonts (no external requests)
- Automatic subsetting
- Preload critical fonts
- CSS variables for Tailwind integration

---

## Files Changed Summary

1. **src/app/layout.tsx** - Fonts + preconnect
2. **src/app/globals.css** - Remove @import, use CSS variables
3. **src/app/page.tsx** - Image components
4. **src/components/guest-appearances.tsx** - Image components
5. **next.config.ts** - Remote image patterns
