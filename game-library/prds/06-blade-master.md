# Game PRD #6: Blade Master (Fruit Ninja Style)

## Reference Games

**Primary Reference: Fruit Ninja (Halfbrick Studios)**
- Original swipe-to-slice mechanic game
- Screenshot URL: https://apps.apple.com/us/app/fruit-ninja/id403858572
- Gameplay: https://www.halfbrick.com/games/fruit-ninja-classic

**Similar Games:**
- Fruit Ninja 2 - Enhanced version with multiplayer
- Ninja Slash - Similar slice mechanics
- Slice Master - Physics-based slicing

## Core Mechanics

### Primary Action
- **Swipe/Slice**: Player drags finger across screen to create cutting paths
- Objects fly up from bottom of screen in arcs
- Slicing an object triggers particle effects and scoring
- Multiple objects can be sliced in one swipe (combo system)
- Physics-based object trajectories

### Win/Fail Conditions
**Win Conditions:**
- Achieve target score within time limit (Arcade mode)
- Slice specific number of objects (Classic mode)
- Survive without missing objects (Zen mode)

**Fail Conditions:**
- Hit a bomb (instant game over or life loss)
- Miss too many valid objects (3 strikes typically)
- Time runs out before reaching goal

### Progression System
- Score-based progression with combo multipliers
- Unlockable blades with different visual effects
- Background themes and settings
- Achievement system (slice X objects, get Y combos)
- Leaderboards for competitive play

### Difficulty Curve
- More objects spawn simultaneously
- Faster object speeds
- More bombs mixed in
- Special objects requiring precise timing
- Limited time power-ups

## DMI THEME CONCEPT: "BLADE MASTER"

### Creative Title
**"Diamond Blade Master: Core Cutting Challenge"**

### Player Role
Master diamond blade operator training to slice through the toughest materials in the industry. You're DMI's top blade tester, demonstrating the cutting power of various diamond blade models on flying material samples.

### What Are Collectibles/Targets?
**Primary Targets (to slice):**
- **Concrete Blocks** - Standard gray cubes (1 point each)
- **Brick Samples** - Red rectangular pieces (2 points)
- **Asphalt Chunks** - Black irregular shapes (2 points)
- **Granite Slabs** - Speckled stone pieces (3 points)
- **Marble Blocks** - Elegant white/veined pieces (5 points)
- **Diamond Ore** - Rare blue crystalline chunks (10 points, bonus time)

**Combo Targets:**
- Slice 3+ materials in one swipe for "Clean Cut" bonus
- Slice all same material type for "Specialist" bonus
- Slice mixed materials for "Versatile Operator" bonus

**Collectibles:**
- **Loose Diamonds** - Appear when slicing premium materials, collect for blade upgrades
- **Core Samples** - Special cylindrical pieces that give bonus points
- **DMI Logos** - Rare golden emblems for extra lives

### What Are Obstacles/Enemies?
**Hazards (DO NOT SLICE):**
- **Rebar Chunks** - Metal reinforcement pieces (red glow, instant blade damage)
- **Sparking Wires** - Live electrical hazards (instant game over)
- **Oil Drums** - Black barrels that explode and obscure screen
- **Worn Blade Markers** - Dull blade symbols indicating blade failure

**Environmental Hazards:**
- Screen dust/debris from cutting (reduced visibility)
- Sparks that temporarily obscure view
- Overheating indicator (slice too fast, blade overheats)

### What Are Power-ups?
**Blade Power-ups:**
- **Turbo Blade** - Wider cutting swath, everything sliced in path
- **Precision Guide** - Laser guides show optimal cutting lines
- **Diamond Rush** - All materials become diamond ore for 10 seconds
- **Slow Motion** - Bullet-time effect for precise cutting
- **Multi-Blade** - Three parallel blades for wider coverage
- **Cooling Burst** - Resets overheat meter, temporary invincibility to hazards

**Equipment Upgrades:**
- **Segmented Blade** - Longer slice trails
- **Wet Cutting System** - Forgives one rebar hit
- **Laser Sight** - Shows trajectory prediction
- **Auto-Sorter** - Magnetically attracts diamonds

### Visual Style Recommendations

**Art Style:**
- Industrial/professional aesthetic with DMI branding
- Realistic material textures (concrete, stone, metal)
- Satisfying particle effects when slicing (dust, sparks, fragments)
- Clean UI with industrial metal and blue accent colors

**Color Palette:**
- **Primary**: DMI Blue (#0066CC), Steel Gray (#666666)
- **Accent**: Diamond White (#FFFFFF), Warning Red (#FF3333)
- **Materials**: Natural stone colors, concrete gray, warm brick tones
- **Effects**: Orange sparks, white dust clouds, blue diamond shimmer

**Visual Effects:**
- Realistic material fracture along slice lines
- Dust particle systems based on material type
- Blade trail effects (varying by blade type)
- Screen shake on combo hits
- Heat distortion when blade overheats
- Slow-motion cuts on high-value materials

**UI Elements:**
- Score counter styled as job site display
- Blade heat meter (thermometer style)
- Lives shown as blade segments
- Combo meter as cutting accuracy gauge
- Background: Job site environment, workshop, or test facility

### Technical Specs for Phaser 3 Implementation

#### Core Systems

**Physics & Input:**
```javascript
// Input detection
- Pointer drag tracking for slice paths
- Path smoothing algorithm for natural cuts
- Collision detection between path and sprites
- Touch/mouse event handlers with multi-touch support

// Object spawning
- Random trajectory generator (parabolic arcs)
- Spawn rate controller (difficulty-based)
- Object pool for performance (20-30 objects max)
- Weighted random selection for material types
```

**Game Loop:**
```javascript
class BladeGame extends Phaser.Scene {
  // 60 FPS target
  // Update cycle: spawn → trajectory → collision → scoring → cleanup
  
  systems: {
    spawnManager: SpawnController,
    sliceDetector: PathCollisionSystem,
    comboTracker: ComboSystem,
    scoreManager: ScoreController,
    particleEngine: ParticleEmitter
  }
}
```

#### Asset Requirements

**Sprites & Animations:**
- Material sprites (256x256 PNG): concrete, brick, asphalt, granite, marble, diamond ore
- Hazard sprites: rebar, wires, barrels (red glow effect)
- Blade trail sprite (tillable)
- Particle textures: dust, sparks, fragments
- UI elements: buttons, meters, icons
- Background layers: parallax workshop/jobsite (3 layers)

**Audio:**
- Slice sounds (varying by material) - 5 variations each
- Combo achievement sounds
- Hazard hit sound (harsh, jarring)
- Power-up activation sounds
- Background music: industrial/energetic loops
- Ambient sounds: workshop noise

**Animations:**
- Material wobble on spawn
- Slice animation (sprite split along path)
- Explosion particles for hazards
- Power-up collection flash
- Blade heat glow animation

#### Key Technical Features

**Slice Detection Algorithm:**
```javascript
// Collect points along drag path
const slicePath = [];
pointer.on('drag', (x, y) => {
  slicePath.push({x, y, timestamp});
});

// Check intersection with object bounds
objects.forEach(obj => {
  if (pathIntersectsSprite(slicePath, obj)) {
    sliceObject(obj);
  }
});
```

**Combo System:**
```javascript
const comboWindow = 2000; // 2 seconds
const comboMultipliers = {
  2: 1.5,
  3: 2.0,
  5: 3.0,
  10: 5.0
};
```

**Performance Optimizations:**
- Object pooling for all materials (recycle instead of destroy)
- Particle system limits (max 500 particles)
- Sprite atlas for all materials (single texture)
- Remove off-screen objects immediately
- Efficient collision detection (spatial hashing)

**Save System:**
```javascript
LocalStorage: {
  highScores: { arcade, classic, zen },
  unlockedBlades: [],
  collectedDiamonds: number,
  achievements: [],
  settings: { sound, music, particles }
}
```

#### Screen Sizes & Responsive Design
- Mobile-first: 375x667 (iPhone SE) to 428x926 (iPhone 13 Pro Max)
- Tablet support: 768x1024 (iPad)
- Landscape mode available for tablets
- Scale manager: FIT mode with max width 1920px
- Safe area consideration for notched devices

#### Difficulty Tuning Parameters
```javascript
const difficultyConfig = {
  easy: {
    spawnInterval: 1200,  // ms between spawns
    maxSimultaneous: 3,
    bombChance: 0.05,     // 5%
    speedMultiplier: 1.0
  },
  medium: {
    spawnInterval: 900,
    maxSimultaneous: 5,
    bombChance: 0.12,     // 12%
    speedMultiplier: 1.3
  },
  hard: {
    spawnInterval: 600,
    maxSimultaneous: 8,
    bombChance: 0.20,     // 20%
    speedMultiplier: 1.6
  }
}
```

## PRD Summary

**Diamond Blade Master** transforms the addictive swipe-to-slice gameplay of Fruit Ninja into an engaging diamond tool demonstration experience. Players take on the role of a master blade operator, showcasing DMI's cutting technology by slicing through flying material samples—from concrete and brick to premium marble and diamond ore. The core mechanic remains satisfyingly tactile: swipe across the screen to slice materials, build combos by cutting multiple pieces in one motion, and avoid hazardous rebar and electrical wires that damage your blade. The game features multiple modes (timed challenges, endless survival, zen practice) with progressive difficulty as more materials spawn faster and with more hazards mixed in.

The DMI theme integration feels natural and educational, teaching players about different materials that diamond blades cut while maintaining the frantic, combo-driven gameplay that made Fruit Ninja a mobile gaming icon. Power-ups like Turbo Blade, Precision Guide, and Diamond Rush add strategic depth, while the blade heat mechanic prevents mindless swiping and rewards skillful, deliberate cuts. Visual feedback is crucial—realistic material fractures, satisfying dust particles, sparks, and screen shake on big combos create a visceral cutting experience. The industrial aesthetic with DMI branding, professional color scheme, and job site backgrounds grounds the game in the company's real-world operations.

Built on Phaser 3, the game leverages efficient object pooling, smooth path-based collision detection, and responsive particle effects to deliver 60 FPS performance on mobile devices. The progression system rewards players with unlockable diamond blade types (each with unique visual effects), achievement badges for cutting milestones, and leaderboards for competitive play. With simple one-finger controls, instant-action gameplay sessions (60-90 seconds per round), and the satisfying dopamine hit of slicing through materials and watching them shatter, Diamond Blade Master offers the perfect blend of accessibility and skill ceiling for both casual players and blade enthusiasts alike.

---

**Target Platforms:** iOS, Android, Web (Mobile-optimized)  
**Session Length:** 60-120 seconds per game  
**Monetization:** Ad-supported with optional blade skin purchases  
**Development Time:** 6-8 weeks for MVP  
**Core Appeal:** Satisfying swipe mechanics, visual/audio feedback, competitive scoring
