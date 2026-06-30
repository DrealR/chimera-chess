import { useState } from "react";

const tabs = [
  { id: "world", label: "The World", icon: "🗺️" },
  { id: "squad", label: "Your Squad", icon: "🎮" },
  { id: "battle", label: "The Battle", icon: "⚔️" },
  { id: "superpowers", label: "Superpowers", icon: "🧬" },
  { id: "breathe", label: "The Cheat Code", icon: "🔑" },
  { id: "boss", label: "Boss Levels", icon: "👾" },
];

function Box({ title, children, color = "#f0a050", bg = "#1a1510", style = {} }) {
  return (
    <div style={{
      background: bg,
      borderLeft: `4px solid ${color}`,
      borderRadius: "0 12px 12px 0",
      padding: "20px 22px",
      ...style
    }}>
      {title && (
        <div style={{
          fontSize: "16px",
          fontWeight: 700,
          color: color,
          marginBottom: "10px",
        }}>{title}</div>
      )}
      <div style={{ fontSize: "15px", lineHeight: 1.8, color: "#ccc" }}>
        {children}
      </div>
    </div>
  );
}

function VsBox({ left, right, leftLabel = "❌ Nope", rightLabel = "✅ Yes", leftColor = "#e05050", rightColor = "#50c878" }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
      <div style={{
        padding: "14px 16px", background: "#1a1010", borderRadius: "10px",
        borderTop: `3px solid ${leftColor}`, fontSize: "14px", lineHeight: 1.7, color: "#c99"
      }}>
        <div style={{ fontWeight: 700, color: leftColor, marginBottom: "6px", fontSize: "13px" }}>{leftLabel}</div>
        {left}
      </div>
      <div style={{
        padding: "14px 16px", background: "#101a10", borderRadius: "10px",
        borderTop: `3px solid ${rightColor}`, fontSize: "14px", lineHeight: 1.7, color: "#9c9"
      }}>
        <div style={{ fontWeight: 700, color: rightColor, marginBottom: "6px", fontSize: "13px" }}>{rightLabel}</div>
        {right}
      </div>
    </div>
  );
}

function QuizCard({ question, answer, color = "#f0a050" }) {
  const [show, setShow] = useState(false);
  return (
    <div
      onClick={() => setShow(!show)}
      style={{
        padding: "16px 20px",
        background: show ? "#1a1510" : "#141414",
        borderRadius: "10px",
        cursor: "pointer",
        border: show ? `1px solid ${color}44` : "1px solid #222",
        transition: "all 0.2s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "14px", color: show ? color : "#ddd", fontWeight: 600 }}>
          🤔 {question}
        </span>
        <span style={{
          color: "#555", fontSize: "16px",
          transition: "transform 0.2s",
          transform: show ? "rotate(45deg)" : "none"
        }}>+</span>
      </div>
      {show && (
        <div style={{
          marginTop: "12px", padding: "12px 16px", background: "#0a0a0a",
          borderRadius: "8px", fontSize: "14px", lineHeight: 1.7, color: "#aaa",
          borderLeft: `3px solid ${color}`
        }}>
          💡 {answer}
        </div>
      )}
    </div>
  );
}

function Tag({ children, color = "#f0a050" }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      background: color + "18",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: 600,
      color: color,
      marginRight: "6px",
      marginBottom: "4px"
    }}>{children}</span>
  );
}

export default function ChimeraChessKids() {
  const [tab, setTab] = useState("world");
  const [expandedPiece, setExpandedPiece] = useState(null);
  const [expandedPower, setExpandedPower] = useState(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0c0c0c",
      color: "#e8e4df",
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Lilita+One&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        padding: "32px 24px 20px",
        borderBottom: "1px solid #1a1a1a",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "4px",
          background: "linear-gradient(90deg, #f0a050, #e06040, #f0a050, #50c878, #f0a050)"
        }} />
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "32px" }}>♟️</span>
          <h1 style={{
            fontSize: "28px", fontWeight: 800, color: "#f0a050",
            margin: 0, fontFamily: "'Lilita One', 'Nunito', sans-serif",
            letterSpacing: "0.02em"
          }}>
            CHIMERA CHESS
          </h1>
          <span style={{
            fontSize: "13px", color: "#666", fontWeight: 600,
            background: "#1a1a1a", padding: "4px 12px", borderRadius: "20px"
          }}>
            Think Different. Play Different.
          </span>
        </div>
        <p style={{
          marginTop: "10px", fontSize: "15px", color: "#888",
          maxWidth: "580px", lineHeight: 1.6
        }}>
          Chess isn't about memorizing moves. It's about learning to <strong style={{ color: "#f0a050" }}>SEE</strong> and <strong style={{ color: "#50c878" }}>THINK</strong>. 
          Master this, and you'll be dangerous on the board AND in life.
        </p>
      </div>

      {/* Nav */}
      <div style={{
        display: "flex", borderBottom: "1px solid #1a1a1a",
        overflowX: "auto", scrollbarWidth: "none"
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "12px 16px",
            background: tab === t.id ? "#1a1510" : "transparent",
            border: "none",
            borderBottom: tab === t.id ? "3px solid #f0a050" : "3px solid transparent",
            color: tab === t.id ? "#f0a050" : "#555",
            fontSize: "13px",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "all 0.15s",
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "24px", maxWidth: "780px" }}>

        {/* ==================== THE WORLD ==================== */}
        {tab === "world" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{
              fontSize: "20px", color: "#f0a050", fontWeight: 700, lineHeight: 1.4
            }}>
              Before you play a single move — know your world. 🌍
            </div>

            <Box title="The Board = Your Map" color="#50a0e0">
              Think of the chessboard like a video game map. It's got <strong style={{color:"#50a0e0"}}>64 squares</strong> — 32 white and 32 black, arranged in an 8×8 grid.
              <br/><br/>
              Before you go fight the boss, you need to know the map, right? Where are the power-ups? Where are the dead ends? Where's the best position to be?
              <br/><br/>
              In chess, <strong style={{color:"#50a0e0"}}>the map IS the strategy.</strong> Where you put your pieces matters just as much as what pieces you have.
            </Box>

            <Box title="🎯 The Center = The Best Spot on the Map" color="#f0a050">
              The four squares in the middle of the board (d4, d5, e4, e5) are like <strong style={{color:"#f0a050"}}>standing at the center of a basketball court.</strong> From there, you can pass in any direction, drive to either basket, see the whole floor.
              <br/><br/>
              Put a piece in the center? It can reach a TON of squares. Put it in the corner? It's stuck. Watch:
              <br/><br/>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div style={{
                  padding: "16px", background: "#0a0a0a", borderRadius: "10px", textAlign: "center"
                }}>
                  <div style={{ fontSize: "28px" }}>♞</div>
                  <div style={{ color: "#50c878", fontWeight: 700, fontSize: "14px" }}>Knight in the CENTER</div>
                  <div style={{ color: "#50c878", fontSize: "24px", fontWeight: 800 }}>8 squares</div>
                  <div style={{ color: "#888", fontSize: "12px" }}>Can reach 8 different spots</div>
                </div>
                <div style={{
                  padding: "16px", background: "#0a0a0a", borderRadius: "10px", textAlign: "center"
                }}>
                  <div style={{ fontSize: "28px" }}>♞</div>
                  <div style={{ color: "#e05050", fontWeight: 700, fontSize: "14px" }}>Knight in the CORNER</div>
                  <div style={{ color: "#e05050", fontSize: "24px", fontWeight: 800 }}>2 squares</div>
                  <div style={{ color: "#888", fontSize: "12px" }}>Stuck with only 2 options</div>
                </div>
              </div>
              <br/>
              Same piece. Different position. <strong style={{color:"#f0a050"}}>Position changes power.</strong> That's true in chess, in basketball, in life.
            </Box>

            <Box title="Roads on the Map" color="#50c878">
              The board has three types of roads your pieces can travel:
              <br/><br/>
              <strong style={{color:"#50a0e0"}}>↕️ Files</strong> — The columns going up and down (a, b, c, d, e, f, g, h). Like highways going north-south.
              <br/><br/>
              <strong style={{color:"#f0a050"}}>↔️ Ranks</strong> — The rows going left and right (1, 2, 3, 4, 5, 6, 7, 8). Like highways going east-west.
              <br/><br/>
              <strong style={{color:"#50c878"}}>↗️ Diagonals</strong> — The slanted lines. These are the hidden shortcuts — most beginners don't even notice them, but they're SUPER important.
              <br/><br/>
              The more roads you control, the more power you have. It's like controlling the hallways at school — whoever controls the main intersections controls movement.
            </Box>

            <QuizCard
              question="Why is the center so powerful?"
              answer="Because a piece in the center can reach the MOST squares. It's like standing at a crossroads vs. standing in a dead-end alley. More options = more power. In basketball, the point guard runs things from the CENTER of the court, not from the corner."
            />
            <QuizCard
              question="What happens when you put a piece in the corner?"
              answer="It gets trapped! A knight in the corner only reaches 2 squares instead of 8. That's like a basketball player standing behind the backboard — you took yourself out of the game."
            />
          </div>
        )}

        {/* ==================== YOUR SQUAD ==================== */}
        {tab === "squad" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{
              fontSize: "20px", color: "#f0a050", fontWeight: 700, lineHeight: 1.4
            }}>
              Meet your team. Every piece has strengths AND weaknesses. 🎮
            </div>

            {[
              {
                emoji: "♟", name: "THE PAWN", nickname: "The Underdog",
                value: "1 point", color: "#50c878",
                moves: "Forward one square (two on its first move). Captures diagonally.",
                strength: "It's the ONLY piece that can level up. If a pawn makes it all the way to the other side of the board, it becomes a QUEEN — the most powerful piece in the game.",
                weakness: "Can't go backward. Ever. Once you push a pawn, that's permanent.",
                vibe: "Think of a video game character that starts at Level 1 with no gear. Everyone ignores them. But if they survive the whole map? They become the final boss. That's the pawn. Every queen started as a pawn that didn't quit.",
                tip: "Be careful pushing pawns — you can't undo it! But don't be afraid to march them forward when the time is right."
              },
              {
                emoji: "♞", name: "THE KNIGHT", nickname: "The Trickster",
                value: "3 points", color: "#50a0e0",
                moves: "L-shape: two squares one direction, then one square to the side. Can JUMP over other pieces.",
                strength: "Only piece that can hop over things. Reaches squares nobody else can. Amazing in crowded, messy positions.",
                weakness: "Slow to cross the whole board. Takes multiple hops to get anywhere far.",
                vibe: "The knight is that friend who always finds a weird shortcut. Everyone else is stuck in traffic, and the knight's like 'nah, I know a way.' It doesn't think in straight lines — it thinks in angles and surprises.",
                tip: "Put your knights toward the center where they can reach 8 squares. A knight on the edge is SAD."
              },
              {
                emoji: "♗", name: "THE BISHOP", nickname: "The Sniper",
                value: "3 points", color: "#c070d0",
                moves: "Any number of squares diagonally. Zooms across the whole board in one move.",
                strength: "Long-range diagonal control. Two bishops together cover the entire board — light AND dark squares.",
                weakness: "Stuck on ONE color forever. A bishop on white squares can NEVER reach a dark square. It literally can't see half the board.",
                vibe: "The bishop is a sniper — long range, super accurate on its lane, but has blind spots. That's why having BOTH bishops is so strong. One covers what the other can't see. It's like a duo where each person has different skills.",
                tip: "Don't block your bishops with your own pawns! Give them open diagonals to snipe from."
              },
              {
                emoji: "♜", name: "THE ROOK", nickname: "The Tank",
                value: "5 points", color: "#e0a040",
                moves: "Any number of squares in a straight line — up, down, left, or right.",
                strength: "Dominates open files (columns with no pawns blocking). Two rooks doubled on the same file = DEVASTATING.",
                weakness: "Useless when the board is clogged with pawns. Needs open space to be powerful.",
                vibe: "The rook is like an ambulance — it needs clear roads. In traffic? Stuck. On an open highway? UNSTOPPABLE. Your job is to create open roads for your rooks.",
                tip: "Get your rooks onto open files! Trade some pawns to clear the highway."
              },
              {
                emoji: "♛", name: "THE QUEEN", nickname: "The All-Star",
                value: "9 points", color: "#e05080",
                moves: "Combines rook + bishop. Goes any direction, any distance. Most mobile piece on the board.",
                strength: "Can do everything. Attack from anywhere. Reach any square.",
                weakness: "She's so valuable that losing her usually means losing the game. And bringing her out too early is a TRAP — opponents just chase her around while developing their own pieces.",
                vibe: "The queen is like being the most famous kid in school — everyone's looking at you. That's power, but it's also pressure. If you show off too early, people just target you. The best players keep the queen back until the perfect moment, then BOOM.",
                tip: "DON'T bring your queen out in the first few moves! Develop your other pieces first. The queen enters when the stage is set."
              },
              {
                emoji: "♚", name: "THE KING", nickname: "The VIP",
                value: "♾️ — THE GAME", color: "#e05050",
                moves: "One square in any direction. Can castle (a special safety move early in the game).",
                strength: "In the endgame (when most pieces are gone), the king activates and becomes a fighter. He walks up the board and supports his pawns.",
                weakness: "If the king gets checkmated, you lose. Period. That's it. Game over.",
                vibe: "The king is the VIP you're protecting at all costs. Like in capture-the-flag — everything your team does is to protect your flag and capture theirs. But here's the plot twist: late in the game, when most of the danger is gone, the VIP steps out and starts doing work himself. The thing you spent the whole game protecting becomes your secret weapon.",
                tip: "Castle early to keep your king safe! But in the endgame, don't be afraid to activate him."
              }
            ].map((piece, i) => (
              <div
                key={i}
                onClick={() => setExpandedPiece(expandedPiece === i ? null : i)}
                style={{
                  padding: "18px 20px",
                  background: expandedPiece === i ? "#161412" : "#131313",
                  borderRadius: "12px",
                  cursor: "pointer",
                  border: expandedPiece === i ? `1px solid ${piece.color}33` : "1px solid #1a1a1a",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "22px" }}>{piece.emoji}</span>
                    <span style={{ fontSize: "16px", fontWeight: 800, color: expandedPiece === i ? piece.color : "#ddd" }}>
                      {piece.name}
                    </span>
                    <span style={{ fontSize: "12px", color: "#666", fontWeight: 600 }}>
                      {piece.nickname}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Tag color={piece.color}>{piece.value}</Tag>
                    <span style={{
                      color: "#444", fontSize: "18px", transition: "transform 0.2s",
                      transform: expandedPiece === i ? "rotate(45deg)" : "none"
                    }}>+</span>
                  </div>
                </div>

                {expandedPiece === i && (
                  <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{
                      padding: "12px 16px", background: "#0a0a0a", borderRadius: "8px",
                      fontSize: "14px", lineHeight: 1.7, color: "#aaa"
                    }}>
                      <strong style={{ color: "#888" }}>How it moves: </strong>{piece.moves}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <div style={{
                        padding: "12px 14px", background: "#0a1a0a", borderRadius: "8px",
                        fontSize: "13px", lineHeight: 1.7, color: "#8a8"
                      }}>
                        <strong style={{ color: "#50c878" }}>💪 Strength: </strong>{piece.strength}
                      </div>
                      <div style={{
                        padding: "12px 14px", background: "#1a0a0a", borderRadius: "8px",
                        fontSize: "13px", lineHeight: 1.7, color: "#a88"
                      }}>
                        <strong style={{ color: "#e05050" }}>⚠️ Weakness: </strong>{piece.weakness}
                      </div>
                    </div>

                    <div style={{
                      padding: "14px 16px", background: piece.color + "10", borderRadius: "8px",
                      borderLeft: `4px solid ${piece.color}`, fontSize: "14px", lineHeight: 1.7, color: "#ccc"
                    }}>
                      <strong style={{ color: piece.color }}>Real talk: </strong>{piece.vibe}
                    </div>

                    <div style={{
                      padding: "10px 14px", background: "#0a0a0a", borderRadius: "8px",
                      fontSize: "13px", color: "#f0a050", fontWeight: 600
                    }}>
                      🎯 Pro tip: {piece.tip}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ==================== THE BATTLE ==================== */}
        {tab === "battle" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{
              fontSize: "20px", color: "#f0a050", fontWeight: 700, lineHeight: 1.4
            }}>
              How a chess game actually works. ⚔️
            </div>

            <Box title="Same Start, Different Story" color="#50a0e0">
              Every chess game in history starts with the EXACT SAME position. Same pieces, same squares, same everything. Both players are totally equal.
              <br/><br/>
              So what makes one player win? <strong style={{color:"#50a0e0"}}>The choices they make.</strong>
              <br/><br/>
              It's like everyone gets the same blank Minecraft world. What you BUILD with it is up to you.
            </Box>

            <Box title="The Three Phases of a Game" color="#f0a050">
              Every game has three parts, like a story with a beginning, middle, and end:
            </Box>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
              {[
                {
                  phase: "🏗️ OPENING",
                  time: "First 10-15 moves",
                  what: "Get your pieces out. Control the center. Castle your king to safety. BUILD YOUR TEAM.",
                  like: "Like the first quarter in basketball — set up your plays, get in position.",
                  color: "#50a0e0"
                },
                {
                  phase: "⚔️ MIDDLEGAME",
                  time: "The main action",
                  what: "Attack and defend. Use tactics. Execute your plan. This is where the real battle happens.",
                  like: "Like the 2nd and 3rd quarters — the grind, the highlight plays, the momentum swings.",
                  color: "#f0a050"
                },
                {
                  phase: "🏆 ENDGAME",
                  time: "Few pieces left",
                  what: "King activates. Pawns race to promote. Small advantages become huge. Precision wins.",
                  like: "Like the 4th quarter — clutch time. Every move matters. No room for mistakes.",
                  color: "#50c878"
                }
              ].map((p, i) => (
                <div key={i} style={{
                  padding: "16px", background: "#131313", borderRadius: "12px",
                  borderTop: `4px solid ${p.color}`
                }}>
                  <div style={{ color: p.color, fontWeight: 800, fontSize: "15px", marginBottom: "4px" }}>{p.phase}</div>
                  <div style={{ fontSize: "11px", color: "#555", marginBottom: "8px" }}>{p.time}</div>
                  <div style={{ fontSize: "13px", color: "#aaa", lineHeight: 1.7, marginBottom: "10px" }}>{p.what}</div>
                  <div style={{
                    fontSize: "12px", color: p.color, fontStyle: "italic",
                    padding: "8px 10px", background: "#0a0a0a", borderRadius: "6px"
                  }}>{p.like}</div>
                </div>
              ))}
            </div>

            <Box title="Attack ↔ Defense: Don't Get Stuck" color="#e05050">
              Here's the trap most beginners fall into:
            </Box>

            <VsBox
              leftLabel="❌ Only Attack"
              left="You rush in with everything, leave your king wide open, and get destroyed by a counter-attack. It's like pressing full-court in basketball when you're tired — you leave the lane wide open."
              rightLabel="❌ Only Defend"
              right="You sit back, do nothing, and slowly get squeezed until you can't breathe. It's like playing not to lose instead of playing to win — you just slowly die."
            />

            <Box title="✅ The Answer: Keep Switching" color="#50c878">
              Attack, then pull back and strengthen your position. Defend, then look for a chance to counter-attack. 
              Back and forth. Like breathing — in and out. Like offense and defense in a game.
              <br/><br/>
              <strong style={{color:"#50c878"}}>The best players flow between attack and defense. They never get stuck on one side.</strong>
            </Box>

            <Box title="Three Huge Ideas That Win Games" color="#f0a050">
              <strong style={{color:"#f0a050"}}>1. Give to Get</strong> — Sometimes the best move is to SACRIFICE a piece. Give up a pawn to open a pathway. Give up a knight to expose their king. The greatest chess games ever played involve sacrifices. Greedy players who grab everything often lose to players who give things up for a bigger plan.
              <br/><br/>
              <strong style={{color:"#f0a050"}}>2. Slow Down</strong> — The #1 reason beginners lose isn't that they don't know enough. It's that they move TOO FAST. They see one idea and grab it. Pros see three ideas and pick the best one. Just slowing down makes you instantly better.
              <br/><br/>
              <strong style={{color:"#f0a050"}}>3. Don't Force It</strong> — If you're trying to checkmate and it's not working, STOP. Improve your position. The checkmate will come naturally when your pieces are in the right spots. Forcing it is like shooting a contested three when you could pass for an open layup.
            </Box>

            <QuizCard
              question="What's the biggest mistake beginners make?"
              answer="Moving too fast! Not looking at what the opponent just did, not considering multiple options, just playing the first move they see. Slowing down and LOOKING at the board is worth more than knowing a hundred openings."
            />
          </div>
        )}

        {/* ==================== SUPERPOWERS ==================== */}
        {tab === "superpowers" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{
              fontSize: "20px", color: "#f0a050", fontWeight: 700, lineHeight: 1.4
            }}>
              8 Nature Superpowers hidden in chess. 🧬
            </div>
            <div style={{ fontSize: "14px", color: "#888", lineHeight: 1.6 }}>
              These come from real animals and organisms that have survived for BILLIONS of years. They each figured out a superpower. All 8 show up on a chessboard.
            </div>

            {[
              {
                emoji: "🐻", name: "Water Bear Power", subtitle: "Survive Anything",
                color: "#50c878",
                animal: "Tardigrades (water bears) are tiny creatures that can survive in outer space, boiling water, and freezing cold. They don't fight bad conditions — they curl up, protect their core, and WAIT until things get better.",
                chess: "You're losing badly. Down pieces. Getting attacked. What do you do? Don't panic. Simplify. Trade pieces. Make your position as small and solid as possible. SURVIVE. Wait for your opponent to get sloppy. Many games are saved by just refusing to give up.",
                life: "Bad day? Bad week? You don't have to solve everything right now. Protect what matters, survive the storm, and come back when you're ready."
              },
              {
                emoji: "🐙", name: "Octopus Power", subtitle: "Think Different",
                color: "#50a0e0",
                animal: "An octopus has brains in its ARMS. Its main brain sets the goal, but each arm figures out how to do it independently. They solve problems from every angle.",
                chess: "A knight in the center of the board is literally called an 'octopus' in chess. It reaches in 8 directions and attacks from angles nobody expects. The knight is the piece that thinks differently — while everything else goes in straight lines, it jumps in L-shapes.",
                life: "Don't always think in straight lines. Sometimes the answer is to come at the problem from a completely different angle. The weird approach is sometimes the best one."
              },
              {
                emoji: "🐜", name: "Ant Colony Power", subtitle: "Teamwork Makes the Dream Work",
                color: "#e0a040",
                animal: "No single ant knows the big plan. But thousands of ants following simple rules create incredible things — highways, bridges, farms. The group is smarter than any individual.",
                chess: "Your pawns are the ant colony. No single pawn is impressive. But your PAWN STRUCTURE — the pattern they create together — determines the entire game. They create paths for rooks, posts for knights, and walls for defense. Simple pieces, incredible together.",
                life: "You don't need to be the star. Do your small part well, support the people around you, and amazing things happen. The team is always more powerful than the individual."
              },
              {
                emoji: "🍄", name: "Mushroom Network Power", subtitle: "Hidden Connections",
                color: "#c070d0",
                animal: "Underground, mushroom roots (mycelium) connect entire forests. Trees share food and send warnings to each other through this hidden network. You can't see it, but it holds the whole forest together.",
                chess: "Bishops work on diagonals — lines most beginners don't even notice. Two bishops create an invisible web across the entire board. They're quiet, they're not flashy, but they connect everything. The player who sees diagonals has a huge advantage over the one who only sees straight lines.",
                life: "The quiet connectors are powerful. The person who links different friend groups, who notices things others miss, who sees the hidden patterns — that's the mycelium. Being observant is a superpower."
              },
              {
                emoji: "🦠", name: "Slime Mold Power", subtitle: "Find the Best Path",
                color: "#e05080",
                animal: "Slime molds have no brain, but they can find the shortest path through a maze. They explore in all directions, then strengthen the path that works best and abandon the rest.",
                chess: "When you have multiple ways to attack, explore them in your mind first. Don't commit to the first idea. Check your options (at least 3!), find the best one, THEN commit. The queen is the ultimate slime mold — she can find a path to anywhere.",
                life: "Don't lock into the first solution. Explore. Test ideas. Then double down on what works. The best path isn't always the obvious one."
              },
              {
                emoji: "🛡️", name: "Immune System Power", subtitle: "Spot Danger Before It Hits",
                color: "#e05050",
                animal: "Your immune system recognizes threats BEFORE they make you sick. It remembers every virus it's ever fought so it can respond faster next time.",
                chess: "Tactics like forks, pins, and skewers are like viruses — they'll destroy you if you don't see them coming. A beginner falls for them. An experienced player spots them BEFORE they happen and prevents them. Every pattern you learn to recognize is like adding a new antibody to your system.",
                life: "Learn to recognize danger patterns — in chess, in social situations, everywhere. Not to be scared, but to be AWARE. The more patterns you recognize, the fewer surprises can hurt you."
              },
              {
                emoji: "🐝", name: "Bee Power", subtitle: "Communicate & Protect",
                color: "#e0c040",
                animal: "Bees do a 'waggle dance' to tell each other where food is. Their whole colony runs on precise communication. And they protect each other fiercely.",
                chess: "Pieces that defend each other are COMMUNICATING. A piece that nobody protects is alone and vulnerable. The best positions have pieces all protecting each other — a network where touching one triggers a response from another.",
                life: "Check in with your people. Cover for each other. A connected group is almost impossible to break. An isolated individual is easy to pick off."
              },
              {
                emoji: "🪲", name: "Aphid Power", subtitle: "Tap Into the Flow",
                color: "#50c878",
                animal: "Aphids don't hunt or fight. They find where nutrients are already flowing (plant sap) and gently tap in. They don't force anything — they position themselves where the good stuff already is.",
                chess: "Positional play. Instead of forcing an attack, just keep making your position a tiny bit better, move by move. Control an open file. Plant a piece on a strong square. Small improvements stack up until your opponent's position collapses under its own weight. You didn't force anything — you just kept improving.",
                life: "You don't always have to push and force things. Sometimes the move is to put yourself in the right position and let good things flow to you. Work smart, not just hard."
              }
            ].map((power, i) => (
              <div
                key={i}
                onClick={() => setExpandedPower(expandedPower === i ? null : i)}
                style={{
                  padding: "16px 20px",
                  background: expandedPower === i ? "#161412" : "#131313",
                  borderRadius: "12px",
                  cursor: "pointer",
                  border: expandedPower === i ? `1px solid ${power.color}33` : "1px solid #1a1a1a",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "20px" }}>{power.emoji}</span>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: expandedPower === i ? power.color : "#ddd" }}>
                      {power.name}
                    </span>
                    <span style={{ fontSize: "12px", color: "#666" }}>— {power.subtitle}</span>
                  </div>
                  <span style={{
                    color: "#444", fontSize: "18px", transition: "transform 0.2s",
                    transform: expandedPower === i ? "rotate(45deg)" : "none"
                  }}>+</span>
                </div>
                {expandedPower === i && (
                  <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{
                      padding: "12px 16px", background: "#0a0a0a", borderRadius: "8px",
                      fontSize: "13px", lineHeight: 1.75, color: "#aaa",
                      borderLeft: `3px solid ${power.color}`
                    }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: power.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                        🌎 In Nature
                      </div>
                      {power.animal}
                    </div>
                    <div style={{
                      padding: "12px 16px", background: "#0d1218", borderRadius: "8px",
                      fontSize: "13px", lineHeight: 1.75, color: "#8ab",
                      borderLeft: "3px solid #50a0e0"
                    }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#50a0e0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                        ♟ On the Board
                      </div>
                      {power.chess}
                    </div>
                    <div style={{
                      padding: "12px 16px", background: "#101a10", borderRadius: "8px",
                      fontSize: "13px", lineHeight: 1.75, color: "#9c9",
                      borderLeft: "3px solid #50c878"
                    }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#50c878", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                        🧠 In Life
                      </div>
                      {power.life}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ==================== THE CHEAT CODE ==================== */}
        {tab === "breathe" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{
              fontSize: "20px", color: "#f0a050", fontWeight: 700, lineHeight: 1.4
            }}>
              The one cheat code that makes you instantly better. 🔑
            </div>

            <div style={{
              padding: "28px", background: "#131313", borderRadius: "16px",
              border: "1px solid #222", textAlign: "center"
            }}>
              <div style={{ fontSize: "16px", color: "#888", marginBottom: "20px" }}>
                Before EVERY move, do this:
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", textAlign: "left", maxWidth: "500px", margin: "0 auto" }}>
                {[
                  { step: "1", label: "LOOK", color: "#50a0e0", icon: "👀", desc: "What did your opponent just do? Is anything being attacked? Is anything free to take?" },
                  { step: "2", label: "THINK", color: "#f0a050", icon: "🧠", desc: "What are my options? Come up with AT LEAST 3 possible moves. Not just one — THREE." },
                  { step: "3", label: "CHECK", color: "#e05050", icon: "🔍", desc: "For each option: if I do this, what will THEY do? Is my move safe? Am I leaving anything hanging?" },
                  { step: "4", label: "MOVE", color: "#50c878", icon: "✅", desc: "Pick the best option. Put it on the board. Commit." },
                  { step: "5", label: "RESET", color: "#888", icon: "🔄", desc: "It's their turn. Take a breath. Don't calculate — just observe the board fresh." },
                ].map((s, i) => (
                  <div key={i} style={{
                    display: "flex", gap: "14px", alignItems: "flex-start",
                    padding: "14px 16px", background: s.color + "08", borderRadius: "10px",
                    borderLeft: `4px solid ${s.color}`
                  }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      background: s.color + "20", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "18px", flexShrink: 0
                    }}>{s.icon}</div>
                    <div>
                      <div style={{ fontWeight: 800, color: s.color, fontSize: "15px" }}>
                        Step {s.step}: {s.label}
                      </div>
                      <div style={{ fontSize: "14px", color: "#aaa", lineHeight: 1.6, marginTop: "2px" }}>
                        {s.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Box title="Why This Works (It's Stupid Simple)" color="#50c878">
              The #1 reason beginners lose chess games is <strong style={{color:"#e05050"}}>NOT</strong> that they don't know enough openings or tactics.
              <br/><br/>
              It's that <strong style={{color:"#e05050"}}>they don't LOOK at the board.</strong>
              <br/><br/>
              They see one move, play it in 2 seconds, and miss that their opponent was about to take their queen for free. 
              Or they miss that they had a way better move right in front of them.
              <br/><br/>
              <strong style={{color:"#50c878"}}>Just doing LOOK → THINK → CHECK before every single move will make you better than most people who play chess casually.</strong>
              No memorization needed. No special knowledge. Just discipline.
            </Box>

            <VsBox
              leftLabel="🐇 The Speed Player"
              left="Sees one move. Plays it immediately. Misses threats. Misses opportunities. Loses fast or wins by accident. Never improves because they never think."
              rightLabel="🐢 The Thinker"
              right="Pauses. Checks what just happened. Considers 3 options. Picks the best one. Catches threats. Finds good moves. Gets better every game."
            />

            <Box title="The Three Magic Questions" color="#f0a050">
              If you can only remember THREE things, remember these questions to ask yourself before every move:
              <br/><br/>
              <div style={{
                fontSize: "17px", fontWeight: 700, lineHeight: 2.2, padding: "16px 20px",
                background: "#0a0a0a", borderRadius: "10px", textAlign: "center"
              }}>
                <span style={{color:"#50a0e0"}}>1. What did THEY just do?</span><br/>
                <span style={{color:"#e05050"}}>2. Can anything take anything?</span><br/>
                <span style={{color:"#50c878"}}>3. What's my PLAN?</span>
              </div>
              <br/>
              That's it. Those three questions, asked every single move, will level you up faster than anything else.
            </Box>

            <QuizCard
              question="What's the minimum number of options you should think of before moving?"
              answer="THREE! Not one, not two — three. Force yourself to see at least 3 possible moves. This stops you from just grabbing the first idea. Usually the second or third option is better than the first one."
            />

            <QuizCard
              question="What should you do during your OPPONENT'S turn?"
              answer="Reset! Take a breath. Don't calculate their move for them. Instead, look at the big picture — where is the tension? Which side of the board is the action on? When they make their move, THEN react to what they actually did, not what you predicted."
            />
          </div>
        )}

        {/* ==================== BOSS LEVELS ==================== */}
        {tab === "boss" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{
              fontSize: "20px", color: "#f0a050", fontWeight: 700, lineHeight: 1.4
            }}>
              Level up. Here's your 12-week path. 👾
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                {
                  level: "LVL 1", weeks: "Weeks 1–3", title: "🗺️ LEARN THE MAP",
                  color: "#50a0e0",
                  skills: [
                    "Know every square, every file, every rank",
                    "Learn how every piece moves (and what it CAN'T do)",
                    "Practice the LOOK → THINK → CHECK routine",
                    "Play games with the clock turned OFF (no rush)"
                  ],
                  unlock: "You can set up the board, play a legal game, and you PAUSE before every move."
                },
                {
                  level: "LVL 2", weeks: "Weeks 4–6", title: "⚔️ LEARN THE WEAPONS",
                  color: "#f0a050",
                  skills: [
                    "Forks — attacking TWO pieces at once (mostly knights!)",
                    "Pins — an enemy piece can't move because something worse is behind it",
                    "Skewers — attack a valuable piece, it moves, you take what's behind it",
                    "Pawn structure — how your pawns create the landscape for everything else"
                  ],
                  unlock: "You can spot basic tactics, you understand why the center matters, and your games are getting longer (not losing in 10 moves anymore)."
                },
                {
                  level: "LVL 3", weeks: "Weeks 7–9", title: "🧠 LEARN TO THINK",
                  color: "#50c878",
                  skills: [
                    "Having a PLAN (not just reacting to your opponent)",
                    "Knowing when to attack vs when to improve position",
                    "Endgame basics — king + pawn endings, how to promote",
                    "Reviewing your own games — turning mistakes into lessons"
                  ],
                  unlock: "You play with a plan. You can explain WHY you made a move. You learn from losses instead of just being frustrated."
                },
                {
                  level: "BOSS", weeks: "Weeks 10–12", title: "🏆 PROVE IT",
                  color: "#e05080",
                  skills: [
                    "In-class tournament — put everything together",
                    "Present your favorite game and explain the key moments",
                    "Bonus: intro to how computers think about chess (CS bridge)",
                    "Bonus: design your own chess AI personality (what would it value?)"
                  ],
                  unlock: "You can play a solid game, explain your thinking, and you understand chess as a THINKING system — not a memorization exercise."
                }
              ].map((level, i) => (
                <div key={i} style={{
                  padding: "22px", borderLeft: "3px solid #1a1a1a",
                  marginLeft: "20px", position: "relative"
                }}>
                  <div style={{
                    position: "absolute", left: "-14px", top: "26px",
                    width: "24px", height: "24px", borderRadius: "50%",
                    background: level.color, border: "4px solid #0c0c0c",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "9px", fontWeight: 800, color: "#000"
                  }}>
                    {i + 1}
                  </div>
                  <div style={{
                    fontSize: "11px", fontWeight: 700, color: "#555",
                    textTransform: "uppercase", letterSpacing: "0.12em"
                  }}>{level.weeks} — {level.level}</div>
                  <div style={{
                    fontSize: "18px", fontWeight: 800, color: level.color, margin: "6px 0 12px"
                  }}>{level.title}</div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                    {level.skills.map((skill, j) => (
                      <div key={j} style={{
                        display: "flex", gap: "10px", alignItems: "flex-start",
                        fontSize: "14px", color: "#aaa", lineHeight: 1.6
                      }}>
                        <span style={{ color: level.color, flexShrink: 0 }}>→</span>
                        {skill}
                      </div>
                    ))}
                  </div>

                  <div style={{
                    padding: "10px 14px", background: level.color + "10",
                    borderRadius: "8px", fontSize: "13px", color: level.color, fontWeight: 600
                  }}>
                    🔓 Level complete when: {level.unlock}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              padding: "24px", background: "#131313", borderRadius: "16px",
              border: "1px solid #222", textAlign: "center"
            }}>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "8px" }}>What makes this different from every other chess class:</div>
              <div style={{
                fontSize: "20px", fontWeight: 800, color: "#f0a050",
                lineHeight: 1.5
              }}>
                We don't teach you WHAT to play.<br/>
                We teach you HOW to think. ♟️🧠
              </div>
              <div style={{ fontSize: "13px", color: "#666", marginTop: "12px" }}>
                Chess is the playground. Thinking is the skill. The skill works everywhere.
              </div>
            </div>

            <Box title="What You'll Walk Away With" color="#50c878">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {[
                  { icon: "♟️", label: "Chess skills", desc: "Real fundamentals. Tactics. Strategy. Not memorization." },
                  { icon: "🧠", label: "Thinking power", desc: "See patterns, plan ahead, make better decisions — in chess and everything else." },
                  { icon: "🤝", label: "Teamwork", desc: "Understanding how different strengths work together (the bishop pair, the rook highway, the pawn chain)." },
                  { icon: "😤", label: "Mental toughness", desc: "Learning to lose, learn from it, and come back stronger. That's the water bear in you." },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: "14px", background: "#0a0a0a", borderRadius: "10px", textAlign: "center"
                  }}>
                    <div style={{ fontSize: "24px", marginBottom: "6px" }}>{item.icon}</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#f0a050" }}>{item.label}</div>
                    <div style={{ fontSize: "12px", color: "#888", marginTop: "4px", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </Box>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: "18px 24px", borderTop: "1px solid #1a1a1a",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        color: "#333", fontSize: "12px", fontWeight: 600
      }}>
        <span>CHIMERA CHESS — NextGen Leaders ♟️</span>
        <span>Think Different. Play Different.</span>
      </div>
    </div>
  );
}
