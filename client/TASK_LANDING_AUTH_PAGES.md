# Task: Landing Page & Authentication Pages

> **Assigned to**: Frontend Developer  
> **Priority**: High  
> **Estimated Time**: 4-6 hours  
> **Dependencies**: Brand Style Guide (`BRAND_STYLE_GUIDE.md`) - **Synthwave Terminal Edition**

---

## 📋 Overview

Create a stunning landing page and authentication flow for PortfolioSync using the **Synthwave Terminal** design system. These pages should showcase our unique retro-modern identity and provide a memorable onboarding experience.

**Important**: Before starting, review the `BRAND_STYLE_GUIDE.md` file and explore the `/brand` route in the dev server to see all available components and patterns.

---

## 🎯 Pages to Create

### 1. Landing Page (`/landing` or separate entry)
### 2. Login Page (`/login`)
### 3. Register Page (`/register`)
### 4. Forgot Password Page (`/forgot-password`)

---

## 📄 Page Specifications

### 1. Landing Page

**File**: `src/pages/Landing.jsx`

A bold, visually striking page that explains what PortfolioSync does with our unique synthwave aesthetic.

#### Required Sections:

**Hero Section**
- Large headline with **glitch text effect**: "Keep Your Portfolio in Perfect Sync"
- Use `text-gradient-synthwave` or alternating Hot Pink/Cyan colors
- Subheadline in CRT Gray: "Automatically sync your GitHub repositories with your portfolio site."
- Primary CTA button (Hot Pink): "GET STARTED FREE" → links to `/register`
- Secondary CTA (Cyan outline): "LEARN MORE" → scrolls to features
- Background: Grid pattern with subtle neon glow effects
- Optional: Retro-styled dashboard preview with scanline overlay

**Features Section**
- 3-4 feature cards using the retro Card component with neon icons:
  1. **AUTO-SYNC** - Automatically detect changes in your GitHub repos
  2. **SMART UPDATES** - Only sync what's changed, not everything
  3. **PORTFOLIO READY** - Format project data for your portfolio site
  4. **REAL-TIME SCANNING** - See changes as they happen
- Use chunky bordered cards with hover glow effects
- Icons in neon colors (Terminal Green, Electric Cyan, Hot Pink)

**How It Works Section**
- 3-step visual process with connecting lines:
  1. Connect your GitHub account
  2. Select repositories to track
  3. Auto-sync to your portfolio
- Use numbered badges with neon glow
- Terminal-style step labels: `// STEP 01`, `// STEP 02`, etc.

**CTA Section**
- Final call-to-action with synthwave gradient background
- "Ready to sync your portfolio?"
- Large "GET STARTED" button with neon pulse animation

**Footer**
- PortfolioSync logo with Hot Pink accent
- Navigation links in CRT Gray
- Terminal-style copyright: `© 2026 // All systems nominal`

#### Design Notes:
- Use chunky 3px borders, NOT rounded corners
- Apply neon glow effects on hover states
- Add scanline overlay to hero section
- Use grid pattern background sparingly
- Keep the Hot Pink/Cyan color combination prominent

---

### 2. Login Page

**File**: `src/pages/Login.jsx`

A retro-terminal inspired login form.

#### Layout:
- Centered card design with chunky borders
- Optional: Split layout with retro grid/synthwave background on left

#### Form Fields:
```jsx
<Input label="EMAIL" type="email" placeholder="user@system.net" />
<Input label="ACCESS CODE" type="password" placeholder="••••••••" />
```

#### Elements:
- PortfolioSync logo with Hot Pink accent at top
- "WELCOME BACK" heading (uppercase, tracking-wide)
- Subheading: `// System access required`
- Email input with terminal-style label
- Password input
- "Remember me" checkbox (optional)
- "Forgot access code?" link in Electric Cyan → `/forgot-password`
- Primary "SIGN IN" button (Hot Pink, full width)
- Retro divider with text: `// OR CONTINUE WITH`
- GitHub OAuth button (Cyan outline style)
- "Don't have an account? REGISTER" link → `/register`

#### Sample Structure:
```jsx
<div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
  {/* Grid pattern background */}
  <div className="absolute inset-0 opacity-5 bg-[linear-gradient(#2a2a4a_1px,transparent_1px),linear-gradient(90deg,#2a2a4a_1px,transparent_1px)] bg-[size:50px_50px]" />
  
  <Card variant="accent" glow className="w-full max-w-md relative">
    {/* Logo */}
    {/* Form */}
    {/* Social login */}
    {/* Register link */}
  </Card>
</div>
```

---

### 3. Register Page

**File**: `src/pages/Register.jsx`

Similar to login but with additional fields and registration-specific messaging.

#### Form Fields:
- Full Name
- Email
- Password
- Confirm Password

#### Elements:
- PortfolioSync logo with Hot Pink accent
- "CREATE ACCOUNT" heading
- Subheading: `// Initialize new user profile`
- Form fields with terminal-style labels (`> FULL NAME`, etc.)
- Terms & conditions checkbox with neon focus state
- Primary "CREATE ACCOUNT" button
- Divider: `// OR SIGN UP WITH`
- GitHub OAuth button (Cyan outline)
- "Already have an account? SIGN IN" link → `/login`

#### Validation (visual only for now):
- Show error states using the `error` prop with `⚠` prefix
- Password strength indicator with neon color coding (optional)
- Matching password validation

---

### 4. Forgot Password Page

**File**: `src/pages/ForgotPassword.jsx`

Simple password reset request form with terminal aesthetic.

#### Elements:
- Back to login link with `←` arrow: "← BACK TO LOGIN"
- "RESET ACCESS CODE" heading
- Description: `// Enter your email and we'll send you a reset link`
- Email input
- "SEND RESET LINK" button
- Success state: Show confirmation in a Terminal Green bordered card

---

## 🧩 Components to Use

Import from the UI library:

```jsx
import { Button, Card, Input, Badge } from '../components/ui';
```

### New Components to Create (Optional)

**`src/components/ui/Checkbox.jsx`**
```jsx
// Retro checkbox with chunky border and neon check
<label className="flex items-center gap-3 cursor-pointer">
  <div className="w-5 h-5 border-2 border-[#2a2a4a] bg-[#0a0a0f] flex items-center justify-center
    peer-checked:border-[#f72585] peer-checked:bg-[rgba(247,37,133,0.1)]">
    {checked && <span className="text-[#f72585] text-xs">✓</span>}
  </div>
  <span className="text-sm text-[#a0a0a0]">Remember me</span>
</label>
```

**`src/components/ui/Divider.jsx`**
```jsx
// Retro divider with terminal-style text
<div className="flex items-center gap-4 my-6">
  <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#2a2a4a] to-transparent" />
  <span className="text-xs text-[#666666] uppercase tracking-widest font-mono">
    // Or continue with
  </span>
  <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#2a2a4a] to-transparent" />
</div>
```

**`src/components/SocialButton.jsx`**
```jsx
// GitHub OAuth button with Cyan outline style
<Button variant="secondary" fullWidth icon={<GitHubIcon />}>
  CONTINUE WITH GITHUB
</Button>
```

---

## 🎨 Design Assets Needed

### Icons (use Heroicons with square linecaps)
- Sync/refresh icon for features
- Shield/security icon
- Lightning bolt for speed
- Code brackets for developer theme
- GitHub logo for OAuth

### Background Elements
- **Grid pattern**: Subtle 50px grid lines at 5% opacity
- **Neon glow spots**: Radial gradients of Hot Pink and Cyan
- **Scanline overlay**: For hero section and featured cards

### Example Synthwave Background:
```css
.hero-synthwave {
  background: 
    radial-gradient(ellipse at top, rgba(247, 37, 133, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(76, 201, 240, 0.08) 0%, transparent 40%),
    linear-gradient(#2a2a4a 1px, transparent 1px),
    linear-gradient(90deg, #2a2a4a 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 50px 50px, 50px 50px;
  background-color: #0a0a0f;
}
```

---

## 📱 Responsive Requirements

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<640px) | Stack all content, full-width cards, reduce padding |
| Tablet (640-1024px) | 2-column features grid |
| Desktop (>1024px) | Full layout, 3-4 column features, split auth layouts |

---

## 🔗 Routing Updates

Add these routes to `App.jsx`:

```jsx
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// In Routes:
<Route path="/landing" element={<Landing />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
```

**Note**: The landing page should NOT use the main `Layout` component (no sidebar). Create a simple wrapper or use no layout.

---

## ✅ Acceptance Criteria

### Landing Page
- [ ] Hero section with glitch text effect and gradient headline
- [ ] At least 3 feature cards with neon-bordered icons
- [ ] How it works section with terminal-style step labels
- [ ] Responsive on all screen sizes
- [ ] Smooth scroll to sections
- [ ] Neon hover effects on interactive elements
- [ ] Follows Synthwave Terminal design (Hot Pink/Cyan accents, chunky borders)

### Auth Pages
- [ ] Login page with terminal-styled form
- [ ] Register page with all required fields
- [ ] Forgot password page
- [ ] All forms use retro UI components (chunky borders, neon focus)
- [ ] Error states visible with `⚠` prefix
- [ ] GitHub OAuth button present (Cyan outline style)
- [ ] Links between auth pages work
- [ ] Responsive design
- [ ] Accessible (proper labels, focus states with neon glow)

### Code Quality
- [ ] Uses existing UI components from `components/ui`
- [ ] Follows Synthwave Terminal design system
- [ ] No console errors
- [ ] Build passes (`npm run build`)

---

## 🚫 Out of Scope (For Now)

- Actual authentication logic (API calls)
- OAuth integration
- Form submission handling
- Email sending functionality
- Protected route logic

*These will be implemented during backend integration.*

---

## 📚 Resources

- **Brand Guide**: `/client/BRAND_STYLE_GUIDE.md` (Synthwave Terminal Edition)
- **Live Components**: Run `npm run dev` → visit `/brand`
- **UI Components**: `/client/src/components/ui/`
- **Icons**: [Heroicons](https://heroicons.com/) (use square linecaps)
- **Font**: Inter (already loaded)

---

## 💡 Tips

1. Start with the auth pages (simpler) before tackling the landing page
2. Use the Card component with `variant="accent"` and `glow` for auth forms
3. Test responsiveness as you build, not at the end
4. Keep animations snappy (100-200ms)
5. Remember: **NO rounded corners** on buttons, **chunky 3px borders** on cards
6. Use uppercase text with letter-spacing for headings and labels
7. Add terminal prefixes (`>`, `//`, `$`) for that retro feel
8. Reference the existing Dashboard and Settings pages for patterns

---

## 📞 Questions?

If you have questions about:
- **Design decisions** → Check the Brand Style Guide first
- **Backend integration** → Flag for later, focus on UI
- **Component behavior** → Check existing components for patterns

Keep it retro! 🌆
