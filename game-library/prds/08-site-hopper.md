# Game PRD #8: Site Hopper (Crossy Road Style)

## Reference Games

**Primary Reference: Crossy Road (Hipster Whale)**
- Isometric endless hopper with traffic/river obstacles
- Screenshot URL: https://www.crossyroad.com/
- App Store: https://apps.apple.com/us/app/crossy-road/id924373886

**Similar Games:**
- Disney Crossy Road - Licensed character variant
- Crossy Road Castle - Tower climbing variant
- Shooty Skies - Vertical shooter by same developer
- Pac-Man 256 - Similar endless progression

## Core Mechanics

### Primary Action
- **Tap to Hop**: Tap above character to move forward
- **Swipe Controls**: Swipe left/right to move sideways, swipe up for forward
- **Isometric Grid Movement**: Character moves in discrete grid squares
- **Timing-Based**: Must time movements to avoid obstacles
- **Keep Moving**: Pressure from bottom edge that forces forward progress

### Win/Fail Conditions
**Win Conditions:**
- Progress as far as possible (distance = score)
- Collect coins/collectibles for unlocks
- Complete daily challenges
- No "winning" - endless progression

**Fail Conditions:**
- Hit by moving obstacle (vehicle, train)
- Fall in water/holes without safe platform
- Get caught by pursuing bottom edge (camera/water/death zone)
- Crushed between obstacles

### Progression System
- Score = distance traveled (# of rows crossed)
- Coin/currency collection for character unlocks
- 100+ unlockable characters (visual variants)
- Achievement system (travel X distance, collect Y coins)
- Daily/weekly challenges
- Gift box system (random rewards)

### Difficulty Curve
- Speed increases gradually
- More obstacles spawn simultaneously
- Faster moving hazards
- Narrower safe gaps
- More complex obstacle patterns
- Multiple hazard types in sequence

## DMI THEME CONCEPT: "SITE HOPPER"

### Creative Title
**"Site Hopper: Construction Crossing"**

### Player Role
You're a construction site inspector navigating busy job sites, moving forward across roads filled with delivery trucks, equipment, active drilling zones, and hazardous areas. Your goal: inspect as many zones as possible while avoiding obstacles and collecting core samples.

### What Are Collectibles/Targets?
**Primary Goal:**
- Cross as many zones as possible (rows = meters of site inspected)
- Each row = 1 meter of progress

**Collectibles:**
- **Diamonds** - Scattered throughout site (currency for unlocks)
- **Core Samples** - Cylindrical specimens (bonus points)
- **DMI Badges** - Safety certification tokens (unlock characters)
- **Hard Hats** - Safety gear pickups (temporary invincibility)
- **Blueprint Rolls** - Rare items (unlock special zones)

**Unlockable Characters:**
- **Inspectors**: Safety inspector, site manager, engineer
- **Equipment**: Drill bit (anthropomorphic), saw blade character, jackhammer
- **Materials**: Concrete block buddy, diamond mascot, rebar robot
- **Vehicles**: Mini excavator, drill rig (small), concrete mixer
- **Professionals**: Operator, foreman, geologist, DMI sales rep
- **Mascots**: DMI company mascot variants (100+ skins)

### What Are Obstacles/Enemies?
**Mobile Obstacles (Moving Left/Right):**
- **Delivery Trucks** - Large, slow-moving (2-3 lanes wide)
- **Forklifts** - Medium speed, carrying pallets
- **Concrete Mixers** - Large rotating drum, medium speed
- **Pickup Trucks** - Fast, small, erratic
- **Excavators** - Very large, slow, swinging arm hazard
- **Drill Rigs** - Moving equipment, multi-lane
- **Material Carts** - Workers pushing wheelbarrows/carts

**Stationary Obstacles:**
- **Equipment** - Parked vehicles, tool boxes, material stacks
- **Barriers** - Safety fences, cones, caution tape
- **Holes** - Open excavations (must jump over or find crossing)
- **Material Piles** - Gravel, sand, concrete stacks

**Environmental Hazards:**
- **Active Drill Zones** - Spinning drill bits that move up/down (timing required)
- **Conveyor Belts** - Moving platforms carrying materials
- **Wet Concrete Zones** - Slow movement areas
- **Rebar Grids** - Must navigate through gaps
- **Train Tracks** - Warning signals before trains pass (classic Crossy Road style)

**Zone Types (Biomes):**
1. **Road Zone** - Traffic (trucks, vehicles)
2. **Active Drilling Zone** - Operating drill rigs, spinning bits
3. **Material Yard** - Forklifts, stacked supplies
4. **Railway** - Train crossing with barriers
5. **Excavation Zone** - Open holes, excavators working
6. **Conveyor Area** - Moving platforms and materials
7. **Safe Zone** - Parking area with scattered collectibles

### What Are Power-ups?
**Temporary Boosts:**
- **Hard Hat** - One-hit protection (glowing yellow)
- **Safety Vest** - High visibility, slows nearby obstacles
- **Turbo Boots** - Faster movement speed (3 hops)
- **Magnet** - Auto-collect nearby diamonds (10 seconds)
- **Ghost Mode** - Phase through obstacles (5 seconds)
- **Time Slow** - Slow motion for precise timing (5 seconds)

**Passive Abilities (Character-Specific):**
- Some characters start with abilities:
  - Drill Bit: Smaller hitbox
  - Safety Inspector: Can see upcoming hazards
  - Excavator: Immune to vehicle collisions
  - Diamond Mascot: 2x diamond collection

### Visual Style Recommendations

**Art Style:**
- Isometric voxel/blocky aesthetic (Crossy Road style)
- Colorful, cheerful construction site theme
- Low-poly character designs with personality
- Clean, readable obstacle designs
- Vibrant DMI brand colors throughout

**Color Palette:**
- **Primary**: DMI Blue (#0066CC), Construction Yellow (#FFB300)
- **Roads**: Dark gray asphalt, yellow lane lines
- **Zones**: Varied per type (brown dirt, gray concrete, green safe zones)
- **Vehicles**: Realistic construction equipment colors (yellow, orange, white)
- **Effects**: Dust clouds (tan), sparks (orange), diamond glow (cyan)

**Visual Effects:**
- Dust puffs on each hop
- Tire tracks from vehicles
- Sparks from active drilling
- Bouncy character animations (squash/stretch)
- Confetti/particle burst on milestones
- Smooth camera follow with slight lag
- Parallax background (distant buildings, skyline)

**UI Elements:**
- Score counter (top center) - distance in meters
- Diamond counter (top right)
- Character showcase button (bottom left)
- Settings (top left)
- Death screen with score, best, retry
- Character unlock celebration screen

### Technical Specs for Phaser 3 Implementation

#### Core Systems

**Grid-Based Movement:**
```javascript
class SiteInspector extends Phaser.GameObjects.Sprite {
  GRID_SIZE = 64;           // Pixels per grid square
  HOP_DURATION = 150;       // ms per hop animation
  
  moveForward() {
    if (this.isMoving) return;
    
    this.isMoving = true;
    const targetY = this.gridY - 1;
    
    // Animate hop
    this.scene.tweens.add({
      targets: this,
      y: targetY * this.GRID_SIZE,
      duration: this.HOP_DURATION,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        this.gridY = targetY;
        this.isMoving = false;
        this.checkCollisions();
      }
    });
    
    // Squash/stretch animation
    this.playHopAnimation();
  }
  
  moveLeft() { /* Similar with X-axis */ }
  moveRight() { /* Similar with X-axis */ }
}
```

**Obstacle Management:**
```javascript
class ObstacleManager {
  zoneTypes = ['road', 'drilling', 'material', 'railway', 'excavation', 'safe'];
  
  generateRow(rowNumber) {
    // Determine zone type
    const zoneType = this.selectZoneType(rowNumber);
    
    switch(zoneType) {
      case 'road':
        return this.createRoadRow(rowNumber);
      case 'drilling':
        return this.createDrillingRow(rowNumber);
      case 'safe':
        return this.createSafeRow(rowNumber);
      // etc.
    }
  }
  
  createRoadRow(rowNumber) {
    // Spawn 3-5 vehicles moving left or right
    const vehicles = [];
    const direction = Phaser.Math.RND.pick([-1, 1]);
    const vehicleType = this.weightedVehicleSelect();
    const speed = this.getVehicleSpeed(vehicleType);
    
    for (let i = 0; i < 5; i++) {
      const vehicle = this.vehiclePool.get(vehicleType);
      vehicle.setPosition(i * 200, rowNumber * GRID_SIZE);
      vehicle.setVelocityX(speed * direction);
      vehicles.push(vehicle);
    }
    
    return { type: 'road', obstacles: vehicles };
  }
  
  // Difficulty scaling
  adjustDifficulty(distance) {
    if (distance > 50) this.vehicleSpeedMultiplier = 1.2;
    if (distance > 100) this.vehicleSpeedMultiplier = 1.4;
    if (distance > 200) this.vehicleSpeedMultiplier = 1.6;
  }
}
```

**Camera System:**
```javascript
class GameCamera {
  update(player) {
    // Follow player Y with smooth interpolation
    const targetY = player.y - 300; // Keep player in lower third
    const currentY = this.camera.scrollY;
    this.camera.scrollY = Phaser.Math.Linear(currentY, targetY, 0.1);
    
    // Death zone at bottom of screen
    const deathZone = this.camera.scrollY + 600;
    if (player.y > deathZone) {
      this.gameOver();
    }
  }
}
```

#### Asset Requirements

**Sprites & Animations:**
- Character sprites (50+ variants): inspectors, equipment, mascots (64x64 voxel style)
- Vehicle sprites: trucks, forklifts, excavators, mixers (128x128 to 256x256)
- Environment tiles: road, dirt, concrete, grass (64x64 tileable)
- Obstacles: barriers, equipment, holes (64x64 to 128x128)
- Collectibles: diamonds, samples, badges (32x32 with glow)
- UI: buttons, counters, icons (vector-friendly)

**Animations (Per Character):**
- Idle bounce loop (2-3 frames)
- Hop forward (4 frames with squash/stretch)
- Hop sideways (4 frames)
- Death/splat (6 frames)
- Celebration (5 frames for milestones)

**Audio:**
- Hop sound - light "boing" (pitch variation)
- Collect diamond - chime sound
- Vehicle passing - engine/tire sounds
- Collision/death - crash/splat sound
- Milestone - fanfare (50, 100, 200 meters)
- Background music - upbeat construction theme (loopable)
- Ambient sounds - site noises, equipment, backup beepers

**Particles:**
- Dust puff on hop
- Sparkle on diamond collect
- Confetti on milestone
- Explosion on death
- Drill sparks in drilling zones

#### Key Technical Features

**Procedural Generation:**
```javascript
class ZoneGenerator {
  // Ensure variety and fairness
  recentZones = [];
  MAX_CONSECUTIVE = 3;
  
  selectZoneType(rowNumber) {
    // Safe zone every 10-15 rows
    if (rowNumber % 12 === 0) return 'safe';
    
    // Weight based on difficulty
    const weights = {
      road: 30,
      drilling: 20,
      material: 20,
      railway: 10,
      excavation: 15,
      conveyor: 5
    };
    
    // Avoid too many consecutive same zones
    const selected = this.weightedRandom(weights);
    this.recentZones.push(selected);
    if (this.recentZones.length > this.MAX_CONSECUTIVE) {
      this.recentZones.shift();
    }
    
    return selected;
  }
}
```

**Collision Detection:**
```javascript
// Arcade Physics overlap checks
this.physics.add.overlap(
  player,
  vehicleGroup,
  this.onVehicleHit,
  null,
  this
);

this.physics.add.overlap(
  player,
  collectiblesGroup,
  this.onCollect,
  null,
  this
);

// Grid-based hole detection
checkForHole(gridX, gridY) {
  const tile = this.getTileAt(gridX, gridY);
  if (tile.type === 'hole' && !player.isJumping) {
    this.onFallInHole();
  }
}
```

**Character Unlock System:**
```javascript
const characterData = {
  'safety_inspector': { cost: 0, unlocked: true },
  'site_manager': { cost: 100, unlocked: false },
  'drill_bit': { cost: 500, unlocked: false },
  'excavator_mini': { cost: 1000, unlocked: false },
  // ... 100+ characters
  
  // Special unlocks
  'diamond_mascot': { 
    cost: 0, 
    unlocked: false,
    requiresAchievement: 'collect_1000_diamonds' 
  }
};

class CharacterManager {
  unlockCharacter(id) {
    if (this.diamonds >= characterData[id].cost) {
      this.diamonds -= characterData[id].cost;
      characterData[id].unlocked = true;
      this.showUnlockCelebration(id);
      this.saveToLocalStorage();
    }
  }
}
```

**Performance Optimizations:**
- Object pooling for all vehicles/obstacles
- Destroy obstacles when off-screen (>2 screens away)
- Chunk loading: only render rows within camera view +/- 5 rows
- Single sprite atlas for all characters
- Reuse row data (don't regenerate passed rows)
- Limit particles to 300 max
- Optimize collision checks (spatial partitioning)

**Save System:**
```javascript
LocalStorage: {
  bestDistance: number,
  totalDistance: number,
  diamonds: number,
  unlockedCharacters: [],
  currentCharacter: string,
  achievements: [],
  dailyChallengeProgress: {},
  settings: { sound, music, particles }
}
```

#### Screen Sizes & Responsive Design
- Portrait orientation: 375x667 to 428x926
- Tablet support: 768x1024 (landscape available)
- Scale mode: FIT with integer pixel scaling for crisp voxels
- Camera viewport: 7-9 columns wide × 9-11 rows tall
- Grid adjusts to screen size (maintain visibility)
- UI safe zones for notched devices

#### Difficulty Progression
```javascript
const difficultyScaling = {
  distance: 0-50,
  vehicleSpeed: 100,
  gapFrequency: 0.4,      // 40% of lanes have gaps
  collectibleRate: 0.3,   // 30% chance per row
  
  distance: 50-100,
  vehicleSpeed: 120,
  gapFrequency: 0.35,
  collectibleRate: 0.25,
  
  distance: 100-200,
  vehicleSpeed: 140,
  gapFrequency: 0.3,
  collectibleRate: 0.2,
  
  distance: 200+,
  vehicleSpeed: 160,
  gapFrequency: 0.25,
  collectibleRate: 0.15
};
```

## PRD Summary

**Site Hopper** brings the addictive "one more game" loop of Crossy Road into the world of construction site navigation and inspection. Players guide their character forward through procedurally generated construction zones filled with moving vehicles, active drilling equipment, excavations, and hazardous areas. The core gameplay is simple but endlessly challenging: tap or swipe to hop forward, left, or right on an isometric grid, timing movements to avoid being hit by delivery trucks, forklifts, excavators, and other construction obstacles. The constant pressure from the bottom edge of the screen (death zone) forces forward progress, preventing players from camping in safe spots and maintaining the frantic, quick-decision pace that defines the genre.

The DMI theme integration is both visually charming and mechanically rich. Players navigate authentic construction site environments—busy roads with material deliveries, active drilling zones with rotating bits and rigs, material yards with forklifts weaving through aisles, railway crossings with warning signals, and excavation areas with open holes and heavy equipment. Collectible diamonds scattered throughout serve as currency for unlocking 100+ characters, from realistic roles (safety inspectors, site managers, operators) to whimsical interpretations (anthropomorphic drill bits, concrete block buddies, diamond mascots). Each character has unique visual personality, and some feature special passive abilities that change gameplay strategy slightly.

Built on Phaser 3 with efficient grid-based movement and object pooling, Site Hopper delivers smooth 60 FPS performance even with dozens of moving obstacles on screen. The procedural generation system ensures variety by cycling through zone types (road, drilling, material yard, railway, excavation, safe zones) with weighted randomness that prevents repetitive patterns. The voxel/blocky art style provides clear visual readability crucial for fast reactions, while maintaining the cheerful, accessible aesthetic that made Crossy Road a worldwide hit. With character collection as the long-term progression hook, daily challenges for replayability, and game sessions that last 30-180 seconds, Site Hopper offers the perfect mobile game formula: easy to learn, impossible to master, and endlessly replayable.

---

**Target Platforms:** iOS, Android, Web (Mobile-optimized)  
**Session Length:** 30-180 seconds per game  
**Monetization:** F2P with ads, character unlock IAP, ad removal, daily gift boxes  
**Development Time:** 8-10 weeks for MVP (includes character art pipeline)  
**Core Appeal:** Simple controls, endless variety, character collection, "one more try"
