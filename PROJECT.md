# DMI Game Factory

## Overview
Cloud-based game creation platform for DMI Arcade games.

- **Factory URL:** factory.dmitools.com (Vercel)
- **Arcade URL:** games.dmitools.com (currently Netlify → dmi-core-fit.netlify.app)

## Status
- [ ] Game Factory app build (sub-agent working)
- [ ] Push to GitHub (jarrad1872/dmi-game-factory)
- [ ] Deploy to Vercel
- [ ] Add factory.dmitools.com domain
- [ ] Test full flow

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Phaser.js (game engine)
- Vercel KV or JSON for storage
- Simple password auth

## Features

### Core
1. Split-pane interface (config left, preview right)
2. Project management (save, load, clone, deploy)
3. Game template library
4. DMI product integration
5. Live preview with play testing

### Project States
- **Drafts:** Work in progress
- **Published:** Live on arcade

### Workflow
| Action | Description |
|--------|-------------|
| New Game | Start from template |
| Save | Save current progress |
| Deploy | Push to arcade |
| Clone | Copy published game to new draft |
| Pull | Edit published game (original stays live) |
| Unpublish | Remove from arcade |

## Game Templates
1. Flappy Clone (first to implement)
2. Runner Clone
3. Match-3 Clone

## DMI Products (for integration)
- Core Bits
- Slurry Rings
- Diamond Blades
- Drill Motors

## Auth
Simple shared password: `dmi2026` (temporary)

## DNS
- factory.dmitools.com → CNAME to Vercel (TBD)
- games.dmitools.com → Already points to dmi-core-fit.netlify.app

## Created
2026-01-30
