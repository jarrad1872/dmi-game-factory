# DMI Game Factory 🏭

A cloud-based arcade game creation tool for DMI Tools Corp. Create engaging promotional games featuring DMI products with just a few clicks.

![DMI Game Factory](https://img.shields.io/badge/DMI-Game%20Factory-orange?style=for-the-badge)

## Features

- **🎮 3 Game Templates**: Flappy Clone, Endless Runner, Match-3 Puzzle
- **🎨 4 Visual Themes**: Industrial, Construction, Tech, Nature  
- **⚙️ DMI Product Integration**: Feature Core Bits, Slurry Rings, Diamond Blades, Drill Motors
- **📱 Live Preview**: Test games in mobile or desktop view
- **💾 Project Management**: Save drafts, clone builds, publish when ready
- **📤 Export**: Download games as standalone HTML files
- **🔐 Simple Auth**: Password-protected access

## Tech Stack

- **Next.js 14** - App Router with React Server Components
- **Tailwind CSS** - Utility-first styling with custom theme
- **Phaser.js** - Professional game engine for web games
- **TypeScript** - Full type safety

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/jarrad1872/dmi-game-factory.git
cd dmi-game-factory

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your password

# Run development server
npm run dev
```

### Environment Variables

```env
FACTORY_PASSWORD=your-secure-password
```

### Building for Production

```bash
npm run build
npm run start
```

## Usage

1. **Login** with the factory password
2. **Create** a new game and select a template
3. **Configure** your game:
   - Choose a visual theme
   - Select DMI products to feature
   - Set game difficulty
   - Add your call-to-action
4. **Preview** and test your game
5. **Export** or **Publish** when ready

## Game Templates

### Flappy Clone 🐦
Tap to fly, avoid obstacles, collect bonus stars. Great for quick engagement.

### Endless Runner 🏃
Auto-running action, jump to avoid obstacles, collect coins. Fast-paced fun.

### Match-3 Puzzle 💎
Strategic tile-matching game. Perfect for longer play sessions.

## Project Structure

```
dmi-game-factory/
├── app/
│   ├── api/           # API routes (auth, preview, export)
│   ├── dashboard/     # Project management page
│   ├── editor/[id]/   # Game editor page
│   └── page.tsx       # Login page
├── components/        # React components
├── lib/
│   ├── auth.ts        # Authentication utilities
│   ├── storage.ts     # Local storage management
│   ├── types.ts       # TypeScript types
│   └── templates/     # Game template generators
└── public/            # Static assets
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jarrad1872/dmi-game-factory)

1. Import the GitHub repo
2. Add `FACTORY_PASSWORD` environment variable
3. Deploy!

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Node.js

## License

Proprietary - DMI Tools Corp

---

Built with ❤️ for DMI Tools Corp
