# Interview Preparation Plan: Mid-Level SWE (~2 YOE, Backend/Full-Stack) Targeting Product Companies

## TL;DR

- **Your three known pillars (DSA, LLD, HLD) are correct but incomplete.** For a mid-level backend/full-stack engineer in 2025-2026 you must also prepare for behavioral/STAR rounds, CS fundamentals (OS/networking/DB/concurrency), API design, a practical "real-world coding" round (debug/integration/take-home), and — newly mandatory at several firms — AI-assisted coding rounds where you use Copilot/Cursor/Claude live. Prioritize DSA + System Design (LLD+HLD) + Behavioral as the High-priority core; treat AI-fluency as emerging table-stakes.
- **The branches matter:** FAANG-tier (Microsoft, Atlassian) weight DSA + behavioral heavily with a high algorithmic bar; mid-size product/fintech firms (Stripe, Avalara, Vertex, AI-tooling startups) weight practical/pragmatic coding (debugging, API integration, take-homes) over LeetCode-hard puzzles. India loops are the most DSA-intensive market and lighter on deep distributed-systems design at mid-level; US/global-remote loops weight system design depth and crisp behavioral/communication more, at ~2.5-3x the compensation.
- **Resource verdict:** NeetCode 150 (free) + Striver A2Z/SDE sheet (free, India-favorite) for DSA; Hello Interview + ByteByteGo/Alex Xu for HLD; "awesome-low-level-design" GitHub + Grokking for LLD; Exponent/STAR for behavioral. Verify everything against LeetCode Discuss, Blind, Glassdoor and levels.fyi because company processes change quarterly.

## Key Findings

1. **The interview surface area is wider than DSA/LLD/HLD.** Modern mid-level loops at product companies include, beyond your three: a behavioral/hiring-manager round (STAR), CS-fundamentals questioning (often embedded in technical rounds), an API-design/practical-coding component, and increasingly an AI-assisted coding round.

2. **Company tier changes the weighting more than the topic list.** FAANG-tier is DSA-heavy with a rising bar and reintroduction of in-person rounds to defeat AI-cheating; mid-size/fintech is pragmatic-coding-heavy (Stripe's bug-bash/integration rounds are the archetype).

3. **Geography changes intensity, depth, comp, and community.** India loops are DSA-grind-heavy; US/global-remote loops demand stronger system design and communication and pay multiples more.

4. **Timeline changes sequencing, not the destination.** A 6-week sprint must triage to highest-frequency patterns; a 3-6 month marathon builds fundamentals first, then breadth, then mocks.

5. **AI usage in interviews has crossed from "banned" to "expected" at a meaningful and growing minority of firms.** Canva, Meta, and Rippling now allow or require AI tools in technical rounds. AI-augmented engineering is becoming table-stakes for mid-level roles.

---

## DIMENSION 1 — COMPANY TIER

### Section 1A: FAANG-tier (Microsoft India, Atlassian)

**How this tier DIFFERS from mid-size firms:** Higher and more standardized algorithmic (DSA) bar; multiple coding rounds; centralized/rubric-driven hiring; behavioral weighted heavily (Amazon LP-style and Atlassian "Values" rounds); system design expected even at mid-level but bounded (object modeling, service decomposition, limited distributed systems at L4/SDE-II). Topic weighting: **DSA ~50-60%, System Design (LLD+HLD) ~20-25%, Behavioral ~20%.**

- **Microsoft India SDE-II loop:** Codility/online assessment (~90 min, 2 problems, 1 Medium + 1 Medium-Hard) → 4-5 onsite rounds on Microsoft Teams (~60 min each): 3-4 coding (DSA on CoderPad-style), 1 LLD, 1 HLD/system design (for experienced), behavioral questions woven through all rounds. Junior levels (59/60) may skip system design. Verdict: **DSA intensity HIGH**, system design expectations MODERATE at SDE-II.
- **Atlassian loop:** Karat third-party screen (5 rapid system-design scenario questions in ~25 min + 2 DSA/coding) → onsite with Atlassian engineers split into DSA round + LLD round, plus a Values/behavioral round and hiring-manager round. Atlassian is known for Dynamic Programming, BFS, and "scale-up" extensions of LLD problems (e.g., rating system, booking system) where they evaluate code extensibility and edge-case validation. Candidate reports note negative feedback often traces to failing to validate edge cases or rewriting large code blocks when a scale-up is introduced. Verdict: **DSA + LLD both HIGH**; behavioral "Values" round is distinctive.
- **DSA intensity:** Highest of any tier. LeetCode Medium-Hard expected, clean bug-free code, complexity analysis, edge cases.
- **System design expectations:** Present but level-appropriate; for mid-level expect LLD machine-coding + an introductory HLD discussion rather than staff-level distributed-systems depth.
- **2025-2026 reality flags:** The Pragmatic Engineer reports the bar has risen ~1 standard deviation; downleveling is common; some firms are reintroducing in-person rounds to counter AI-assisted cheating; team-matching can add delay.

### Section 1B: Mid-size product / fintech / regtech / AI-tooling firms (Stripe, Avalara, Vertex, dev-tooling startups)

**How this tier DIFFERS from FAANG:** De-emphasizes LeetCode-hard puzzles in favor of pragmatic, production-like coding; introduces unique round types (debugging/bug-bash, API integration, take-home). Topic weighting: **Practical coding ~40%, API/system design ~25%, DSA ~15-20%, Behavioral ~20%.** The bar is high on code quality, readability, correctness, idempotency, and reading unfamiliar code — not on algorithmic cleverness.

- **Stripe (fintech archetype):** Recruiter screen → technical phone screen (practical problems framed as production scenarios — rate limiter, log dedup, caching layer; multi-part incremental problems where each part unlocks the next) → onsite 4-5 rounds: (1) practical coding / programming exercise (data parsing, file I/O), (2) **Bug-bash/debugging round** (fix failing tests in an unfamiliar codebase, often with a race condition; you must argue what you did _not_ find probably doesn't exist), (3) **Integration round** (use Stripe API / unfamiliar GitHub repo with full internet access to ship a small feature in 45-60 min), (4) system design focused on real-world failure modes, idempotency, reconciliation, exactly-once semantics, (5) hiring-manager behavioral. Stripe explicitly rewards "builders" over "competitive programmers"; readability and descriptive naming are graded.
- **Avalara (regtech/tax):** Aptitude round → coding round (~1.5h, HackerRank, mix of easy/medium/hard) → technical interview (resume + DSA + CS fundamentals: DB, sessions vs cookies, server concepts) → hiring-manager round. C#/Java, AWS, RESTful APIs, OOP, databases emphasized. DSA present but lighter than FAANG; CS fundamentals and resume/project depth matter more.
- **Vertex (regtech/tax):** Limited public interview data; expect a profile similar to Avalara — practical coding + CS fundamentals + domain/system discussion. **Flag: verify the current process via Glassdoor/LeetCode Discuss, as public data is thin.**
- **AI-forward dev-tooling startups:** Often the most willing to allow/require AI tools in interviews; favor practical live-build sessions ("ship a complex tool in under a day"), portfolio review (GitHub, shipped projects), and pragmatic system design (LLM latency, cost, RAG, fallback). DSA may be minimal. **Verify per-company via HN "Who is hiring" threads and Blind.**
- **DSA intensity:** LOW-to-MODERATE; favor practical correctness.
- **System design expectations:** Practical and domain-grounded (payment ledgers, idempotency, API design) rather than generic "design Twitter."

**Cross-tier strategic note:** Because you are tech-stack-agnostic and expanding into Python/FastAPI/agentic AI, mid-size and AI-tooling firms reward your trajectory most (practical coding + API design + AI fluency), while FAANG-tier rewards raw DSA + behavioral polish.

---

## DIMENSION 2 — GEOGRAPHY

### Section 2A: India-based interview loops

**How this DIFFERS from US/global:** Most DSA-grind-intensive market; online assessments/aptitude rounds common; LLD ("machine coding") rounds are a distinctive and heavily weighted India staple (especially at Indian-HQ and India-centric product teams); system design at mid-level is present but typically less deep on large-scale distributed systems than US senior loops; behavioral is real but usually less elaborate than US "values"/leadership deep-dives. Off-campus hiring peaks Feb-May.

- **DSA intensity:** HIGHEST. Expect LeetCode Medium-Hard and aptitude/coding online rounds. Striver's sheets are the India community standard. A widely-cited split for mid-level India prep is DSA ~50% / system design ~30% / behavioral ~20%.
- **System design depth:** LLD/machine-coding emphasized; HLD present at mid-level but bounded. Community consensus: Amazon India = LLD-heavy; Google India = HLD basics.
- **Behavioral:** Present (especially Amazon LP and Atlassian Values), generally less weighted than US loops but rising.
- **Compensation bands (mid-level SDE-2, total comp, levels.fyi unless noted):**
  - Microsoft India SDE-II median **₹4,471,157 (~₹44.7 LPA)**; Level 62 median **~₹57 LPA**; Level 60 median ~₹34.8 LPA.
  - Atlassian Bengaluru P40 reported as an **average ~$74,846–$83,407** (band roughly **₹60-90 LPA**; reported as average, not median, and fluctuates).
  - Stripe India L2 median **~₹92.9 LPA**; L3 (upper-mid) median ~₹146 LPA.
  - Avalara SDE-2 **~₹25-43 LPA** (low-confidence — levels.fyi all-level median ~₹43.5 LPA vs Glassdoor ~₹25 LPA on n=2).
  - General product-firm SDE-2 (2-5 YOE): ~₹28-55 LPA base, ~₹35-80 LPA total comp.
- **Community sources:** LeetCode Discuss (India interview experiences), r/developersIndia, Reddit, Blind, Glassdoor India, GeeksforGeeks interview experiences, CodingKaro, takeUforward/Striver community, levels.fyi/AmbitionBox for comp.

### Section 2B: US / global-remote loops

**How this DIFFERS from India:** Less raw DSA-grind weighting and more emphasis on system design depth and crisp communication/behavioral storytelling; remote loops are more likely to allow AI tools (and some firms have reintroduced in-person rounds specifically to defeat AI-assisted remote cheating); compensation is 2.5-3x India for the same level; team-matching/limbo more common.

- **DSA intensity:** HIGH but typically with stronger weighting on communication and "think-aloud" than India's pure-grind culture.
- **System design depth:** DEEPER — distributed systems, consistency models, real-world scale, cost-awareness (and increasingly LLM-infra design) expected even at mid-level.
- **Behavioral expectations:** HIGHEST — structured STAR, ownership, cross-functional collaboration, leadership-without-authority; Amazon LP is the gold standard that transfers everywhere.
- **Compensation bands (levels.fyi):** Atlassian US P40 median **$260,682** total comp (~₹2.17 crore, ~3x the Bengaluru P40); Microsoft US SDE-II median **$199,630**. Remote US roles for India-based engineers can pay **~₹40-120 LPA** while living in India (a newer reference point), though most require contractor/EOR arrangements.
- **Community sources:** Blind (US TC + process), levels.fyi (comp), Hello Interview, interviewing.io, Hacker News "Who is hiring", r/cscareerquestions, Glassdoor, the Pragmatic Engineer newsletter for market trends.

**Practical sequencing implication:** Your immediate India focus means front-loading DSA + LLD/machine-coding. For the long-term US/global-remote goal, deliberately over-invest in system design depth and STAR storytelling beyond what India loops alone demand.

---

## DIMENSION 3 — TIMELINE

### Section 3A: Compressed ~6-week sprint

**How this DIFFERS from the marathon:** Ruthless triage to highest-frequency, highest-ROI topics; pattern-recognition over exhaustive coverage; mocks start early; accept partial coverage of low-frequency topics.

- **Weeks 1-2:** DSA pattern blitz — arrays/two-pointers, sliding window, hashing, binary search, stacks/queues, trees (BFS/DFS), heaps, top-K, intervals. Use NeetCode 150 (prioritize patterns; skip exhaustive completion) or Striver SDE Sheet (180+ problems). ~3-4 hrs/day.
- **Weeks 3-4:** Add graphs (traversal, topo sort, union-find), DP core patterns (0/1 knapsack, LIS, interval DP, grid DP), backtracking, tries. In parallel, LLD: SOLID + 4-5 canonical problems (parking lot, rate limiter, elevator, LRU cache, splitwise).
- **Week 5:** HLD crash — Hello Interview's core framework + ByteByteGo cheat sheets; 3-5 classic designs (URL shortener, chat, news feed, rate limiter, key-value store). Behavioral: draft 8-12 STAR stories.
- **Week 6:** Mock interviews (DSA + design + behavioral), company-specific prep via LeetCode Discuss/Glassdoor for your exact target, AI-tool round practice if applicable, spaced repetition of weak patterns.
- **Topic prioritization (sprint):** High = DSA top patterns, 5 LLD problems, behavioral stories, 5 HLD templates. Defer = bit manipulation, advanced DP (digit/bitmask DP), exotic graph algorithms, deep CS-fundamentals theory.

### Section 3B: Extended ~3-6 month marathon

**How this DIFFERS from the sprint:** Build genuine fundamentals first (so knowledge compounds and transfers), then breadth, then heavy mock-interview volume; invest in the long-tail topics the sprint skips; build a portfolio (GitHub coded designs, AI projects) that pays off in mid-size/AI-tooling loops and for the US/remote goal.

- **Month 1:** DSA fundamentals from basics — Striver A2Z (~450 problems, basics→advanced) or full NeetCode roadmap. Establish daily 2-hr habit. Cover every pattern including the long tail.
- **Month 2:** Complete DSA breadth (advanced DP, graphs, tries, segment trees if targeting hard loops) + start LLD properly (SOLID, all creational/structural/behavioral patterns, 10+ coded problems with UML).
- **Month 3:** HLD depth — ByteByteGo/Alex Xu books + Designing Data-Intensive Applications (DDIA) for fundamentals + System Design Primer (GitHub) + Hello Interview for interview framing. CS fundamentals: OS (processes/threads, scheduling, memory, concurrency/locks), networking (TCP/IP, HTTP, DNS, TLS), databases (indexing, transactions, isolation levels, normalization, SQL), distributed systems (CAP, consistency models, consensus basics).
- **Months 4-6:** API design depth, language-specific deep knowledge (your Python/FastAPI expansion + .NET depth), build AI/agentic portfolio projects (RAG pipeline, multi-agent workflow, MCP), heavy mock-interview cadence, company-specific deep prep, behavioral refinement with recorded practice.
- **Topic prioritization (marathon):** Everything in the sprint PLUS bit manipulation, advanced DP, advanced graphs, deep CS fundamentals, DDIA-level distributed systems, API design, language internals, and a shipped project portfolio.

---

## COMPREHENSIVE TOPIC → SUBTOPIC → RESOURCE MAP (with priority levels)

### 1. Data Structures & Algorithms — Priority: HIGH (HIGHEST for India + FAANG)

| Subtopic                                                     | Frequency                    | Best resource(s) (free unless noted)                                                        |
| ------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------- |
| Arrays, two pointers, sliding window                         | Very High                    | NeetCode 150 (free video); Striver A2Z/SDE (free)                                           |
| Hashing / hash maps                                          | Very High                    | NeetCode; Striver                                                                           |
| Binary search + variations (on answer)                       | High                         | NeetCode; Striver binary search module                                                      |
| Stacks / queues / monotonic stack                            | High                         | NeetCode; Striver                                                                           |
| Trees + BFS/DFS traversal                                    | Very High                    | NeetCode; Striver trees module                                                              |
| Heaps / priority queues / top-K                              | High                         | NeetCode; Striver heaps                                                                     |
| Graphs: traversal, topological sort, union-find              | High                         | Striver graph series (free, deep); NeetCode                                                 |
| Dynamic programming: 0/1 knapsack, LIS, interval DP, grid DP | High (FAANG), esp. Atlassian | Striver DP playlist (free, comprehensive); NeetCode DP; Grokking Dynamic Programming (paid) |
| Backtracking                                                 | Medium                       | NeetCode; Striver recursion module                                                          |
| Tries                                                        | Medium                       | NeetCode; Striver                                                                           |
| Bit manipulation                                             | Low-Medium                   | Striver bit manipulation; defer in sprint                                                   |
| Intervals / merge intervals                                  | Medium                       | NeetCode; Grokking patterns (paid)                                                          |

**Platform notes:** LeetCode (free + Premium for company-tagged questions) is the practice ground; Premium is worth it for company-specific lists during active loops. NeetCode.io is free with optional Pro. Striver/takeUforward is free and the India community standard (SDE Sheet ~180 problems for 2-3 month prep; A2Z ~450 for 4-6 month). Grokking the Coding Interview (Design Gurus/Educative, paid) teaches 28 patterns — useful if you learn better by pattern than by list. AlgoExpert (paid) and Cracking the Coding Interview (book) are still usable but less essential given free alternatives. Tushar Roy videos remain excellent free DP/algorithm explainers.

### 2. Low-Level Design (LLD / OOD / machine coding) — Priority: HIGH (esp. India, Atlassian, Stripe-style)

| Subtopic                                                                                                                                  | Best resource                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| SOLID principles                                                                                                                          | "awesome-low-level-design" (ashishps1) GitHub (free); Indeed/Educative SOLID guides              |
| Design patterns (creational/structural/behavioral)                                                                                        | awesome-low-level-design GitHub; Grokking the OOD Interview (paid)                               |
| Canonical problems: parking lot, elevator, rate limiter, LRU cache, splitwise, BookMyShow, chess/tic-tac-toe, pub-sub, in-memory KV store | awesome-low-level-design GitHub (free, code + UML); AlgoMaster.io LLD; lowleveldesignmastery.com |
| UML, class/sequence diagrams                                                                                                              | GeeksforGeeks; draw.io/Excalidraw (free tools)                                                   |
| Concurrency in LLD                                                                                                                        | awesome-low-level-design concurrency section                                                     |

**Note:** Practice by coding solutions yourself before reading answers — watching alone creates false confidence (a well-documented failure mode in candidate write-ups). Aim for 5-10 problems (sprint) to 10+ (marathon).

### 3. High-Level Design / System Design (HLD) — Priority: HIGH (rising; deeper for US/senior)

| Subtopic                                                                          | Best resource                                                                                            |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Core framework (requirements → estimation → API → data → scale)                   | Hello Interview (free, highly regarded 2025-2026); ByteByteGo                                            |
| Load balancing, caching, sharding, replication                                    | ByteByteGo / Alex Xu "System Design Interview" Vol 1 & 2 (book/paid); System Design Primer (free GitHub) |
| Consistency models, CAP theorem                                                   | DDIA book (paid, the fundamentals bible); System Design Primer                                           |
| Message queues, event-driven, pub-sub                                             | ByteByteGo; System Design Primer                                                                         |
| Classic designs (URL shortener, chat, news feed, YouTube, rate limiter, KV store) | Grokking the System Design Interview (Design Gurus, paid); ByteByteGo; Hello Interview                   |
| LLM/AI-infra design (vector stores, RAG, model latency, inference cost, fallback) | Emerging 2025-2026 requirement; ByteByteGo updates; company eng blogs                                    |

**Resource verdict:** Hello Interview is the standout newer free resource for interview framing and "in a hurry" guides; ByteByteGo (Alex Xu) is best for visual breadth and is frequently updated; Grokking is most problem/practice-oriented (paid); DDIA is the deep-fundamentals book for the marathon and US/senior depth; System Design Primer (donnemartin GitHub) remains a solid free foundation (note it is not heavily updated, but fundamentals hold). Gaurav Sen, Tech Dummies, CodeKarle, and InterviewReady are usable video supplements; verify currency.

### 4. Behavioral / Hiring-Manager — Priority: HIGH (HIGHEST at Amazon; high in US loops)

| Subtopic                                                                     | Best resource                                                                   |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| STAR method                                                                  | Exponent (free blog + paid course); Tech Interview Handbook (free)              |
| Amazon Leadership Principles                                                 | Exponent LP guide (free); interviewing.io LP guide (free); Design Gurus LP blog |
| Story bank (12-15 stories mapping to multiple principles)                    | interviewing.io behavioral guide                                                |
| Conflict, failure, ownership, cross-functional, leadership-without-authority | Exponent; company values pages                                                  |
| Mock practice                                                                | Exponent (paid), Pramp (free peer), interviewing.io                             |

**Note:** Prepare 12-15 STAR stories with quantified results; "I" over "we"; every story needs a metric. Atlassian has a distinctive Values round; Amazon weaves LP through every round with a Bar Raiser holding veto power.

### 5. CS Fundamentals — Priority: MEDIUM (HIGH at mid-size firms like Avalara; embedded at FAANG)

| Subtopic                                                                 | Best resource                                                      |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| OS: processes/threads, scheduling, memory, concurrency, locks, deadlock  | GeeksforGeeks OS; Operating Systems: Three Easy Pieces (free book) |
| Networking: TCP/IP, HTTP/HTTPS, DNS, TLS, load balancing                 | System Design Primer; GeeksforGeeks                                |
| Databases: indexing, transactions, ACID, isolation levels, normalization | Use The Index Luke (free); DDIA                                    |
| SQL / query design                                                       | LeetCode SQL; HackerRank SQL                                       |
| Concurrency / multithreading                                             | Language-specific docs; Java/Python concurrency guides             |

### 6. Practical / Real-World Coding (debugging, integration, take-home) — Priority: HIGH at mid-size/fintech, LOW at FAANG

| Subtopic                                                           | Best resource                                                                                             |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Debugging unfamiliar codebases / failing tests                     | Practice on open-source GitHub issues with reproducible bugs; Stripe-style prep via Exponent Stripe guide |
| API integration (REST, JSON, retries, error handling, idempotency) | Build small FastAPI/.NET projects consuming real APIs                                                     |
| Take-home assignments (tests, README, clean code)                  | Practice timed mini-projects; emphasize tests + documentation                                             |
| Code review / readability                                          | Self-practice; emphasize descriptive naming, defensive code                                               |

### 7. API Design — Priority: MEDIUM-HIGH (esp. fintech/dev-tooling)

| Subtopic                                                    | Best resource                                                            |
| ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| REST principles, HTTP methods, status codes, auth           | System Design Primer; MDN; your FastAPI projects                         |
| Idempotency, retries, pagination, versioning, rate limiting | Stripe API docs (gold-standard reference); ByteByteGo API design content |

### 8. Language-Specific Deep Knowledge — Priority: MEDIUM (HIGH at mid-size)

- Your .NET/C# depth (collections, async/await, LINQ, memory) — leverage as primary strength.
- Python/FastAPI expansion — Python is now the most interview-friendly language and Meta's most common AI-round choice; build genuine depth (data model, async, typing, standard library).
- Pick ONE primary interview language and master its standard library cold.

### 9. AI / LLM Usage Expectations — Priority: EMERGING TABLE-STAKES (see dedicated section below)

---

## SPECIAL SECTION — AI / LLM USAGE IN INTERVIEWS & ON THE JOB (2025-2026)

**This is the fastest-changing area and a genuine differentiator. Verify each company's stance with your recruiter before every loop.**

### What's actually happening

- **Canva** now _expects_ backend, ML, and frontend candidates to use AI tools (Copilot, Cursor, Claude) during technical interviews; in June 2025 it replaced its "CS Fundamentals" interview with an "AI-Assisted Coding" round. Per _Business Insider_ (Feb 2026), Canva CTO Brendan Humphreys — who oversees roughly 2,600 technical employees — said: "We just flipped the script and went, 'OK, we're going to invite you to use AI.'" and "We want to see the interactions with the AI as much as the output of the tool."
- **Meta** began piloting an "AI-Enabled Coding" interview in October 2025. Per Hello Interview's guide, an internal Meta memo described it as "a new type of coding interview in which candidates have access to an AI assistant… [which] makes LLM-based cheating less effective." Structure: for **E6 and below it replaces ONE of two onsite coding rounds** (the other remains a no-AI LeetCode round), while **E7+/M1 get a single AI-assisted coding round**; it is used for SWE and EM roles up to E7/M2. It's a ~60-min CoderPad environment with a built-in AI assistant. Per interviewing.io, the selectable models are "GPT-4o mini, GPT-5, Claude Sonnet 4/4.5, Claude Haiku 3.5/4.5, Gemini 2.5 Pro, Llama 4 Maverick," and **code execution is turned OFF** during the round. The round uses checkpoints; candidate data suggests clearing 3 is a rough minimum, 4+ recommended. Notably, candidates report the in-interview AI is deliberately throttled (won't directly reveal bugs/solutions) — you must exercise judgment, verify, and debug.
- **Rippling:** Per Formation.dev, "coding rounds explicitly state that candidates can use AI tooling, including autocomplete with GitHub Copilot and ChatGPT. The prompts are minified versions of actual problems Rippling engineers face, such as writing a function for an expense tracker app that returns a list of flagged expenses."
- **Adoption breadth:** Per Formation.dev, "Fellows at Formation are reporting that about 30 percent of their loops allowed or encouraged AI in technical rounds, as long as prompts were specific enough." (i.e., Formation fellows' loops, not all industry loops.) Google reportedly plans to expand AI-enabled interviews while also reintroducing at least one in-person round to validate fundamentals (Sundar Pichai acknowledged remote screens have become noisier signals).
- **Counter-trend:** Some firms reintroduce in-person/adversarial rounds specifically because remote AI-assisted cheating is easy. Expect aggressive real-time follow-ups and skepticism toward AI-generated correctness.

### What companies now evaluate

- **Judgment over generation:** Can you prompt effectively, critically review AI output, catch hallucinations/bugs, and verify with tests? Treat AI code "as if written by a co-worker" — review every line.
- **Workflow:** requirements → assertions/tests → skeleton → implement in chunks → run → debug, narrating reasoning at key moments.
- **Prompt engineering as specification:** precise, scoped, structured prompts (few-shot, chain-of-thought) rather than vague requests.

### Skills becoming table-stakes for mid-level engineers (2025-2026)

- **"Software engineer enhanced by AI" (Cursor/Copilot/Claude Code daily use) is now table-stakes, not a differentiator** (per swyx's framing). The differentiator is building AI _products_: RAG pipelines, agent architectures, evaluation.
- **Agentic/AI-product skills** that command premiums: RAG pipeline engineering, agent orchestration (LangGraph, CrewAI, AutoGen), MCP integration, eval design (cited as the single biggest signal of real LLM experience), prompt engineering, vector DBs (Pinecone/Weaviate/Qdrant), cost optimization/inference budgeting, guardrails/safety (OWASP Top 10 for LLM apps).
- **Your Python/FastAPI/agentic-AI expansion is well-aligned** with where mid-size and AI-tooling demand is moving. Build 2-3 shipped portfolio projects (deployed RAG assistant, multi-agent workflow with human-in-the-loop) with READMEs, architecture diagrams, and cost/latency metrics — these move you through technical screens faster at AI-forward firms.

### How to prepare for AI-enabled rounds

- Practice with Claude/GPT in a normal editor: drill the verify-and-debug loop, not just generation.
- For Meta specifically: use the provided CoderPad practice environment ("the puzzle") beforehand; pick a capable model (Claude Sonnet a solid default; some report GPT-5 slow); know that the AI may be less helpful than in practice and that code execution is off.
- Learn to read and extend unfamiliar code fast (overlaps with Stripe-style debugging rounds).
- **Resources:** Hello Interview's AI-coding interview guides; interviewing.io's Meta AI-round walkthrough; company engineering blogs (canva.dev); for agentic skills: hands-on building with OpenAI Agents SDK / LangGraph / MCP, Hugging Face, and project-based courses.

---

## RECOMMENDATIONS (staged, with thresholds)

**Stage 0 — Now (week 0):** Decide your timeline branch honestly. If you have an active loop in <6 weeks, run the sprint; otherwise run the marathon. Pull 10-15 recent interview experiences for each target company from LeetCode Discuss, Glassdoor, and Blind to calibrate. Confirm AI-tool policy with each recruiter.

**Stage 1 — Foundation (sprint wks 1-4 / marathon months 1-2):** Lock in DSA via NeetCode 150 + Striver. Threshold to advance: you can recognize the pattern of an unseen Medium within ~2 minutes and code it cleanly. Start LLD in parallel by week 3 / month 2.

**Stage 2 — Design + behavioral (sprint wk 5 / marathon month 3):** HLD via Hello Interview + ByteByteGo; build 12-15 STAR stories. Threshold: you can drive a 45-min system-design discussion through the standard framework and tell any STAR story in <4 min with a metric.

**Stage 3 — Specialization + mocks (sprint wk 6 / marathon months 4-6):** Company-specific prep, practical-coding/debugging drills (for Stripe-tier), AI-enabled round practice, and a shipped AI/agentic portfolio (for AI-tooling firms and the US/remote goal). Threshold to interview: 3+ clean mock interviews per round type.

**Stage 4 — In-market:** Apply in waves (warm-up companies first, top targets after 2-3 real loops). Track comp on levels.fyi; for US/remote, target the system-design + behavioral depth that India loops under-train.

**Benchmarks that change the plan:**

- If mocks show DSA pattern-recognition is solid but design is weak → reallocate to HLD/LLD.
- If targeting mostly mid-size/fintech → cut DSA-hard time, add debugging/API/take-home practice.
- If targeting US/remote or AI-tooling → over-invest in system design depth, STAR, and the AI/agentic portfolio.
- If a target company adopts AI-enabled rounds → add dedicated verify-and-debug-with-AI practice.

## CAVEATS

- **Interview processes change quarterly.** Every company-specific detail here (rounds, formats, AI policy) must be re-verified via LeetCode Discuss, Blind, Glassdoor, and your recruiter immediately before each loop.
- **Compensation figures** are from levels.fyi/Glassdoor crowdsourced data and fluctuate; some (e.g., Atlassian Bengaluru P40) are reported as averages not medians, and Avalara/Vertex India data is sparse and low-confidence. Verify on levels.fyi and AmbitionBox at offer time. **No reliable India SWE comp data exists for Vertex Inc. (tax software) — flag and verify directly; beware confusion with the unrelated "VertexOne" utility-software company.**
- **AI-in-interviews data** rests partly on vendor blogs and individual candidate reports; the Canva (Business Insider), Meta (Hello Interview / interviewing.io), and Rippling (Formation.dev) sources are solid, but adoption-breadth statistics (e.g., "~30% of loops," survey-based company-adoption numbers) are secondary and directional, not precise.
- **Beware the cottage industry of "AI interview copilot" tools** (LockedIn AI, Final Round AI, Interview Solver, etc.) that promise undetectable real-time answers. These are distinct from legitimate company-sanctioned AI-enabled interviews and carry serious integrity/detection risk; this plan does not endorse them.
- The highest-confidence claims rest on primary company engineering blogs (Canva), levels.fyi, named reporting (Business Insider, the Pragmatic Engineer), and first-hand candidate write-ups (LeetCode/Glassdoor); some supplementary sources are aggregators or marketing-adjacent and were used only for corroboration.
