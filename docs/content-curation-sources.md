# OpenSDEPrep — Trusted Sources Registry

Check these first before searching. Sorted by priority within each topic.
Sources marked `[PRIMARY]` are canonical — prefer over any secondary source for the same concept.

---

## DSA

| Source | Type | Best for | URL |
|--------|------|----------|-----|
| NeetCode | Video + Problems | Pattern-based walkthroughs, Neetcode 150 | https://neetcode.io |
| CP-Algorithms | Article `[PRIMARY]` | Formal definitions, complexity proofs, edge cases | https://cp-algorithms.com |
| LeetCode | Problems `[PRIMARY]` | Canonical problem links per pattern | https://leetcode.com |
| USACO Guide | Article | Pattern explanations with difficulty tiers | https://usaco.guide |
| Abdul Bari (YouTube) | Video | Algorithm visualisation, recursion, DP | https://youtube.com/@abdul_bari |

**Avoid:** GeeksForGeeks (shallow, often incorrect complexity analysis), random Medium articles on DSA

---

## LLD

| Source | Type | Best for | URL |
|--------|------|----------|-----|
| Refactoring.guru | Article `[PRIMARY]` | All 23 GoF design patterns, SOLID, code examples | https://refactoring.guru |
| SourceMaking | Article | Alternative explanations of patterns + anti-patterns | https://sourcemaking.com |
| Arjan Codes (YouTube) | Video | Python-based LLD, SOLID in practice | https://youtube.com/@ArjanCodes |
| OODesign.com | Article | OOP principles with UML | https://www.oodesign.com |
| GitHub: iluwatar/java-design-patterns | Code `[PRIMARY]` | Real working implementations per pattern | https://github.com/iluwatar/java-design-patterns |

**Avoid:** Tutorial sites that show patterns without context of *when* to use them

---

## HLD (System Design)

| Source | Type | Best for | URL |
|--------|------|----------|-----|
| ByteByteGo (Alex Xu) | Article + Video `[PRIMARY]` | System design fundamentals, case studies | https://bytebytego.com |
| System Design Primer | Article `[PRIMARY]` | Broad coverage, good starting point | https://github.com/donnemartin/system-design-primer |
| High Scalability | Blog | Real-world architecture teardowns | http://highscalability.com |
| Engineering blogs | Blog `[PRIMARY]` | First-hand accounts of real systems — see list below | — |
| DDIA (Kleppmann) | Book `[PRIMARY]` | Distributed systems fundamentals, deep reference | — |

**Engineering blogs to check per topic:**
- Databases/storage: Cloudflare, PlanetScale, CockroachDB
- Messaging/streaming: Confluent (Kafka), Uber engineering
- CDN/caching: Cloudflare, Fastly
- Search: Elasticsearch blog
- Payments/fintech: Stripe engineering, Square engineering
- Ride-sharing/maps: Uber, Lyft, DoorDash
- Media/streaming: Netflix tech blog, Spotify engineering
- Social/feeds: Meta engineering, Twitter/X engineering (pre-2023 posts)

---

## Frontend

| Source | Type | Best for | URL |
|--------|------|----------|-----|
| MDN Web Docs | Docs `[PRIMARY]` | Browser APIs, HTML, CSS, JS spec-level accuracy | https://developer.mozilla.org |
| web.dev (Google) | Article `[PRIMARY]` | Performance, Core Web Vitals, modern patterns | https://web.dev |
| V8 Blog | Blog `[PRIMARY]` | JS engine internals, JIT, garbage collection | https://v8.dev/blog |
| Jake Archibald's Blog | Blog | Browser rendering, service workers, HTTP/2 | https://jakearchibald.com |
| React Docs | Docs `[PRIMARY]` | React internals, hooks, reconciler | https://react.dev |
| Lydia Hallie | Article + Visual | JS concepts visualised (event loop, closures, etc.) | https://www.lydiahallie.com |
| Fireship (YouTube) | Video | Quick concept overviews, good entry points | https://youtube.com/@Fireship |
| builder.io Blog | Article | React/Angular/framework internals, performance | https://www.builder.io/blog |

**Avoid:** W3Schools (outdated, imprecise), CSS-Tricks (sold, quality dropped post-2022)

---

## DevOps

| Source | Type | Best for | URL |
|--------|------|----------|-----|
| Kubernetes Docs | Docs `[PRIMARY]` | All K8s concepts, architecture, components | https://kubernetes.io/docs |
| Docker Docs | Docs `[PRIMARY]` | Container fundamentals, Compose, networking | https://docs.docker.com |
| CNCF Blog | Blog | Cloud-native patterns, graduated project deep dives | https://www.cncf.io/blog |
| Kelsey Hightower | Talks/Posts `[PRIMARY]` | K8s architecture, production patterns | https://github.com/kelseyhightower |
| AWS/GCP/Azure Docs | Docs `[PRIMARY]` | Cloud service specifics — go to the source | — |
| The New Stack | Article | SRE, platform engineering, observability | https://thenewstack.io |
| Hussein Nasser (YouTube) | Video | Networking, proxies, databases from first principles | https://youtube.com/@hnasr |
| roadmap.sh/devops | Reference | Topic map, good for coverage gaps | https://roadmap.sh/devops |

**Note:** For CI/CD tools (GitHub Actions, GitLab CI, ArgoCD), always use official docs. Tool-specific tutorials go stale fast.

---

## Language & Runtime

| Source | Type | Best for | URL |
|--------|------|----------|-----|
| **Python** | | | |
| CPython Source | Code `[PRIMARY]` | Ground truth for Python internals | https://github.com/python/cpython |
| Python Docs (Data Model) | Docs `[PRIMARY]` | Object model, dunder methods, memory | https://docs.python.org/3/reference/datamodel.html |
| Real Python | Article | Readable explanations of Python internals | https://realpython.com |
| Armin Ronacher's Blog | Blog | CPython deep dives, GIL, async | https://lucumr.pocoo.org |
| **JVM** | | | |
| JVM Spec (Oracle) | Docs `[PRIMARY]` | Authoritative bytecode, class loading, memory | https://docs.oracle.com/javase/specs/ |
| Baeldung | Article | Practical JVM internals (GC, JIT, threads) | https://www.baeldung.com |
| Nitsan Wakart's Blog | Blog `[PRIMARY]` | JVM performance, memory, JIT | http://psy-lob-saw.blogspot.com |
| **V8 / JS Runtime** | | | |
| V8 Blog | Blog `[PRIMARY]` | Engine internals, optimisations | https://v8.dev/blog |
| Franziska Hinkelmann's Talks | Video | V8 bytecode, hidden classes, optimisation | Search YouTube |
| **Concurrency / Memory Models** | | | |
| JSR-133 (Java Memory Model) | Spec `[PRIMARY]` | Memory visibility, happens-before | https://jcp.org/en/jsr/detail?id=133 |
| Preshing on Programming | Blog `[PRIMARY]` | Memory ordering, lock-free, CPU caches | https://preshing.com |

---

## Quality Vetting Checklist

Before adding any reference to an article:

- [ ] Does it explain *why*, not just *what*?
- [ ] Recency: fast-moving topics (DevOps, Frontend) — published within 3 years; fundamentals (DSA, LLD) — age irrelevant
- [ ] Primary source preferred: official docs or engineering blog from the team that built it
- [ ] Does it add something the other references don't? If not, cut it.
- [ ] You have read/watched it, not just skimmed

No hard cap on references — include everything genuinely useful. Quality over completeness, but don't cut a good source for the sake of brevity.

---

## Sources to Avoid Globally

| Source | Reason |
|--------|--------|
| GeeksForGeeks | Frequently incorrect complexity analysis, shallow explanations, plagiarised content |
| JavatPoint | Low quality, outdated, no depth |
| TutorialsPoint | Same issues as above |
| W3Schools | Imprecise, outdated |
| Random Medium articles (no publication) | Unvetted, often wrong, breaks links |
| YouTube videos under 50K views on technical topics | Low signal unless the author is known |

**Exception:** Medium articles from known engineering blogs (Netflix, Uber, etc.) are fine — check the publication, not the platform.
