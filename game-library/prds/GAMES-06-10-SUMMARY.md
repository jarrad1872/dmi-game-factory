# Action/Skill Games (6-10) - Research Summary

## Completed PRDs

### 6. **Diamond Blade Master** (Fruit Ninja Style)
**File:** `06-blade-master.md`
- **Theme:** Diamond saw blade operator slicing through materials
- **Core Mechanic:** Swipe to slice concrete, brick, stone, marble flying across screen
- **DMI Integration:** Materials represent actual cutting applications, blade types as unlockables
- **Key Innovation:** Blade heat mechanic prevents mindless swiping, rewards skillful cuts
- **Session Length:** 60-120 seconds
- **Appeal:** Satisfying tactile swipe mechanics, visual destruction feedback

---

### 7. **Drill Dive** (Flappy Bird Style)
**File:** `07-drill-dive.md`
- **Theme:** Diamond drill bit descending through borehole
- **Core Mechanic:** Tap to thrust upward against gravity, navigate rock formations
- **DMI Integration:** Geological cross-section view, realistic material obstacles
- **Key Innovation:** Depth meter as score, parallax earth layers, industrial aesthetic
- **Session Length:** 10-60 seconds
- **Appeal:** Brutal difficulty, "one more try" addiction, instant restart

---

### 8. **Site Hopper** (Crossy Road Style)
**File:** `08-site-hopper.md`
- **Theme:** Construction site inspector crossing busy job sites
- **Core Mechanic:** Tap/swipe to hop across grid, avoid vehicles and equipment
- **DMI Integration:** Authentic construction zones (roads, drilling areas, material yards)
- **Key Innovation:** 100+ unlockable characters (inspectors, equipment, mascots), procedural zones
- **Session Length:** 30-180 seconds
- **Appeal:** Endless variety, character collection, accessible difficulty

---

### 9. **Concrete Crusher** (Brick Breaker / Breakout Style)
**File:** `09-concrete-crusher.md`
- **Theme:** Diamond saw blade demolishing material structures
- **Core Mechanic:** Paddle deflects spinning saw blade to destroy material blocks
- **DMI Integration:** Realistic material types with varied durability, demolition jobs as levels
- **Key Innovation:** Material-specific destruction effects, industry-themed power-ups
- **Session Length:** 2-5 minutes per level
- **Appeal:** Satisfying destruction physics, strategic power-up use, precision control

---

### 10. **Diamond Target Practice** (Shooting Gallery / Duck Hunt Style)
**File:** `10-target-practice.md`
- **Theme:** DMI precision training range for equipment operators
- **Core Mechanic:** Tap to shoot moving material targets, avoid hazards
- **DMI Integration:** Industrial shooting range, material samples as targets, safety hazards
- **Key Innovation:** Combo system rewards accuracy, multiple game modes (campaign, time attack, accuracy, endurance)
- **Session Length:** 1-3 minutes per round
- **Appeal:** Instant gratification shooting, satisfying hit feedback, skill-based progression

---

## Common DMI Theme Elements Across All Games

### Materials Featured
- Concrete (standard, reinforced)
- Brick
- Asphalt
- Stone (granite, marble, limestone)
- Diamond ore/crystals
- Metal (rebar, steel beams)

### DMI Brand Integration
- Diamond tools as core game mechanics (blades, drill bits, saws)
- Industrial/construction site aesthetics
- Safety themes (hard hats, inspectors, hazards)
- Professional equipment operators as player roles
- Core drilling and cutting applications
- DMI blue (#0066CC) as primary brand color

### Progression Systems
- Currency: Diamonds collected in-game
- Unlockables: Equipment/character variants
- Achievement systems for milestones
- Leaderboards for competitive play
- Star ratings for performance

### Technical Consistency
- **Engine:** Phaser 3 for all games
- **Platforms:** iOS, Android, Web (mobile-optimized)
- **Performance Target:** 60 FPS
- **Responsive Design:** 375x667 to 428x926 (mobile), tablet support
- **Save System:** LocalStorage for progress/unlocks
- **Optimization:** Object pooling, texture atlases, particle limits

---

## Development Time Estimates

| Game | Complexity | Est. Dev Time | Priority |
|------|------------|---------------|----------|
| **Drill Dive** | Low | 4-6 weeks | **HIGH** (Quick win, viral potential) |
| **Diamond Blade Master** | Medium | 6-8 weeks | **HIGH** (Strong mobile appeal) |
| **Diamond Target Practice** | Medium | 6-8 weeks | Medium (Multiple modes add value) |
| **Concrete Crusher** | High | 8-10 weeks | Medium (Level design intensive) |
| **Site Hopper** | High | 8-10 weeks | Low (Character art pipeline complex) |

---

## Recommended Build Order

1. **Drill Dive** - Simplest mechanics, fastest to market, high viral potential
2. **Diamond Blade Master** - Strong mobile game feel, broad appeal
3. **Diamond Target Practice** - Satisfying shooting mechanics, multiple modes
4. **Concrete Crusher** - Requires level design pipeline
5. **Site Hopper** - Most content-intensive (100+ characters)

---

## Next Steps

- Review PRDs with stakeholders
- Select 2-3 games for initial prototype phase
- Create art style guide based on selected games
- Set up Phaser 3 development environment
- Build proof-of-concept demos (1-2 weeks each)
