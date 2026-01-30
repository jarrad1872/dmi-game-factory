# PRD 04: Timing/Rhythm Game - "Diamond Drill Beat"

## Reference Games

### Piano Tiles 2
- **Screenshot:** https://play-lh.googleusercontent.com/7BzH6G2v9vH8K9v9K9v9K9v9K9v9K9v9K9v9K9v9K9v9K9v9K9v9K9v9K9v9K9v=w2560-h1440
- **Developer:** Cheetah Games
- **Core Mechanic:** Tap black tiles as they scroll down, avoid white tiles, maintain rhythm to complete song

### Tiles Hop: EDM Rush
- **Screenshot:** https://play-lh.googleusercontent.com/TilesHop_Screenshot_Gameplay
- **Developer:** Amanotes
- **Core Mechanic:** Tap/hold to make ball bounce on tiles in time with music, collect gems, avoid gaps

### Beat Blade: Dash Dance
- **Screenshot:** https://play-lh.googleusercontent.com/BeatBlade_Screenshot
- **Developer:** Amanotes
- **Core Mechanic:** Swipe sword to slash oncoming beats in rhythm with music, multi-directional timing challenge

## Core Mechanics

### Primary Action
- **Timing Taps:** Tap on designated zones precisely in rhythm with visual/audio cues
- **Lane System:** 4 vertical lanes with descending timing markers
- **Hit Detection:**
  - **Perfect:** Within 50ms window → Full points + combo
  - **Great:** Within 100ms window → Partial points + combo continues
  - **Good:** Within 150ms window → Minimal points + combo breaks
  - **Miss:** Outside window or wrong lane → Combo breaks + health penalty

### Win/Fail Conditions
- **Win Conditions:**
  - Complete song/drill sequence without depleting health bar
  - Achieve target score threshold (1-3 star rating)
  - Maintain minimum accuracy percentage (e.g., 70% for completion)
  
- **Fail Conditions:**
  - Health bar fully depleted (too many misses/wrong taps)
  - Accuracy drops below minimum threshold mid-song
  
### Progression System
- **Song Library:** Unlock new drill sequences/songs by completing previous levels
- **Difficulty Tiers:** Easy (slow tempo, simple patterns), Medium (faster, complex patterns), Hard (expert speed, rapid patterns), Expert (maximum speed, intricate combos)
- **Star Ratings:** Earn 1-3 stars based on accuracy and score
- **Mastery:** Perfect S-rank (95%+ accuracy) unlocks bonus content
- **Currency:** Earn "Diamond Bits" currency for upgrades and cosmetics
- **Skill Trees:** Upgrade accuracy windows, health regeneration, score multipliers

## DMI Theme Concept

### Title: **"Diamond Drill Beat"**

### Tagline
*"Feel the rhythm. Hit the core. Drill to the beat!"*

### Player Role
**Diamond Core Drill Operator** working on high-precision drilling projects. Your job is to operate the drill press in perfect synchronization with the equipment's rhythm to create flawless core samples. Each tap represents a drill strike, and precision timing ensures clean cuts through concrete, asphalt, and other materials.

### Story Hook
You've joined DMI Tools Corp as a trainee drill operator at their flagship demonstration facility. To master the art of diamond core drilling, you must learn to feel the rhythm of the equipment—every drill press has its own tempo, every material creates its own beat. The legendary "Diamond Drill Masters" can drill to any rhythm without looking, creating perfectly smooth cores every time. Train through increasingly complex drilling sequences, from simple concrete slabs to intricate multi-layer materials, and earn your place among the masters!

### Visual Theme: Descending Drill Lanes

#### Lane Design
- **4 Vertical Lanes:** Each represents a drill press station
- **Descending Markers:** Diamond-tipped drill bits descend from top to bottom
- **Hit Zone:** Horizontal "drilling platform" at bottom where player taps
- **Background:** Industrial workshop with drill presses, sparks, material samples

#### Timing Markers (Notes)

**Standard Tap** - Single Drill Strike
- **Visual:** Blue diamond drill bit descending
- **Action:** Tap corresponding lane when marker reaches hit zone
- **Sound:** Metallic drill impact, pitch varies by lane

**Hold Note** - Continuous Drilling
- **Visual:** Extended blue drill bit with trailing particles
- **Action:** Tap and hold while marker passes through hit zone
- **Sound:** Sustained drilling hum, intensity increases during hold

**Double Tap** - Rapid Strikes
- **Visual:** Two drill bits close together
- **Action:** Tap lane twice in quick succession
- **Sound:** Double impact (bam-bam)

**Multi-Lane** - Synchronized Drilling
- **Visual:** Multiple drill bits aligned horizontally across lanes
- **Action:** Tap all corresponding lanes simultaneously
- **Sound:** Harmonic chord of drill impacts

**Slide Note** - Lane Change Mid-Drill
- **Visual:** Drill bit with arrow indicating direction (left/right)
- **Action:** Tap and slide to adjacent lane
- **Sound:** Sliding metallic scrape + impact

### Collectibles & Bonuses

#### Diamond Bits (In-Lane Collectibles)
- **Appearance:** Small blue diamonds floating in lanes
- **Collection:** Automatically collected when timing marker is hit perfectly
- **Value:** Currency for upgrades and cosmetics
- **Placement:** Reward challenging patterns and high-accuracy sections

#### Power Cores (Rare Bonuses)
- **Appearance:** Glowing pink diamond with pulse effect
- **Collection:** Hit Perfect on specifically marked notes
- **Effect:** Temporary 2x score multiplier for 5 seconds
- **Sound:** Ethereal chime on collection

#### Health Pickups
- **Appearance:** Green plus symbol with DMI medical cross
- **Collection:** Perfect hits on marked notes
- **Effect:** Restore 10% health bar
- **Use Case:** Forgiveness mechanism in longer/harder sequences

### Obstacles & Hazards

#### Concrete Chunks (Anti-Notes)
- **Visual:** Gray concrete debris descending in lanes
- **Rule:** DO NOT tap these—they break your combo
- **Penalty:** -10% health if tapped
- **Audio Feedback:** Harsh crack/error buzz

#### Rebar Interference (Lane Blockers)
- **Visual:** Horizontal rebar temporarily blocks lane
- **Duration:** 2-4 beats
- **Effect:** Cannot tap in blocked lane (skip those notes or game over)
- **Strategy:** Forces player to focus on other lanes

#### Speed Zones (Tempo Changes)
- **Visual:** Yellow warning zone, musical tempo notation (♩=140 BPM)
- **Effect:** Notes speed up or slow down temporarily
- **Challenge:** Adapt timing on the fly
- **DMI Theme:** Different materials require different drill speeds

### Song/Sequence Structure

Each "song" is a drilling project themed around material types:

#### 1. "Concrete Basics" (Tutorial/Easy)
- **Material:** Standard concrete slab
- **BPM:** 100 (slow, steady)
- **Duration:** 1 minute
- **Patterns:** Single lane, simple quarter-note rhythms

#### 2. "Asphalt Highway" (Easy)
- **Material:** Highway pavement
- **BPM:** 120
- **Duration:** 1.5 minutes
- **Patterns:** Two-lane alternation, eighth notes

#### 3. "Masonry Madness" (Medium)
- **Material:** Brick and mortar wall
- **BPM:** 140
- **Duration:** 2 minutes
- **Patterns:** Triple-lane, hold notes, double taps

#### 4. "Rebar Rumble" (Medium-Hard)
- **Material:** Reinforced concrete
- **BPM:** 160
- **Duration:** 2.5 minutes
- **Patterns:** Multi-lane chords, lane blockers, syncopation

#### 5. "Diamond Fortress" (Hard)
- **Material:** Ultra-hard aggregate
- **BPM:** 180
- **Duration:** 3 minutes
- **Patterns:** Four-lane chaos, rapid slides, speed zones

#### 6. "Pink Diamond Finale" (Expert)
- **Material:** Exotic precision drilling
- **BPM:** 200+
- **Duration:** 3+ minutes
- **Patterns:** Everything combined, extreme precision required

### Customization & Unlockables

#### Drill Bit Skins (Cosmetic)
1. **Classic Blue** (default)
2. **Chrome Steel** (10,000 bits)
3. **Gold Rush** (25,000 bits)
4. **Pink Diamond** (50,000 bits)
5. **Rainbow Core** (100,000 bits)
6. **Neon Laser** (Complete all Hard levels)
7. **Diamond Fusion** (S-rank all songs)

#### Hit Zone Themes
1. **Workshop Floor** (default)
2. **Construction Site** (5,000 bits)
3. **Diamond Mine** (15,000 bits)
4. **Futuristic Lab** (30,000 bits)
5. **Zero Gravity** (50,000 bits)

#### Background Environments
- Warehouse interior
- Active job site
- Underground tunnel
- City rooftop
- Space station drill bay

#### Audio Themes
- **Industrial Beats:** Real drill sounds mixed with electronic music
- **Rock Fusion:** Electric guitar riffs with percussion drilling
- **EDM Core:** High-energy dance beats with drill samples
- **Orchestral Drill:** Epic symphony with industrial undertones (unlockable)

## Visual Style Recommendations

### Art Direction
- **Style:** Bold, high-contrast 2D/3D hybrid with neon accents
- **Palette:**
  - Primary: Deep blue (#001F3F) background
  - Accents: Neon cyan (#00D9FF), electric pink (#FF006E), safety yellow (#FFD700)
  - Notes: Gradient blues, whites, gold for special notes
- **Lighting:** Dynamic lighting that pulses with beat, neon glow effects

### Lane Design
- **Width:** Each lane 1/4 of screen width (mobile portrait orientation)
- **Hit Zone:** Prominent horizontal line at bottom 1/4 of screen
- **Visual Guides:**
  - Lane dividers (subtle vertical lines)
  - Hit zone glow (brightens when marker approaches)
  - Perfect timing window (small white zone in center of hit zone)

### Note Animations
- **Descent:** Smooth linear movement from top to bottom
- **Approach:** Glow intensifies as marker nears hit zone
- **Hit Feedback:**
  - **Perfect:** Screen flash (white), radial burst particles, "PERFECT!" text
  - **Great:** Blue spark particles, "+50" score popup
  - **Good:** Small puff particles, "+10" score popup
  - **Miss:** Red X mark, screen shake, health bar flash

### Camera & Effects
- **Background:** Parallax scrolling (slower layers in back)
- **Beat Sync:** Background elements pulse/flash on strong beats
- **Combo Effects:** 
  - 10x: Lane borders glow
  - 25x: Background intensifies
  - 50x: Full-screen glow, "FEVER MODE!" text
  - 100x: Rainbow particle trails, everything pulsing

### UI Elements
- **Top Bar:**
  - Score (large, animated counter)
  - Accuracy percentage (real-time)
  - Combo counter (grows with streak)
- **Bottom Bar:**
  - Health bar (green → yellow → red as depletes)
  - Song progress bar with section markers
- **Side Panels:**
  - Current BPM indicator
  - Upcoming pattern preview (optional assist)

### Feedback Systems
- **Visual:** Instant particle effects, screen flashes, color changes
- **Audio:** Layered sound design (hit sound + music element + crowd cheer)
- **Haptic:** Vibration pulses on perfect hits (mobile)
- **Score:** Pop-up numbers fly toward score counter

## Technical Specifications (Phaser 3)

### Scene Architecture
```javascript
class RhythmGameScene extends Phaser.Scene {
  create() {
    this.lanes = this.createLanes(4);
    this.notes = []; // Active notes on screen
    this.chart = this.loadChart(currentSong); // Note timing data
    this.audio = this.sound.add(currentSong.audioKey);
    this.startTime = null;
    this.score = 0;
    this.combo = 0;
    this.health = 100;
    
    this.setupInput();
    this.startSong();
  }
  
  update(time, delta) {
    const songTime = this.audio.seek * 1000; // Current position in ms
    
    this.spawnNotes(songTime);
    this.updateNotes(delta);
    this.checkMissedNotes(songTime);
  }
}
```

### Key Systems

#### 1. Chart/Note Data Structure
```javascript
// Song chart format (JSON)
const songChart = {
  metadata: {
    title: "Concrete Basics",
    artist: "DMI Sound Team",
    bpm: 100,
    duration: 60000, // milliseconds
    difficulty: "easy"
  },
  notes: [
    { time: 1000, lane: 0, type: 'tap' },
    { time: 1500, lane: 1, type: 'tap' },
    { time: 2000, lane: 2, type: 'tap' },
    { time: 2500, lane: 3, type: 'tap' },
    { time: 3000, lane: 0, type: 'hold', duration: 1000 },
    { time: 4500, lane: [0, 1, 2, 3], type: 'multi-tap' },
    // ... hundreds more
  ],
  obstacles: [
    { time: 5000, lane: 1, type: 'concrete-chunk' },
    { time: 8000, lanes: [2, 3], type: 'rebar-blocker', duration: 2000 }
  ],
  collectibles: [
    { time: 2000, lane: 0, type: 'diamond-bit' },
    { time: 6000, lane: 2, type: 'power-core' }
  ]
};
```

#### 2. Note Spawning & Movement
```javascript
spawnNotes(currentTime) {
  const spawnOffset = 2000; // Spawn notes 2 seconds before they reach hit zone
  
  this.chart.notes.forEach(noteData => {
    if (noteData.spawned) return;
    
    if (currentTime >= noteData.time - spawnOffset) {
      const note = this.createNote(noteData);
      this.notes.push(note);
      noteData.spawned = true;
    }
  });
}

createNote(noteData) {
  const lane = this.lanes[noteData.lane];
  const note = this.add.sprite(lane.x, -100, 'drill-bit-blue');
  
  note.data = {
    type: noteData.type,
    hitTime: noteData.time,
    lane: noteData.lane,
    duration: noteData.duration || 0
  };
  
  // Calculate descent speed based on spawn offset
  const descendDistance = this.hitZone.y + 100;
  const descendTime = 2000; // Must match spawnOffset
  note.speed = descendDistance / descendTime; // pixels per ms
  
  return note;
}

updateNotes(delta) {
  this.notes.forEach(note => {
    note.y += note.speed * delta;
    
    // Visual feedback as note approaches hit zone
    const distance = this.hitZone.y - note.y;
    if (distance < 100) {
      note.setScale(1 + (100 - distance) / 100 * 0.3); // Grows slightly
      note.setAlpha(0.5 + (100 - distance) / 200); // Brightens
    }
    
    // Remove notes that scrolled past
    if (note.y > this.cameras.main.height + 100) {
      this.removeNote(note);
    }
  });
}
```

#### 3. Input Handling & Hit Detection
```javascript
setupInput() {
  // Create tap zones for each lane
  this.lanes.forEach((lane, index) => {
    const tapZone = this.add.rectangle(
      lane.x, this.hitZone.y,
      this.laneWidth, 200,
      0x000000, 0 // Invisible
    ).setInteractive();
    
    tapZone.on('pointerdown', () => this.handleLaneTap(index));
  });
  
  // Alternative: Keyboard input (for testing/desktop)
  this.input.keyboard.on('keydown-D', () => this.handleLaneTap(0));
  this.input.keyboard.on('keydown-F', () => this.handleLaneTap(1));
  this.input.keyboard.on('keydown-J', () => this.handleLaneTap(2));
  this.input.keyboard.on('keydown-K', () => this.handleLaneTap(3));
}

handleLaneTap(laneIndex) {
  const currentTime = this.audio.seek * 1000;
  
  // Find closest note in this lane
  const notesInLane = this.notes.filter(n => n.data.lane === laneIndex);
  if (notesInLane.length === 0) {
    this.handleMissedTap();
    return;
  }
  
  const closestNote = notesInLane.reduce((prev, curr) => {
    const prevDiff = Math.abs(prev.data.hitTime - currentTime);
    const currDiff = Math.abs(curr.data.hitTime - currentTime);
    return currDiff < prevDiff ? curr : prev;
  });
  
  const timingDiff = Math.abs(closestNote.data.hitTime - currentTime);
  
  // Evaluate hit accuracy
  if (timingDiff <= 50) {
    this.handleHit(closestNote, 'perfect', timingDiff);
  } else if (timingDiff <= 100) {
    this.handleHit(closestNote, 'great', timingDiff);
  } else if (timingDiff <= 150) {
    this.handleHit(closestNote, 'good', timingDiff);
  } else {
    this.handleMiss(closestNote);
  }
}

handleHit(note, accuracy, timingDiff) {
  // Scoring
  const baseScore = { perfect: 100, great: 50, good: 10 }[accuracy];
  const comboBonus = Math.min(this.combo * 0.1, 3.0); // Max 3x multiplier
  const finalScore = Math.floor(baseScore * (1 + comboBonus));
  
  this.score += finalScore;
  this.showScorePopup(note.x, note.y, `+${finalScore}`);
  
  // Combo management
  if (accuracy === 'perfect' || accuracy === 'great') {
    this.combo++;
    if (this.combo % 10 === 0) {
      this.showComboText(this.combo + 'x COMBO!');
    }
  } else {
    this.combo = 0;
  }
  
  // Visual feedback
  this.showHitEffect(note, accuracy);
  this.playHitSound(accuracy, note.data.lane);
  
  // Haptic feedback (mobile)
  if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
    navigator.vibrate(accuracy === 'perfect' ? 10 : 5);
  }
  
  // Remove note
  this.removeNote(note);
  
  // Update statistics
  this.updateAccuracy(accuracy);
}

handleMiss(note) {
  this.combo = 0;
  this.health -= 5;
  this.healthBar.setScale(this.health / 100, 1);
  
  if (this.health <= 0) {
    this.gameOver();
  }
  
  this.showMissEffect(note);
  this.playSound('miss-error');
  this.removeNote(note);
  this.updateAccuracy('miss');
}
```

#### 4. Audio Synchronization
```javascript
startSong() {
  // Countdown before song starts
  this.showCountdown('3', () => {
    this.showCountdown('2', () => {
      this.showCountdown('1', () => {
        this.showCountdown('GO!', () => {
          this.audio.play();
          this.startTime = this.time.now;
        });
      });
    });
  });
}

checkMissedNotes(currentTime) {
  const missWindow = 200; // Notes outside this window are auto-miss
  
  this.notes.forEach(note => {
    if (currentTime > note.data.hitTime + missWindow) {
      this.handleMiss(note);
    }
  });
}

// Audio offset calibration (handle device latency)
calibrateAudioOffset() {
  // Allow players to adjust offset in settings (-200ms to +200ms)
  this.audioOffset = this.registry.get('audioOffset') || 0;
  
  // Apply offset to all note hit times
  this.chart.notes.forEach(note => {
    note.time += this.audioOffset;
  });
}
```

#### 5. Special Note Types
```javascript
handleHoldNote(note, isHolding) {
  if (!note.holdStarted && isHolding) {
    // Player started holding
    note.holdStarted = true;
    note.holdStartTime = this.audio.seek * 1000;
    this.showHoldEffect(note);
  }
  
  if (note.holdStarted && isHolding) {
    // Player is holding - check duration
    const holdDuration = (this.audio.seek * 1000) - note.holdStartTime;
    const requiredDuration = note.data.duration;
    
    // Visual feedback (fill bar)
    const progress = Math.min(holdDuration / requiredDuration, 1.0);
    note.holdBar.setScale(progress, 1);
    
    if (holdDuration >= requiredDuration) {
      // Hold complete!
      this.handleHit(note, 'perfect', 0);
      note.holdStarted = false;
    }
  }
  
  if (note.holdStarted && !isHolding) {
    // Player released too early
    this.handleMiss(note);
    note.holdStarted = false;
  }
}

handleMultiTap(noteGroup) {
  // All lanes must be tapped within 100ms window
  const tapTimes = noteGroup.map(n => n.tapTime);
  const timeSpread = Math.max(...tapTimes) - Math.min(...tapTimes);
  
  if (timeSpread <= 100) {
    this.handleHit(noteGroup[0], 'perfect', 0);
    this.showMultiHitEffect(noteGroup);
    noteGroup.forEach(n => this.removeNote(n));
  } else {
    this.handleMiss(noteGroup[0]);
  }
}
```

### Asset Requirements

#### Sprites & Animations
- **Drill Bits:** Descending markers (7 skin variants)
- **Hold Notes:** Extended drill with particle trail
- **Obstacles:** Concrete chunks, rebar bars
- **Collectibles:** Diamond bits, power cores, health pickups
- **Hit Effects:** Radial bursts (perfect, great, good), X marks (miss)
- **Background:** Parallax layers (workshop, job site, drill presses)

#### UI Elements
- **Score Counter:** Large animated numbers
- **Combo Display:** Growing text with glow
- **Health Bar:** Gradient fill (green → red)
- **Progress Bar:** Song timeline with beat markers
- **Accuracy Stats:** Real-time percentage display
- **Star Rating:** 1-3 stars based on performance

#### Particles
- **Perfect Hit:** White radial burst + diamond sparkles
- **Great Hit:** Blue sparks
- **Good Hit:** Gray puffs
- **Miss:** Red X explosion
- **Combo Milestone:** Confetti burst
- **Power Core:** Rainbow trail particles

#### Audio
- **Music Tracks:** 
  - Industrial techno with drill samples (6-10 songs)
  - Layered tracks (bass, melody, percussion, drill effects)
  - Dynamic mix (elements drop out on misses, intensify on combos)
  
- **SFX:**
  - Drill impact (4 pitch variants for lanes)
  - Perfect hit (chime, bells)
  - Great hit (metallic clink)
  - Good hit (dull thud)
  - Miss (error buzz, crack)
  - Combo milestone (ascending arpeggio)
  - Health low warning (alarm beep)

### Performance Optimization

- **Note Pooling:** Reuse note sprites, max 50 active notes on screen
- **Particle Limits:** 150 particles max, cull oldest first
- **Audio Precision:** Use Web Audio API for < 10ms latency
- **Frame Rate:** Lock to 60fps, reduce effects on low-end devices
- **Input Polling:** Check input every frame for < 16ms response time

### Mobile Considerations
- **Touch Zones:** Full lane width from hit zone to mid-screen
- **Latency Compensation:** Auto-calibrate audio offset on first play
- **Battery:** Reduce particle density, pause when backgrounded
- **Portrait Orientation:** Vertical lanes optimal for one-handed play
- **Haptics:** Subtle vibration on perfect hits (enhances rhythm feel)

## PRD Summary

**Diamond Drill Beat** transforms the proven rhythm game formula into an industrial symphony where players become master drill operators syncing their taps to the beat of diamond-tipped precision equipment. The core mechanic—tap descending markers in rhythm—is universally understood, yet the DMI theming elevates it into a skill-based simulation of actual core drilling operations. Each lane represents a drill press station, every tap is a strike of the bit into material, and perfect timing reflects the real-world precision required in diamond tool operation. The game successfully balances accessibility (anyone can tap to a beat) with mastery (perfect timing and combo streaks demand focus and practice).

The progression system keeps players engaged across multiple dimensions: unlocking new "drilling projects" (songs) with increasing BPM and complexity, earning currency to purchase cosmetic drill bit skins and environment themes, and chasing S-rank perfect scores on every track. The dynamic difficulty curve—from leisurely "Concrete Basics" at 100 BPM to frenetic "Pink Diamond Finale" at 200+ BPM—ensures players of all skill levels find an appropriate challenge. The addition of obstacles (concrete chunks to avoid, rebar lane blockers) and collectibles (diamond bits for currency, power cores for score multipliers) adds strategic depth beyond pure timing, rewarding careful attention and pattern recognition.

From a technical standpoint, rhythm games demand precision audio synchronization and sub-50ms input latency—both achievable with Phaser 3's Web Audio API integration and optimized input polling. The chart-based note system allows for easy content creation using JSON files, enabling rapid development of new songs and difficulty variants. The visual feedback systems—instant particle bursts, screen flashes, dynamic score popups, combo text—create the "game feel" that makes rhythm games addictive, rewarding every successful tap with satisfying audiovisual feedback. Monetization opportunities include expanded song packs (themed around different DMI product lines), premium cosmetic unlocks, and optional assist features (larger timing windows, auto-play sections). Diamond Drill Beat positions itself as both a genuinely fun rhythm game and an interactive brand experience, turning every play session into a celebration of DMI's precision and expertise.
