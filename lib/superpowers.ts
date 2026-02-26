export type Superpower = {
  name: string;
  creature: string;
  emoji: string;
  chessConcept: string;
  csConcept: string;
  description: string;
  lesson: string;
};

export const SUPERPOWERS: Superpower[] = [
  {
    name: 'Cryptobiosis',
    creature: 'Tardigrade',
    emoji: '🐻',
    chessConcept: 'Fortress Defense',
    csConcept: 'Fault Tolerance',
    description: 'The tardigrade survives boiling water, freezing cold, radiation, and the vacuum of space. It shuts down and waits.',
    lesson: 'Sometimes the winning move is to survive. Build a fortress. Simplify. Make your creature unkillable. In code, build systems that recover from any crash.',
  },
  {
    name: 'Adaptive Camouflage',
    creature: 'Octopus',
    emoji: '🐙',
    chessConcept: 'Flexibility & Piece Coordination',
    csConcept: 'Polymorphism',
    description: 'The octopus changes color, texture, and shape in milliseconds. Each arm thinks independently.',
    lesson: 'Your chess creature must adapt to any position. Don\'t commit to one plan — stay flexible. In code, write interfaces that work with many types.',
  },
  {
    name: 'Swarm Intelligence',
    creature: 'Ant Colony',
    emoji: '🐜',
    chessConcept: 'Pawn Chains & Structure',
    csConcept: 'Distributed Systems',
    description: 'No single ant is smart. Together, they build cities, farm fungus, and wage wars. The colony is the organism.',
    lesson: 'Your pawns are an ant colony. Alone, each is weak. Together, they control the board. In code, distributed systems are stronger than any single server.',
  },
  {
    name: 'Underground Network',
    creature: 'Mycelium',
    emoji: '🍄',
    chessConcept: 'Piece Harmony & Connection',
    csConcept: 'Network Protocols',
    description: 'Mycelium connects entire forests underground. Trees share nutrients and warnings through the "wood wide web."',
    lesson: 'Everything is connected. A move on the queenside changes the weather on the kingside. In code, components communicate through well-defined protocols.',
  },
  {
    name: 'Pathfinding',
    creature: 'Slime Mold',
    emoji: '🧫',
    chessConcept: 'Calculation & Finding the Best Move',
    csConcept: 'Shortest Path Algorithms',
    description: 'Slime mold has no brain, yet it can solve mazes and recreate the Tokyo rail network. It explores all paths and optimizes.',
    lesson: 'Don\'t think you need to be a genius to find the best move. Explore systematically: LOOK at every piece, THINK about every capture, check, and threat. The Cheat Code IS the algorithm.',
  },
  {
    name: 'Pattern Recognition',
    creature: 'Immune System',
    emoji: '🛡️',
    chessConcept: 'Tactical Patterns (forks, pins, skewers)',
    csConcept: 'Pattern Matching & Machine Learning',
    description: 'Your immune system remembers every pathogen it\'s ever fought. The second infection is always weaker because the pattern is stored.',
    lesson: 'Every tactical pattern you learn is stored forever. See enough knight forks and you\'ll spot them instantly. In code, pattern matching is the foundation of AI.',
  },
  {
    name: 'Waggle Dance',
    creature: 'Honeybee',
    emoji: '🐝',
    chessConcept: 'Piece Communication & Coordination',
    csConcept: 'APIs & Message Passing',
    description: 'Bees communicate the location of flowers through a precise dance. Distance, direction, and quality — all encoded in movement.',
    lesson: 'Your pieces "talk" to each other. A rook on an open file "tells" the knight where to land. In code, APIs are the dance — precise protocols for sharing information.',
  },
  {
    name: 'Honeydew Economics',
    creature: 'Aphid',
    emoji: '🪲',
    chessConcept: 'Material Sacrifice & Investment',
    csConcept: 'Resource Management',
    description: 'Ants protect aphids because aphids produce sweet honeydew. It\'s an economy: protection for sugar.',
    lesson: 'Every sacrifice in chess is an investment. You give up material (sugar) to get something more valuable: time, position, attack. In code, you trade memory for speed, simplicity for features.',
  },
];
