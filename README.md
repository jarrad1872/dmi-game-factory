# DMI Game Factory 🎮

A web-based game creation tool for DMI Tools Corp. Create, customize, and deploy arcade games with your product branding.

![DMI Game Factory](https://via.placeholder.com/800x400/0a1628/FF6B00?text=DMI+Game+Factory)

## Features

- **🔐 Password-Protected Access** - Simple shared password authentication
- **📋 Build Management** - Create, clone, and delete game builds
- **🎨 Visual Editor** - Split-pane editor with live preview
- **📱 Mobile Responsive** - Works on all devices
- **🚀 One-Click Export** - Download games as standalone HTML files

## Game Templates

| Template | Description |
|----------|-------------|
| 🐦 Flappy Clone | Tap to fly, avoid obstacles |
| 🏃 Endless Runner | Auto-run, tap to jump |
| 💎 Match-3 | Swap tiles to match 3+ |

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your password

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `FACTORY_PASSWORD` | Password to access the factory | `dmi2024` |

### DMI Products

Games can feature any combination of:
- 🔩 Drilling Tools
- ✂️ Cutting Equipment
- 📏 Measuring Devices
- 🔧 Fastening Systems
- 🦺 Safety Gear
- ⚡ Power Tools

### Themes

| Theme | Colors |
|-------|--------|
| Industrial | Orange + Blue |
| Construction | Orange + Yellow |
| Tech | Cyan + Purple |
| Nature | Green + Lime |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add `FACTORY_PASSWORD` environment variable
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Game Engine**: Phaser.js 3
- **Storage**: localStorage (client-side)
- **Auth**: Cookie-based sessions

## Project Structure

```
dmi-game-factory/
├── app/
│   ├── page.tsx              # Login page
│   ├── dashboard/page.tsx    # Build management
│   ├── editor/[id]/page.tsx  # Game editor
│   └── api/
│       ├── auth/route.ts     # Authentication
│       ├── preview/route.ts  # Preview generation
│       └── export/route.ts   # Game export
├── components/
│   ├── BuildCard.tsx         # Game build card
│   ├── ConfigPanel.tsx       # Editor config panel
│   ├── PreviewPane.tsx       # Live preview
│   └── TemplateSelector.tsx  # Template chooser
├── lib/
│   ├── types.ts              # TypeScript types
│   ├── storage.ts            # localStorage helpers
│   ├── auth.ts               # Auth utilities
│   └── templates/
│       └── generator.ts      # Game HTML generator
└── public/
```

## Usage Guide

### Creating a Game

1. Log in with the factory password
2. Click "New Game" on the dashboard
3. Enter a name for your game
4. Choose a template (Flappy, Runner, or Match-3)
5. Customize settings in the config panel
6. Watch the live preview update in real-time
7. Click "Export" to download as HTML

### Customization Options

- **Game Title**: Displayed in the game
- **Template**: Choose game mechanics
- **Theme**: Color scheme
- **Products**: Featured DMI products (shown as icons)
- **CTA Button**: Text and link for call-to-action
- **Difficulty**: 1-10 scale affects game speed
- **Branding**: Toggle DMI branding display

### Exporting Games

Exported games are:
- Self-contained HTML files
- Include Phaser.js from CDN
- Mobile-responsive
- Ready to host anywhere

## Branding

DMI Tools Corp brand colors:
- **Orange**: `#FF6B00`
- **Blue**: `#4FC3F7`
- **Dark**: `#0a1628`

## License

Proprietary - DMI Tools Corp

---

Built with ❤️ for DMI Tools Corp
