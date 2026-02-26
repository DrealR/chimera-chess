export type CSBridgeQuickReferenceRow = {
  week: number;
  chessTopic: string;
  csConcept: string;
};

export type CSBridgeWeek = {
  week: number;
  chessTopic: string;
  csConcept: string;
  howItConnects: string;
  discussionQuestion: string;
  miniActivity?: string;
};

export type CSBridgePhase = {
  id: number;
  name: string;
  range: string;
  theme: string;
  color: string;
  weeks: CSBridgeWeek[];
};

export const CS_BRIDGE_HEADER = 'Computer Science Bridge — Chess is analog coding.';

export const CS_BRIDGE_QUICK_REFERENCE: CSBridgeQuickReferenceRow[] = [
  {
    "week": 1,
    "chessTopic": "The Board & Squares",
    "csConcept": "Coordinate Systems & 2D Arrays"
  },
  {
    "week": 2,
    "chessTopic": "Pawns & The King",
    "csConcept": "Variables vs. Constants"
  },
  {
    "week": 3,
    "chessTopic": "Rooks & Knights",
    "csConcept": "Linear vs. Non-Linear Search"
  },
  {
    "week": 4,
    "chessTopic": "Bishops & Queen",
    "csConcept": "Specialization vs. Generalization"
  },
  {
    "week": 5,
    "chessTopic": "Special Moves",
    "csConcept": "Edge Cases & Software Upgrades"
  },
  {
    "week": 6,
    "chessTopic": "Check, Checkmate & Stalemate",
    "csConcept": "IF / THEN / ELSE Logic"
  },
  {
    "week": 7,
    "chessTopic": "Basic Tactics & Piece Values",
    "csConcept": "Cost-Benefit Analysis & Parallel Processing"
  },
  {
    "week": 8,
    "chessTopic": "Mini-Tournament",
    "csConcept": "Testing & Debugging"
  },
  {
    "week": 9,
    "chessTopic": "Forks",
    "csConcept": "Parallel Processing"
  },
  {
    "week": 10,
    "chessTopic": "Pins",
    "csConcept": "Dependency Locks"
  },
  {
    "week": 11,
    "chessTopic": "Skewers",
    "csConcept": "Stack Operations (LIFO)"
  },
  {
    "week": 12,
    "chessTopic": "Discovered Attacks",
    "csConcept": "Triggers & Chain Reactions"
  },
  {
    "week": 13,
    "chessTopic": "Removing the Defender",
    "csConcept": "Breaking Dependencies"
  },
  {
    "week": 14,
    "chessTopic": "Checkmate Patterns",
    "csConcept": "Design Patterns"
  },
  {
    "week": 15,
    "chessTopic": "Midterm Review",
    "csConcept": "Code Review & Refactoring"
  },
  {
    "week": 16,
    "chessTopic": "Opening Principles",
    "csConcept": "System Boot Sequence"
  },
  {
    "week": 17,
    "chessTopic": "Pawn Structure",
    "csConcept": "Data Structures"
  },
  {
    "week": 18,
    "chessTopic": "Piece Coordination",
    "csConcept": "Microservices Architecture"
  },
  {
    "week": 19,
    "chessTopic": "King Safety",
    "csConcept": "Cybersecurity & Firewalls"
  },
  {
    "week": 20,
    "chessTopic": "Endgame Basics",
    "csConcept": "Minimum Viable Product (MVP)"
  },
  {
    "week": 21,
    "chessTopic": "Planning Ahead",
    "csConcept": "Agile Development Sprints"
  },
  {
    "week": 22,
    "chessTopic": "Famous Games Study",
    "csConcept": "Reading Open Source Code"
  },
  {
    "week": 23,
    "chessTopic": "Blitz Chess & Time Management",
    "csConcept": "Performance Optimization"
  },
  {
    "week": 24,
    "chessTopic": "Championship Tournament Part 1",
    "csConcept": "Hackathon / Demo Day"
  },
  {
    "week": 25,
    "chessTopic": "Championship Tournament Part 2",
    "csConcept": "Post-Mortem & Iteration"
  },
  {
    "week": 26,
    "chessTopic": "Advanced Fork Patterns",
    "csConcept": "Graph Traversal"
  },
  {
    "week": 27,
    "chessTopic": "Advanced Pin & Skewer",
    "csConcept": "Pointer References"
  },
  {
    "week": 28,
    "chessTopic": "Zwischenzug (In-Between Moves)",
    "csConcept": "Interrupts & Priority Queues"
  },
  {
    "week": 29,
    "chessTopic": "Sacrificial Combinations",
    "csConcept": "Trade-offs (Time vs. Space)"
  },
  {
    "week": 30,
    "chessTopic": "Calculation Training",
    "csConcept": "Depth-First Search & Recursion"
  },
  {
    "week": 31,
    "chessTopic": "Complex Combinations",
    "csConcept": "Algorithm Composition"
  },
  {
    "week": 32,
    "chessTopic": "Tactical Assessment",
    "csConcept": "Unit Testing"
  },
  {
    "week": 33,
    "chessTopic": "Good vs. Bad Bishops",
    "csConcept": "Technical Debt"
  },
  {
    "week": 34,
    "chessTopic": "Outposts & Weak Squares",
    "csConcept": "Network Nodes & Vulnerabilities"
  },
  {
    "week": 35,
    "chessTopic": "Open Files & Diagonals",
    "csConcept": "Network Throughput & Bandwidth"
  },
  {
    "week": 36,
    "chessTopic": "Space Advantage",
    "csConcept": "Memory Allocation"
  },
  {
    "week": 37,
    "chessTopic": "Prophylaxis",
    "csConcept": "Defensive Programming & Input Validation"
  },
  {
    "week": 38,
    "chessTopic": "Positional Sacrifice",
    "csConcept": "Strategic Refactoring"
  },
  {
    "week": 39,
    "chessTopic": "Choosing Your Style",
    "csConcept": "Choosing a Tech Stack"
  },
  {
    "week": 40,
    "chessTopic": "White Opening Systems",
    "csConcept": "Frontend Frameworks"
  },
  {
    "week": 41,
    "chessTopic": "Black Defense Systems",
    "csConcept": "Backend Architecture"
  },
  {
    "week": 42,
    "chessTopic": "Opening Traps",
    "csConcept": "Security Vulnerabilities & Exploits"
  },
  {
    "week": 43,
    "chessTopic": "Transition to Middlegame",
    "csConcept": "Development to Production"
  },
  {
    "week": 44,
    "chessTopic": "King & Pawn Endgames",
    "csConcept": "Core Algorithms & Fundamentals"
  },
  {
    "week": 45,
    "chessTopic": "Rook Endgames",
    "csConcept": "Core Infrastructure"
  },
  {
    "week": 46,
    "chessTopic": "Minor Piece Endgames",
    "csConcept": "Specialized Tools"
  },
  {
    "week": 47,
    "chessTopic": "Converting Advantages",
    "csConcept": "Shipping & Delivery"
  },
  {
    "week": 48,
    "chessTopic": "Advanced Strategy Synthesis",
    "csConcept": "System Architecture"
  },
  {
    "week": 49,
    "chessTopic": "Tournament Preparation",
    "csConcept": "QA & Launch Readiness"
  },
  {
    "week": 50,
    "chessTopic": "Grand Championship",
    "csConcept": "Full-Stack Mastery"
  }
];

export const CS_BRIDGE_PHASES: CSBridgePhase[] = [
  {
    "id": 1,
    "name": "Phase 1: Foundations",
    "range": "Weeks 1-8",
    "theme": "Core computing concepts: coordinates, variables, logic, search, testing. The building blocks.",
    "weeks": [
      {
        "week": 1,
        "chessTopic": "The Board & Squares",
        "csConcept": "Coordinate Systems & 2D Arrays",
        "howItConnects": "The chessboard is a coordinate system. Every square has a unique address (e4, d5) - exactly how computers identify locations using X and Y coordinates. Google Maps uses latitude and longitude the same way. The 8x8 grid is a 2D array, the most basic data structure in computer science.",
        "discussionQuestion": "If the school was a chessboard, what 'square' would the cafeteria be on? The gym? The front door?",
        "miniActivity": "Have students create a simple coordinate map of the classroom, naming locations like a chessboard."
      },
      {
        "week": 2,
        "chessTopic": "Pawns & The King",
        "csConcept": "Variables vs. Constants",
        "howItConnects": "A pawn's position changes throughout the game - it's a variable. The rule that it can't go backward never changes - that's a constant. In computers, some things change (your score in a game) and some are fixed (the rules of the game). The king is like the main program - if it crashes, everything stops. That's why computers have firewalls, same reason you castle your king.",
        "discussionQuestion": "What's the 'king' of your phone? What's the one thing that, if it broke, your whole phone is dead? (Battery/processor)"
      },
      {
        "week": 3,
        "chessTopic": "Rooks & Knights",
        "csConcept": "Linear vs. Non-Linear Search",
        "howItConnects": "When you search for something on Google, it can go through results in order (like a rook on a straight line). But sometimes the best answer isn't on the obvious path - you need to think sideways (like a knight). The knight's jump is like a shortcut in a program - it skips over things to get where it needs to be. Sometimes the indirect path is faster.",
        "discussionQuestion": "If you're lost in a maze, do you always go forward (rook-style), or do you try jumping to different areas (knight-style)? Which works better when?"
      },
      {
        "week": 4,
        "chessTopic": "Bishops & Queen",
        "csConcept": "Specialization vs. Generalization",
        "howItConnects": "The bishop is a specialist - it does one thing (diagonals) really well but can't do anything else. The queen is a generalist - she does everything but is expensive to lose. In tech, you need both specialists AND generalists. The bishop's blind spot is like a program that only works with certain types of data. You need multiple programs (both bishops) to handle all cases.",
        "discussionQuestion": "Is it better to be really good at ONE thing (bishop) or okay at everything (queen)? When does each matter more?"
      },
      {
        "week": 5,
        "chessTopic": "Special Moves",
        "csConcept": "Edge Cases & Software Upgrades",
        "howItConnects": "In programming, 'edge cases' are weird situations where normal rules don't apply. En passant and castling are chess's edge cases. Good programmers handle edge cases. Good chess players know their special moves. Pawn promotion is upgrading software - your basic app (pawn) levels up into a power tool (queen). Same code, new capabilities.",
        "discussionQuestion": "Can you think of a rule in life that has a special exception? A rule at school that sometimes doesn't apply?"
      },
      {
        "week": 6,
        "chessTopic": "Check, Checkmate & Stalemate",
        "csConcept": "IF / THEN / ELSE Logic",
        "howItConnects": "IF king is in check, THEN you must escape. IF you can't escape, THEN it's checkmate. ELSE IF you're not in check but can't move, THEN it's stalemate. This is exactly how computers make decisions - checking conditions and choosing responses. Three escape options = three branches of code. The computer evaluates each branch and picks the best one.",
        "discussionQuestion": "What's a real-life 'check' - a moment where you HAD to respond? What were your three options?"
      },
      {
        "week": 7,
        "chessTopic": "Basic Tactics & Piece Values",
        "csConcept": "Cost-Benefit Analysis & Parallel Processing",
        "howItConnects": "Every trade in chess is a cost-benefit calculation. 'I give up 3 points, I get 5 points, net gain = 2.' This is exactly how businesses and computers make decisions - is the benefit worth the cost? A fork is multitasking - one piece doing two jobs at once. Computers do this with parallel processing: one chip handling multiple tasks simultaneously.",
        "discussionQuestion": "What's a real-life fork - a moment where one action accomplished two goals at once?"
      },
      {
        "week": 8,
        "chessTopic": "Mini-Tournament",
        "csConcept": "Testing & Debugging",
        "howItConnects": "In software, you don't know if your code works until you test it. The tournament IS the test. Your chess skills are the code. The games reveal the bugs (mistakes). Post-game analysis is debugging: 'Where did my program break? What caused it? How do I fix it for next time?'",
        "discussionQuestion": "What was your biggest 'bug' (mistake) today? What's the 'patch' (fix) for next time?"
      }
    ],
    "color": "#50c878"
  },
  {
    "id": 2,
    "name": "Phase 2: Tactical Development",
    "range": "Weeks 9-16",
    "theme": "Pattern recognition and algorithms. Each tactic maps to a programming concept: forks = parallel processing, pins = dependency locks, skewers = stack operations, discovered attacks = triggers.",
    "weeks": [
      {
        "week": 9,
        "chessTopic": "Forks",
        "csConcept": "Parallel Processing",
        "howItConnects": "A fork attacks two pieces simultaneously - one process, two results. This is parallel processing: computers use multi-core processors to handle multiple tasks at once. The more 'forks' a system can run, the more powerful it is.",
        "discussionQuestion": "What apps on your phone are running at the same time right now? That's parallel processing."
      },
      {
        "week": 10,
        "chessTopic": "Pins",
        "csConcept": "Dependency Locks",
        "howItConnects": "A pinned piece can't move because something more important is behind it. In software, a dependency lock is when one program can't update because another program depends on it staying the same. Breaking the pin (or the lock) requires careful planning.",
        "discussionQuestion": "Have you ever been 'pinned' - unable to do something because it would mess up something more important?"
      },
      {
        "week": 11,
        "chessTopic": "Skewers",
        "csConcept": "Stack Operations (LIFO)",
        "howItConnects": "A skewer attacks a valuable piece, forcing it to move and exposing what's behind it. This is like a stack in computer science: Last In, First Out. The thing on top gets processed first, revealing what's underneath.",
        "discussionQuestion": "Think of a stack of plates. You always take from the top. How is that like a skewer in chess?"
      },
      {
        "week": 12,
        "chessTopic": "Discovered Attacks",
        "csConcept": "Triggers & Chain Reactions",
        "howItConnects": "A discovered attack happens when one piece moves and reveals an attack from another piece behind it. In programming, this is a trigger - one event automatically causes another event to fire. Chain reactions in code work the same way: Action A triggers Action B.",
        "discussionQuestion": "What's a real-life chain reaction? (Dominos, one text leads to another, alarm clock starts your whole morning routine)"
      },
      {
        "week": 13,
        "chessTopic": "Removing the Defender",
        "csConcept": "Breaking Dependencies",
        "howItConnects": "If a piece is defended, you remove the defender first. In software, if you want to change a component, you first need to identify and handle its dependencies. You can't just delete code that other code relies on - you remove or redirect the dependency first.",
        "discussionQuestion": "What happens if you delete an app that other apps depend on? How would you handle that?"
      },
      {
        "week": 14,
        "chessTopic": "Checkmate Patterns",
        "csConcept": "Design Patterns",
        "howItConnects": "Checkmate patterns (back rank mate, smothered mate) are reusable solutions to common problems - exactly what 'design patterns' are in software engineering. Programmers don't reinvent the wheel. They learn patterns and apply them to new situations.",
        "discussionQuestion": "What patterns do you use every day without thinking? (Morning routine, walking to school, how you greet friends)"
      },
      {
        "week": 15,
        "chessTopic": "Midterm Review",
        "csConcept": "Code Review & Refactoring",
        "howItConnects": "Reviewing everything you've learned is like a code review - looking at your work with fresh eyes to find what's solid and what needs improvement. Refactoring means making your code cleaner without changing what it does. Reviewing your chess skills works the same way.",
        "discussionQuestion": "If you could 'refactor' one habit in your life - keep the result but improve the process - what would it be?"
      },
      {
        "week": 16,
        "chessTopic": "Opening Principles",
        "csConcept": "System Boot Sequence",
        "howItConnects": "Opening principles (develop pieces, control center, castle) are like a computer's boot sequence - the specific steps that MUST happen in order for the system to start correctly. Skip a step and the system is vulnerable. Every computer and every chess game needs a reliable startup sequence.",
        "discussionQuestion": "What's your personal 'boot sequence' in the morning? What happens if you skip a step?"
      }
    ],
    "color": "#5090ff"
  },
  {
    "id": 3,
    "name": "Phase 3: Strategy & Planning",
    "range": "Weeks 17-21",
    "theme": "Architecture and system design. Data structures, microservices, cybersecurity, MVP thinking, agile development.",
    "weeks": [
      {
        "week": 17,
        "chessTopic": "Pawn Structure",
        "csConcept": "Data Structures",
        "howItConnects": "Pawn structure determines what your pieces can and can't do - just like data structures determine what operations a program can perform efficiently. Choose the wrong data structure and your program is slow. Choose bad pawn structure and your pieces are stuck.",
        "discussionQuestion": "How you organize your school binder affects how fast you can find things. That's a data structure. How is yours organized?"
      },
      {
        "week": 18,
        "chessTopic": "Piece Coordination",
        "csConcept": "Microservices Architecture",
        "howItConnects": "Coordinated pieces are like microservices - small, independent components that communicate and work together to accomplish big tasks. A rook on the 7th rank supported by a bishop is two services talking to each other. Neither is powerful alone, but together they're unstoppable.",
        "discussionQuestion": "Name two apps or tools that are better together than alone. (Maps + Music, Camera + Social Media)"
      },
      {
        "week": 19,
        "chessTopic": "King Safety",
        "csConcept": "Cybersecurity & Firewalls",
        "howItConnects": "Castling creates a firewall around your king. Pawn shields are like encryption layers. Attacking an opponent's king is like a hacker probing for vulnerabilities. Every security system has the same goal as king safety: protect the most important asset.",
        "discussionQuestion": "What's the 'firewall' on your phone? (Password, Face ID, screen lock) What happens without it?"
      },
      {
        "week": 20,
        "chessTopic": "Endgame Basics",
        "csConcept": "Minimum Viable Product (MVP)",
        "howItConnects": "In endgames, you work with minimal resources to achieve maximum results. This is the MVP concept in tech - what's the minimum you need to get the job done? King + one pawn can win the game if you use them efficiently. Strip away everything unnecessary and focus on what matters.",
        "discussionQuestion": "If you could only bring 3 things to school, what would they be? That's MVP thinking."
      },
      {
        "week": 21,
        "chessTopic": "Planning Ahead",
        "csConcept": "Agile Development Sprints",
        "howItConnects": "Creating a chess plan is like writing a development sprint - you set a goal, break it into steps, execute, and adjust based on what happens. You don't plan the whole game at once. You plan the next 3-5 moves, execute, evaluate, and plan again. That's agile development.",
        "discussionQuestion": "How do you plan a school project? All at once or in chunks? Which works better?"
      }
    ],
    "color": "#f0a050"
  },
  {
    "id": 4,
    "name": "Phase 4: Mastery & Competition",
    "range": "Weeks 22-25",
    "theme": "Real-world application. Reading open source, performance optimization, hackathons, post-mortems.",
    "weeks": [
      {
        "week": 22,
        "chessTopic": "Famous Games Study",
        "csConcept": "Reading Open Source Code",
        "howItConnects": "Studying great chess games is like reading great open-source code. You learn patterns, techniques, and thinking approaches from people who solved hard problems before you. Every great programmer reads other people's code. Every great chess player studies other people's games.",
        "discussionQuestion": "Have you ever learned a skill by watching someone else do it first? That's 'reading their code.'"
      },
      {
        "week": 23,
        "chessTopic": "Blitz Chess & Time Management",
        "csConcept": "Performance Optimization",
        "howItConnects": "Blitz chess forces you to think fast with limited time - just like optimizing code to run within strict time limits. A program that gives the right answer too slowly is useless. Speed + accuracy = performance. In blitz, you learn to trust your pattern recognition instead of calculating everything from scratch.",
        "discussionQuestion": "What do you do differently when you have 5 minutes for a test vs. 50 minutes? That's optimization."
      },
      {
        "week": 24,
        "chessTopic": "Championship Tournament Part 1",
        "csConcept": "Hackathon / Demo Day",
        "howItConnects": "The tournament is your demo day - you're shipping your skills under pressure, in real time, with real stakes. Everything you've built gets tested against real opponents. Hackathons work the same way: build, present, compete, learn.",
        "discussionQuestion": "What's the difference between practicing alone and performing in front of people? How do you handle the pressure?"
      },
      {
        "week": 25,
        "chessTopic": "Championship Tournament Part 2",
        "csConcept": "Post-Mortem & Iteration",
        "howItConnects": "After a tournament (or a product launch), the most important step is the post-mortem: what worked, what failed, what do we change? This is iteration - the foundation of all good software. Version 1 is never perfect. Version 2 is better because you learned from version 1.",
        "discussionQuestion": "After the tournament, what's your version 2? What one thing would you improve?"
      }
    ],
    "color": "#e05080"
  },
  {
    "id": 5,
    "name": "Phase 5: Advanced Tactics",
    "range": "Weeks 26-32",
    "theme": "Advanced algorithms. Graph traversal, recursion, interrupts, trade-offs, algorithm composition, unit testing.",
    "weeks": [
      {
        "week": 26,
        "chessTopic": "Advanced Fork Patterns",
        "csConcept": "Graph Traversal",
        "howItConnects": "Advanced forks require seeing connections between distant squares - like traversing a graph in computer science. A knight fork path is a graph where each node is a square and edges connect legal moves. Finding the best fork is finding the shortest path in a graph.",
        "discussionQuestion": "How does Google Maps find the best route? It checks all possible paths (graph traversal) and picks the fastest."
      },
      {
        "week": 27,
        "chessTopic": "Advanced Pin & Skewer",
        "csConcept": "Pointer References",
        "howItConnects": "A pin creates an invisible line through two pieces to something behind them. In programming, a pointer references something 'behind' the current value. Understanding what's being referenced (pointed to) is key in both chess and code.",
        "discussionQuestion": "A shortcut on your desktop 'points to' a file somewhere else. What happens if you delete the original?"
      },
      {
        "week": 28,
        "chessTopic": "Zwischenzug (In-Between Moves)",
        "csConcept": "Interrupts & Priority Queues",
        "howItConnects": "A zwischenzug inserts an unexpected move before the 'obvious' response. In computing, an interrupt pauses the current process to handle something more urgent. Priority queues decide what gets processed first. Sometimes the best response isn't the obvious one - you handle the higher-priority task first.",
        "discussionQuestion": "Have you ever been doing homework and had to stop for something urgent? That's an interrupt. Did it help or hurt?"
      },
      {
        "week": 29,
        "chessTopic": "Sacrificial Combinations",
        "csConcept": "Trade-offs (Time vs. Space)",
        "howItConnects": "A sacrifice gives up material now for a bigger advantage later. In CS, this is the classic trade-off: sacrifice memory to gain speed, or sacrifice speed to save memory. Every system makes trade-offs. The question is always: what am I giving up, and is what I'm getting worth more?",
        "discussionQuestion": "Deleting apps frees up phone storage but loses functionality. When is it worth it?"
      },
      {
        "week": 30,
        "chessTopic": "Calculation Training",
        "csConcept": "Depth-First Search & Recursion",
        "howItConnects": "Calculating chess variations is depth-first search: 'If I do this, they do that, then I do this...' Each branch goes deeper before trying the next option. Recursion is a function calling itself - like thinking 'if they move here, then I move there, then they move...' The depth you can calculate = the depth of your search tree.",
        "discussionQuestion": "When you plan what to say in a conversation, how many 'moves ahead' do you think? One response? Two? Three?"
      },
      {
        "week": 31,
        "chessTopic": "Complex Combinations",
        "csConcept": "Algorithm Composition",
        "howItConnects": "Complex chess combinations chain multiple tactics together - a fork sets up a pin that leads to a skewer. In programming, algorithm composition is combining simple algorithms into complex workflows. Each step is simple; the power is in how they connect.",
        "discussionQuestion": "What's a recipe? Simple steps combined into something complex. What happens if you skip a step?"
      },
      {
        "week": 32,
        "chessTopic": "Tactical Assessment",
        "csConcept": "Unit Testing",
        "howItConnects": "Testing your tactical skills one pattern at a time is unit testing - checking that each component works correctly on its own before combining them. Good software is built on tested components. Good chess is built on tested tactical recognition.",
        "discussionQuestion": "Before a big test, do you study everything at once or topic by topic? Topic by topic is unit testing."
      }
    ],
    "color": "#a060ff"
  },
  {
    "id": 6,
    "name": "Phase 6: Positional Mastery",
    "range": "Weeks 33-38",
    "theme": "System design and maintenance. Technical debt, network architecture, memory allocation, defensive programming, strategic refactoring.",
    "weeks": [
      {
        "week": 33,
        "chessTopic": "Good vs. Bad Bishops",
        "csConcept": "Technical Debt",
        "howItConnects": "A bad bishop is blocked by its own pawns - it exists but can't contribute. That's technical debt: code that's in your project but slows you down instead of helping. Good engineers identify and fix technical debt. Good players fix bad bishops.",
        "discussionQuestion": "Is there something in your room/backpack that's supposed to help but actually gets in the way? That's technical debt."
      },
      {
        "week": 34,
        "chessTopic": "Outposts & Weak Squares",
        "csConcept": "Network Nodes & Vulnerabilities",
        "howItConnects": "An outpost is a powerful position that can't be attacked by opponent pawns. In networking, a well-placed server node that's protected from attack is critical infrastructure. Weak squares are vulnerabilities - unprotected entry points an attacker can exploit.",
        "discussionQuestion": "What's the weakest 'square' in a school's security? (Unlocked door, shared password, etc.)"
      },
      {
        "week": 35,
        "chessTopic": "Open Files & Diagonals",
        "csConcept": "Network Throughput & Bandwidth",
        "howItConnects": "Open files and diagonals are communication channels for your pieces - like bandwidth in a network. The more open channels you have, the faster information (pieces) can flow. Controlling open files is controlling the network's throughput.",
        "discussionQuestion": "What happens to your internet when too many people are on the same WiFi? That's bandwidth. How do open files prevent 'chess traffic jams'?"
      },
      {
        "week": 36,
        "chessTopic": "Space Advantage",
        "csConcept": "Memory Allocation",
        "howItConnects": "Controlling more space on the board is like having more memory allocated to your program. More space = more options = more capability. A cramped position is like a program running out of memory - it can't function properly.",
        "discussionQuestion": "What happens when your phone says 'Storage Full'? You can't do anything new until you free up space. Same with a cramped chess position."
      },
      {
        "week": 37,
        "chessTopic": "Prophylaxis",
        "csConcept": "Defensive Programming & Input Validation",
        "howItConnects": "Prophylaxis is preventing your opponent's plan before it becomes dangerous. In programming, defensive coding means validating inputs and handling errors BEFORE they crash your program. Prevention is always cheaper than fixing a crash.",
        "discussionQuestion": "Locking your front door is prophylaxis. What's a digital version of that? (Antivirus, strong passwords, not clicking sketchy links)"
      },
      {
        "week": 38,
        "chessTopic": "Positional Sacrifice",
        "csConcept": "Strategic Refactoring",
        "howItConnects": "A positional sacrifice gives up material for long-term structural improvement. In engineering, strategic refactoring means spending time now (cost) to rewrite code that will pay off with better performance later. Short-term loss, long-term gain.",
        "discussionQuestion": "Have you ever given up free time now to study, knowing it would pay off later? That's a positional sacrifice."
      }
    ],
    "color": "#50c878"
  },
  {
    "id": 7,
    "name": "Phase 7: Opening Repertoire",
    "range": "Weeks 39-43",
    "theme": "Frameworks and architecture choices. Tech stacks, frontend/backend, security vulnerabilities, dev to production.",
    "weeks": [
      {
        "week": 39,
        "chessTopic": "Choosing Your Style",
        "csConcept": "Choosing a Tech Stack",
        "howItConnects": "Picking an opening style (aggressive e4 or solid d4) is like choosing a tech stack (React vs. Vue, Python vs. Java). There's no single 'best' - there's best for YOUR project, your strengths, your goals. The choice shapes everything that follows.",
        "discussionQuestion": "iPhone or Android? Why? Your reasons for choosing are the same reasons players choose openings."
      },
      {
        "week": 40,
        "chessTopic": "White Opening Systems",
        "csConcept": "Frontend Frameworks",
        "howItConnects": "White's opening systems are like frontend frameworks - structured approaches that give you a solid starting point. e4 openings are aggressive (React: fast, flexible). d4 openings are solid (Angular: structured, reliable). English/Reti are unconventional (Svelte: different approach, surprising results).",
        "discussionQuestion": "Do you prefer to start a project with a template or from scratch? Opening systems are templates."
      },
      {
        "week": 41,
        "chessTopic": "Black Defense Systems",
        "csConcept": "Backend Architecture",
        "howItConnects": "Black's defense systems respond to White's initiative - like backend architecture responding to frontend requests. You don't control what comes in, but you control how you handle it. A good defense (like a good API) handles any input reliably.",
        "discussionQuestion": "A waiter doesn't choose what customers order, but handles every request. How is that like playing Black?"
      },
      {
        "week": 42,
        "chessTopic": "Opening Traps",
        "csConcept": "Security Vulnerabilities & Exploits",
        "howItConnects": "Opening traps are exploits - patterns designed to catch people who follow moves without thinking. In cybersecurity, phishing emails work the same way: they look normal but exploit people who click without thinking. Recognition is the defense against both.",
        "discussionQuestion": "Have you ever gotten a suspicious text or email that looked real? That's an opening trap. What's the 'chess' response?"
      },
      {
        "week": 43,
        "chessTopic": "Transition to Middlegame",
        "csConcept": "Development to Production",
        "howItConnects": "The transition from opening to middlegame is like going from development to production. Planning phase is over. Now you're running live with real users (opponents). The quality of your setup determines how well you perform under real conditions.",
        "discussionQuestion": "What's the difference between a practice game and a real game? Between a homework assignment and a real test? That's dev vs. production."
      }
    ],
    "color": "#f0a050"
  },
  {
    "id": 8,
    "name": "Phase 8: Endgame Mastery",
    "range": "Weeks 44-47",
    "theme": "Optimization and delivery. Core algorithms, infrastructure, specialized tools, shipping.",
    "weeks": [
      {
        "week": 44,
        "chessTopic": "King & Pawn Endgames",
        "csConcept": "Core Algorithms & Fundamentals",
        "howItConnects": "King + pawn endgames strip chess down to its fundamentals - like learning core algorithms (sorting, searching) that everything else builds on. You can't skip the basics. The fundamentals are what everything advanced depends on.",
        "discussionQuestion": "What's the most basic skill in your favorite activity? Can you do the advanced stuff without it?"
      },
      {
        "week": 45,
        "chessTopic": "Rook Endgames",
        "csConcept": "Core Infrastructure",
        "howItConnects": "Rook endgames are the most common endgame - like core infrastructure (databases, servers) that runs most of the internet. Understanding rook endgames is understanding the infrastructure that shows up in most real games.",
        "discussionQuestion": "What happens when the internet goes down? That's core infrastructure failing. What's the 'internet' of chess?"
      },
      {
        "week": 46,
        "chessTopic": "Minor Piece Endgames",
        "csConcept": "Specialized Tools",
        "howItConnects": "Bishop vs. knight endgames require understanding each piece's unique strengths in simplified positions. These are specialized tools - knowing which tool is right for which job. A bishop dominates open positions. A knight dominates closed ones. Choose the right tool.",
        "discussionQuestion": "Scissors vs. knife: both cut, but which is better for paper? For food? Right tool, right job."
      },
      {
        "week": 47,
        "chessTopic": "Converting Advantages",
        "csConcept": "Shipping & Delivery",
        "howItConnects": "Having an advantage means nothing if you can't convert it to a win. In tech, building a great product means nothing if you can't ship it. The last mile - finishing, polishing, delivering - is where most people fail. Don't just build. FINISH.",
        "discussionQuestion": "Have you ever done 90% of a project and never finished the last 10%? Why is finishing the hardest part?"
      }
    ],
    "color": "#5090ff"
  },
  {
    "id": 9,
    "name": "Phase 9: Championship Level",
    "range": "Weeks 48-50",
    "theme": "Full-stack mastery. System architecture, QA, and the ultimate test: being able to teach it.",
    "weeks": [
      {
        "week": 48,
        "chessTopic": "Advanced Strategy Synthesis",
        "csConcept": "System Architecture",
        "howItConnects": "Synthesizing all strategic concepts into a unified approach is system architecture - understanding how every component (tactics, strategy, endgame, openings) connects into one working system. An architect doesn't just know the parts. They know how the parts interact.",
        "discussionQuestion": "How does a city work? Roads, power, water, internet, people - all connected. That's system architecture."
      },
      {
        "week": 49,
        "chessTopic": "Tournament Preparation",
        "csConcept": "QA & Launch Readiness",
        "howItConnects": "Preparing for a championship is Quality Assurance before launch. Review, test, patch weak spots, make sure everything works under pressure. No new features - just polish and confidence. Ship what's ready.",
        "discussionQuestion": "Before a big presentation, what do you check? That's QA. What's your checklist?"
      },
      {
        "week": 50,
        "chessTopic": "Grand Championship",
        "csConcept": "Full-Stack Mastery",
        "howItConnects": "Completing 50 weeks means you understand chess from the ground up - fundamentals, tactics, strategy, endgames, openings, competition. That's full-stack mastery: understanding the whole system, not just one layer. The ultimate test of understanding is being able to teach it to someone else.",
        "discussionQuestion": "Can you explain what you've learned to a younger student? If yes, you've truly mastered it. Teaching IS the final test."
      }
    ],
    "color": "#e05080"
  }
];
