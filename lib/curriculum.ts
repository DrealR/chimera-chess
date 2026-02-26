export type CurriculumWeek = {
  week: number;
  title: string;
  chess: string;
  chimera: string;
  cs: string;
  creatureCheck?: string;
};

export type CurriculumPhase = {
  name: string;
  theme: string;
  chimeraTheme: string;
  csTheme: string;
  color: string;
  weeks: CurriculumWeek[];
};

export const PHASES: CurriculumPhase[] = [
  {
    name: 'Phase 1: Foundations',
    theme: 'Core organism philosophy. "Your army is ONE creature."',
    chimeraTheme: 'Every piece is a body part. The board is your creature\'s world.',
    csTheme: 'What is a system? Coordinates, variables, logic.',
    color: '#50c878',
    weeks: [
      {
        week: 1,
        title: 'The Board & Squares',
        chess: 'Identify all 64 squares using algebraic notation (file + rank). Understand files (a-h) and ranks (1-8). Set up the board correctly. Play "Simon Says" square-naming games.',
        chimera: 'Introduce the ONE CREATURE concept: your 16 pieces aren\'t separate toys — they\'re ONE living creature. The board is its WORLD. The CENTER (d4, d5, e4, e5) is the best neighborhood — like standing at the center of a basketball court where you can pass anywhere. Corners are dead ends.',
        cs: 'The chessboard is a COORDINATE SYSTEM — every square has a unique address (e4). This is how computers identify locations: X and Y coordinates. Google Maps works the same way with latitude and longitude.',
        creatureCheck: 'If the chessboard is your creature\'s world, what part of the board would be the BEST place for it to stand? Why?',
      },
      {
        week: 2,
        title: 'Pawns & The King',
        chess: 'Pawn movement: forward one (two on first move), captures diagonally. King movement: one square any direction. Activity: "Pawn Race" — 8 pawns each, first to get one across wins.',
        chimera: 'The pawn is the SKIN — first thing the opponent touches. The ONLY piece that can transform (promotion). That\'s the tardigrade — looks weak but survives everything and comes back stronger. The king is the HEART. If the heart stops, the creature dies. Every pawn move is permanent — what does that teach about choices?',
        cs: 'VARIABLES vs CONSTANTS: pawn position changes (variable), the rule it can\'t go backward never changes (constant). The king is the MAIN PROGRAM — if it crashes, everything stops. That\'s why computers have firewalls.',
        creatureCheck: 'Your pawn got captured. Is your creature dead? What did that pawn\'s sacrifice protect?',
      },
      {
        week: 3,
        title: 'Rooks & Knights',
        chess: 'Rook: straight lines, any distance, can\'t jump (5 pts). Knight: L-shape (2+1), ONLY piece that jumps (3 pts). Practice: rook mazes, knight tours, capture-the-pawn games.',
        chimera: 'Rook = BONES — the skeleton that gives structure. Needs clear highways. A rook behind pawns is a skeleton trapped under rubble. Knight = JOINTS — bends in unexpected directions. Only piece that jumps obstacles. Your creature needs BOTH: straightforward power AND creative flexibility.',
        cs: 'STRAIGHT-LINE vs NON-LINEAR SEARCH: Google goes through results in order (rook-style). But sometimes the best answer isn\'t on the obvious path — think sideways (knight-style). The knight\'s jump is a SHORTCUT.',
        creatureCheck: 'A knight in the center reaches 8 squares. In the corner, only 2. Same piece! What changed? What does that tell you about WHERE you position yourself?',
      },
      {
        week: 4,
        title: 'Bishops & Queen',
        chess: 'Bishop: diagonal movement, any distance, color-bound forever (3 pts). Queen: rook + bishop combined, most powerful piece (9 pts). Two bishops cover the whole board. Practice: bishop races, queen vs. pawns.',
        chimera: 'Bishop = EYES — sees along diagonals, the invisible lines beginners miss. Permanently blind to half the board. Bishop PAIR covers each other\'s blind spots — like the mycelium network underground. Queen = STRONGEST MUSCLE. But power without support = vulnerability. Don\'t bring her out too early.',
        cs: 'SPECIALIZATION vs GENERALIZATION: Bishop does one thing really well (specialist). Queen does everything but is expensive to lose (generalist). You need both. Bishop\'s blind spot = a program that only handles certain data types.',
        creatureCheck: 'Your creature lost its queen. Is the game over? What if you still have both bishops, two rooks, and five pawns?',
      },
      {
        week: 5,
        title: 'Special Moves',
        chess: 'Castling: king moves 2 toward rook, rook jumps over. En passant: capture a pawn "in passing." Pawn promotion: reaches end, becomes any piece. Rules for legal/illegal castling.',
        chimera: 'Castling = building a FORTRESS around the heart. Tardigrade entering its tun state — protect the core, then operate from safety. Pawn promotion = the ultimate transformation. Every queen was once a pawn that didn\'t quit. En passant = the exception. Every system has edge cases.',
        cs: 'EDGE CASES: weird situations where normal rules don\'t apply. En passant and castling are chess\'s edge cases. Good programmers handle them. Pawn promotion = UPGRADING SOFTWARE — same code, new capabilities.',
        creatureCheck: 'When your creature castles, what\'s it doing? Is it being scared or smart? What\'s the difference?',
      },
      {
        week: 6,
        title: 'Check, Checkmate & Stalemate',
        chess: 'Check: king under attack, must escape. Three ways out: move king, block, capture attacker. Checkmate: check + no escape = game over. Stalemate: NOT in check + no legal moves = draw.',
        chimera: 'Check = immune system activating: THREAT DETECTED. Three options: run, shield, or fight. Checkmate = heart stops, no restart. Stalemate = creature frozen — power without precision backfires. Being in trouble doesn\'t mean it\'s over — always look for ALL options.',
        cs: 'IF/THEN/ELSE logic: IF check, THEN escape. IF can\'t escape, THEN checkmate. ELSE IF not in check but can\'t move, THEN stalemate. Three escape options = three branches of code.',
        creatureCheck: 'Your creature is in check. Name all three ways to save it. Which body parts could help?',
      },
      {
        week: 7,
        title: 'Basic Tactics & Piece Values',
        chess: 'Piece values: P=1, N/B=3, R=5, Q=9, K=priceless. Good trades vs bad trades. Forks: attacking two pieces at once. Pins: trapping a piece that can\'t move without exposing something worse.',
        chimera: 'Don\'t just count points — ask: "Is my creature HEALTHIER after this trade?" A fork is your creature striking ONE limb in TWO directions — maximum efficiency. A pin freezes an enemy limb. Like a wrestler pinning your arm.',
        cs: 'COST-BENEFIT ANALYSIS: every trade is a calculation. "I give 3, get 5, net gain = 2." A fork is MULTITASKING — one piece doing two jobs. Computers do this with parallel processing.',
        creatureCheck: 'You can trade your knight (3) for their rook (5). Good deal? But what if your knight was the only thing protecting your king\'s heart?',
      },
      {
        week: 8,
        title: 'Mini-Tournament',
        chess: 'Touch-move rule, etiquette, sportsmanship. Apply opening principles: control center, develop, castle. Post-game analysis. Awards for participation, improvement, sportsmanship, best game.',
        chimera: 'Your creature\'s first REAL battle. Tournament pressure is like the first time your immune system faces a real virus — it\'s hard, but you build antibodies. Win or lose, your creature SURVIVED and LEARNED. Use LOOK → THINK → CHECK review.',
        cs: 'TESTING & DEBUGGING: you don\'t know if code works until you test it. The tournament IS the test. Post-game analysis = debugging. "Where did my program break? How do I fix it?"',
        creatureCheck: 'Your creature just fought its first battles. It might have lost some. Is it weaker now, or STRONGER because of what it learned?',
      },
    ],
  },
  {
    name: 'Phase 2: Tactical Development',
    theme: 'Your creature learns to FIGHT. Pattern recognition is its immune system.',
    chimeraTheme: 'Each tactic is a different STRIKE: fork = two-handed strike, pin = hold, skewer = through-attack, discovered attack = hidden blade.',
    csTheme: 'PATTERN RECOGNITION & ALGORITHMS. Each tactic is a pattern. Like training an AI — more examples = faster recognition.',
    color: '#5090ff',
    weeks: [
      { week: 9, title: 'Forks', chess: 'Knight forks, pawn forks, queen forks. Attacking two pieces at once.', chimera: 'One move, two threats = maximum efficiency. The ant colony principle.', cs: 'Multithreading / parallel processing — one operation, multiple results.' },
      { week: 10, title: 'Pins', chess: 'Absolute pins (can\'t move) vs relative pins (shouldn\'t move). Pin exploiting.', chimera: 'Freezing a limb in place. The nerve pinch.', cs: 'Dependency locks / blocking — one process can\'t proceed until another finishes.' },
      { week: 11, title: 'Skewers', chess: 'Attacking a valuable piece to reach what\'s behind it. Reverse pins.', chimera: 'Attacking through layers — the creature\'s x-ray vision.', cs: 'Stack data structures — popping the top to access what\'s underneath.' },
      { week: 12, title: 'Discovered Attacks', chess: 'Moving one piece reveals an attack by another. Discovered check.', chimera: 'Hidden power revealed. The creature\'s stealth capability.', cs: 'Event listeners & triggers — one action fires a hidden response.' },
      { week: 13, title: 'Removing the Defender', chess: 'Capture or deflect the piece guarding a target, then take the target.', chimera: 'Cutting the support structure. Remove the skeleton, the muscle collapses.', cs: 'Removing dependencies — take out one module, the system falls.' },
      { week: 14, title: 'Checkmate Patterns', chess: 'Back rank mate, smothered mate, Scholar\'s mate defense. Common patterns.', chimera: 'Coordinated creature strike — all organs working for the kill.', cs: 'Design patterns in software — reusable solutions to common problems.' },
      { week: 15, title: 'Midterm Review', chess: 'Review all tactics, solve puzzles combining multiple patterns.', chimera: 'How has your creature evolved? What new reflexes has it developed?', cs: 'Code review / retrospective — what did we build, what did we learn?' },
      { week: 16, title: 'Opening Principles', chess: 'Control center, develop pieces, castle early. Don\'t move same piece twice. Don\'t bring queen out early.', chimera: 'Building the body at game start — wake up every organ.', cs: 'System initialization / boot-up sequence — start services in the right order.' },
    ],
  },
  {
    name: 'Phase 3: Strategy & Planning',
    theme: 'Your creature learns to THINK AHEAD. Not just reacting — creating PLANS.',
    chimeraTheme: 'Pawn structure is the LANDSCAPE. Piece coordination is ant colony: simple agents = emergent intelligence. King safety = protecting the heart.',
    csTheme: 'ARCHITECTURE & SYSTEM DESIGN. Pawn structure = data structures. Coordination = microservices. King safety = cybersecurity.',
    color: '#f0a050',
    weeks: [
      { week: 17, title: 'Pawn Structure', chess: 'Isolated, doubled, backward, passed, connected pawns. How structure determines strategy.', chimera: 'Your choices create the landscape. Permanent decisions shape everything that follows.', cs: 'Data structures shape what\'s possible — choose wisely, it\'s hard to change later.' },
      { week: 18, title: 'Piece Coordination', chess: 'Making pieces work together. Rook batteries, bishop pairs, knight outposts.', chimera: 'All limbs working as ONE body. The ant colony creating emergent intelligence.', cs: 'Microservices / team coordination — small services creating a larger system.' },
      { week: 19, title: 'King Safety', chess: 'Pawn shelter, piece defense around king. Recognizing when your king is unsafe.', chimera: 'Protect the heart of the system. Everything else is replaceable — the heart is not.', cs: 'Security & firewalls — protecting the core from external threats.' },
      { week: 20, title: 'Endgame Basics', chess: 'King activation, pawn promotion races, opposition, basic K+P vs K.', chimera: 'Transformation phase — the heart becomes a warrior, pawns become queens.', cs: 'Deployment & delivery — the final phase where you ship what you built.' },
      { week: 21, title: 'Planning Ahead', chess: 'Making multi-move plans. Evaluating positions. Setting goals and executing.', chimera: 'Think in spirals, not single moves. The creature sees the future.', cs: 'Agile planning / sprints — plan, execute, review, repeat.' },
    ],
  },
  {
    name: 'Phase 4: Mastery & Competition',
    theme: 'Your creature fights at full power. Study the masters, manage time, compete.',
    chimeraTheme: 'Studying famous games = studying creatures that fought at the highest level. The championship is the ultimate creature-vs-creature battle.',
    csTheme: 'REAL-WORLD APPLICATION. Great games = great code (open source). Time management = performance. Tournament = hackathon.',
    color: '#e05080',
    weeks: [
      { week: 22, title: 'Famous Games Study', chess: 'Analyzing masterpieces. Morphy, Fischer, Kasparov. Understanding grandmaster thinking.', chimera: 'Standing on the shoulders of giants — studying the best creatures ever built.', cs: 'Studying great codebases — reading open source to learn from the best.' },
      { week: 23, title: 'Blitz & Time Management', chess: 'Playing with clocks. Balancing speed and accuracy. When to think vs when to move fast.', chimera: 'Speed vs. accuracy tradeoff. Fast twitch vs slow twitch muscles.', cs: 'Performance optimization — making code faster without breaking it.' },
      { week: 24, title: 'Championship Pt 1', chess: 'In-class tournament. Apply everything learned. Serious games with notation.', chimera: 'Creature vs. creature — the full battle. Everything you\'ve built gets tested.', cs: 'Hackathon / competition — build under pressure, ship what works.' },
      { week: 25, title: 'Championship Pt 2', chess: 'Tournament finals, awards ceremony, game analysis. Celebrate growth.', chimera: 'Reflect, celebrate, level up. Your creature has evolved through battle.', cs: 'Ship it / retrospective — what worked, what didn\'t, what\'s next.' },
    ],
  },
  {
    name: 'Phase 5: Advanced Tactics',
    theme: 'Your creature\'s reflexes get SHARPER. Deep calculation, sacrificial play.',
    chimeraTheme: 'Zwischenzug IS the Pause — instead of the obvious response, insert an unexpected move that changes everything. Sacrificial combinations = losing a limb to win the war.',
    csTheme: 'ADVANCED ALGORITHMS. Depth-first search, recursion, trade-offs (sacrifice memory for speed = sacrifice material for position).',
    color: '#a060ff',
    weeks: [
      { week: 26, title: 'Advanced Forks', chess: 'Complex multi-target attacks. Setting up forks with preparatory moves.', chimera: 'Multi-target efficiency — the creature strikes everywhere at once.', cs: 'Graph traversal / BFS — exploring multiple paths simultaneously.' },
      { week: 27, title: 'Advanced Pins & Skewers', chess: 'Complex pin positions, exploiting pinned pieces, X-ray attacks.', chimera: 'Layered pressure — attacking through multiple layers of defense.', cs: 'Linked lists / pointers — data referencing other data in chains.' },
      { week: 28, title: 'Deflection & Decoy', chess: 'Forcing a defender away. Luring a piece to a worse square.', chimera: 'Misdirection as strategy — make the opponent look the wrong way.', cs: 'Honeypots & game theory — deliberate misdirection in security.' },
      { week: 29, title: 'Zwischenzug', chess: 'The "in-between move." Inserting an unexpected move into a sequence.', chimera: 'The unexpected Pause — breaking the expected sequence. BREATHE before responding.', cs: 'Interrupt handling in processors — breaking the normal flow for something urgent.' },
      { week: 30, title: 'Sacrificial Combinations', chess: 'Material sacrifice for checkmate or decisive advantage. Multi-move combos.', chimera: 'Giving the creature\'s limb for the win. The ultimate attention warfare.', cs: 'Trading memory for speed — sacrificing one resource for another.' },
      { week: 31, title: 'Calculation Training', chess: 'Seeing 4-5 moves ahead. Candidate moves, elimination, visualization.', chimera: 'Seeing deeper into the future. Building the creature\'s brain power.', cs: 'Depth-first search / recursion — if I do this, they do that, then I...' },
      { week: 32, title: 'Tactics Tournament', chess: 'Puzzle rush, timed tactical challenges, competition.', chimera: 'Creature\'s reflexes tested under pressure. Speed + accuracy.', cs: 'Timed coding challenges — solve problems under time pressure.' },
    ],
  },
  {
    name: 'Phase 6: Positional Mastery',
    theme: 'The APHID phase. Quiet strength. Steady improvement until collapse.',
    chimeraTheme: 'Honeydew chess. Don\'t force anything. Find where energy flows and TAP IN. Prophylaxis = immune system. Positional sacrifice = investing in long-term health.',
    csTheme: 'SYSTEM DESIGN & MAINTENANCE. Good/bad bishops = technical debt. Open files = throughput. Space = memory. Prophylaxis = defensive programming.',
    color: '#50c878',
    weeks: [
      { week: 33, title: 'Good vs. Bad Bishops', chess: 'When your bishop is blocked by your own pawns vs. actively useful.', chimera: 'When a limb helps vs. hinders. Sometimes your own structure is the problem.', cs: 'Technical debt — code that used to work but now slows you down.' },
      { week: 34, title: 'Outposts & Weak Squares', chess: 'Squares that can\'t be attacked by pawns. Planting pieces on outposts.', chimera: 'Planting in strong positions — a knight on an outpost is a permanent thorn.', cs: 'Strategic caching / positioning — put resources where they\'ll be accessed most.' },
      { week: 35, title: 'Open Files & Diagonals', chess: 'Controlling files without pawns. Rook lifts. Bishop highways.', chimera: 'Clearing highways for flow — the creature\'s circulatory system needs open roads.', cs: 'Network bandwidth / throughput — data needs clear channels to flow.' },
      { week: 36, title: 'Space Advantage', chess: 'Controlling more territory. Cramping the opponent. Pawn advances for space.', chimera: 'Room for your creature to breathe. A cramped creature suffocates.', cs: 'Memory allocation — programs need space to operate efficiently.' },
      { week: 37, title: 'Prophylaxis', chess: 'Preventing opponent\'s plans before they start. Asking "what do THEY want?"', chimera: 'Immune system in action — prevent threats BEFORE they become dangerous.', cs: 'Defensive programming / input validation — stop bad data before it enters.' },
      { week: 38, title: 'Positional Sacrifice', chess: 'Giving material for long-term positional compensation. Exchange sacrifice.', chimera: 'Long-term health over short-term comfort. The creature invests in its future.', cs: 'Refactoring for maintainability — spend time now to save time later.' },
    ],
  },
  {
    name: 'Phase 7: Opening Repertoire',
    theme: 'Your creature develops its OWN fighting style.',
    chimeraTheme: 'Your opening = your creature\'s PERSONALITY. Aggressive (e4) = fast-attacking. Solid (d4) = resilient. Neither is better — it\'s about what fits YOU.',
    csTheme: 'FRAMEWORKS & ARCHITECTURE. Choosing an opening = choosing a tech stack. No single "best" — best for YOUR project.',
    color: '#f0a050',
    weeks: [
      { week: 39, title: 'Choosing an Opening', chess: 'Understanding opening families. e4 vs d4 vs c4. Finding your style.', chimera: 'Your creature\'s fighting style — are you aggressive, solid, or tricky?', cs: 'Choosing a tech stack — React vs Vue vs Svelte. Match the tool to the job.' },
      { week: 40, title: 'White Repertoire', chess: 'Building a set of openings for white. Main lines and sidelines.', chimera: 'How you start when you move first — setting the creature\'s agenda.', cs: 'Frontend architecture — the first thing users see and interact with.' },
      { week: 41, title: 'Black Repertoire', chess: 'Building responses to 1.e4 and 1.d4. Defense systems.', chimera: 'How you respond to pressure — the creature adapts to any environment.', cs: 'API response design — how your system answers requests.' },
      { week: 42, title: 'Opening Traps', chess: 'Common traps to set and avoid. Recognizing bait.', chimera: 'Recognizing bait — the immune system spots the trick before falling for it.', cs: 'Security vulnerabilities / phishing — recognizing attacks disguised as normal.' },
      { week: 43, title: 'Transition to Middlegame', chess: 'When the opening ends. Identifying the moment to shift from setup to action.', chimera: 'From building to battling — the creature wakes up and starts hunting.', cs: 'From planning to execution — the sprint begins.' },
    ],
  },
  {
    name: 'Phase 8: Endgame Mastery',
    theme: 'TRANSFORMATION. When the board simplifies, the humble become powerful.',
    chimeraTheme: 'The king — which spent the whole game hiding — becomes a FIGHTING piece. Pawns that survived become queens. The weakest become the most important.',
    csTheme: 'OPTIMIZATION & DELIVERY. K+P endgames = MVP. Rook endgames = core infrastructure. Converting = shipping.',
    color: '#5090ff',
    weeks: [
      { week: 44, title: 'King & Pawn Endgames', chess: 'Opposition, key squares, pawn breakthroughs. King as a fighting piece.', chimera: 'The heart activates. Pawns transform. The endgame is the tardigrade\'s moment.', cs: 'Minimum viable product — strip to essentials, make them work perfectly.' },
      { week: 45, title: 'Rook Endgames', chess: 'Lucena position, Philidor defense, rook activity. Most common endgame type.', chimera: 'Bones of the system in the final phase — structural pieces carry the game.', cs: 'Core infrastructure — when everything else is stripped away, this must work.' },
      { week: 46, title: 'Minor Piece Endgames', chess: 'Bishop vs knight, same-color bishops, opposite-color bishops.', chimera: 'Using specialized tools precisely — the right organ for the right job.', cs: 'Right tool for the right job — don\'t use a hammer when you need a scalpel.' },
      { week: 47, title: 'Practical Endgame Play', chess: 'Converting advantages. Clock management in endgames. Technique over tricks.', chimera: 'Converting small advantages — steady pressure, no shortcuts.', cs: 'Shipping & finishing projects — the last 10% takes 50% of the effort.' },
    ],
  },
  {
    name: 'Phase 9: Championship Level',
    theme: 'FULL CREATURE MASTERY. Everything comes together.',
    chimeraTheme: 'Your creature has developed skin, bones, eyes, joints, muscles, and a strong heart. It\'s survived battles, adapted, transformed, evolved. The final test.',
    csTheme: 'MASTERY & TEACHING. The ultimate test of understanding is teaching someone else. Full-stack thinking.',
    color: '#e05080',
    weeks: [
      { week: 48, title: 'Advanced Strategy', chess: 'Prophylactic thinking, long-term planning, positional sacrifices in practice.', chimera: 'Full creature mastery — every organ at peak performance.', cs: 'System-level thinking — seeing how all components interact.' },
      { week: 49, title: 'Pre-Championship Prep', chess: 'Opening preparation, studying opponents, mental game, physical conditioning.', chimera: 'Sharpening every limb — the creature prepares for its greatest battle.', cs: 'Final testing & QA — find and fix everything before launch.' },
      { week: 50, title: 'Grand Championship', chess: 'The final tournament. Everything on the line. Play, analyze, celebrate.', chimera: 'Creature vs. creature: the final dance. Win or lose, you\'ve transformed how you think.', cs: 'Demo day / showcase — present what you built. Ship it to the world.' },
    ],
  },
];
