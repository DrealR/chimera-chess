export type InsightCategory = 'sacrifice' | 'attention' | 'gravity' | 'flow' | 'general';

export type Insight = {
  text: string;
  category: InsightCategory;
};

export const INSIGHTS: Insight[] = [
  // --- Sacrifice ---
  { text: 'A sacrifice isn\'t a loss \u2014 it\'s attention warfare. You give up material to steal your opponent\'s focus.', category: 'sacrifice' },
  { text: 'The best sacrifices make your opponent\'s strongest piece their weakest organ.', category: 'sacrifice' },
  { text: 'Every sacrifice is a question: "Can you handle this much information at once?"', category: 'sacrifice' },
  { text: 'Honeydew economics: give up sugar to get protection. Give up a pawn to get a hurricane.', category: 'sacrifice' },
  { text: 'If your opponent is spending time capturing your bait, they\'re not spending time on their plan.', category: 'sacrifice' },

  // --- Attention ---
  { text: 'Attention has four functions: LURE, SHIELD, ENGINE, CLIMATE CONTROL.', category: 'attention' },
  { text: 'LURE: Force your opponent to look where you want. The decoy controls the gaze.', category: 'attention' },
  { text: 'SHIELD: What your opponent can\'t see, they can\'t stop. Hide your real threat.', category: 'attention' },
  { text: 'ENGINE: The more squares you see, the more power you generate. Influence IS energy.', category: 'attention' },
  { text: 'CLIMATE CONTROL: You set the mood. Chaos benefits the attacker. Calm benefits the defender.', category: 'attention' },
  { text: 'The Cheat Code: LOOK at every piece. THINK about their jobs. CHECK every capture, check, threat. MOVE. RESET.', category: 'attention' },
  { text: 'Blitz tests your reflexes. Classical tests your brain. Both test your creature.', category: 'attention' },

  // --- Gravity ---
  { text: 'Every piece creates a gravity field. Knights warp space \u2014 nothing moves in a straight line near them.', category: 'gravity' },
  { text: 'The center is where two hurricanes collide. Control it and you control the weather.', category: 'gravity' },
  { text: 'Your king is the eye of your hurricane. Everything spirals around it.', category: 'gravity' },
  { text: 'Moses Parting the Sea: split your opponent\'s army in two. Each half is weaker than the whole.', category: 'gravity' },
  { text: 'A knight in the center is a vortex. It reaches 8 squares \u2014 a gravitational monster.', category: 'gravity' },
  { text: 'Rooks need highways. Open files are their gravity lanes.', category: 'gravity' },

  // --- Flow ---
  { text: 'Your army is ONE creature. Pieces aren\'t individuals \u2014 they\'re organs.', category: 'flow' },
  { text: 'A creature that can\'t breathe is already dead. Influence IS breathing.', category: 'flow' },
  { text: 'Tempo is the heartbeat. Miss a beat and your creature stumbles.', category: 'flow' },
  { text: 'When all your pieces work together, your creature achieves flow state.', category: 'flow' },
  { text: 'Zugzwang: when any move makes your creature sicker. Sometimes the best move is no move \u2014 but you don\'t get that luxury.', category: 'flow' },
  { text: 'Three phases, three lives. Opening = birth. Middlegame = hunt. Endgame = final form.', category: 'flow' },

  // --- General ---
  { text: 'Everything is connected. A pawn move on the queenside changes the weather on the kingside.', category: 'general' },
  { text: 'The pawn is a stem cell. It can become anything \u2014 but only if it survives.', category: 'general' },
  { text: 'Don\'t move a piece just because you can. Every move should have a JOB.', category: 'general' },
  { text: 'Castle your king: protect your DNA. Activate your rooks: release your skeleton.', category: 'general' },
  { text: 'The bishop pair sees every color. Two circulatory systems covering all 64 squares.', category: 'general' },
  { text: 'In the endgame, the king transforms from VIP to warrior. Activate your DNA.', category: 'general' },
];

/** Pick a random insight, optionally filtered by category */
export function randomInsight(category?: InsightCategory): Insight {
  const pool = category ? INSIGHTS.filter((i) => i.category === category) : INSIGHTS;
  return pool[Math.floor(Math.random() * pool.length)];
}
