# PortfolioSync Frontend

> **Synthwave Terminal Edition** — A retro-modern portfolio synchronization dashboard

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

*Keep your portfolio in perfect sync*

</div>

---

## 🎨 Design System

PortfolioSync features a unique **Synthwave Terminal** aesthetic that combines:

- **80s/90s retro computing** — CRT monitors, pixel art, terminal vibes
- **Synthwave/Vaporwave** — Neon colors, grid patterns, chunky borders
- **Modern UX** — Clean layouts, responsive design, smooth interactions

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| 🔴 Hot Pink | `#f72585` | Primary accent, CTAs |
| 🔵 Electric Cyan | `#4cc9f0` | Secondary accent, links |
| 🟢 Terminal Green | `#39ff14` | Success states |
| 🟡 Amber Glow | `#f9a825` | Warnings |
| ⬛ Void | `#0a0a0f` | Deep background |
| ⬛ Midnight | `#1a1a2e` | Card backgrounds |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd portfoliosyncfrontend/client

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 📁 Project Structure

```
client/
├── public/                  # Static assets
├── src/
│   ├── assets/             # Images, icons
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   │   ├── Badge.jsx   # Status badges
│   │   │   ├── Button.jsx  # Retro arcade buttons
│   │   │   ├── Card.jsx    # Chunky bordered cards
│   │   │   ├── Input.jsx   # Terminal-style inputs
│   │   │   ├── Select.jsx  # Retro dropdowns
│   │   │   ├── Skeleton.jsx # Loading states
│   │   │   └── index.js    # Component exports
│   │   ├── ActivityLog.jsx
│   │   ├── Layout.jsx      # Synthwave sidebar layout
│   │   ├── ScanProgress.jsx
│   │   ├── ScanResults.jsx
│   │   └── Toast.jsx       # Notification system
│   ├── pages/
│   │   ├── BrandPreview.jsx # Design system showcase
│   │   ├── Dashboard.jsx    # Main dashboard
│   │   ├── ScanDetail.jsx   # Scan details view
│   │   └── Settings.jsx     # App settings
│   ├── api.js              # Axios API configuration
│   ├── App.jsx             # Root component with routing
│   ├── index.css           # Design tokens & global styles
│   └── main.jsx            # Application entry point
├── BRAND_STYLE_GUIDE.md    # Complete design documentation
├── TASK_LANDING_AUTH_PAGES.md # Frontend task specs
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## 🧩 UI Components

All components follow the Synthwave Terminal design system with chunky borders, neon glows, and retro aesthetics.

### Button

```jsx
import { Button } from './components/ui';

// Primary (Hot Pink)
<Button variant="primary">LAUNCH</Button>

// Secondary (Cyan outline)
<Button variant="secondary">CONNECT</Button>

// With icon
<Button variant="primary" icon={<Icon />}>ACTION</Button>

// Loading state
<Button loading>PROCESSING...</Button>

// Variants: primary, secondary, ghost, danger, success, terminal
```

### Card

```jsx
import { Card } from './components/ui';

// Standard card
<Card>Content here</Card>

// Interactive with hover effects
<Card interactive>Clickable card</Card>

// Accent with neon glow
<Card variant="accent" glow>Featured content</Card>

// Terminal style
<Card variant="terminal">Terminal panel</Card>

// With subcomponents
<Card variant="accent" glow>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Content>Body content</Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

### Input

```jsx
import { Input } from './components/ui';

// Basic input
<Input label="EMAIL" placeholder="user@system.net" />

// With error
<Input label="PASSWORD" type="password" error="Invalid credentials" />

// Terminal variant
<Input variant="terminal" placeholder="Enter command..." />

// With icon
<Input icon={<SearchIcon />} placeholder="Search..." />
```

### Badge

```jsx
import { Badge } from './components/ui';

// Status badges
<Badge variant="success">ONLINE</Badge>
<Badge variant="error">FAILED</Badge>
<Badge variant="warning">PENDING</Badge>
<Badge variant="info">SYNCING</Badge>

// With pulsing dot
<Badge variant="success" dot pulse>ACTIVE</Badge>
```

### Select

```jsx
import { Select } from './components/ui';

<Select
  label="SYSTEM"
  options={[
    { value: 'auto', label: 'Auto Sync' },
    { value: 'manual', label: 'Manual' },
  ]}
/>
```

---

## 🎭 Design Tokens

The design system uses CSS custom properties defined in `src/index.css`:

```css
/* Colors */
--color-hot-pink: #f72585;
--color-electric-cyan: #4cc9f0;
--color-terminal-green: #39ff14;
--color-void: #0a0a0f;
--color-midnight: #1a1a2e;

/* Shadows (chunky, no blur) */
--shadow-retro-md: 4px 4px 0 rgba(0, 0, 0, 0.8);
--shadow-neon-pink: 0 0 10px #f72585, 0 0 20px rgba(247, 37, 133, 0.4);

/* Animations */
--duration-fast: 100ms;
--duration-normal: 200ms;
```

### Utility Classes

```css
.scanlines        /* CRT scanline overlay */
.glitch-text      /* Glitch text animation */
.neon-pink        /* Pink neon glow */
.neon-cyan        /* Cyan neon glow */
.text-gradient-synthwave  /* Pink-cyan gradient text */
.grid-pattern     /* Background grid lines */
```

---

## 📖 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Main dashboard with scan controls and activity log |
| `/settings` | Settings | API configuration and sync preferences |
| `/scan/:id` | Scan Detail | Detailed view of a specific scan |
| `/brand` | Brand Preview | Design system showcase and component gallery |

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5500/api
```

### API Configuration

The API client is configured in `src/api.js`:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5500/api',
});

export default api;
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 19.2.0 | UI framework |
| [Vite](https://vite.dev/) | 7.2.4 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1.18 | Utility-first CSS |
| [React Router](https://reactrouter.com/) | 7.13.0 | Client-side routing |
| [Axios](https://axios-http.com/) | 1.13.4 | HTTP client |

---

## 📚 Documentation

- **[BRAND_STYLE_GUIDE.md](./BRAND_STYLE_GUIDE.md)** — Complete design system documentation
- **[TASK_LANDING_AUTH_PAGES.md](./TASK_LANDING_AUTH_PAGES.md)** — Landing & auth pages specification

---

## 🎯 Roadmap

### Upcoming Features

- [ ] Landing page
- [ ] Authentication flow (Login, Register, Forgot Password)
- [ ] GitHub OAuth integration
- [ ] Real-time sync notifications
- [ ] Dark/light theme toggle (synthwave vs cyberpunk)

---

## 🤝 Contributing

1. Follow the design system in `BRAND_STYLE_GUIDE.md`
2. Use existing UI components from `components/ui/`
3. Keep the retro aesthetic — chunky borders, neon glows, uppercase labels
4. Run `npm run lint` before committing

---

## 📄 License

This project is private and proprietary.

---

<div align="center">

**Keep it retro!** 🌆

*Built with React + Vite + Tailwind CSS*

</div>
