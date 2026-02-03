# PortfolioSync Brand Style Guide

> **Synthwave Terminal Edition** — A retro-modern aesthetic blending 80s computing nostalgia with contemporary design.

---

## 🎨 Brand Identity

### Brand Name
**PortfolioSync** (one word, Pascal case)

### Tagline
*"Keep your portfolio in perfect sync"*

### Brand Personality
- **Retro-Futuristic**: CRT aesthetics meets modern functionality
- **Bold & Distinctive**: Chunky borders, neon accents, memorable visuals
- **Developer-Focused**: Terminal-inspired, code-friendly interface
- **Energetic**: Vibrant colors, subtle animations, dynamic feel

### Design Philosophy
The **Synthwave Terminal** aesthetic combines:
- **80s/90s retro computing** — CRT monitors, pixel art, terminal vibes
- **Synthwave/Vaporwave** — Neon colors, grid patterns, gradient skies
- **Modern minimalism** — Clean layouts, great UX, responsive design

---

## 🎭 Color Palette

### Primary Brand Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Hot Pink** | `#f72585` | Primary accent, CTAs, active states |
| **Electric Cyan** | `#4cc9f0` | Secondary accent, links, info states |
| **Neon Purple** | `#b537f2` | Gradients, special highlights |
| **Terminal Green** | `#39ff14` | Success states, "online" indicators |
| **Amber Glow** | `#f9a825` | Warnings, highlights |

### Background Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Void** | `#0a0a0f` | Deepest background, inputs |
| **Midnight** | `#1a1a2e` | Card backgrounds, sidebar |
| **Twilight** | `#16213e` | Elevated surfaces, hover states |
| **Deep Purple** | `#0f0f23` | Input backgrounds |

### Text Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Phosphor White** | `#e8e8e8` | Headings, important text |
| **CRT Gray** | `#a0a0a0` | Body text, descriptions |
| **Dim Gray** | `#666666` | Labels, timestamps, hints |
| **Ghost** | `#444455` | Disabled states |

### Semantic Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Success** | `#39ff14` | Success states, online indicators |
| **Warning** | `#f9a825` | Warnings, caution states |
| **Error** | `#ff3366` | Errors, destructive actions |
| **Info** | `#4cc9f0` | Information, neutral highlights |

### Border Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Border Retro** | `#2a2a4a` | Default borders, dividers |
| **Border Subtle** | `#1e1e3a` | Subtle separators |
| **Border Glow** | `#f72585` | Focus rings, active borders |

---

## ✍️ Typography

### Font Family
```css
/* Primary */
font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;

/* Monospace (for terminal elements) */
font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
```

### Type Scale

| Element | Size | Weight | Style |
|---------|------|--------|-------|
| Display | 3rem (48px) | 700 | Uppercase, tracking-wide |
| H1 | 2.25rem (36px) | 700 | Uppercase, tracking-wide |
| H2 | 1.5rem (24px) | 700 | Uppercase, tracking-wide |
| H3 | 1.25rem (20px) | 700 | Uppercase |
| H4 | 1.125rem (18px) | 600 | - |
| Body | 1rem (16px) | 400 | - |
| Body Small | 0.875rem (14px) | 400 | - |
| Caption | 0.75rem (12px) | 700 | Uppercase, tracking-widest |
| Label | 0.625rem (10px) | 700 | Uppercase, tracking-widest |

### Usage Guidelines
- **Headings**: Use uppercase with letter-spacing for that retro terminal feel
- **Labels**: Prefix with `//` or `>` for terminal aesthetic
- **Body text**: Use CRT Gray (#a0a0a0) for comfortable reading
- **Emphasis**: Use Hot Pink (#f72585) for important highlights

---

## 🔲 Border & Shadow System

### Border Widths
| Token | Value | Usage |
|-------|-------|-------|
| Thin | 2px | Inputs, badges |
| Standard | 3px | Cards, buttons, panels |

### Border Radius (Angular for retro feel)
| Token | Value | Usage |
|-------|-------|-------|
| None | 0px | Buttons, inputs (sharp corners) |
| Small | 2px | Slight rounding if needed |
| Medium | 4px | Subtle softening |

### Retro Shadows (Chunky offset, NO blur)
```css
/* Small */
--shadow-retro-sm: 2px 2px 0 rgba(0, 0, 0, 0.8);

/* Medium (default) */
--shadow-retro-md: 4px 4px 0 rgba(0, 0, 0, 0.8);

/* Large */
--shadow-retro-lg: 6px 6px 0 rgba(0, 0, 0, 0.8);

/* Colored shadows */
--shadow-retro-pink: 4px 4px 0 rgba(247, 37, 133, 0.6);
--shadow-retro-cyan: 4px 4px 0 rgba(76, 201, 240, 0.6);
```

### Neon Glow Effects
```css
/* Pink glow */
--shadow-neon-pink: 0 0 10px #f72585, 0 0 20px rgba(247, 37, 133, 0.4);

/* Cyan glow */
--shadow-neon-cyan: 0 0 10px #4cc9f0, 0 0 20px rgba(76, 201, 240, 0.4);

/* Green glow */
--shadow-neon-green: 0 0 10px #39ff14, 0 0 20px rgba(57, 255, 20, 0.4);
```

---

## 🎬 Animation & Motion

### Timing Functions
```css
--ease-retro: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Duration Scale
| Token | Duration | Usage |
|-------|----------|-------|
| Fast | 100ms | Hover, active states |
| Normal | 200ms | Standard transitions |
| Slow | 400ms | Complex animations |

### Key Animations

**CRT Flicker**
```css
@keyframes crt-flicker {
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.85; }
  94% { opacity: 1; }
}
```

**Glitch Text**
```css
@keyframes glitch {
  0%, 100% { text-shadow: 2px 0 #f72585, -2px 0 #4cc9f0; }
  20% { text-shadow: -2px 0 #f72585, 2px 0 #4cc9f0; }
  40% { text-shadow: 2px 0 #f72585, -2px 0 #4cc9f0; }
}
```

**Neon Pulse**
```css
@keyframes neon-pulse {
  0%, 100% { box-shadow: 0 0 5px currentColor, 0 0 10px currentColor; }
  50% { box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
}
```

**Terminal Blink**
```css
@keyframes terminal-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

---

## 🧩 Component Patterns

### Buttons

#### Primary Button (Hot Pink)
```jsx
<button className="
  inline-flex items-center justify-center gap-2
  px-5 py-2.5
  bg-[#f72585] border-3 border-[#f72585]
  text-white font-bold uppercase tracking-wider text-sm
  shadow-[4px_4px_0_rgba(0,0,0,0.8)]
  hover:shadow-[4px_4px_0_rgba(0,0,0,0.8),0_0_15px_rgba(247,37,133,0.5)]
  hover:brightness-110
  active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
  transition-all duration-100
">
  LAUNCH
</button>
```

#### Secondary Button (Cyan Outline)
```jsx
<button className="
  inline-flex items-center justify-center gap-2
  px-5 py-2.5
  bg-transparent border-3 border-[#4cc9f0]
  text-[#4cc9f0] font-bold uppercase tracking-wider text-sm
  shadow-[3px_3px_0_rgba(0,0,0,0.8)]
  hover:bg-[#4cc9f0] hover:text-[#0a0a0f]
  hover:shadow-[3px_3px_0_rgba(0,0,0,0.8),0_0_15px_rgba(76,201,240,0.5)]
  active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
  transition-all duration-100
">
  CONNECT
</button>
```

#### Ghost Button
```jsx
<button className="
  inline-flex items-center justify-center gap-2
  px-5 py-2.5
  bg-transparent border-3 border-[#2a2a4a]
  text-[#a0a0a0] font-bold uppercase tracking-wider text-sm
  hover:border-[#e8e8e8] hover:text-[#e8e8e8]
  transition-all duration-100
">
  CANCEL
</button>
```

#### Danger Button
```jsx
<button className="
  inline-flex items-center justify-center gap-2
  px-5 py-2.5
  bg-transparent border-3 border-[#ff3366]
  text-[#ff3366] font-bold uppercase tracking-wider text-sm
  shadow-[3px_3px_0_rgba(0,0,0,0.8)]
  hover:bg-[#ff3366] hover:text-white
  hover:shadow-[0_0_15px_rgba(255,51,102,0.5)]
  transition-all duration-100
">
  DELETE
</button>
```

### Cards

#### Standard Card
```jsx
<div className="
  bg-[#1a1a2e]
  border-3 border-[#2a2a4a]
  shadow-[4px_4px_0_rgba(0,0,0,0.8)]
  p-6
">
  {/* Card content */}
</div>
```

#### Interactive Card
```jsx
<div className="
  bg-[#1a1a2e]
  border-3 border-[#2a2a4a]
  shadow-[4px_4px_0_rgba(0,0,0,0.8)]
  p-6
  cursor-pointer
  hover:border-[#f72585]
  hover:shadow-[4px_4px_0_rgba(247,37,133,0.6)]
  hover:-translate-x-0.5 hover:-translate-y-0.5
  transition-all duration-100
">
  {/* Card content */}
</div>
```

#### Accent Card (with glow)
```jsx
<div className="
  bg-[#1a1a2e]
  border-3 border-[#f72585]
  shadow-[4px_4px_0_rgba(247,37,133,0.6),0_0_15px_rgba(247,37,133,0.3)]
  p-6
  relative
">
  {/* Top gradient line */}
  <div className="absolute -top-[3px] left-0 right-0 h-[3px] bg-gradient-to-r from-[#f72585] via-[#4cc9f0] to-[#f72585]" />
  {/* Card content */}
</div>
```

### Inputs

#### Text Input
```jsx
<input
  type="text"
  className="
    w-full px-4 py-3
    bg-[#0f0f23]
    border-2 border-[#2a2a4a]
    text-[#e8e8e8]
    placeholder:text-[#666666] placeholder:italic
    focus:outline-none
    focus:border-[#4cc9f0]
    focus:shadow-[0_0_10px_rgba(76,201,240,0.4)]
    transition-all duration-100
  "
  placeholder="Enter command..."
/>
```

#### Input Label
```jsx
<label className="block text-xs font-bold text-[#a0a0a0] mb-2 uppercase tracking-widest">
  <span className="text-[#f72585] mr-1">&gt;</span>
  Label Text
</label>
```

### Badges

```jsx
// Success
<span className="
  inline-flex items-center gap-1.5
  px-3 py-1
  bg-[rgba(57,255,20,0.15)]
  border-2 border-[#39ff14]
  text-[#39ff14]
  text-[11px] font-bold uppercase tracking-widest
">
  ● ONLINE
</span>

// Error
<span className="
  inline-flex items-center gap-1.5
  px-3 py-1
  bg-[rgba(255,51,102,0.15)]
  border-2 border-[#ff3366]
  text-[#ff3366]
  text-[11px] font-bold uppercase tracking-widest
">
  ⚠ FAILED
</span>
```

### Navigation Items

#### Active State
```jsx
<a className="
  flex items-center gap-3
  px-3 py-3
  text-sm font-medium uppercase tracking-wide
  bg-[rgba(247,37,133,0.1)]
  text-[#f72585]
  border-2 border-[#f72585]
  shadow-[0_0_10px_rgba(247,37,133,0.2)]
">
  <Icon />
  Dashboard
</a>
```

#### Inactive State
```jsx
<a className="
  flex items-center gap-3
  px-3 py-3
  text-sm font-medium uppercase tracking-wide
  text-[#a0a0a0]
  border-2 border-transparent
  hover:text-[#e8e8e8]
  hover:bg-[#16213e]
  hover:border-[#2a2a4a]
  transition-all duration-100
">
  <Icon />
  Settings
</a>
```

---

## 🖼️ Special Effects

### Scanline Overlay
Apply to containers for that CRT monitor feel:
```css
.scanlines::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}
```

### Grid Pattern Background
```css
.grid-pattern {
  background-image: 
    linear-gradient(#2a2a4a 1px, transparent 1px),
    linear-gradient(90deg, #2a2a4a 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.05;
}
```

### Section Headers
```jsx
<div className="text-xs font-bold text-[#666666] uppercase tracking-widest mb-4 flex items-center gap-2">
  <span className="text-[#f72585]">//</span>
  Section Title
</div>
```

### System Status Indicator
```jsx
<div className="flex items-center gap-2 text-xs">
  <span className="w-2 h-2 bg-[#39ff14] animate-pulse shadow-[0_0_6px_rgba(57,255,20,0.6)]" />
  <span className="text-[#39ff14] font-mono uppercase tracking-wider">System Online</span>
</div>
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

---

## 🖼️ Iconography

### Icon Style
- Use **stroke icons** with square/miter linecaps for angular feel
- Stroke width: 1.5 - 2
- Size: 20px (w-5 h-5) for inline, 24px (w-6 h-6) for standalone
- Color: inherit from text color

### Icon Library
Use [Heroicons](https://heroicons.com/) with modified stroke linecaps:
```jsx
<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="square" strokeLinejoin="miter" d="..." />
</svg>
```

---

## ✅ Do's and Don'ts

### ✅ Do
- Use **chunky 3px borders** with offset shadows
- Apply **neon glow** effects on hover/focus states
- Use **uppercase text** with letter-spacing for headings and labels
- Add **terminal prefixes** (`>`, `//`, `$`) for retro feel
- Keep animations **snappy** (100-200ms)
- Use the **Hot Pink/Cyan** color combination for emphasis

### ❌ Don't
- Don't use blurry, soft shadows (use chunky offset shadows)
- Don't use rounded corners on buttons (keep them angular)
- Don't use generic slate/gray colors (use the synthwave palette)
- Don't forget the neon glow on interactive elements
- Don't make text lowercase for headings/labels
- Don't use boring gradients (use solid colors with glow effects)

---

## 🚀 Quick Reference

### Key CSS Variables
```css
/* Backgrounds */
--color-void: #0a0a0f;
--color-midnight: #1a1a2e;
--color-twilight: #16213e;

/* Accents */
--color-hot-pink: #f72585;
--color-electric-cyan: #4cc9f0;
--color-terminal-green: #39ff14;

/* Text */
--color-phosphor-white: #e8e8e8;
--color-crt-gray: #a0a0a0;
--color-dim-gray: #666666;

/* Borders */
--color-border-retro: #2a2a4a;
```

### Standard Classes
**Primary Button:**
`bg-[#f72585] border-3 border-[#f72585] text-white font-bold uppercase tracking-wider shadow-[4px_4px_0_rgba(0,0,0,0.8)]`

**Card:**
`bg-[#1a1a2e] border-3 border-[#2a2a4a] shadow-[4px_4px_0_rgba(0,0,0,0.8)] p-6`

**Input:**
`bg-[#0f0f23] border-2 border-[#2a2a4a] text-[#e8e8e8] focus:border-[#4cc9f0] focus:shadow-[0_0_10px_rgba(76,201,240,0.4)]`

**Label:**
`text-xs font-bold text-[#a0a0a0] uppercase tracking-widest`

---

## 📁 File Structure

```
client/src/
├── assets/
│   ├── logo.svg          # Main logo
│   └── favicon.svg       # Browser favicon
├── index.css             # Global styles & design tokens
├── components/
│   ├── ui/               # Reusable UI components
│   │   ├── Button.jsx    # Retro arcade buttons
│   │   ├── Card.jsx      # Chunky bordered cards
│   │   ├── Input.jsx     # Terminal-style inputs
│   │   ├── Badge.jsx     # Pixel-art badges
│   │   ├── Select.jsx    # Retro dropdowns
│   │   └── Skeleton.jsx  # Scanline loading states
│   └── Layout.jsx        # Synthwave sidebar layout
└── pages/
    └── ...               # Page components
```

---

*This style guide represents the Synthwave Terminal design system. Keep it rad! 🌆*
