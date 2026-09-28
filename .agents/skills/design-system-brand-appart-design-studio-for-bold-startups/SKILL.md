---
name: design-system-brand-appart-design-studio-for-bold-startups
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

# Brand Appart – Design System & UI Guidance

## 1. Design Intent
Deliver an implementation-ready, token-driven UI framework for Brand Appart that ensures high visual precision, WCAG 2.2 AA accessibility, and predictable component states across the dashboard web app interface.

---
  
## 2. Context & Goals

- **Brand**: Brand Appart – Design studio for bold startups
- **URL**: [https://www.brandappart.com/](https://www.brandappart.com/)
- **Target Audience**: Authenticated users, operators, and startup teams
- **Product Surface**: Dashboard web application
- **Primary Objective**: Establish strict visual and structural rules so design and engineering teams ship accessible, highly functional, and performant interfaces without visual fragmentation.

---

## 3. Design Tokens & Foundations

All UI components **must** consume semantic tokens. Hardcoded hex codes, arbitrary spacing numbers, or inline font overrides are strictly prohibited.

### 3.1 Color System & Semantic Tokens

```yaml
Primitive Palette:
  color.primitive.black: "#000000"
  color.primitive.offwhite: "#f2f0e7"
  color.primitive.white: "#ffffff"
  color.primitive.warm-white: "#fbf9ef"
  color.primitive.dark-charcoal: "#171412"
  color.primitive.neutral-grey: "#8e827c"
  color.primitive.focus-blue: "#4f46e5"
  color.primitive.error-red: "#ef4444"

Semantic Tokens:
  color.surface.base: "var(--color-primitive-black)"          # Primary background (#000000)
  color.surface.strong: "var(--color-primitive-offwhite)"      # Secondary containers & card backgrounds (#f2f0e7)
  color.surface.subtle: "#111111"                               # Sub-elevated surfaces
  color.surface.disabled: "#222222"                             # Disabled background

  color.text.primary: "var(--color-primitive-white)"           # Main body & headers (#ffffff)
  color.text.secondary: "var(--color-primitive-warm-white)"   # Subheaders & secondary copy (#fbf9ef)
  color.text.tertiary: "var(--color-primitive-neutral-grey)"   # Metadata, captions, timestamps (#8e827c)
  color.text.inverse: "var(--color-primitive-dark-charcoal)"   # Text inside strong surface (#171412)
  color.text.disabled: "#666666"                               # Non-interactive text

  color.border.default: "rgba(255, 255, 255, 0.15)"
  color.border.strong: "rgba(255, 255, 255, 0.30)"
  color.border.focus: "var(--color-primitive-focus-blue)"
  color.border.error: "var(--color-primitive-error-red)"
```

### 3.2 Typography Tokens

- **Font Family Primary**: `PP Neue Montreal`
- **Font Stack**: `PP Neue Montreal, Arial, sans-serif`
- **Base Size**: `17.0667px`
- **Base Weight**: `500`
- **Base Line Height**: `20px`

```yaml
Typography Scale:
  font.size.xs: 11.95px   # Labels, badges, micro-copy
  font.size.sm: 13.65px   # Secondary button labels, dense table data
  font.size.md: 14.93px   # Standard input text, card subtitles
  font.size.lg: 15.36px   # Navigation links, list items
  font.size.xl: 17.07px   # Base body copy, section headers
  font.size.2xl: 27.31px  # Card title, modal headers
  font.size.3xl: 29.87px  # Primary page section titles
  font.size.4xl: 47.79px  # Display headlines
```

### 3.3 Spacing Scale

```yaml
Spacing Tokens:
  space.1: 4.27px   # Micro-gap (badges, icons inside buttons)
  space.2: 8.53px   # Tight padding, field gap
  space.3: 10.92px  # Standard element inline gap
  space.4: 11.52px  # Vertical container gap
  space.5: 11.95px  # Default button vertical padding
  space.6: 12.29px  # Card inner padding step
  space.7: 14.93px  # Component margin step
  space.8: 17.07px  # Major layout grid gap
```

### 3.4 Radius, Shadow & Motion Tokens

```yaml
Border Radius Tokens:
  radius.xs: 6.31px   # Tooltips, small badges
  radius.sm: 7.68px   # Input fields, dropdown menus
  radius.md: 10.24px  # Standard buttons, dialogs
  radius.lg: 12.8px   # Cards, content panels
  radius.xl: 50px     # Pill buttons, avatar containers
  radius.2xl: 80px    # Full hero pill shapes

Motion Duration Tokens:
  motion.duration.instant: 320ms  # Hover highlights, simple toggles
  motion.duration.fast: 420ms     # Dropdown expand, accordion slide
  motion.duration.normal: 640ms   # Modal backdrop, page transitions
  motion.duration.slow: 820ms     # Heavy data surface transitions
  motion.easing.default: cubic-bezier(0.16, 1, 0.3, 1)
```

---

## 4. Component-Level Rules

### 4.1 Page Component Density Standards
Target dashboard surface density specs:
- **Cards**: 146 instances max per view (virtualized grid when count > 24)
- **Links**: 34 instances max per view
- **Navigation Containers**: 2 active layout bars (Primary Dock + Top Navigation Header)
- **Primary Buttons**: 1 dominant call-to-action per section viewport
- **Search/Filter Inputs**: 1 global control block per dataset view
- **Lists**: 1 active primary list container per operational dashboard view

---

### 4.2 Component Family Specifications

All interactive components **must** implement explicit handling for all 7 required states:
`default`, `hover`, `focus-visible`, `active`, `disabled`, `loading`, `error`.

#### 4.2.1 Button Component (Action Core)

- **Anatomy**: Left Icon (optional), Label Text, Right Icon / Loading Spinner (optional).
- **Variants**:
  - `Primary`: Surface = `color.surface.strong`, Text = `color.text.inverse`.
  - `Secondary`: Surface = `transparent`, Border = `color.border.default`, Text = `color.text.primary`.
  - `Ghost`: Surface = `transparent`, Text = `color.text.secondary`.

- **State Matrix**:
  - `default`: Background `color.surface.strong`, text `color.text.inverse`, opacity `1.0`.
  - `hover`: Background `color.surface.strong` at `92%` brightness, transform `scale(1.02)`.
  - `focus-visible`: Outline `2px solid color.border.focus`, offset `2px`.
  - `active`: Transform `scale(0.98)`, transition duration `motion.duration.instant`.
  - `disabled`: Background `color.surface.disabled`, text `color.text.disabled`, cursor `not-allowed`.
  - `loading`: Text hidden or opacity `0.4`, spinner visible with `aria-busy="true"`.
  - `error`: Border `color.border.error`, shake animation `300ms`.

- **Input Modality Rules**:
  - **Keyboard**: Activated via `Enter` or `Space`. Focus indicator must appear **only** on keyboard navigation (`:focus-visible`).
  - **Pointer**: Hover transition duration = `motion.duration.instant`.
  - **Touch**: Minimum target size = `44px × 44px`.

---

#### 4.2.2 Input Component (Filter & Search Control)

- **Anatomy**: Label, Input Container, Placeholder / Value Text, Clear/Search Icon, Helper / Error Text.

- **State Matrix**:
  - `default`: Background = `color.surface.subtle`, Border = `color.border.default`, Text = `color.text.primary`.
  - `hover`: Border = `color.border.strong`.
  - `focus-visible`: Border = `color.border.focus`, Shadow ring = `0 0 0 2px color.border.focus`.
  - `active`: Border = `color.border.focus`.
  - `disabled`: Background = `color.surface.disabled`, Text = `color.text.disabled`, pointer-events `none`.
  - `loading`: Right-aligned animated spinner inside container.
  - `error`: Border = `color.border.error`, error text displayed below in `color.border.error` with `role="alert"`.

- **Edge Cases & Overflow**:
  - Long inputs **must** clip text gracefully with ellipsis or horizontal scroll on focus.
  - Clear button appears automatically when value length > 0.

---

#### 4.2.3 Dashboard Showcase Card Component

- **Anatomy**: Header Image/Thumbnail, Media Badge, Card Title, Metric Subtitle, Context Action Link.

- **State Matrix**:
  - `default`: Surface = `color.surface.subtle`, Border = `color.border.default`, Radius = `radius.lg`.
  - `hover`: Border = `color.border.strong`, transform `translateY(-3px)`, transition `motion.duration.fast`.
  - `focus-visible`: Outer ring = `2px solid color.border.focus`.
  - `active`: Transform `translateY(-1px)`.
  - `disabled`: Opacity `0.45`, grayscale filter `80%`.
  - `loading`: Skeleton shimmer pulse over image & text blocks.
  - `error`: Fallback icon container displayed with retry trigger.

- **Responsive Behavior**:
  - Grid auto-fits from 1 column (`< 640px`) to 3 columns (`> 1280px`).
  - Image ratio locked to `16:9` with `object-fit: cover`.

---

## 5. Accessibility Requirements (WCAG 2.2 AA)

### 5.1 Acceptance Criteria
- **Contrast Ratios (Pass/Fail)**:
  - Normal text (`< 24px` or `< 19px bold`): Minimum **4.5:1** contrast against surface background.
  - Large text (`≥ 24px`): Minimum **3.0:1** contrast.
  - Non-text UI controls & borders: Minimum **3.0:1** contrast.
- **Focus Indicators**:
  - All interactive elements **must** display a high-contrast focus indicator (`2px` solid focus ring, minimum 3:1 contrast against adjacent background).
  - Native browser focus outlines **must not** be removed without providing a `:focus-visible` replacement.
- **Keyboard Traps**:
  - Users **must** be able to navigate into and out of all cards, modals, and input fields using standard `Tab` and `Shift+Tab`.
- **Screen Reader Support**:
  - Dynamic content updates **must** use `aria-live="polite"` or `aria-live="assertive"`.
  - Input error states **must** programmatically associate error messages using `aria-invalid="true"` and `aria-describedby="[error-id]"`.

---

## 6. Writing Tone & Copy Standards

- **Tone Keywords**: Concise, confident, implementation-focused.
- **Rules**:
  - Use active verb-first labels (`Book Call`, `Filter Results`, `Export Deck`).
  - Avoid vague terms like "Click Here", "Submit", or "Go".

| Context | Recommended (Pass) | Prohibited (Fail) |
| :--- | :--- | :--- |
| **Call to Action** | `Book Discovery Call` | `Click Here to Learn More` |
| **Error Message** | `Enter a valid business email address.` | `Invalid input.` |
| **Empty State** | `No matching projects found. Try adjusting your search keywords.` | `Nothing here.` |
| **Loading State** | `Loading performance metrics...` | `Please wait...` |

---

## 7. Anti-Patterns & Prohibited Practices

1. **No Raw Color Hardcoding**: Do **not** use `#000000` or `#FFFFFF` directly in CSS components; consume `var(--color-surface-base)` or `var(--color-text-primary)`.
2. **No One-Off Spacing**: Do **not** use pixel values like `padding: 13px 19px`. Use spacing tokens `space.5` and `space.8`.
3. **No Mouse-Only Interactions**: Do **not** hide actionable controls behind hover states without keyboard focus alternatives.
4. **No Low-Contrast Text**: Do **not** render `color.text.tertiary` on dark sub-surfaces if contrast drops below 4.5:1.
5. **No Ambiguous Buttons**: Do **not** use non-descriptive icon-only buttons without an `aria-label`.

---

## 8. Implementation QA Checklist

- [ ] All colors derive from semantic token CSS variables.
- [ ] Typography scale conforms strictly to `PP Neue Montreal` token definitions.
- [ ] Every button and input defines all 7 required states (`default` through `error`).
- [ ] Keyboard navigation (`Tab`, `Shift+Tab`, `Space`, `Enter`) functions across all components.
- [ ] Focus outlines are clearly visible with `:focus-visible` and meet 3:1 contrast.
- [ ] All interactive touch targets measure at least `44px × 44px`.
- [ ] Screen readers properly announce dynamic updates, loading states, and error alerts.
- [ ] Production build passes without TypeScript errors or visual regressions.
