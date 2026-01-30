// Game Templates Data - extracted from PRDs
export interface GameTemplate {
  id: string;
  number: number;
  title: string;
  category: string;
  description: string;
  dmiTitle: string;
  dmiConcept: string;
  collectibles: string[];
  obstacles: string[];
  powerUps: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  referenceGames: string[];
  prdFile: string;
}

export const gameTemplates: GameTemplate[] = [
  {
    id: 'endless-runner',
    number: 1,
    title: 'Endless Runner',
    category: 'Arcade',
    description: 'Run endlessly while dodging obstacles and collecting items',
    dmiTitle: 'Core Runner Pro',
    dmiConcept: 'You are a DMI core drill operator running through endless construction sites. Dodge concrete barriers, rebar obstacles, and collect diamond core bits to power up.',
    collectibles: ['Diamond Core Bits', 'Blade Shards', 'Power Cells', 'Safety Helmets'],
    obstacles: ['Concrete Barriers', 'Rebar Spikes', 'Wet Cement', 'Equipment'],
    powerUps: ['Speed Boost', 'Invincibility Shield', 'Magnet Attract', 'Double Score'],
    difficulty: 'Medium',
    estimatedTime: '2-3 days',
    referenceGames: ['Subway Surfers', 'Temple Run', 'Jetpack Joyride'],
    prdFile: '01-endless-runner.md'
  },
  {
    id: 'match3-puzzle',
    number: 2,
    title: 'Match-3 Puzzle',
    category: 'Puzzle',
    description: 'Match 3+ identical items to clear them from the board',
    dmiTitle: 'Diamond Match Pro',
    dmiConcept: 'Match diamond tools, core bits, and blades to complete customer orders. Create combos for bonus points and unlock rare DMI products.',
    collectibles: ['Diamond Blades', 'Core Bits', 'Tool Combos', 'Rare Minerals'],
    obstacles: ['Concrete Blocks', 'Locked Items', 'Time Limits'],
    powerUps: ['Hammer Smash', 'Row Clear', 'Color Bomb', 'Extra Moves'],
    difficulty: 'Easy',
    estimatedTime: '2 days',
    referenceGames: ['Candy Crush', 'Bejeweled', 'Gardenscapes'],
    prdFile: '02-match3-puzzle.md'
  },
  {
    id: 'stacking-tower',
    number: 3,
    title: 'Tower Builder',
    category: 'Arcade',
    description: 'Stack blocks perfectly to build the tallest tower',
    dmiTitle: 'Tower Stack Pro',
    dmiConcept: 'Stack DMI equipment boxes and tool crates to build the tallest warehouse tower. Precision matters - misaligned boxes get cut off!',
    collectibles: ['Perfect Stack Bonus', 'Tool Crates', 'Equipment Boxes'],
    obstacles: ['Wind Gusts', 'Narrow Platforms', 'Unstable Loads'],
    powerUps: ['Slow Motion', 'Wide Base', 'Auto-Align'],
    difficulty: 'Easy',
    estimatedTime: '1-2 days',
    referenceGames: ['Stack', 'Tower Bloxx', 'Stacky Dash'],
    prdFile: '03-stacking-tower.md'
  },
  {
    id: 'timing-rhythm',
    number: 4,
    title: 'Timing & Rhythm',
    category: 'Arcade',
    description: 'Tap in time with the rhythm to hit targets',
    dmiTitle: 'Rhythm Drill Master',
    dmiConcept: 'Tap to the beat to time your core drilling perfectly. Hit concrete sections at the right moment for maximum efficiency.',
    collectibles: ['Perfect Hits', 'Combo Chains', 'Diamond Notes'],
    obstacles: ['Reinforced Concrete', 'Steel Rebar', 'Speed Changes'],
    powerUps: ['Slow Tempo', 'Perfect Zone', 'Score Multiplier'],
    difficulty: 'Medium',
    estimatedTime: '2-3 days',
    referenceGames: ['Piano Tiles', 'Tiles Hop', 'Beat Saber'],
    prdFile: '04-timing-rhythm.md'
  },
  {
    id: 'idle-clicker',
    number: 5,
    title: 'Idle Clicker',
    category: 'Simulation',
    description: 'Click to earn currency, upgrade automatically',
    dmiTitle: 'Diamond Empire Tycoon',
    dmiConcept: 'Build your diamond tool empire from a small shop to a global manufacturer. Click to manufacture tools, hire workers, automate production.',
    collectibles: ['Diamond Credits', 'Tool Blueprints', 'Factory Upgrades'],
    obstacles: ['Market Crashes', 'Material Shortages', 'Competition'],
    powerUps: ['Production Boost', 'Auto-Clicker', 'Manager Hire'],
    difficulty: 'Easy',
    estimatedTime: '2-3 days',
    referenceGames: ['Cookie Clicker', 'AdVenture Capitalist', 'Egg Inc'],
    prdFile: '05-idle-clicker.md'
  },
  {
    id: 'blade-master',
    number: 6,
    title: 'Blade Master',
    category: 'Action',
    description: 'Swipe to slice through materials',
    dmiTitle: 'Blade Master Pro',
    dmiConcept: 'Swipe to slice through concrete, asphalt, and rebar with DMI diamond blades. Time your cuts for maximum efficiency and combo points.',
    collectibles: ['Perfect Slices', 'Combo Multipliers', 'Blade Shards'],
    obstacles: ['Steel Rebar', 'Hard Aggregate', 'Time Limits'],
    powerUps: ['Mega Blade', 'Slow Motion', 'Auto-Slice'],
    difficulty: 'Medium',
    estimatedTime: '2 days',
    referenceGames: ['Fruit Ninja', 'Slice It', 'Juice Cubes'],
    prdFile: '06-blade-master.md'
  },
  {
    id: 'drill-dive',
    number: 7,
    title: 'Drill Dive',
    category: 'Action',
    description: 'Tap to fly through obstacles',
    dmiTitle: 'Core Drill Dive',
    dmiConcept: 'Guide your core drill bit through underground obstacles. Tap to drill up, release to fall. Avoid rock formations and collect diamonds.',
    collectibles: ['Diamond Deposits', 'Core Samples', 'Depth Bonuses'],
    obstacles: ['Rock Formations', 'Underground Rivers', 'Magma Pockets'],
    powerUps: ['Shield', 'Speed Boost', 'Magnetic Pull'],
    difficulty: 'Hard',
    estimatedTime: '2 days',
    referenceGames: ['Flappy Bird', 'Helix Jump', 'Diving Duck'],
    prdFile: '07-drill-dive.md'
  },
  {
    id: 'site-hopper',
    number: 8,
    title: 'Site Hopper',
    category: 'Action',
    description: 'Hop across job site obstacles',
    dmiTitle: 'Job Site Hopper',
    dmiConcept: 'Hop your DMI equipment across busy job sites. Dodge traffic, jump over barriers, and deliver tools to waiting contractors.',
    collectibles: ['Tool Deliveries', 'Time Bonuses', 'Safety Points'],
    obstacles: ['Construction Vehicles', 'Wet Concrete', 'Crane Loads'],
    powerUps: ['Super Jump', 'Time Freeze', 'Ghost Mode'],
    difficulty: 'Medium',
    estimatedTime: '2-3 days',
    referenceGames: ['Crossy Road', 'Frogger', 'Hoppy Road'],
    prdFile: '08-site-hopper.md'
  },
  {
    id: 'concrete-crusher',
    number: 9,
    title: 'Concrete Crusher',
    category: 'Action',
    description: 'Break through concrete barriers',
    dmiTitle: 'Concrete Crusher Pro',
    dmiConcept: 'Use DMI blades and core bits to break through concrete barriers. Angle your shots, use power-ups, and clear the level.',
    collectibles: ['Concrete Chunks', 'Blade Power', 'Bonus Points'],
    obstacles: ['Steel Rebar', 'Thick Concrete', 'Moving Barriers'],
    powerUps: ['Explosive Shot', 'Multi-Ball', 'Power Strike'],
    difficulty: 'Medium',
    estimatedTime: '2 days',
    referenceGames: ['Brick Breaker', 'Arkanoid', 'Breakout'],
    prdFile: '09-concrete-crusher.md'
  },
  {
    id: 'target-practice',
    number: 10,
    title: 'Target Practice',
    category: 'Action',
    description: 'Shoot targets with precision',
    dmiTitle: 'Precision Driller',
    dmiConcept: 'Test your drilling accuracy on targets. Hit bullseyes for maximum points. Different materials require different techniques.',
    collectibles: ['Bullseyes', 'Streak Bonuses', 'Tool Upgrades'],
    obstacles: ['Moving Targets', 'Wind Effects', 'Obstacles'],
    powerUps: ['Steady Aim', 'Time Slow', 'Multi-Shot'],
    difficulty: 'Easy',
    estimatedTime: '1-2 days',
    referenceGames: ['Duck Hunt', 'Shooting Arcade', 'Carnival Games'],
    prdFile: '10-target-practice.md'
  },
  {
    id: 'memory-match',
    number: 11,
    title: 'Memory Match',
    category: 'Puzzle',
    description: 'Flip cards to find matching pairs',
    dmiTitle: 'Tool Match Pro',
    dmiConcept: 'Match DMI tools with their specifications. Memory game meets product education - learn our catalog while you play.',
    collectibles: ['Matched Pairs', 'Perfect Rounds', 'Product Knowledge'],
    obstacles: ['Time Limits', 'Increasing Grid Size'],
    powerUps: ['Reveal Pair', 'Extra Time', 'Shuffle'],
    difficulty: 'Easy',
    estimatedTime: '1-2 days',
    referenceGames: ['Memory Match', 'Concentration', 'Lumosity'],
    prdFile: '11-memory-match.md'
  },
  {
    id: 'sliding-puzzle-2048',
    number: 12,
    title: 'Sliding Puzzle',
    category: 'Puzzle',
    description: 'Merge tiles to create higher values',
    dmiTitle: 'Diamond Merge 2048',
    dmiConcept: 'Merge DMI products to create higher-tier tools. Start with raw diamonds, end with professional blade packages.',
    collectibles: ['Merged Products', 'Tier Upgrades', 'Score Milestones'],
    obstacles: ['Grid Lock', 'Limited Space'],
    powerUps: ['Undo Move', 'Clear Space', 'Auto-Merge'],
    difficulty: 'Medium',
    estimatedTime: '2 days',
    referenceGames: ['2048', 'Threes', 'Drop7'],
    prdFile: '12-sliding-puzzle-2048.md'
  },
  {
    id: 'word-game',
    number: 13,
    title: 'Word Game',
    category: 'Puzzle',
    description: 'Guess industry terms and product names',
    dmiTitle: 'DMI Word Master',
    dmiConcept: 'Guess construction industry terms and DMI product names. Educational word game that teaches our catalog and industry vocabulary.',
    collectibles: ['Correct Words', 'Streak Bonuses', 'Hints Earned'],
    obstacles: ['Limited Guesses', 'Time Pressure'],
    powerUps: ['Extra Guess', 'Reveal Letter', 'Skip Word'],
    difficulty: 'Medium',
    estimatedTime: '2 days',
    referenceGames: ['Wordle', 'Scrabble', 'Words with Friends'],
    prdFile: '13-word-game.md'
  },
  {
    id: 'quiz-trivia',
    number: 14,
    title: 'Quiz Trivia',
    category: 'Puzzle',
    description: 'Test knowledge of tools and industry',
    dmiTitle: 'DMI Knowledge Pro',
    dmiConcept: 'Test your knowledge of diamond tools, concrete cutting, and the construction industry. Educational quiz with rewards.',
    collectibles: ['Correct Answers', 'Knowledge Points', 'Badges'],
    obstacles: ['Timed Questions', 'Increasing Difficulty'],
    powerUps: ['50/50', 'Extra Time', 'Ask Expert'],
    difficulty: 'Easy',
    estimatedTime: '2-3 days',
    referenceGames: ['Trivia Crack', 'QuizUp', 'Kahoot'],
    prdFile: '14-quiz-trivia.md'
  },
  {
    id: 'slot-machine',
    number: 16,
    title: 'Slot Machine',
    category: 'Casino',
    description: 'Spin to win prizes and discounts',
    dmiTitle: 'DMI Prize Spinner',
    dmiConcept: 'Trade show prize wheel game. Spin to win DMI merchandise, tool discounts, and promotional items. Perfect for events.',
    collectibles: ['Prizes', 'Discount Codes', 'Free Merch'],
    obstacles: ['Near Misses', 'Limited Spins'],
    powerUps: ['Free Spin', 'Double Prize', 'Bonus Round'],
    difficulty: 'Easy',
    estimatedTime: '1-2 days',
    referenceGames: ['Slotomania', 'Jackpot Party', 'Vegas Slots'],
    prdFile: '16-slot-machine.md'
  },
  {
    id: 'claw-machine',
    number: 17,
    title: 'Claw Machine',
    category: 'Arcade',
    description: 'Grab prizes with precision claw control',
    dmiTitle: 'DMI Claw Master',
    dmiConcept: 'Control a crane claw to grab DMI products and swag. Time your drop, aim carefully, and win prizes. Trade show attraction.',
    collectibles: ['Tools', 'Merchandise', 'Rare Items'],
    obstacles: ['Slippery Items', 'Time Limit', 'Obstacles'],
    powerUps: ['Strong Claw', 'Slow Motion', 'Precision Aim'],
    difficulty: 'Medium',
    estimatedTime: '2 days',
    referenceGames: ['Clawee', 'Prize Claw', 'Arcade Claw'],
    prdFile: '17-claw-machine.md'
  },
  {
    id: 'delivery-driving',
    number: 18,
    title: 'Delivery Driver',
    category: 'Simulation',
    description: 'Deliver tools to job sites on time',
    dmiTitle: 'DMI Delivery Dash',
    dmiConcept: 'Race against the clock to deliver DMI tools to construction sites. Navigate traffic, avoid delays, satisfy customers.',
    collectibles: ['On-Time Deliveries', 'Customer Satisfaction', 'Bonus Routes'],
    obstacles: ['Traffic', 'Construction Zones', 'Weather'],
    powerUps: ['Speed Boost', 'Traffic Pass', 'Time Extension'],
    difficulty: 'Medium',
    estimatedTime: '2-3 days',
    referenceGames: ['Crazy Taxi', 'Delivery Dash', 'Uber Driver'],
    prdFile: '18-delivery-driving.md'
  }
];

export const categories = ['All', 'Arcade', 'Action', 'Puzzle', 'Simulation', 'Casino'];

export function getTemplateById(id: string): GameTemplate | undefined {
  return gameTemplates.find(t => t.id === id);
}

export function getTemplatesByCategory(category: string): GameTemplate[] {
  if (category === 'All') return gameTemplates;
  return gameTemplates.filter(t => t.category === category);
}
