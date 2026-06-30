import { useState } from "react";

const tabs = [
  { id: "space", label: "The Space", icon: "⬜" },
  { id: "agents", label: "The Agents", icon: "♟" },
  { id: "poles", label: "The Poles", icon: "⚔" },
  { id: "loops", label: "The Loops", icon: "🔄" },
  { id: "organisms", label: "The 8 Patterns", icon: "🧬" },
  { id: "breath", label: "The Breath", icon: "🌬" },
  { id: "proposal", label: "The Proposal", icon: "📋" },
];

function Card({ title, children, accent = "#c8956c", style = {} }) {
  return (
    <div style={{
      background: "#111",
      borderLeft: `3px solid ${accent}`,
      borderRadius: "0 8px 8px 0",
      padding: "22px 24px",
      ...style
    }}>
      {title && <div style={{
        fontSize: "15px",
        fontWeight: 600,
        color: accent,
        marginBottom: "10px",
        letterSpacing: "0.02em"
      }}>{title}</div>}
      <div style={{ fontSize: "14px", lineHeight: 1.75, color: "#aaa" }}>
        {children}
      </div>
    </div>
  );
}

function Duo({ chess, life, chessAccent = "#6a8caf", lifeAccent = "#8a6" }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
      <div style={{
        padding: "12px 16px", background: "#0d1218", borderRadius: "6px",
        borderLeft: `3px solid ${chessAccent}`, fontSize: "13px", lineHeight: 1.65, color: "#8ab"
      }}>
        <span style={{ fontWeight: 600, color: chessAccent }}>In Chess: </span>{chess}
      </div>
      <div style={{
        padding: "12px 16px", background: "#0d1a0d", borderRadius: "6px",
        borderLeft: `3px solid ${lifeAccent}`, fontSize: "13px", lineHeight: 1.65, color: "#8a9"
      }}>
        <span style={{ fontWeight: 600, color: lifeAccent }}>In Life: </span>{life}
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{
      fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em",
      color: "#555", marginBottom: "6px", marginTop: "24px"
    }}>{children}</div>
  );
}

export default function ChimeraChess() {
  const [tab, setTab] = useState("space");
  const [expandedOrg, setExpandedOrg] = useState(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#e8e4df",
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>
      {/* Header */}
      <div style={{ padding: "36px 28px 20px", borderBottom: "1px solid #1a1a1a", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #c8956c, #8b6914, #c8956c)" }} />
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", flexWrap: "wrap" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 400, letterSpacing: "0.04em", color: "#c8956c", margin: 0 }}>
            ♟ CHIMERA CHESS
          </h1>
          <span style={{ fontSize: "12px", color: "#555", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Understanding the Game Through the Universal Pattern
          </span>
        </div>
        <p style={{ marginTop: "10px", fontSize: "14px", color: "#777", maxWidth: "620px", lineHeight: 1.6, fontStyle: "italic" }}>
          Every system is a body. Chess is one of the simplest, deepest bodies you can study.
          Master chess through CHIMERA and you master the grammar of any system.
        </p>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", borderBottom: "1px solid #1a1a1a", overflowX: "auto", scrollbarWidth: "none" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "12px 16px", background: tab === t.id ? "#141210" : "transparent",
            border: "none", borderBottom: tab === t.id ? "2px solid #c8956c" : "2px solid transparent",
            color: tab === t.id ? "#c8956c" : "#555", fontSize: "12px", fontFamily: "'Georgia', serif",
            letterSpacing: "0.05em", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s"
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "28px", maxWidth: "820px" }}>

        {/* ==================== THE SPACE ==================== */}
        {tab === "space" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ fontSize: "19px", color: "#c8956c", fontStyle: "italic", lineHeight: 1.5 }}>
              "Before you move a single piece, understand the world they live in."
            </div>

            <Card title="The Board Is a Body">
              Before there are pieces, before there's a game — there is a SPACE. 64 squares. 32 light, 32 dark.
              This is the first lesson of CHIMERA: <strong style={{color:"#c8956c"}}>understand the body before you try to use it.</strong>
              <br/><br/>
              Your body has bones, muscles, organs, pathways. The chessboard has ranks, files, diagonals, and centers.
              A doctor who doesn't know anatomy can't heal. A chess player who doesn't know the board can't win.
            </Card>

            <SectionTitle>The anatomy of the board</SectionTitle>

            <Card title="64 Squares = The Complete System" accent="#6a8caf">
              8 ranks (rows) × 8 files (columns) = 64 squares. This is FINITE. There are boundaries.
              Every system has boundaries — your body, a city, a game. Knowing the boundaries is the first wisdom.
              <br/><br/>
              <strong style={{color:"#6a8caf"}}>Question for kids:</strong> How many squares? Count them. 
              How many white? How many black? Why are they alternating? What does that pattern create?
            </Card>

            <Card title="Light & Dark = The Two Poles" accent="#c8956c">
              The board itself is TRIALITY. Two colors (poles) arranged in a pattern that creates a THIRD thing: the board.
              Neither color alone is the board. The ALTERNATION is the board. The relationship between them.
              <br/><br/>
              This is Axiom 1: <strong style={{color:"#c8956c"}}>Two poles + the relationship between them = reality.</strong>
              <br/>
              A bishop on light squares can NEVER reach dark squares. Understanding which pole you're on determines what's possible.
            </Card>

            <Card title="The Center = The Between" accent="#8a6">
              The four center squares (d4, d5, e4, e5) are the most powerful positions on the board.
              This is the BETWEEN — the transformation zone. Control the center, control the game.
              <br/><br/>
              In CHIMERA: <strong style={{color:"#8a6"}}>life happens in the between, not at the poles.</strong>
              The edges and corners of the board are WEAK. The center is where all pathways cross.
              A piece in the center radiates influence in every direction. A piece in the corner? Trapped.
            </Card>

            <SectionTitle>Pathways — how energy flows</SectionTitle>

            <Card title="Files, Ranks, and Diagonals">
              The board has three types of pathways:
              <br/><br/>
              <strong style={{color:"#6a8caf"}}>Files (vertical)</strong> — columns a through h. Like highways running north-south. Rooks and queens dominate these.
              <br/><br/>
              <strong style={{color:"#c8956c"}}>Ranks (horizontal)</strong> — rows 1 through 8. Like highways running east-west. Rooks and queens use these too.
              <br/><br/>
              <strong style={{color:"#8a6"}}>Diagonals</strong> — the slanted paths. Like the mycelium network underground — bishops travel these invisible connections that cross files and ranks.
              <br/><br/>
              A master sees ALL THREE simultaneously. A beginner only sees the squares immediately around their pieces.
              <strong style={{color:"#c8956c"}}> Vision is the first superpower.</strong>
            </Card>

            <Duo
              chess="A rook on an open file controls 7 squares in a line. A bishop on a long diagonal controls up to 7 squares diagonally. The PATHWAYS are more important than the pieces."
              life="In any system — your body, your city, your network — the CONNECTIONS between things matter more than the things themselves. Mycelium teaches this. The network IS the intelligence."
            />

            <Card title="The Edge vs. The Center" accent="#a86">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ padding: "14px", background: "#0a0a0a", borderRadius: "6px", textAlign: "center" }}>
                  <div style={{ fontSize: "22px", marginBottom: "4px" }}>♞</div>
                  <div style={{ color: "#c8956c", fontSize: "13px", fontWeight: 600 }}>Knight on e4</div>
                  <div style={{ color: "#999", fontSize: "12px", marginTop: "4px" }}>Controls 8 squares</div>
                  <div style={{ color: "#8a6", fontSize: "11px" }}>Maximum influence</div>
                </div>
                <div style={{ padding: "14px", background: "#0a0a0a", borderRadius: "6px", textAlign: "center" }}>
                  <div style={{ fontSize: "22px", marginBottom: "4px" }}>♞</div>
                  <div style={{ color: "#666", fontSize: "13px", fontWeight: 600 }}>Knight on a1</div>
                  <div style={{ color: "#999", fontSize: "12px", marginTop: "4px" }}>Controls 2 squares</div>
                  <div style={{ color: "#a55", fontSize: "11px" }}>Minimum influence — trapped</div>
                </div>
              </div>
              <br/>
              Same piece. Different position. The SPACE determines the power, not the piece alone.
              <br/><strong style={{color:"#c8956c"}}>This is why environment matters. Where you position yourself in any system changes what you can do.</strong>
            </Card>
          </div>
        )}

        {/* ==================== THE AGENTS ==================== */}
        {tab === "agents" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ fontSize: "19px", color: "#c8956c", fontStyle: "italic", lineHeight: 1.5 }}>
              "Every agent has capabilities AND limitations. Mastery is knowing both."
            </div>

            {[
              {
                piece: "♟ Pawn", value: "1 point", color: "#8a8",
                can: "Moves forward one square (two on first move). Captures diagonally. Can promote to any piece upon reaching the other side.",
                cant: "Cannot move backward. Cannot jump. Limited to one direction.",
                chimera: "The TARDIGRADE. Seems weak. Moves slowly. But it PERSISTS — and if it survives the whole journey, it transforms into the most powerful piece on the board. Resilience + patience = promotion. The pawn that reaches the 8th rank becomes a QUEEN. That's cryptobiosis in reverse: the small, humble thing transforms when conditions allow.",
                life: "Don't underestimate the 'pawns' in life. The quiet person doing steady work. The kid who seems behind but keeps showing up. Persistence transforms. Every queen was once a pawn."
              },
              {
                piece: "♞ Knight", value: "3 points", color: "#6a8caf",
                can: "Moves in an L-shape. JUMPS over other pieces. The only piece that can leap obstacles.",
                cant: "Can't control lines. Short range. Slow to cross the board.",
                chimera: "The OCTOPUS ARM. Moves in unexpected, non-linear ways. While every other piece travels in straight lines, the knight thinks differently — it reaches squares no one else can. This is distributed intelligence: solving problems from angles others can't see.",
                life: "Creative thinkers. People who solve problems sideways. They're not 'weird' — they're knights. Their non-linear thinking is a superpower, not a flaw."
              },
              {
                piece: "♗ Bishop", value: "3 points", color: "#c8956c",
                can: "Moves any distance diagonally. Controls long invisible lines across the board.",
                cant: "FOREVER stuck on one color. A light-square bishop can NEVER reach a dark square. Ever.",
                chimera: "The MYCELIUM NETWORK. Operates on invisible pathways (diagonals) that most beginners don't see. Connects distant parts of the board. Two bishops together (both colors) create a devastating network — like mycelium connecting an entire forest.",
                life: "Some people can only see certain 'colors' — certain perspectives. That's not weakness, it's specialization. But you NEED both perspectives to see the whole board. Diversity of viewpoint = the bishop pair."
              },
              {
                piece: "♜ Rook", value: "5 points", color: "#a86",
                can: "Moves any distance along files and ranks. Dominates open lines. Pairs powerfully with other rooks.",
                cant: "Needs open files to thrive. Blocked by own pawns. Clumsy in crowded positions.",
                chimera: "The ANT COLONY HIGHWAY. Rooks are the infrastructure — the main arteries that move resources (power) across the board. Two rooks on the same file = a doubled highway. An open file = a clear path for resources to flow. When the board opens up, rooks dominate because the PATHWAYS are clear.",
                life: "Infrastructure matters. Build clear pathways for energy, information, and resources to flow. Don't let your highways get clogged."
              },
              {
                piece: "♛ Queen", value: "9 points", color: "#c6a",
                can: "Moves in all directions, any distance. Most mobile piece. Combines rook + bishop.",
                cant: "High value = high risk. Losing the queen is usually game-ending. Can't jump like the knight.",
                chimera: "The SLIME MOLD OPTIMIZER. Can reach anywhere, find any path, exert maximum pressure. But the slime mold teaches: just because you CAN go everywhere doesn't mean you SHOULD. The queen that rushes in too early gets trapped. Power without wisdom = vulnerability.",
                life: "The most talented person in the room isn't always the most effective. Power must be deployed wisely. Timing matters more than ability."
              },
              {
                piece: "♚ King", value: "∞ (the game)", color: "#d44",
                can: "Moves one square in any direction. Can castle (a special defensive move). In the endgame, becomes an active fighting piece.",
                cant: "Can never move into danger. Must be protected. The game ends if the king falls.",
                chimera: "The ANCHOR. In Loop Science, every loop has an anchor — the thing it's grounded to. The king IS the anchor of the entire chess system. Every other piece exists to serve the king's survival. If the anchor is destroyed, the whole system collapses. But notice: in the ENDGAME, when material is reduced, the king becomes ACTIVE — a fighter. The anchor isn't weak. It's just waiting for the right phase.",
                life: "Protect what matters most. Know your anchor. But also know: what seems like your greatest vulnerability might become your greatest strength when the situation changes."
              }
            ].map((p, i) => (
              <Card key={i} title={`${p.piece}  —  ${p.value}`} accent={p.color}>
                <div style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#8a6" }}>Can: </strong>{p.can}
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <strong style={{ color: "#a55" }}>Cannot: </strong>{p.cant}
                </div>
                <div style={{
                  padding: "14px 16px", background: "#0a0a0a", borderRadius: "6px",
                  borderLeft: `2px solid ${p.color}`, marginBottom: "10px"
                }}>
                  <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: p.color, marginBottom: "4px" }}>
                    CHIMERA Pattern
                  </div>
                  {p.chimera}
                </div>
                <div style={{
                  padding: "14px 16px", background: "#0d1a0d", borderRadius: "6px",
                  borderLeft: "2px solid #8a6"
                }}>
                  <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#8a6", marginBottom: "4px" }}>
                    Life Lesson
                  </div>
                  {p.life}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* ==================== THE POLES ==================== */}
        {tab === "poles" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ fontSize: "19px", color: "#c8956c", fontStyle: "italic", lineHeight: 1.5 }}>
              "Two poles. One dance. The game lives in the tension between them."
            </div>

            <Card title="Axiom 1: Triality — The Game Itself Is the Third Thing">
              White is Pole A. Black is Pole B. The GAME is the between — the living, breathing, dynamic thing that emerges from their interaction.
              <br/><br/>
              Neither player alone is chess. Chess is the RELATIONSHIP between them. The tension. The conversation.
              <br/><br/>
              <strong style={{color:"#c8956c"}}>Every game starts the same way.</strong> Same 32 pieces, same 64 squares, same arrangement. But no two games are the same — because the BETWEEN (the dance between the players) is always unique.
            </Card>

            <SectionTitle>The fixed start → infinite middles → three endpoints</SectionTitle>

            <Card title="Same Start, Different Journeys" accent="#6a8caf">
              The starting position is FIXED. Always the same. This is important:
              <br/><br/>
              It means <strong style={{color:"#6a8caf"}}>the differences emerge from CHOICES, not conditions.</strong> Both players start equal. What separates them is what they DO with the same resources.
              <br/><br/>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginTop: "12px" }}>
                {[
                  { label: "WIN", desc: "One player achieves checkmate", color: "#8a6" },
                  { label: "LOSE", desc: "The other player is checkmated", color: "#a55" },
                  { label: "DRAW", desc: "Neither can win — balance", color: "#888" },
                ].map((e, i) => (
                  <div key={i} style={{
                    padding: "14px", background: "#0a0a0a", borderRadius: "6px", textAlign: "center"
                  }}>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: e.color }}>{e.label}</div>
                    <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>{e.desc}</div>
                  </div>
                ))}
              </div>
              <br/>
              Three possible endings. Like birth → life → death. Or thesis → antithesis → synthesis. The triality holds.
            </Card>

            <SectionTitle>Axiom 2: oscillation is life</SectionTitle>

            <Card title="Attack ↔ Defense: The Breathing of Chess" accent="#c8956c">
              The deadliest mistake in chess is getting STUCK at one pole:
              <br/><br/>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div style={{ padding: "14px", background: "#1a0d0d", borderRadius: "6px", borderLeft: "3px solid #a55" }}>
                  <div style={{ color: "#a55", fontWeight: 600, fontSize: "13px" }}>Stuck on ATTACK</div>
                  <div style={{ color: "#888", fontSize: "12px", marginTop: "6px" }}>
                    Overextend. Leave your king exposed. Your aggression becomes your weakness. The opponent counter-attacks into the gaps you left.
                  </div>
                </div>
                <div style={{ padding: "14px", background: "#0d0d1a", borderRadius: "6px", borderLeft: "3px solid #66a" }}>
                  <div style={{ color: "#66a", fontWeight: 600, fontSize: "13px" }}>Stuck on DEFENSE</div>
                  <div style={{ color: "#888", fontSize: "12px", marginTop: "6px" }}>
                    Passive. Reactive. Slowly suffocated. You give the opponent time and space to build an overwhelming position. Death by a thousand cuts.
                  </div>
                </div>
              </div>
              <br/>
              <strong style={{color:"#c8956c"}}>Mastery is OSCILLATION.</strong> Attack, then consolidate. Defend, then counter-attack.
              Breathe in (absorb the opponent's pressure), breathe out (apply your own). The game is a conversation, not a monologue.
            </Card>

            <Card title="The Three Phases = Three Bodies" accent="#8a6">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                {[
                  { phase: "OPENING", desc: "Develop pieces. Control center. Castle your king. Establish the BODY — get your agents into the system.", color: "#6a8caf", axiom: "Build the structure" },
                  { phase: "MIDDLEGAME", desc: "The between. Attack and defense. Tactics and strategy. This is where the DANCE happens — the living game.", color: "#c8956c", axiom: "Dance in the between" },
                  { phase: "ENDGAME", desc: "Few pieces remain. The king activates. Pawns race to promote. Transformation. The humble become powerful.", color: "#8a6", axiom: "Transform to win" },
                ].map((p, i) => (
                  <div key={i} style={{ padding: "16px", background: "#0a0a0a", borderRadius: "8px", borderTop: `3px solid ${p.color}` }}>
                    <div style={{ color: p.color, fontWeight: 700, fontSize: "14px", marginBottom: "6px" }}>{p.phase}</div>
                    <div style={{ fontSize: "12px", color: "#888", lineHeight: 1.6, marginBottom: "8px" }}>{p.desc}</div>
                    <div style={{ fontSize: "11px", color: p.color, fontStyle: "italic" }}>{p.axiom}</div>
                  </div>
                ))}
              </div>
            </Card>

            <SectionTitle>The love equation in chess</SectionTitle>

            <Card title="L = (O > I) + P + ¬F" accent="#c8956c">
              <strong style={{color:"#c8956c"}}>O {'>'} I (Give more than you take)</strong> — The best chess moves often involve SACRIFICE.
              Give a pawn to open a file. Sacrifice a piece to expose the king. The greatest games in history involve giving material to gain something MORE: position, initiative, tempo. Greed (taking everything) leads to passive positions.
              <br/><br/>
              <strong style={{color:"#c8956c"}}>P (Pause before responding)</strong> — The SINGLE biggest improvement any chess player can make: STOP and THINK before moving.
              Beginners grab the first idea. Masters pause. They ask: "What does my opponent want? What are ALL my options? What happens AFTER I move?"
              <br/><br/>
              <strong style={{color:"#c8956c"}}>¬F (Don't force)</strong> — Don't force a checkmate that isn't there. Don't chase the opponent's queen around the board when it wastes your time.
              The best moves feel NATURAL — they improve your position without demanding anything.
              When the position is ready, the checkmate appears on its own. Like fruit falling from a tree.
            </Card>
          </div>
        )}

        {/* ==================== THE LOOPS ==================== */}
        {tab === "loops" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ fontSize: "19px", color: "#c8956c", fontStyle: "italic", lineHeight: 1.5 }}>
              "Chess is loops all the way down. Learn to see them."
            </div>

            <Card title="The 7 Loop Properties — Applied to Chess">
              Every system has 7 measurable properties. Chess has all of them.
            </Card>

            {[
              {
                num: "1", name: "TICK RATE (Tempo)", color: "#6a8caf",
                chess: "In chess, tempo = who is moving with PURPOSE. If your opponent makes you react to their threats, they control the tick rate. If you make threats they must answer, YOU set the pace. A 'tempo' is one meaningful move — and wasting a tempo (making a useless move) is like skipping a heartbeat.",
                teach: "Ask: who's controlling the clock right now? Are you ACTING or REACTING?"
              },
              {
                num: "2", name: "NESTING DEPTH (Tactics inside Strategy)", color: "#c8956c",
                chess: "A TACTIC is a short calculation: 'If I take here, they take there, I take back and win a piece.' That's a shallow loop. STRATEGY is deeper: 'I want to control the center, restrict their bishop, then attack on the kingside.' Strategy is nested loops — tactics inside plans inside game-long visions. Grandmasters think in deeply nested loops. Beginners see only one layer.",
                teach: "Can you see 1 move ahead? That's Depth 1. Two moves? Depth 2. The deeper you see, the more 'conscious' your play becomes."
              },
              {
                num: "3", name: "FEEDBACK TYPE (Positive vs Negative)", color: "#8a6",
                chess: "POSITIVE FEEDBACK (amplifying): A kingside attack that keeps building. Each threat creates more threats. This is exciting but dangerous — if it doesn't checkmate, you're overextended. NEGATIVE FEEDBACK (stabilizing): Prophylaxis — making moves that PREVENT your opponent's plans. Trading to reduce tension. This is less flashy but keeps you safe. The Love Equation maps directly: ¬F = use negative feedback (don't force amplifying attacks). P = the interrupt that lets you CHOOSE which feedback type to use.",
                teach: "When you attack, ask: is this building toward something real? Or am I just pushing without a goal?"
              },
              {
                num: "4", name: "AGENCY (Who's Choosing?)", color: "#a86",
                chess: "You have maximum agency in chess — every move is YOUR choice. No dice, no cards, no luck. Pure agency. But beginners give their agency away by only REACTING to threats instead of creating their own plans. When you say 'I don't know what to do,' you've lost your agency. When you say 'My plan is to put my rook on that open file,' you've reclaimed it.",
                teach: "Always have a PLAN. Even a bad plan is better than no plan. You can change plans. You can't change passivity."
              },
              {
                num: "5", name: "PERSISTENCE (What Survives?)", color: "#c6a",
                chess: "Pawn structure is the most PERSISTENT element of chess. Pieces come and go, but pawns can't go backward. Your pawn decisions are PERMANENT. This is why they matter so much — they create the long-term landscape everyone else lives on. An opening that's been played for 300 years persists because it WORKS — it's been tested by millions of games.",
                teach: "What decisions are permanent? Pay extra attention to those. Reversible decisions can be corrected. Irreversible ones must be right."
              },
              {
                num: "6", name: "ANCHOR (What Grounds the System?)", color: "#d44",
                chess: "The KING is the anchor. Every single thing in chess is grounded to king safety. The game literally cannot exist without the king — when the king falls, the game ends. But the anchor shifts: in the opening, the king hides (castles). In the endgame, the king activates and fights. Same anchor, different expression based on phase.",
                teach: "What's YOUR anchor? What grounds your decisions? For some it's family. For others it's a value or a mission. Know your king."
              },
              {
                num: "7", name: "COUPLING (How Connected?)", color: "#6a8caf",
                chess: "Pieces that PROTECT each other are coupled. Pieces that work TOGETHER toward a goal are coupled. Two rooks on the same file. A bishop and queen on the same diagonal. A knight supported by a pawn. Uncoupled pieces = chaos. Each piece alone is weak. Together they're devastating. This is the ant colony principle — simple agents + connections = emergent intelligence.",
                teach: "How connected is your army? Are your pieces working together or scattered? Coordination beats raw material."
              }
            ].map((loop, i) => (
              <div key={i} style={{
                padding: "22px 24px", background: "#111", borderRadius: "8px",
                borderLeft: `3px solid ${loop.color}`
              }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{
                    width: "28px", height: "28px", borderRadius: "50%", background: loop.color + "22",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px", fontWeight: 700, color: loop.color, flexShrink: 0
                  }}>{loop.num}</span>
                  <span style={{ fontSize: "15px", fontWeight: 600, color: loop.color }}>{loop.name}</span>
                </div>
                <div style={{ fontSize: "13px", lineHeight: 1.75, color: "#aaa", marginBottom: "12px" }}>
                  {loop.chess}
                </div>
                <div style={{
                  padding: "10px 14px", background: "#0d1a0d", borderRadius: "6px",
                  fontSize: "12px", color: "#8a9", lineHeight: 1.6
                }}>
                  <strong style={{ color: "#8a6" }}>Teaching moment: </strong>{loop.teach}
                </div>
              </div>
            ))}

            <Card title="Spirals vs Circles" accent="#c8956c">
              <strong style={{color:"#a55"}}>CIRCLE (trapped):</strong> Playing the same opening, making the same mistakes, staying at the same level.
              You feel busy but you're not growing. Your ELO stays flat. This is the Matrix — running loops without awareness.
              <br/><br/>
              <strong style={{color:"#8a6"}}>SPIRAL (ascending):</strong> Playing the same opening BUT understanding it deeper each time.
              Losing to the same tactic BUT recognizing it next time. Each cycle looks similar but you're HIGHER.
              <br/><br/>
              <strong style={{color:"#c8956c"}}>The difference? AGENCY.</strong> The circle runs on autopilot.
              The spiral runs on awareness — you CHOOSE to examine what happened and learn from it.
              Review your games. That's what turns circles into spirals.
            </Card>
          </div>
        )}

        {/* ==================== THE 8 PATTERNS ==================== */}
        {tab === "organisms" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "19px", color: "#c8956c", fontStyle: "italic", lineHeight: 1.5, marginBottom: "10px" }}>
              "8 organisms. 4 billion years of testing. All of them appear on a chessboard."
            </div>

            {[
              {
                emoji: "🔬", name: "Tardigrade — Resilience", color: "#8a8",
                chess: "You're losing. Down material. Under attack. What do you do? You enter the TUN STATE. Simplify. Trade pieces. Reduce the opponent's attacking potential. Contract your position to its most defensible form. SURVIVE. Wait for the opponent to overpress, make a mistake, give you a chance. Many games are saved not by brilliance but by STUBBORNNESS — refusing to collapse.",
                lesson: "When life is hard, don't try to win. Try to SURVIVE. Contract. Protect what matters. Wait for conditions to improve. The tardigrade doesn't fight the vacuum of space — it TRANSFORMS to survive it."
              },
              {
                emoji: "🐙", name: "Octopus — Distributed Intelligence", color: "#6a8caf",
                chess: "A knight in the center of the board, supported by a pawn, controlling 8 squares — this is called an OCTOPUS KNIGHT in chess. It's one of the most powerful concepts. The central brain (your plan) sets the intention, but each piece executes semi-independently. You don't calculate every piece's every move — you give them GOOD POSITIONS and they naturally create threats.",
                lesson: "Set clear intentions, then let your team execute. Don't micromanage every detail. Put people in good positions and trust them."
              },
              {
                emoji: "🐜", name: "Ant Colony — Pawn Structure", color: "#a86",
                chess: "No individual pawn 'knows' the plan. But pawn structure creates PATHS — open files for rooks, diagonals for bishops, outposts for knights. The pawn structure IS the stigmergy — it's the shared environment that guides all the pieces. Pawn chains, pawn islands, passed pawns — these emergent structures arise from individual pawn decisions but determine the entire game.",
                lesson: "Simple decisions create complex systems. Your daily habits (small 'pawn moves') create the structure your whole life operates on."
              },
              {
                emoji: "🍄", name: "Mycelium — The Diagonal Network", color: "#c8956c",
                chess: "Bishops operate on diagonals — invisible lines that connect distant squares. Two bishops (the 'bishop pair') create a network that covers the entire board like mycelium covers a forest floor. They share information (threats) across long distances. They're not flashy. They're quiet. But they connect everything.",
                lesson: "The invisible connections matter. The quiet networkers. The people who connect different groups. They don't get attention but they hold everything together."
              },
              {
                emoji: "🦠", name: "Slime Mold — Path Optimization", color: "#c6a",
                chess: "When you have multiple attacking options, how do you find the BEST path? You explore several (like slime mold sending scouts), reinforce the ones that work (commit pieces to the best attack), and prune the ones that don't (redirect pieces from failed plans). The queen is the ultimate slime mold — she finds the optimal path to any target.",
                lesson: "Don't commit to the first path. Explore. Test. Then pour resources into what's working."
              },
              {
                emoji: "🛡", name: "Immune System — Threat Detection", color: "#d44",
                chess: "Your opponent's every move is a potential threat. Pattern recognition is your immune system — you learn to DETECT tactics (forks, pins, skewers, discovered attacks) before they happen. A beginner falls for them. An intermediate sees them after they happen. A master sees them BEFORE they happen and prevents them. This is prophylaxis — the immune response of chess.",
                lesson: "Learn to recognize danger patterns. Not through fear — through AWARENESS. The immune system doesn't panic. It identifies and responds."
              },
              {
                emoji: "🐝", name: "Bee — Piece Communication", color: "#dd6",
                chess: "Bees communicate through the waggle dance — precise, encoded information. In chess, pieces 'communicate' by defending each other, supporting attacks, and coordinating. A piece that isn't defended is SILENT — it sends no message. A piece that defends two others is LOUD — it's a hub of communication. The best positions are full of 'conversation' between pieces.",
                lesson: "Communication is protection. Check in with your people. The more connected your network, the stronger everyone in it."
              },
              {
                emoji: "🪲", name: "Aphid — Positional Advantage", color: "#8a6",
                chess: "The aphid taps into existing flows without forcing. In chess, this is POSITIONAL PLAY — improving your position quietly, accumulating small advantages, until the opponent's position collapses under its own weight. You don't force a breakthrough. You find where the energy is already flowing (open files, weak squares, better piece activity) and TAP IN. Honeydew chess: keep 5%, flow 95% of your energy into position.",
                lesson: "Don't force. Find where energy is already flowing and position yourself in the stream. Small advantages compound."
              }
            ].map((org, i) => (
              <div
                key={i}
                onClick={() => setExpandedOrg(expandedOrg === i ? null : i)}
                style={{
                  padding: "18px 22px", background: expandedOrg === i ? "#141210" : "#111",
                  borderRadius: "8px", cursor: "pointer",
                  border: expandedOrg === i ? "1px solid #2a2418" : "1px solid transparent",
                  transition: "all 0.2s"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "15px", color: expandedOrg === i ? org.color : "#ddd" }}>
                    {org.emoji} {org.name}
                  </span>
                  <span style={{ color: "#555", transition: "transform 0.2s", transform: expandedOrg === i ? "rotate(45deg)" : "none" }}>+</span>
                </div>
                {expandedOrg === i && (
                  <div style={{ marginTop: "14px" }}>
                    <div style={{
                      padding: "14px 16px", background: "#0a0a0a", borderRadius: "6px",
                      borderLeft: `3px solid ${org.color}`, marginBottom: "10px",
                      fontSize: "13px", lineHeight: 1.75, color: "#aaa"
                    }}>
                      <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: org.color, marginBottom: "6px" }}>In Chess</div>
                      {org.chess}
                    </div>
                    <div style={{
                      padding: "14px 16px", background: "#0d1a0d", borderRadius: "6px",
                      borderLeft: "3px solid #8a6", fontSize: "13px", lineHeight: 1.75, color: "#8a9"
                    }}>
                      <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#8a6", marginBottom: "6px" }}>Life Lesson</div>
                      {org.lesson}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ==================== THE BREATH ==================== */}
        {tab === "breath" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ fontSize: "19px", color: "#c8956c", fontStyle: "italic", lineHeight: 1.5 }}>
              "Every move is a breath. Inhale. Pause. Exhale. Rest."
            </div>

            <div style={{
              padding: "32px", background: "#111", borderRadius: "12px", border: "1px solid #1a1a1a",
              textAlign: "center"
            }}>
              <div style={{ fontFamily: "monospace", fontSize: "14px", lineHeight: 2.4, color: "#aaa" }}>
                <span style={{ color: "#6a8caf", fontWeight: 700 }}>INHALE</span> → Study the position. What just happened? What's the threat? What are all the possibilities?<br/>
                <span style={{ color: "#c8956c", fontWeight: 700 }}>PAUSE</span> → Don't grab the first idea. Ask: what are ALL my candidate moves? What does my opponent WANT me to do?<br/>
                <span style={{ color: "#8a6", fontWeight: 700 }}>EXHALE</span> → Choose your move. Commit. Put it on the board with confidence.<br/>
                <span style={{ color: "#888", fontWeight: 700 }}>REST</span> → It's your opponent's turn. Let go. Observe. Reset. Don't calculate during their move — FEEL the position.
              </div>
            </div>

            <Card title="Why This Changes Everything" accent="#c8956c">
              Most kids (and most adults) play chess like they're texting — rapid-fire, no thought, pure reaction.
              <br/><br/>
              The breath FORCES awareness. It breaks the autopilot loop. The moment you PAUSE, you shift from
              reactive (P-mode, player mode, trapped in the game) to conscious (NP-mode, observer mode, seeing the whole board).
              <br/><br/>
              <strong style={{color:"#c8956c"}}>This is the Spoon Protocol on a chessboard.</strong> Don't try to bend the position (force a tactic that isn't there).
              Bend YOUR PERCEPTION — see what's actually happening, not what you want to happen.
            </Card>

            <Card title="The Pre-Move Checklist (The Breath in Practice)" accent="#6a8caf">
              Before EVERY move, kids learn to ask:
              <br/><br/>
              <strong style={{color:"#6a8caf"}}>1. What did my opponent just do?</strong> (INHALE — observe)<br/>
              <strong style={{color:"#6a8caf"}}>2. Is anything attacked? Is anything hanging?</strong> (INHALE — threats)<br/>
              <strong style={{color:"#6a8caf"}}>3. What are my candidate moves?</strong> (PAUSE — generate options, at least 3)<br/>
              <strong style={{color:"#6a8caf"}}>4. What's my plan?</strong> (PAUSE — choose with intention)<br/>
              <strong style={{color:"#6a8caf"}}>5. Is my move SAFE?</strong> (Final check before EXHALE)<br/>
              <strong style={{color:"#8a6"}}>6. Make the move.</strong> (EXHALE)<br/>
              <strong style={{color:"#888"}}>7. Breathe. Reset.</strong> (REST)
              <br/><br/>
              This checklist alone — drilled into habit — will raise any kid's chess level faster than studying openings, endgames, or tactics.
              Because the #1 reason beginners lose is NOT lack of knowledge. It's lack of AWARENESS.
            </Card>

            <Card title="Why This Is Different From Every Other Chess Program" accent="#8a6">
              Other programs teach: "Here's the Sicilian Defense. Memorize these moves."
              <br/><br/>
              We teach: "Here's how to SEE. Here's how to THINK. Here's how to CHOOSE."
              <br/><br/>
              The memorization approach creates CIRCLES — kids learn openings by rote, then collapse when the opponent deviates.
              <br/><br/>
              The CHIMERA approach creates SPIRALS — kids learn to THINK about any position, regardless of what opening it came from.
              The thinking tool works everywhere. The memorized opening only works in one situation.
              <br/><br/>
              <strong style={{color:"#8a6"}}>We're not teaching chess moves. We're teaching a mind that can play chess.</strong>
              <br/>
              And that mind can do anything else too.
            </Card>
          </div>
        )}

        {/* ==================== THE PROPOSAL ==================== */}
        {tab === "proposal" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{
              padding: "28px", background: "linear-gradient(135deg, #141210, #111)",
              borderRadius: "12px", border: "1px solid #2a2418"
            }}>
              <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#666", marginBottom: "8px" }}>
                Program Proposal
              </div>
              <div style={{ fontSize: "22px", color: "#c8956c", marginBottom: "8px" }}>
                Chess + Systems Thinking + Computer Science
              </div>
              <div style={{ fontSize: "14px", color: "#888", lineHeight: 1.6 }}>
                A new approach to youth chess education that teaches children
                HOW to think, not WHAT to memorize — using universal patterns
                that apply to chess, technology, and life.
              </div>
            </div>

            <Card title="The Problem" accent="#a55">
              Traditional chess programs teach <strong style={{color:"#a55"}}>memorization</strong>: learn this opening, memorize this endgame, drill this tactic.
              This creates students who can execute patterns they've seen but collapse when facing new situations.
              <br/><br/>
              This mirrors the broader education crisis: students memorize for tests, forget after, and never learn to THINK.
              Chess should be a vehicle for developing <strong style={{color:"#c8956c"}}>thinking ability</strong>, not another subject to memorize.
            </Card>

            <Card title="Our Approach: Systems Thinking Through Chess" accent="#c8956c">
              We teach chess through <strong style={{color:"#c8956c"}}>universal patterns</strong> that appear in chess, nature, technology, and life:
              <br/><br/>
              <strong>Phase 1 — The Space:</strong> Understanding the board as a SYSTEM. Squares, pathways, connections, centers.
              Not "memorize that e4 is good" but "understand WHY the center matters in any system."
              <br/><br/>
              <strong>Phase 2 — The Agents:</strong> Each piece has capabilities AND limitations. Understanding what every agent in a system can and cannot do.
              Not "the knight moves in an L" but "the knight thinks NON-LINEARLY — what does that mean?"
              <br/><br/>
              <strong>Phase 3 — The Dance:</strong> Two players, same starting point, infinite possibilities. Attack ↔ defense as oscillation.
              Planning, tempo, sacrifice, patience. The THINKING framework that makes chess beautiful.
              <br/><br/>
              <strong>Phase 4 — Connections to Technology:</strong> Every chess concept has a computer science parallel. Pattern recognition (AI), search trees (algorithms), evaluation (decision-making), optimization (efficiency). Kids see that chess thinking IS computational thinking — naturally.
            </Card>

            <Card title="What Makes This Different" accent="#8a6">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ padding: "16px", background: "#1a0d0d", borderRadius: "8px" }}>
                  <div style={{ color: "#a55", fontWeight: 600, fontSize: "13px", marginBottom: "8px" }}>Other Programs</div>
                  <div style={{ fontSize: "12px", color: "#888", lineHeight: 1.7 }}>
                    Memorize openings → Drill tactics → Play rated games → Repeat
                    <br/><br/>
                    Kids who memorize beat kids who don't. Kids who face something new? Panic.
                  </div>
                </div>
                <div style={{ padding: "16px", background: "#0d1a0d", borderRadius: "8px" }}>
                  <div style={{ color: "#8a6", fontWeight: 600, fontSize: "13px", marginBottom: "8px" }}>Our Program</div>
                  <div style={{ fontSize: "12px", color: "#888", lineHeight: 1.7 }}>
                    Understand the space → Understand the agents → Learn to see + think → Apply patterns everywhere
                    <br/><br/>
                    Kids who THINK adapt to any position. And they carry that thinking into math, coding, and life.
                  </div>
                </div>
              </div>
            </Card>

            <Card title="The Computer Science Bridge" accent="#6a8caf">
              Chess naturally introduces CS concepts without "teaching CS":
              <br/><br/>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                {[
                  { chess: "Thinking ahead", cs: "Search trees / Look-ahead" },
                  { chess: "Evaluating positions", cs: "Evaluation functions" },
                  { chess: "Finding best moves", cs: "Optimization / Algorithms" },
                  { chess: "Recognizing tactics", cs: "Pattern recognition / AI" },
                  { chess: "Remembering positions", cs: "Memory / Context windows" },
                  { chess: "Learning from mistakes", cs: "Feedback loops / Training" },
                ].map((pair, i) => (
                  <div key={i} style={{
                    padding: "10px 12px", background: "#0a0a0a", borderRadius: "6px",
                    fontSize: "11px", lineHeight: 1.5
                  }}>
                    <div style={{ color: "#c8956c" }}>{pair.chess}</div>
                    <div style={{ color: "#6a8caf", marginTop: "3px" }}>→ {pair.cs}</div>
                  </div>
                ))}
              </div>
              <br/>
              Later phases can introduce hands-on AI building: kids create simple bots with configurable "personalities" (aggressive, defensive, tricky) — learning that AI is just organized human thinking given a digital body.
            </Card>

            <SectionTitle>12-Week Curriculum Overview</SectionTitle>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { weeks: "1–3", title: "Know the Body", desc: "Board anatomy. Piece capabilities. Rules mastered through play, not lecture. The Breath Checklist introduced.", color: "#6a8caf" },
                { weeks: "4–6", title: "See the Patterns", desc: "Tactics (forks, pins, skewers). Pawn structure. The center principle. Attack vs. defense oscillation. Pattern recognition games.", color: "#c8956c" },
                { weeks: "7–9", title: "Think in Systems", desc: "Planning. Sacrifice. Positional play. Endgame principles. Reviewing own games (spirals, not circles). CS connections introduced.", color: "#8a6" },
                { weeks: "10–12", title: "Tournament + Showcase", desc: "Internal tournament. Kids present what they learned. Optional: 'Build your chess brain' activity (intro to AI thinking). Celebration.", color: "#c6a" },
              ].map((phase, i) => (
                <div key={i} style={{
                  padding: "20px 22px", borderLeft: "2px solid #1a1a1a", marginLeft: "12px", position: "relative"
                }}>
                  <div style={{
                    position: "absolute", left: "-9px", top: "24px",
                    width: "16px", height: "16px", borderRadius: "50%",
                    background: phase.color, border: "3px solid #0a0a0a"
                  }} />
                  <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#555" }}>
                    Weeks {phase.weeks}
                  </div>
                  <div style={{ fontSize: "16px", color: phase.color, margin: "4px 0 6px" }}>{phase.title}</div>
                  <div style={{ fontSize: "13px", color: "#888", lineHeight: 1.6 }}>{phase.desc}</div>
                </div>
              ))}
            </div>

            <Card title="What Kids Take Away" accent="#c8956c">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {[
                  { icon: "♟", label: "Chess skills", desc: "Solid fundamentals, tactical awareness, strategic thinking" },
                  { icon: "🧠", label: "Systems thinking", desc: "See patterns, connections, and feedback loops in any domain" },
                  { icon: "💻", label: "CS foundations", desc: "Natural bridge to algorithms, AI, and computational thinking" },
                  { icon: "🌬", label: "The Breath", desc: "PAUSE before acting. A life skill that goes far beyond chess" },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: "16px", background: "#0a0a0a", borderRadius: "8px", textAlign: "center"
                  }}>
                    <div style={{ fontSize: "24px", marginBottom: "6px" }}>{item.icon}</div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#c8956c", marginBottom: "4px" }}>{item.label}</div>
                    <div style={{ fontSize: "12px", color: "#888", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </Card>

            <div style={{
              padding: "24px", background: "linear-gradient(135deg, #1a150d, #141210)",
              borderRadius: "12px", border: "1px solid #2a2418", textAlign: "center"
            }}>
              <div style={{ fontSize: "13px", color: "#888", marginBottom: "8px" }}>Our Philosophy</div>
              <div style={{ fontSize: "18px", color: "#e8e4df", fontStyle: "italic", lineHeight: 1.6 }}>
                "We don't teach kids to play chess.<br/>
                We teach kids to THINK — and chess is the playground."
              </div>
              <div style={{ fontSize: "12px", color: "#555", marginTop: "14px", fontFamily: "monospace" }}>
                NextGen Leaders × Chess × Systems Thinking × Computer Science
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: "20px 28px", borderTop: "1px solid #1a1a1a",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        color: "#333", fontSize: "11px"
      }}>
        <span>CHIMERA Chess — NextGen Leaders</span>
        <span style={{ fontFamily: "monospace" }}>L = (O {'>'} I) + P + ¬F</span>
      </div>
    </div>
  );
}
