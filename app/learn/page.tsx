'use client';

import { useState } from 'react';

// ─── Tabs ───

const TABS = [
  { id: 'world', label: 'The World', icon: '🗺️' },
  { id: 'squad', label: 'Your Squad', icon: '🎮' },
  { id: 'battle', label: 'The Battle', icon: '⚔️' },
  { id: 'superpowers', label: 'Superpowers', icon: '🧬' },
  { id: 'breathe', label: 'The Cheat Code', icon: '🔑' },
  { id: 'boss', label: 'Boss Levels', icon: '👾' },
] as const;

type TabId = (typeof TABS)[number]['id'];

// ─── UI Primitives ───

function Box({
  title,
  children,
  color = '#f0a050',
}: {
  title?: string;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      className="rounded-r-xl p-5"
      style={{ backgroundColor: '#1a1510', borderLeft: `4px solid ${color}` }}
    >
      {title && (
        <div className="text-sm font-bold mb-2" style={{ color }}>
          {title}
        </div>
      )}
      <div className="text-sm leading-relaxed" style={{ color: '#ccc' }}>
        {children}
      </div>
    </div>
  );
}

function QuizCard({
  question,
  answer,
  color = '#f0a050',
}: {
  question: string;
  answer: string;
  color?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-lg cursor-pointer transition-all"
      style={{
        padding: '14px 18px',
        backgroundColor: open ? '#1a1510' : '#141414',
        border: open ? `1px solid ${color}44` : '1px solid #222',
      }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold" style={{ color: open ? color : '#ddd' }}>
          🤔 {question}
        </span>
        <span
          className="text-base transition-transform"
          style={{ color: '#555', transform: open ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </div>
      {open && (
        <div
          className="mt-3 px-4 py-3 rounded-lg text-sm leading-relaxed"
          style={{ backgroundColor: '#0a0a0a', color: '#aaa', borderLeft: `3px solid ${color}` }}
        >
          💡 {answer}
        </div>
      )}
    </div>
  );
}

function Tag({ children, color = '#f0a050' }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mr-1.5 mb-1"
      style={{ backgroundColor: color + '18', color }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-lg font-bold" style={{ color: '#f0a050', lineHeight: 1.4 }}>
      {children}
    </div>
  );
}

// ─── PIECE DATA ───

const PIECES = [
  {
    name: 'THE PAWN',
    subtitle: 'The Underdog',
    emoji: '♟',
    value: '1 point',
    color: '#50c878',
    moves: 'Forward one square (two on its first move). Captures diagonally.',
    strength:
      "It's the ONLY piece that can level up. If a pawn makes it all the way to the other side, it becomes a QUEEN.",
    weakness: "Can't go backward. Ever. Once you push a pawn, that's permanent.",
    realTalk:
      "Think of a video game character that starts at Level 1 with no gear. Everyone ignores them. But if they survive the whole map? They become the final boss. That's the pawn. Every queen started as a pawn that didn't quit.",
    proTip:
      "Be careful pushing pawns — you can't undo it! But don't be afraid to march them forward when the time is right.",
  },
  {
    name: 'THE KNIGHT',
    subtitle: 'The Trickster',
    emoji: '♞',
    value: '3 points',
    color: '#50a0e0',
    moves: 'L-shape: two squares one direction, then one to the side. Can JUMP over other pieces.',
    strength:
      'Only piece that can hop over things. Reaches squares nobody else can. Amazing in crowded, messy positions.',
    weakness: 'Slow to cross the whole board. Takes multiple hops to get anywhere far.',
    realTalk:
      "The knight is that friend who always finds a weird shortcut. Everyone else is stuck in traffic, and the knight's like 'nah, I know a way.' It doesn't think in straight lines — it thinks in angles and surprises.",
    proTip:
      'Put your knights toward the center where they can reach 8 squares. A knight on the edge is SAD.',
  },
  {
    name: 'THE BISHOP',
    subtitle: 'The Sniper',
    emoji: '♗',
    value: '3 points',
    color: '#c070d0',
    moves: 'Any number of squares diagonally. Zooms across the whole board in one move.',
    strength:
      'Long-range diagonal control. Two bishops together cover the entire board — light AND dark squares.',
    weakness:
      "Stuck on ONE color forever. A bishop on white squares can NEVER reach a dark square. It literally can't see half the board.",
    realTalk:
      "The bishop is a sniper — long range, super accurate on its lane, but has blind spots. That's why having BOTH bishops is so strong. One covers what the other can't see. It's like a duo where each person has different skills.",
    proTip:
      "Don't block your bishops with your own pawns! Give them open diagonals to snipe from.",
  },
  {
    name: 'THE ROOK',
    subtitle: 'The Tank',
    emoji: '♜',
    value: '5 points',
    color: '#e0a040',
    moves: 'Any number of squares in a straight line — up, down, left, or right.',
    strength:
      'Dominates open files (columns with no pawns). Two rooks doubled on the same file = DEVASTATING.',
    weakness:
      'Useless when the board is clogged with pawns. Needs open space to be powerful.',
    realTalk:
      "The rook is like an ambulance — it needs clear roads. In traffic? Stuck. On an open highway? UNSTOPPABLE. Your job is to create open roads for your rooks.",
    proTip: 'Get your rooks onto open files! Trade some pawns to clear the highway.',
  },
  {
    name: 'THE QUEEN',
    subtitle: 'The All-Star',
    emoji: '♛',
    value: '9 points',
    color: '#e05080',
    moves: 'Combines rook + bishop. Goes any direction, any distance. Most mobile piece on the board.',
    strength: 'Can do everything. Attack from anywhere. Reach any square.',
    weakness:
      "She's so valuable that losing her usually means losing. Bringing her out too early is a TRAP — opponents just chase her around.",
    realTalk:
      "The queen is like being the most famous kid in school — everyone's looking at you. That's power, but it's also pressure. If you show off too early, people just target you. The best players keep the queen back until the perfect moment, then BOOM.",
    proTip:
      "DON'T bring your queen out in the first few moves! Develop your other pieces first. The queen enters when the stage is set.",
  },
  {
    name: 'THE KING',
    subtitle: 'The VIP',
    emoji: '♚',
    value: 'Infinity — THE GAME',
    color: '#e05050',
    moves: 'One square in any direction. Can castle (a special safety move early in the game).',
    strength:
      'In the endgame, the king activates and becomes a fighter. Walks up the board and supports pawns.',
    weakness: 'If the king gets checkmated, you lose. Period. Game over.',
    realTalk:
      "The king is the VIP you're protecting at all costs. Like in capture-the-flag. But here's the plot twist: late in the game, when most danger is gone, the VIP steps out and starts doing work himself. The thing you spent the whole game protecting becomes your secret weapon.",
    proTip:
      "Castle early to keep your king safe! But in the endgame, don't be afraid to activate him.",
  },
];

// ─── SUPERPOWER DATA ───

const SUPERPOWERS = [
  {
    name: 'Water Bear Power',
    subtitle: 'Survive Anything',
    emoji: '🐻',
    color: '#50c878',
    nature:
      "Tardigrades (water bears) are tiny creatures that survive in outer space, boiling water, and freezing cold. They don't fight bad conditions — they curl up, protect their core, and WAIT until things get better.",
    board:
      "You're losing badly. Down pieces. Getting attacked. Don't panic. Simplify. Trade pieces. Make your position as small and solid as possible. SURVIVE. Wait for your opponent to get sloppy. Many games are saved by just refusing to give up.",
    life:
      "Bad day? Bad week? You don't have to solve everything right now. Protect what matters, survive the storm, and come back when you're ready.",
  },
  {
    name: 'Octopus Power',
    subtitle: 'Think Different',
    emoji: '🐙',
    color: '#50a0e0',
    nature:
      'An octopus has brains in its ARMS. Its main brain sets the goal, but each arm figures out how to do it independently. They solve problems from every angle.',
    board:
      "A knight in the center of the board is literally called an 'octopus' in chess. It reaches in 8 directions and attacks from angles nobody expects. The knight is the piece that thinks differently.",
    life:
      "Don't always think in straight lines. Sometimes the answer is to come at the problem from a completely different angle. The weird approach is sometimes the best one.",
  },
  {
    name: 'Ant Colony Power',
    subtitle: 'Teamwork Makes the Dream Work',
    emoji: '🐜',
    color: '#e0a040',
    nature:
      'No single ant knows the big plan. But thousands of ants following simple rules create incredible things — highways, bridges, farms. The group is smarter than any individual.',
    board:
      "Your pawns are the ant colony. No single pawn is impressive. But your PAWN STRUCTURE — the pattern they create together — determines the entire game. They create paths for rooks, posts for knights, and walls for defense.",
    life:
      "You don't need to be the star. Do your small part well, support the people around you, and amazing things happen. The team is always more powerful than the individual.",
  },
  {
    name: 'Mushroom Network Power',
    subtitle: 'Hidden Connections',
    emoji: '🍄',
    color: '#c070d0',
    nature:
      'Underground, mushroom roots (mycelium) connect entire forests. Trees share food and send warnings through this hidden network. You can\'t see it, but it holds the whole forest together.',
    board:
      "Bishops work on diagonals — lines most beginners don't notice. Two bishops create an invisible web across the entire board. They're quiet, not flashy, but they connect everything.",
    life:
      "The quiet connectors are powerful. The person who links different friend groups, who notices things others miss — that's the mycelium. Being observant is a superpower.",
  },
  {
    name: 'Slime Mold Power',
    subtitle: 'Find the Best Path',
    emoji: '🦠',
    color: '#e05080',
    nature:
      'Slime molds have no brain, but they can find the shortest path through a maze. They explore all directions, then strengthen the path that works best.',
    board:
      "When you have multiple ways to attack, explore them in your mind first. Don't commit to the first idea. Check your options (at least 3!), find the best one, THEN commit. The queen is the ultimate slime mold.",
    life:
      "Don't lock into the first solution. Explore. Test ideas. Then double down on what works. The best path isn't always the obvious one.",
  },
  {
    name: 'Immune System Power',
    subtitle: 'Spot Danger Before It Hits',
    emoji: '🛡️',
    color: '#e05050',
    nature:
      "Your immune system recognizes threats BEFORE they make you sick. It remembers every virus it's ever fought so it responds faster next time.",
    board:
      "Tactics like forks, pins, and skewers are like viruses — they'll destroy you if you don't see them coming. Every pattern you learn to recognize is like adding a new antibody.",
    life:
      "Learn to recognize danger patterns — in chess, in social situations, everywhere. Not to be scared, but to be AWARE. The more patterns you recognize, the fewer surprises hurt you.",
  },
  {
    name: 'Bee Power',
    subtitle: 'Communicate & Protect',
    emoji: '🐝',
    color: '#e0c040',
    nature:
      "Bees do a 'waggle dance' to tell each other where food is. Their whole colony runs on precise communication. And they protect each other fiercely.",
    board:
      'Pieces that defend each other are COMMUNICATING. A piece nobody protects is alone and vulnerable. The best positions have pieces all protecting each other — touch one, trigger a response from another.',
    life:
      'Check in with your people. Cover for each other. A connected group is almost impossible to break. An isolated individual is easy to pick off.',
  },
  {
    name: 'Aphid Power',
    subtitle: 'Tap Into the Flow',
    emoji: '🪲',
    color: '#50c878',
    nature:
      "Aphids don't hunt or fight. They find where nutrients are already flowing (plant sap) and gently tap in. They don't force anything — they position themselves where the good stuff already is.",
    board:
      "Positional play. Instead of forcing an attack, keep making your position a tiny bit better, move by move. Control an open file. Plant a piece on a strong square. Small improvements stack up until your opponent's position collapses.",
    life:
      "You don't always have to push and force things. Sometimes the move is to put yourself in the right position and let good things flow to you. Work smart, not just hard.",
  },
];

// ─── BOSS LEVELS DATA ───

const BOSS_LEVELS = [
  {
    level: 'LVL 1',
    weeks: '1–3',
    title: 'LEARN THE MAP',
    icon: '🗺️',
    color: '#50a0e0',
    skills: [
      'Know every square, every file, every rank',
      'Learn how every piece moves (and what it CAN\'T do)',
      'Practice the LOOK → THINK → CHECK routine',
      'Play games with the clock turned OFF',
    ],
    unlock:
      'You can set up the board, play a legal game, and you PAUSE before every move.',
  },
  {
    level: 'LVL 2',
    weeks: '4–6',
    title: 'LEARN THE WEAPONS',
    icon: '⚔️',
    color: '#f0a050',
    skills: [
      'Forks — attacking TWO pieces at once (mostly knights!)',
      "Pins — an enemy piece can't move because something worse is behind it",
      'Skewers — attack a valuable piece, it moves, you take what\'s behind it',
      'Pawn structure — how your pawns create the landscape for everything else',
    ],
    unlock:
      "You can spot basic tactics, you understand why the center matters, and your games are getting longer.",
  },
  {
    level: 'LVL 3',
    weeks: '7–9',
    title: 'LEARN TO THINK',
    icon: '🧠',
    color: '#50c878',
    skills: [
      'Having a PLAN (not just reacting to your opponent)',
      'Knowing when to attack vs when to improve position',
      'Endgame basics — king + pawn endings, how to promote',
      'Reviewing your own games — turning mistakes into lessons',
    ],
    unlock:
      'You play with a plan. You can explain WHY you made a move. You learn from losses.',
  },
  {
    level: 'BOSS',
    weeks: '10–12',
    title: 'PROVE IT',
    icon: '🏆',
    color: '#e05080',
    skills: [
      'In-class tournament — put everything together',
      'Present your favorite game and explain the key moments',
      'Bonus: intro to how computers think about chess (CS bridge)',
      'Bonus: design your own chess AI personality (what would it value?)',
    ],
    unlock:
      "You can play a solid game, explain your thinking, and you understand chess as a THINKING system — not memorization.",
  },
];

// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════

export default function LearnPage() {
  const [tab, setTab] = useState<TabId>('world');
  const [expandedPiece, setExpandedPiece] = useState<number | null>(null);
  const [expandedPower, setExpandedPower] = useState<number | null>(null);

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#e8e4df' }}>
      {/* Gradient top bar */}
      <div
        style={{
          height: '4px',
          background: 'linear-gradient(90deg, #f0a050, #e06040, #f0a050, #50c878, #f0a050)',
        }}
      />

      {/* Hero */}
      <div className="px-4 py-6 lg:px-8 max-w-[780px]" style={{ borderBottom: '1px solid #1a1a1a' }}>
        <p className="text-sm" style={{ color: '#888', maxWidth: 580, lineHeight: 1.6 }}>
          Chess isn&apos;t about memorizing moves. It&apos;s about learning to{' '}
          <strong style={{ color: '#f0a050' }}>SEE</strong> and{' '}
          <strong style={{ color: '#50c878' }}>THINK</strong>. Master this, and you&apos;ll be
          dangerous on the board AND in life.
        </p>
      </div>

      {/* Tab Navigation */}
      <div
        className="flex overflow-x-auto"
        style={{ borderBottom: '1px solid #1a1a1a', scrollbarWidth: 'none' }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            className="px-4 py-3 text-xs font-bold whitespace-nowrap"
            style={{
              backgroundColor: tab === t.id ? '#1a1510' : 'transparent',
              borderBottom: tab === t.id ? '3px solid #f0a050' : '3px solid transparent',
              color: tab === t.id ? '#f0a050' : '#555',
            }}
            onClick={() => setTab(t.id)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-4 py-6 lg:px-8 max-w-[780px]">
        {/* ═══ THE WORLD ═══ */}
        {tab === 'world' && (
          <div className="space-y-5">
            <SectionTitle>Before you play a single move — know your world. 🌍</SectionTitle>

            <div
              className="rounded-2xl p-6"
              style={{ background: 'linear-gradient(135deg, #1a1510, #141210)', border: '1px solid #f0a05030' }}
            >
              <div className="text-base font-bold mb-3" style={{ color: '#f0a050' }}>
                🦎 THE #1 RULE: Your Army Is ONE Creature
              </div>
              <div className="text-sm leading-relaxed space-y-3" style={{ color: '#ccc' }}>
                <p>
                  Here&apos;s the biggest mistake new players make: they think they have 16 separate pieces.
                  &ldquo;My knight does this. My bishop does that. Oh no, I lost my queen — it&apos;s OVER.&rdquo;
                </p>
                <p>
                  <strong style={{ color: '#f0a050' }}>Wrong.</strong>
                </p>
                <p>
                  Your 16 pieces aren&apos;t 16 separate things. They&apos;re{' '}
                  <strong style={{ color: '#f0a050' }}>ONE living creature.</strong> One organism. Your pawns
                  are the skin. Your rooks are the bones. Your bishops are the eyes. Your knights are the
                  elbows and knees. Your queen is the strongest muscle. And your king?{' '}
                  <strong style={{ color: '#e05050' }}>Your king is the heart.</strong>
                </p>
                <p>
                  When you lose a piece, your creature didn&apos;t DIE — it lost a limb. And guess what?{' '}
                  <strong>You&apos;re still alive.</strong> You adapt. You fight with what you have left.
                </p>
              </div>
            </div>

            <Box title="The Board = Your Map" color="#50a0e0">
              <p>
                Think of the chessboard like a video game map. It&apos;s got <strong>64 squares</strong> — 32
                white and 32 black, arranged in an 8×8 grid. Before you go fight the boss, you need to know the
                map. Where are the power-ups? Where are the dead ends?
              </p>
              <p className="mt-2">
                In chess, <strong style={{ color: '#50a0e0' }}>the map IS the strategy.</strong> Where you put
                your pieces matters just as much as what pieces you have.
              </p>
            </Box>

            <Box title="The Center = The Best Spot on the Map" color="#f0a050">
              <p>
                The four squares in the middle (d4, d5, e4, e5) are like <strong>standing at the center of a
                basketball court.</strong> From there, you can pass in any direction, drive to either basket, see
                the whole floor.
              </p>
              <p className="mt-2">
                Knight in the CENTER: <strong style={{ color: '#50c878' }}>8 squares</strong>. Knight in the
                CORNER: <strong style={{ color: '#e05050' }}>2 squares</strong>. Same piece. Different position.{' '}
                <strong>Position changes power.</strong>
              </p>
            </Box>

            <Box title="Roads on the Map" color="#50c878">
              <p>The board has three types of roads your pieces can travel:</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li><strong>Files</strong> — columns going up and down (a–h). Like north-south highways.</li>
                <li><strong>Ranks</strong> — rows going left and right (1–8). Like east-west highways.</li>
                <li><strong>Diagonals</strong> — the hidden shortcuts. Most beginners don&apos;t even notice them.</li>
              </ul>
              <p className="mt-2">
                The more roads you control, the more power you have. Whoever controls the main intersections
                controls movement.
              </p>
            </Box>

            <div className="space-y-3">
              <QuizCard
                question="Why is the center so powerful?"
                answer="Because a piece in the center can reach the MOST squares. It's like standing at a crossroads vs. a dead-end alley. More options = more power."
                color="#50a0e0"
              />
              <QuizCard
                question="What happens when you put a piece in the corner?"
                answer="It gets trapped! A knight in the corner only reaches 2 squares instead of 8. That's like standing behind the backboard in basketball."
                color="#f0a050"
              />
              <QuizCard
                question="You lost your queen. Is the game over?"
                answer="NO! Your creature lost its strongest muscle, but the heart is still beating. Many games have been WON after losing the queen. The game is only over when the KING falls."
                color="#e05050"
              />
              <QuizCard
                question="What's better: one queen alone or a rook + bishop + 3 pawns?"
                answer="The team! A queen alone can't cover everything. But a rook + bishop + 3 pawns working together control more of the board and have way more options. Teams beat superstars. Always."
                color="#50c878"
              />
            </div>
          </div>
        )}

        {/* ═══ YOUR SQUAD ═══ */}
        {tab === 'squad' && (
          <div className="space-y-5">
            <SectionTitle>Meet your creature&apos;s body parts. Every limb has a job. 🎮</SectionTitle>
            <p className="text-sm" style={{ color: '#888' }}>
              Remember: these aren&apos;t 16 separate things. They&apos;re parts of ONE body. A hand is useless
              without an arm. Every piece matters because of how it connects to the others.
            </p>

            <div className="space-y-3">
              {PIECES.map((piece, i) => {
                const open = expandedPiece === i;
                return (
                  <div
                    key={piece.name}
                    className="rounded-xl overflow-hidden transition-all"
                    style={{
                      backgroundColor: open ? '#141414' : 'rgba(255,255,255,0.02)',
                      border: open ? `1px solid ${piece.color}44` : '1px solid #1a1a1a',
                    }}
                  >
                    <button
                      className="w-full text-left px-5 py-4 flex items-center gap-4"
                      onClick={() => setExpandedPiece(open ? null : i)}
                    >
                      <span className="text-3xl">{piece.emoji}</span>
                      <div className="flex-1">
                        <div className="text-sm font-bold" style={{ color: piece.color }}>
                          {piece.name}
                        </div>
                        <div className="text-xs" style={{ color: '#888' }}>
                          {piece.subtitle}
                        </div>
                      </div>
                      <Tag color={piece.color}>{piece.value}</Tag>
                      <span
                        className="text-sm transition-transform"
                        style={{ color: '#555', transform: open ? 'rotate(90deg)' : 'none' }}
                      >
                        ▶
                      </span>
                    </button>

                    {open && (
                      <div className="px-5 pb-5 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="rounded-lg p-3" style={{ backgroundColor: '#0c0c0c' }}>
                            <div className="font-bold mb-1" style={{ color: '#50a0e0' }}>How it moves</div>
                            <div style={{ color: '#aaa' }}>{piece.moves}</div>
                          </div>
                          <div className="rounded-lg p-3" style={{ backgroundColor: '#0c0c0c' }}>
                            <div className="font-bold mb-1" style={{ color: '#50c878' }}>Strength</div>
                            <div style={{ color: '#aaa' }}>{piece.strength}</div>
                          </div>
                        </div>
                        <div className="rounded-lg p-3 text-xs" style={{ backgroundColor: '#0c0c0c' }}>
                          <div className="font-bold mb-1" style={{ color: '#e05050' }}>Weakness</div>
                          <div style={{ color: '#aaa' }}>{piece.weakness}</div>
                        </div>
                        <div
                          className="rounded-lg p-4 text-sm leading-relaxed"
                          style={{ backgroundColor: '#1a1510', borderLeft: `3px solid ${piece.color}` }}
                        >
                          <div className="font-bold text-xs mb-2" style={{ color: piece.color }}>
                            💬 Real Talk
                          </div>
                          <div style={{ color: '#ccc' }}>{piece.realTalk}</div>
                        </div>
                        <div
                          className="rounded-lg p-3 text-xs"
                          style={{ backgroundColor: 'rgba(80,200,120,0.06)', border: '1px solid #50c87830' }}
                        >
                          <span className="font-bold" style={{ color: '#50c878' }}>
                            💡 Pro Tip:
                          </span>{' '}
                          <span style={{ color: '#aaa' }}>{piece.proTip}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ THE BATTLE ═══ */}
        {tab === 'battle' && (
          <div className="space-y-5">
            <SectionTitle>How a chess game actually works. ⚔️</SectionTitle>

            <Box title="Same Start, Different Story" color="#50a0e0">
              <p>
                Every chess game in history starts with the EXACT SAME position. Same pieces, same squares.
                Both players are totally equal. So what makes one player win?{' '}
                <strong style={{ color: '#50a0e0' }}>The choices they make.</strong>
              </p>
              <p className="mt-2">
                It&apos;s like everyone gets the same blank Minecraft world. What you BUILD with it is up to you.
              </p>
            </Box>

            <div className="text-sm font-bold" style={{ color: '#f0a050' }}>
              The Three Phases of a Game
            </div>

            <div className="space-y-3">
              {[
                {
                  phase: 'OPENING',
                  color: '#50a0e0',
                  time: 'First 10–15 moves',
                  what: 'Get your pieces out. Control the center. Castle your king. BUILD YOUR TEAM.',
                  like: 'Like the first quarter in basketball — set up your plays, get in position.',
                },
                {
                  phase: 'MIDDLEGAME',
                  color: '#f0a050',
                  time: 'The main action',
                  what: 'Attack and defend. Use tactics. Execute your plan. The real battle happens here.',
                  like: 'Like the 2nd and 3rd quarters — the grind, the highlight plays, the momentum swings.',
                },
                {
                  phase: 'ENDGAME',
                  color: '#50c878',
                  time: 'Few pieces left',
                  what: 'King activates. Pawns race to promote. Small advantages become huge. Precision wins.',
                  like: 'Like the 4th quarter — clutch time. Every move matters.',
                },
              ].map((p) => (
                <div
                  key={p.phase}
                  className="rounded-xl p-4"
                  style={{ backgroundColor: '#141414', borderLeft: `4px solid ${p.color}` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Tag color={p.color}>{p.time}</Tag>
                    <span className="text-sm font-bold" style={{ color: p.color }}>
                      {p.phase}
                    </span>
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: '#ccc' }}>
                    {p.what}
                  </div>
                  <div className="text-xs mt-1 italic" style={{ color: '#888' }}>
                    {p.like}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-sm font-bold mt-4" style={{ color: '#f0a050' }}>
              Attack vs Defense: Don&apos;t Get Stuck
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl p-4" style={{ backgroundColor: '#1a1010', borderTop: '3px solid #e05050' }}>
                <div className="text-xs font-bold mb-2" style={{ color: '#e05050' }}>❌ Only Attack</div>
                <div className="text-xs leading-relaxed" style={{ color: '#c99' }}>
                  You rush in with everything, leave your king wide open, and get destroyed by a counter-attack.
                </div>
              </div>
              <div className="rounded-xl p-4" style={{ backgroundColor: '#1a1010', borderTop: '3px solid #e05050' }}>
                <div className="text-xs font-bold mb-2" style={{ color: '#e05050' }}>❌ Only Defend</div>
                <div className="text-xs leading-relaxed" style={{ color: '#c99' }}>
                  You sit back, do nothing, and slowly get squeezed until you can&apos;t breathe.
                </div>
              </div>
            </div>

            <div className="rounded-xl p-4" style={{ backgroundColor: '#101a10', borderTop: '3px solid #50c878' }}>
              <div className="text-xs font-bold mb-2" style={{ color: '#50c878' }}>✅ Keep Switching</div>
              <div className="text-xs leading-relaxed" style={{ color: '#9c9' }}>
                Attack, then pull back and strengthen. Defend, then look for a counter-attack. Back and forth.
                Like breathing — in and out. <strong>The best players flow between attack and defense.</strong>
              </div>
            </div>

            <div className="text-sm font-bold mt-4" style={{ color: '#f0a050' }}>
              Three Huge Ideas That Win Games
            </div>

            <div className="space-y-3">
              <Box title="1. Give to Get (Sacrifice)" color="#e05080">
                Your pieces are parts of ONE creature. Sometimes it needs to lose a limb to survive. A pawn
                sacrificed to open a road for the rook? That&apos;s not losing — that&apos;s your creature
                choosing to make the rest stronger. Greedy players who try to keep everything often lose to
                players who give things up for a bigger purpose.
              </Box>
              <Box title="2. Slow Down" color="#50a0e0">
                The #1 reason beginners lose isn&apos;t that they don&apos;t know enough. It&apos;s that they
                move TOO FAST. They see one idea and grab it. Pros see three ideas and pick the best one. Just
                slowing down makes you instantly better.
              </Box>
              <Box title="3. Don't Force It" color="#50c878">
                If you&apos;re trying to checkmate and it&apos;s not working, STOP. Improve your position. Let
                your creature get healthy first. The checkmate will come naturally when your body is in the right
                shape. Forcing it is like shooting a contested three when you could pass for an open layup.
              </Box>
            </div>

            <QuizCard
              question="What's the biggest mistake beginners make?"
              answer="Moving too fast! Not looking at what the opponent just did, not considering multiple options, just playing the first move they see. Slowing down and LOOKING at the board is worth more than knowing a hundred openings."
            />
          </div>
        )}

        {/* ═══ SUPERPOWERS ═══ */}
        {tab === 'superpowers' && (
          <div className="space-y-5">
            <SectionTitle>8 Nature Superpowers hidden in chess. 🧬</SectionTitle>
            <p className="text-sm" style={{ color: '#888' }}>
              These come from real animals and organisms that have survived for BILLIONS of years. They each
              figured out a superpower. All 8 show up on a chessboard.
            </p>

            <div className="space-y-3">
              {SUPERPOWERS.map((sp, i) => {
                const open = expandedPower === i;
                return (
                  <div
                    key={sp.name}
                    className="rounded-xl overflow-hidden transition-all"
                    style={{
                      backgroundColor: open ? '#141414' : 'rgba(255,255,255,0.02)',
                      border: open ? `1px solid ${sp.color}44` : '1px solid #1a1a1a',
                    }}
                  >
                    <button
                      className="w-full text-left px-5 py-4 flex items-center gap-4"
                      onClick={() => setExpandedPower(open ? null : i)}
                    >
                      <span className="text-2xl">{sp.emoji}</span>
                      <div className="flex-1">
                        <div className="text-sm font-bold" style={{ color: sp.color }}>
                          {sp.name}
                        </div>
                        <div className="text-xs" style={{ color: '#888' }}>
                          {sp.subtitle}
                        </div>
                      </div>
                      <span
                        className="text-sm transition-transform"
                        style={{ color: '#555', transform: open ? 'rotate(90deg)' : 'none' }}
                      >
                        ▶
                      </span>
                    </button>

                    {open && (
                      <div className="px-5 pb-5 space-y-3">
                        <div className="rounded-lg p-3 text-xs" style={{ backgroundColor: '#0c0c0c' }}>
                          <div className="font-bold mb-1" style={{ color: '#50c878' }}>🌿 In Nature</div>
                          <div style={{ color: '#aaa' }}>{sp.nature}</div>
                        </div>
                        <div className="rounded-lg p-3 text-xs" style={{ backgroundColor: '#0c0c0c' }}>
                          <div className="font-bold mb-1" style={{ color: '#f0a050' }}>♟️ On the Board</div>
                          <div style={{ color: '#aaa' }}>{sp.board}</div>
                        </div>
                        <div className="rounded-lg p-3 text-xs" style={{ backgroundColor: '#0c0c0c' }}>
                          <div className="font-bold mb-1" style={{ color: '#50a0e0' }}>🌍 In Life</div>
                          <div style={{ color: '#aaa' }}>{sp.life}</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ THE CHEAT CODE ═══ */}
        {tab === 'breathe' && (
          <div className="space-y-5">
            <SectionTitle>The one cheat code that makes you instantly better. 🔑</SectionTitle>

            <div className="text-sm font-bold" style={{ color: '#f0a050' }}>
              The 5-Step Routine (Before EVERY move)
            </div>

            <div className="space-y-3">
              {[
                {
                  step: '1',
                  name: 'LOOK',
                  icon: '👀',
                  color: '#50a0e0',
                  text: 'What did your opponent just do? Is anything being attacked? Is anything free to take?',
                },
                {
                  step: '2',
                  name: 'THINK',
                  icon: '🧠',
                  color: '#f0a050',
                  text: 'What are my options? Come up with AT LEAST 3 possible moves. Not just one — THREE.',
                },
                {
                  step: '3',
                  name: 'CHECK',
                  icon: '🔍',
                  color: '#e05050',
                  text: 'For each option: if I do this, what will THEY do? Is my move safe? Am I leaving anything hanging?',
                },
                {
                  step: '4',
                  name: 'MOVE',
                  icon: '✅',
                  color: '#50c878',
                  text: 'Pick the best option. Put it on the board. Commit.',
                },
                {
                  step: '5',
                  name: 'RESET',
                  icon: '🔄',
                  color: '#888',
                  text: "It's their turn. Take a breath. Don't calculate — just observe the board fresh.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="rounded-xl p-4 flex gap-4 items-start"
                  style={{ backgroundColor: '#141414', borderLeft: `4px solid ${s.color}` }}
                >
                  <div>
                    <span className="text-2xl">{s.icon}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: s.color }}>
                      {s.name}
                    </div>
                    <div className="text-xs mt-1 leading-relaxed" style={{ color: '#ccc' }}>
                      {s.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Box title="Why This Works (It's Stupid Simple)" color="#50c878">
              <p>
                The #1 reason beginners lose chess games is <strong>NOT</strong> that they don&apos;t know
                enough openings or tactics. It&apos;s that{' '}
                <strong style={{ color: '#e05050' }}>they don&apos;t LOOK at the board.</strong>
              </p>
              <p className="mt-2">
                They see one move, play it in 2 seconds, and miss that their opponent was about to take their
                queen for free.{' '}
                <strong style={{ color: '#50c878' }}>
                  Just doing LOOK → THINK → CHECK before every single move will make you better than most people
                  who play chess casually.
                </strong>{' '}
                No memorization needed.
              </p>
            </Box>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl p-4" style={{ backgroundColor: '#1a1010', borderTop: '3px solid #e05050' }}>
                <div className="text-xs font-bold mb-2" style={{ color: '#e05050' }}>🐇 The Speed Player</div>
                <div className="text-xs leading-relaxed" style={{ color: '#c99' }}>
                  Sees one move. Plays it immediately. Misses threats. Misses opportunities. Loses fast or wins
                  by accident. Never improves because they never think.
                </div>
              </div>
              <div className="rounded-xl p-4" style={{ backgroundColor: '#101a10', borderTop: '3px solid #50c878' }}>
                <div className="text-xs font-bold mb-2" style={{ color: '#50c878' }}>🐢 The Thinker</div>
                <div className="text-xs leading-relaxed" style={{ color: '#9c9' }}>
                  Pauses. Checks what just happened. Considers 3 options. Picks the best one. Catches threats.
                  Finds good moves. Gets better every game.
                </div>
              </div>
            </div>

            <Box title="The Three Magic Questions" color="#f0a050">
              If you can only remember THREE things, remember these questions before every move:
              <ol className="mt-2 space-y-1 list-decimal list-inside font-bold">
                <li>
                  <span style={{ color: '#f0a050' }}>What did THEY just do?</span>
                </li>
                <li>
                  <span style={{ color: '#e05050' }}>Can anything take anything?</span>
                </li>
                <li>
                  <span style={{ color: '#50c878' }}>What&apos;s my PLAN?</span>
                </li>
              </ol>
              <p className="mt-2">
                Those three questions, asked every single move, will level you up faster than anything else.
              </p>
            </Box>

            <div className="space-y-3">
              <QuizCard
                question="What's the minimum number of options you should think of?"
                answer="THREE! Not one, not two — three. Force yourself to see at least 3 possible moves. Usually the second or third option is better than the first."
                color="#f0a050"
              />
              <QuizCard
                question="What should you do during your OPPONENT'S turn?"
                answer="Reset! Take a breath. Don't calculate their move for them. Look at the big picture. When they make their move, THEN react to what they actually did."
                color="#50a0e0"
              />
            </div>
          </div>
        )}

        {/* ═══ BOSS LEVELS ═══ */}
        {tab === 'boss' && (
          <div className="space-y-5">
            <SectionTitle>Level up. Here&apos;s your 12-week path. 👾</SectionTitle>

            <div className="space-y-4">
              {BOSS_LEVELS.map((lvl) => (
                <div
                  key={lvl.level}
                  className="rounded-xl overflow-hidden"
                  style={{ backgroundColor: '#141414', border: `1px solid ${lvl.color}30` }}
                >
                  <div className="px-5 py-4 flex items-center gap-4" style={{ borderBottom: `1px solid ${lvl.color}20` }}>
                    <span className="text-2xl">{lvl.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[0.6rem] font-bold px-2 py-0.5 rounded"
                          style={{ backgroundColor: lvl.color + '20', color: lvl.color }}
                        >
                          {lvl.level}
                        </span>
                        <span className="text-sm font-bold" style={{ color: lvl.color }}>
                          {lvl.title}
                        </span>
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: '#888' }}>
                        Weeks {lvl.weeks}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-4 space-y-3">
                    <div className="text-xs font-bold uppercase" style={{ color: '#888' }}>
                      Skills to Master
                    </div>
                    <ul className="space-y-1.5">
                      {lvl.skills.map((skill, si) => (
                        <li key={si} className="flex gap-2 text-xs" style={{ color: '#ccc' }}>
                          <span style={{ color: lvl.color }}>▸</span>
                          {skill}
                        </li>
                      ))}
                    </ul>

                    <div
                      className="rounded-lg p-3 text-xs"
                      style={{ backgroundColor: `${lvl.color}08`, border: `1px solid ${lvl.color}20` }}
                    >
                      <span className="font-bold" style={{ color: lvl.color }}>
                        🔓 Unlock:
                      </span>{' '}
                      <span style={{ color: '#aaa' }}>{lvl.unlock}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Box title="What You'll Walk Away With" color="#50c878">
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  { icon: '♟️', label: 'Chess skills', desc: 'Real fundamentals. Tactics. Strategy. Not memorization.' },
                  { icon: '🧠', label: 'Thinking power', desc: 'See patterns, plan ahead, make better decisions — everywhere.' },
                  { icon: '🤝', label: 'Teamwork', desc: 'Understanding how different strengths work together.' },
                  { icon: '😤', label: 'Mental toughness', desc: 'Learning to lose, learn from it, and come back stronger.' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-xs font-bold" style={{ color: '#ddd' }}>{item.label}</div>
                    <div className="text-[0.65rem] mt-0.5" style={{ color: '#888' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </Box>

            <div
              className="rounded-xl p-5 text-center"
              style={{ background: 'linear-gradient(135deg, #1a1510, #141210)', border: '1px solid #f0a05030' }}
            >
              <div className="text-base font-bold" style={{ color: '#f0a050' }}>
                &ldquo;We don&apos;t teach you WHAT to play. We teach you HOW to think.&rdquo;
              </div>
              <div className="text-xs mt-2" style={{ color: '#888' }}>
                Chess is the playground. Thinking is the skill. The skill works everywhere.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-4 flex justify-between text-[0.6rem] lg:px-8"
        style={{ color: '#444', borderTop: '1px solid #1a1a1a' }}
      >
        <span>CHIMERA CHESS &mdash; NextGen Leaders</span>
        <span>Think Different. Play Different.</span>
      </div>
    </main>
  );
}
