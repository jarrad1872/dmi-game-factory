# PRD 01: Endless Runner - "Diamond Rush Delivery"

## Reference Games

### Subway Surfers
- **Screenshot:** https://play-lh.googleusercontent.com/yAtZnNL-9Eb5VYSsCaOC7KAsOVIJcY8mpKa0MoF-0HCL6b0OrFcBizURHywpuip-D6Y=w2560-h1440
- **Developer:** SYBO Games
- **Core Mechanic:** Swipe left/right/up/down to dodge trains, barriers, and collect coins while running infinitely forward

### Temple Run
- **Screenshot:** https://play-lh.googleusercontent.com/UB2aKFb7v-bzWSW4YD8S8qV6jBFU4GPwNQRcTQDZEdnLLQQcKQHO0UlEBDPZLH-KjQ=w2560-h1440
- **Developer:** Imangi Studios
- **Core Mechanic:** Tilt to steer, swipe to jump/slide/turn, collect coins and power-ups while escaping

## Core Mechanics

### Primary Action
- **Movement:** Character runs forward automatically at increasing speed
- **Controls:** 
  - Swipe LEFT/RIGHT: Change lanes (3-lane system)
  - Swipe UP: Jump over obstacles
  - Swipe DOWN: Slide under barriers
  - Tilt: Fine-tune positioning (optional)

### Win/Fail Conditions
- **Fail States:**
  - Collision with obstacle (concrete barriers, rebar stacks, construction equipment)
  - Falling off edge/into pit
  - Caught by pursuing foreman (if timer expires)
- **Win State:** No traditional "win" - score-based progression with distance traveled and collectibles

### Progression System
- **Distance Scoring:** Points per meter traveled (multiplier increases with speed)
- **Collectible Multipliers:** Diamond bits add combo bonuses
- **Mission System:** Complete 3 daily objectives to unlock rewards
- **Power-up Upgrades:** Spend collected diamonds to upgrade duration/power
- **Character Unlocks:** New drill operators and delivery drivers with unique abilities

## DMI Theme Concept

### Title: **"Diamond Rush Delivery"**

### Tagline
*"Get those bits to the job site—FAST!"*

### Player Role
**Express Delivery Driver** for DMI Tools Corp, racing through construction zones to deliver critical diamond core bits to job sites before deadlines expire.

### Story Hook
You're DMI's ace delivery driver. Job sites across the city are waiting for emergency diamond tool deliveries. Navigate chaotic construction zones, dodge obstacles, collect bonus diamonds, and deliver the goods before the foreman's patience runs out!

### Collectibles

#### Primary: Diamond Core Bits (Coins)
- **Visual:** Small circular saw blades, blue diamond sparkles
- **Placement:** Single bits in lanes, clusters in risky positions
- **Value:** 1 point each, combo multiplier increases every 10 bits collected

#### Premium: Pink Diamonds (Rare)
- **Visual:** Large faceted diamonds with glow effect
- **Placement:** Difficult-to-reach areas, mid-air jumps
- **Value:** 50 points + instant multiplier boost

#### Special: DMI Blade Tokens
- **Visual:** Large segmented diamond blade icons
- **Placement:** Scattered through level (5-7 per run)
- **Purpose:** Unlock new delivery trucks, operators, and equipment

### Obstacles

#### Lane Obstacles
- **Concrete Barriers:** Low walls (jump over)
- **Rebar Bundles:** Horizontal bars (slide under)
- **Mixer Trucks:** Parked vehicles (change lanes)
- **Caution Tape:** Marks hazardous areas
- **Broken Pavement:** Gaps in road (jump over)

#### Environmental Hazards
- **Construction Crane Arms:** Swing across lanes (timing challenge)
- **Cement Pours:** Slow zones that reduce speed
- **Water Main Breaks:** Create diagonal obstacles
- **Stacked Pallets:** Block entire sections (require lane switch)

#### Dynamic Obstacles
- **Forklift Traffic:** Moves between lanes
- **Falling Debris:** Drops from above (shadows warn player)
- **Rolling Core Barrels:** Bouncing obstacles in lanes

### Power-Ups

#### Diamond Shield
- **Visual:** Shimmering blue force field around player
- **Effect:** Invincibility for 8 seconds, destroy obstacles on contact
- **Upgrade Path:** Duration +2s per level (max 5 levels)

#### Turbo Boost
- **Visual:** Blue diamond particles trailing character
- **Effect:** 2x speed, auto-jump small obstacles, double point collection
- **Upgrade Path:** Duration +1.5s per level (max 5 levels)

#### Magnet Attractor
- **Visual:** Spinning diamond core bit above player
- **Effect:** Auto-collect all diamond bits within 3 lanes for 12 seconds
- **Upgrade Path:** Range +1 lane per level (max 3 extra lanes)

#### Safety Vest (Second Chance)
- **Visual:** Reflective yellow vest appears on character
- **Effect:** One-time save from collision, lose some speed but continue
- **Upgrade Path:** Number of saves per run +1 (max 3)

### Characters (Unlockable Operators)

1. **Jake "The Ace"** (Starter)
   - Balanced stats, good for learning
   
2. **Rosa "Diamond Rosa"** (500 diamonds)
   - Starts each run with 2x multiplier
   
3. **Carlos "Concrete Carlos"** (1,000 diamonds)
   - Power-ups last 25% longer
   
4. **Ling "Fast Lane"** (1,500 diamonds)
   - Slightly faster base speed, higher scoring potential
   
5. **Marcus "Tank"** (2,500 diamonds)
   - Gets two Safety Vests per run by default

### Vehicles (Unlockable)

1. **DMI Delivery Van** (Starter)
2. **Express Pickup Truck** (300 diamonds) - Better handling
3. **Diamond Hauler** (800 diamonds) - Attracts bits from further
4. **Core Bit Rocket** (1,500 diamonds) - Speeds up faster
5. **The Diamond Fortress** (3,000 diamonds) - Starts with shield active

## Visual Style Recommendations

### Art Direction
- **Style:** Stylized 3D with bright, high-contrast colors
- **Palette:** 
  - Primary: DMI Blue (#003DA5), Safety Yellow (#FFD700)
  - Accents: Diamond Cyan (#00D9FF), Warning Orange (#FF6B35)
  - Environment: Industrial grays, concrete beige, steel silver
- **Lighting:** Dynamic shadows, bright overhead sun, diamond sparkle effects

### Environment Design
- **Setting:** Urban construction corridor (endless concrete jungle)
- **Lane Width:** Clearly defined with painted lines and markers
- **Depth Cues:** Parallax background buildings, distant cranes, flying debris
- **Visual Feedback:**
  - Speed lines when boosting
  - Screen shake on near-miss
  - Combo counter grows with streak
  - Diamond collection leaves glitter trail

### UI Elements
- **Score Display:** Top-left corner, large and readable
- **Distance Meter:** Top-center with truck icon moving along progress bar
- **Mission Tracker:** Top-right corner (collapsible)
- **Power-up Icons:** Bottom-center with duration bars
- **Combo Multiplier:** Animated number above player when active

### Animation Style
- **Character:** Fluid running cycle, responsive swipe actions (0.2s transition)
- **Obstacles:** Idle animations (cranes swinging, hazard lights blinking)
- **Collectibles:** Gentle rotation + bob animation, magnetic pull when collected
- **Camera:** Slight tilt on turns, dynamic FOV during boost

## Technical Specifications (Phaser 3)

### Scene Architecture
```javascript
class GameScene extends Phaser.Scene {
  preload() {
    // Load 3D-style sprites (pre-rendered or sprite sheets)
    // Tilemap chunks for modular level generation
    // Particle effects for diamonds, dust, sparks
  }
  
  create() {
    // Initialize endless runner with chunk system
    // Pool of obstacle/collectible game objects
    // Input handling (pointer swipe detection)
  }
  
  update(delta) {
    // Move world toward camera (parallax layers)
    // Spawn chunks procedurally
    // Check collisions
    // Update score, multipliers, power-up timers
  }
}
```

### Key Systems

#### 1. Chunk-Based Level Generation
```javascript
const CHUNK_LENGTH = 800; // pixels
const chunkPool = [
  { type: 'straight', obstacles: ['barrier', 'rebar'] },
  { type: 'curve-left', obstacles: ['gap', 'crane'] },
  { type: 'curve-right', obstacles: ['debris', 'forklift'] },
  { type: 'hazard', obstacles: ['multi-gap', 'falling-debris'] }
];

function spawnChunk() {
  const chunk = Phaser.Math.RND.pick(chunkPool);
  // Instantiate obstacles based on difficulty curve
  // Place collectibles (diamond bits) strategically
  // Increase difficulty every 500m
}
```

#### 2. Lane System
```javascript
const LANES = [-200, 0, 200]; // X positions for 3 lanes
let currentLane = 1; // Center lane

function handleSwipe(direction) {
  if (direction === 'left' && currentLane > 0) {
    currentLane--;
    tweenToLane(LANES[currentLane]);
  } else if (direction === 'right' && currentLane < 2) {
    currentLane++;
    tweenToLane(LANES[currentLane]);
  }
}

function tweenToLane(targetX) {
  this.tweens.add({
    targets: player,
    x: targetX,
    duration: 200,
    ease: 'Cubic.easeOut'
  });
}
```

#### 3. Input Detection
```javascript
let startX, startY;

this.input.on('pointerdown', (pointer) => {
  startX = pointer.x;
  startY = pointer.y;
});

this.input.on('pointerup', (pointer) => {
  const deltaX = pointer.x - startX;
  const deltaY = pointer.y - startY;
  const threshold = 50;
  
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (deltaX > threshold) handleSwipe('right');
    else if (deltaX < -threshold) handleSwipe('left');
  } else {
    // Vertical swipe
    if (deltaY > threshold) handleSwipe('down'); // Slide
    else if (deltaY < -threshold) handleSwipe('up'); // Jump
  }
});
```

#### 4. Collision System
```javascript
function checkCollisions() {
  // Use Phaser's Arcade Physics overlap
  this.physics.overlap(player, obstaclesGroup, handleCollision);
  this.physics.overlap(player, collectiblesGroup, collectItem);
}

function handleCollision(player, obstacle) {
  if (player.hasShield) {
    obstacle.destroy();
    particles.emit(); // Explosion effect
  } else if (player.hasSafetyVest) {
    player.hasSafetyVest = false;
    player.speed *= 0.7; // Slow down
    showWarningEffect();
  } else {
    gameOver();
  }
}
```

#### 5. Speed Curve & Difficulty
```javascript
const BASE_SPEED = 300; // pixels per second
const MAX_SPEED = 900;
let currentSpeed = BASE_SPEED;

function updateDifficulty() {
  const distanceTraveled = this.score / 10;
  currentSpeed = Math.min(
    BASE_SPEED + (distanceTraveled * 0.5),
    MAX_SPEED
  );
  
  // Increase obstacle density
  spawnRate = Math.max(1.0 - (distanceTraveled / 1000), 0.3);
}
```

#### 6. Parallax Layers
```javascript
const layers = [
  { sprite: 'sky', speed: 0.1 },
  { sprite: 'buildings-far', speed: 0.3 },
  { sprite: 'buildings-near', speed: 0.6 },
  { sprite: 'construction-site', speed: 1.0 },
  { sprite: 'ground', speed: 1.5 }
];

function updateParallax(delta) {
  layers.forEach(layer => {
    layer.sprite.tilePositionY -= currentSpeed * layer.speed * delta / 1000;
  });
}
```

### Asset Requirements
- **Spritesheets:**
  - Player character (8 directional angles, run/jump/slide animations)
  - Obstacles (barriers, rebar, vehicles, debris)
  - Collectibles (diamond bits, power-ups, tokens)
  - Vehicles (5 unlockable delivery trucks)
  
- **Tilesets:**
  - Road surface (concrete, asphalt variations)
  - Lane markings
  - Environmental details (cracks, stains, construction markings)
  
- **Particles:**
  - Diamond sparkle (blue/white)
  - Dust clouds (gray/brown)
  - Speed lines (white streaks)
  - Collision sparks (orange/yellow)
  
- **Audio:**
  - Running footsteps (pitch varies with speed)
  - Swipe whoosh sounds
  - Diamond collection ("ding!" with pitch variation)
  - Power-up activation (electric charge sound)
  - Collision/game over (crash, glass breaking)
  - Background music (upbeat industrial techno)

### Performance Targets
- **FPS:** Solid 60fps on mobile devices
- **Object Pooling:** Reuse obstacle/collectible game objects
- **Culling:** Destroy chunks that are 1 screen behind camera
- **Texture Atlases:** Combine sprites to minimize draw calls
- **Max Active Objects:** <150 at any time

### Mobile Optimization
- **Touch Response:** <100ms input latency
- **Battery Efficiency:** Pause game when app backgrounded
- **Save State:** Auto-save progress every 30 seconds
- **Offline Mode:** Full gameplay without internet (sync scores later)

## PRD Summary

**Diamond Rush Delivery** transforms the addictive endless runner genre into a high-stakes delivery mission for DMI Tools Corp. Players take on the role of an express delivery driver racing through chaotic construction zones to deliver critical diamond core bits to job sites under tight deadlines. The game combines the proven swipe-based mechanics of Subway Surfers with authentic diamond tool industry theming—collecting diamond core bits instead of coins, dodging concrete barriers and rebar stacks instead of trains, and powering up with industrial safety equipment instead of generic power-ups.

The core loop is instantly accessible: swipe to change lanes, jump obstacles, slide under barriers, and collect as many diamond bits as possible while the speed progressively increases. Players unlock new delivery drivers with unique abilities, upgrade power-ups like the Diamond Shield and Turbo Boost, and complete daily missions to earn rewards. The DMI theming creates a unique identity that resonates with the target audience—construction professionals and tool enthusiasts—while maintaining the universal appeal of the endless runner format. The industrial aesthetic (DMI blue, safety yellow, concrete grays) combined with sparkling diamond effects creates a visually distinctive experience that stands out in the crowded mobile gaming market.

From a technical standpoint, Phaser 3's robust physics engine and sprite management systems make it ideal for this project. The chunk-based procedural generation ensures infinite replayability, while object pooling and culling maintain smooth 60fps performance on mobile devices. The game can be developed as a progressive web app (PWA) for maximum accessibility, with offline functionality and session persistence. Monetization opportunities include cosmetic character/vehicle unlocks, power-up upgrades, and optional ad viewing for continues—all non-intrusive methods that preserve the core gameplay experience. This PRD positions Diamond Rush Delivery as a flagship casual game for DMI's digital marketing strategy, combining addictive gameplay with brand reinforcement in every mechanic and visual element.
