# Game PRD #7: Drill Dive (Flappy Bird Style)

## Reference Games

**Primary Reference: Flappy Bird (Dong Nguyen)**
- Iconic tap-to-fly mechanic
- Screenshot URL: https://en.wikipedia.org/wiki/Flappy_Bird
- Simple but brutally difficult obstacle navigation

**Similar Games:**
- Swing Copters - Vertical variant by same creator
- Splashy Fish - Underwater theme variant
- Crossy Road - Similar difficulty, different perspective
- Timberman - Similar tap timing mechanic

## Core Mechanics

### Primary Action
- **Tap to Rise**: Single tap makes character rise/jump upward
- **Gravity**: Character constantly falls when not tapping
- **Navigate Obstacles**: Gaps between obstacle pairs
- **Momentum Physics**: Each tap adds upward velocity, gravity pulls down
- **Rhythm-based**: Success depends on tap timing and rhythm

### Win/Fail Conditions
**Win Conditions:**
- Pass through obstacle gaps successfully
- Achieve high scores (distance-based)
- Beat personal best
- Unlock achievements (pass X obstacles)

**Fail Conditions:**
- Hit top obstacle (instant death)
- Hit bottom obstacle (instant death)
- Touch ground/ceiling
- Single mistake = game over (no continues)

### Progression System
- Score = number of obstacles cleared
- Difficulty increases with distance (speed, gap size)
- Medal/ranking system based on score thresholds
- Unlockable characters/skins
- Daily challenges

### Difficulty Curve
- Constant, unforgiving difficulty (Flappy Bird style)
- OR gradual speed increase (more forgiving variant)
- Gap sizes may decrease slightly
- Obstacle patterns become less predictable
- Visual distractions increase

## DMI THEME CONCEPT: "DRILL DIVE"

### Creative Title
**"Drill Dive: Core Drilling Descent"**

### Player Role
You're piloting a diamond core drill bit descending through layers of earth on a deep drilling operation. Navigate the tight confines of the borehole, avoiding rock formations, rebar, and underground hazards while drilling deeper into the earth. Every meter counts in this high-stakes drilling challenge.

### What Are Collectibles/Targets?
**Primary Goal:**
- Drill deeper (measured in meters/feet)
- Each obstacle pair cleared = 1 meter deeper

**Collectibles (optional pickups between obstacles):**
- **Diamond Fragments** - Rare gems in the formation (bonus points)
- **Core Samples** - Cylindrical specimens (score multiplier)
- **DMI Logos** - Brand tokens (unlock new drill bits)
- **Depth Markers** - Milestone indicators (50m, 100m, 250m)

**Score System:**
- Primary: Depth in meters
- Secondary: Collected diamonds × 10 points
- Bonus: Perfect navigation (center of gap) × 1.5 multiplier

### What Are Obstacles/Enemies?
**Rock Formations (Obstacle Pairs):**
- **Granite Outcroppings** - Gray stone protrusions from top/bottom
- **Limestone Ledges** - Beige layered formations
- **Shale Shelves** - Flat, dark horizontal barriers
- **Quartz Veins** - Crystalline white/clear obstacles
- **Iron Ore Bands** - Reddish-brown metallic obstacles

**Hazard Variations:**
- **Rebar Arrays** - Metal reinforcement bars (narrower gaps)
- **Underground Pipes** - Utility obstacles (different colors)
- **Bedrock Narrowing** - Tighter passages
- **Water Seepage** - Visual effect creating distractions
- **Gas Pockets** - Bubble effects that obscure view

**Environmental Challenges:**
- Borehole walls that pulse/move
- Dust clouds that reduce visibility
- Vibration effects when near obstacles
- Lighting changes (darker as you go deeper)

### What Are Power-ups?
**Drill Enhancements (temporary):**
- **Shield Bit** - One-hit protection (glowing blue aura)
- **Precision Guide** - Laser guides showing safe path (5 seconds)
- **Slow Motion** - Time slows for easier navigation (3 seconds)
- **Magnet** - Auto-collect nearby diamonds
- **Ghost Mode** - Phase through one obstacle
- **Size Reduction** - Smaller hit box for 10 seconds

**Passive Upgrades (unlockable):**
- **Diamond Coating** - Reduced gravity (easier to control)
- **Balanced Bit** - Smoother physics
- **Cooling System** - Longer power-up duration
- **Advanced Sensor** - See upcoming obstacles sooner

### Visual Style Recommendations

**Art Style:**
- Side-scrolling underground cross-section view
- Realistic geological layers in background
- Industrial drill bit sprite with rotation animation
- Parallax earth layers scrolling at different speeds
- Particle effects: dust, sparks, drilling debris

**Color Palette:**
- **Background Gradient**: Brown earth (top) to dark stone (deep)
- **Obstacles**: Natural stone colors (grays, browns, reds)
- **Player**: Metallic silver drill bit with DMI blue accents
- **UI**: Industrial orange (#FF6600) and safety yellow
- **Effects**: Sparks (orange/white), dust (brown/gray), diamonds (cyan glow)

**Visual Effects:**
- Drill bit rotation animation (constant spin)
- Dust particles trailing behind bit
- Sparks when near obstacles
- Screen shake when navigating tight gaps
- Depth-based lighting (darker deeper you go)
- Parallax geological layers (3-4 layers)
- Smooth camera tracking with slight lag

**UI Elements:**
- Depth meter (large, prominent display)
- Score counter (top right)
- Power-up indicator (bottom center)
- Mini-map showing upcoming obstacles
- Best depth ghost marker

### Technical Specs for Phaser 3 Implementation

#### Core Systems

**Physics & Movement:**
```javascript
class DrillBit extends Phaser.Physics.Arcade.Sprite {
  // Constants
  GRAVITY = 1200;           // Downward acceleration
  FLAP_VELOCITY = -350;     // Upward velocity per tap
  ROTATION_SPEED = 360;     // Degrees per second
  MAX_FALL_SPEED = 400;     // Terminal velocity
  
  // Tap response
  onTap() {
    this.setVelocityY(this.FLAP_VELOCITY);
    this.playSound('drill_thrust');
  }
  
  update() {
    // Rotate continuously
    this.angle += this.ROTATION_SPEED * delta;
    
    // Limit fall speed
    if (this.body.velocity.y > this.MAX_FALL_SPEED) {
      this.body.velocity.y = this.MAX_FALL_SPEED;
    }
  }
}
```

**Obstacle Generation:**
```javascript
class ObstacleManager {
  GAP_SIZE = 150;              // Pixels between top/bottom
  OBSTACLE_SPACING = 250;      // Horizontal distance
  SCROLL_SPEED = -200;         // Pixels per second
  
  spawnObstacle() {
    const gapY = Phaser.Math.Between(100, 400);
    
    // Top obstacle
    const top = this.createObstacle('granite_top');
    top.y = gapY - this.GAP_SIZE / 2;
    
    // Bottom obstacle
    const bottom = this.createObstacle('granite_bottom');
    bottom.y = gapY + this.GAP_SIZE / 2;
    
    // Add to group with velocity
    this.obstacles.add([top, bottom]);
    top.body.setVelocityX(this.SCROLL_SPEED);
    bottom.body.setVelocityX(this.SCROLL_SPEED);
  }
  
  // Increase difficulty
  adjustDifficulty(depth) {
    if (depth > 50) this.GAP_SIZE = 140;
    if (depth > 100) this.GAP_SIZE = 130;
    if (depth > 200) this.SCROLL_SPEED = -220;
  }
}
```

**Collision Detection:**
```javascript
// Arcade Physics collision
this.physics.add.overlap(
  drillBit, 
  obstacles, 
  this.onCollision, 
  null, 
  this
);

onCollision(player, obstacle) {
  // Check if has shield
  if (player.hasShield) {
    player.removeShield();
    obstacle.destroy();
    return;
  }
  
  // Game over
  this.gameOver();
}
```

#### Asset Requirements

**Sprites & Animations:**
- Drill bit sprite (128x128 PNG) - multiple color variants
- Obstacle sprites: granite, limestone, shale, quartz (256x512 each)
- Rebar/pipe obstacles (thinner, metallic)
- Power-up icons (64x64 each)
- Diamond/collectible sprites (32x32)
- Background layers: earth strata (repeating textures)
- UI elements: depth meter, score display, buttons

**Animations:**
- Drill bit idle rotation (60fps loop)
- Thrust animation (particle burst)
- Collision explosion (10-frame sequence)
- Power-up activation glow
- Diamond sparkle (ambient loop)

**Audio:**
- Tap/thrust sound - mechanical drill sound
- Score/pass obstacle - subtle "ding"
- Collision/death - crash/rock breaking sound
- Power-up collect - power-up chime
- Background music - industrial/drilling ambiance (loopable)
- Ambient sounds - underground rumble, distant drilling

**Particles:**
- Dust trail (following drill bit)
- Sparks on thrust
- Collision debris
- Diamond shimmer
- Power-up aura

#### Key Technical Features

**Game Loop:**
```javascript
class DrillDiveScene extends Phaser.Scene {
  create() {
    // Setup physics
    this.physics.world.gravity.y = 1200;
    
    // Create player
    this.player = new DrillBit(this, 100, 300);
    
    // Obstacle manager
    this.obstacleManager = new ObstacleManager(this);
    
    // Input
    this.input.on('pointerdown', () => {
      if (!this.gameOver) {
        this.player.onTap();
      } else {
        this.scene.restart();
      }
    });
    
    // Spawn loop
    this.time.addEvent({
      delay: 2000,
      callback: () => this.obstacleManager.spawnObstacle(),
      loop: true
    });
  }
  
  update(time, delta) {
    // Update depth score
    this.depth += delta * 0.05; // 50 meters per second
    
    // Clean up off-screen obstacles
    this.obstacleManager.cleanupOffscreen();
    
    // Check bounds
    if (this.player.y < 0 || this.player.y > 600) {
      this.onGameOver();
    }
    
    // Adjust difficulty
    this.obstacleManager.adjustDifficulty(this.depth);
  }
}
```

**Difficulty Balancing:**
```javascript
const difficultyProfile = {
  0-50m: {
    gapSize: 150,
    speed: 200,
    obstacleTypes: ['granite']
  },
  50-100m: {
    gapSize: 140,
    speed: 210,
    obstacleTypes: ['granite', 'limestone']
  },
  100-200m: {
    gapSize: 130,
    speed: 220,
    obstacleTypes: ['granite', 'limestone', 'rebar']
  },
  200m+: {
    gapSize: 120,
    speed: 240,
    obstacleTypes: ['all']
  }
};
```

**Performance Optimizations:**
- Object pooling for obstacles (create 10, recycle)
- Particle count limits (max 200)
- Destroy obstacles when x < -100 (off screen)
- Single sprite atlas for all obstacles
- Optimize collision bodies (rectangles only)
- Disable physics on background layers

**Save System:**
```javascript
LocalStorage: {
  bestDepth: number,
  totalDepth: number,
  gamesPlayed: number,
  unlockedBits: [],
  achievements: [],
  settings: { sound, music, particles, difficulty }
}
```

#### Screen Sizes & Responsive Design
- Portrait orientation primary: 375x667 to 428x926
- Scale mode: FIT with aspect ratio lock
- Camera follows player Y-axis (smooth follow)
- Obstacles scale based on screen height
- UI elements positioned in safe zones
- Touch target size: minimum 44x44 points

#### Difficulty Modes
```javascript
const modes = {
  training: {
    gravity: 800,        // Gentler fall
    gapSize: 180,        // Wider gaps
    speed: 150           // Slower scroll
  },
  classic: {
    gravity: 1200,       // Standard
    gapSize: 150,
    speed: 200
  },
  hardcore: {
    gravity: 1500,       // Faster fall
    gapSize: 120,        // Tighter gaps
    speed: 250           // Faster scroll
  }
};
```

## PRD Summary

**Drill Dive** takes the brutally addictive one-button gameplay of Flappy Bird and transforms it into a white-knuckle core drilling descent through layers of earth. Players control a diamond-tipped drill bit navigating the tight confines of a borehole, tapping to thrust upward against gravity while avoiding rock formations, rebar, and underground obstacles. The core mechanic is pure and unforgiving: tap to rise, fall from gravity, thread the needle through increasingly challenging gaps. One mistake means starting over, creating the same "just one more try" compulsion that made Flappy Bird a cultural phenomenon.

The DMI theme integration is natural and visually compelling—players literally see the geological cross-section as they drill deeper, with parallax earth layers scrolling by and the drill bit spinning constantly. The depth meter becomes the score, measuring how many meters down you've successfully drilled. Collectible diamond fragments add optional risk-reward gameplay (go for the diamond between obstacles or play it safe?), while power-ups like Shield Bit and Precision Guide provide momentary relief from the relentless difficulty. The visual feedback—sparks flying when near obstacles, dust trailing the bit, screen shake on tight passes—makes every successful navigation feel earned and satisfying.

Built on Phaser 3's robust physics system, Drill Dive offers tight, responsive controls essential for this type of reflex-based game. The difficulty curve can be tuned for different audiences: a "Training Mode" with gentler gravity and wider gaps for casual players, or "Hardcore Mode" that rivals the original Flappy Bird's notorious difficulty. Multiple drill bit skins (unlocked through achievements), geological obstacle variety (granite, limestone, iron ore), and daily depth challenges provide progression without compromising the pure, skill-based core gameplay. With game sessions lasting 10-60 seconds and instant restart on death, Drill Dive delivers the perfect mobile experience: quick to play, hard to master, impossible to put down.

---

**Target Platforms:** iOS, Android, Web (Mobile-optimized)  
**Session Length:** 10-60 seconds per game  
**Monetization:** Ad-supported with drill bit skins, remove ads option  
**Development Time:** 4-6 weeks for MVP  
**Core Appeal:** Simple controls, brutal difficulty, "one more try" addiction
