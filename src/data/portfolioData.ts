// Portfolio Data for Akshat Jain — IT Undergrad @ DTU
// Verified source of truth: AKSHAT_JAIN_24_IT_015_DS.pdf

export interface ProjectCaseFile {
  id: string;
  code: string;
  name: string;
  classification: string;
  year: string;
  tagline: string;
  status: 'FLAGSHIP EXPERIMENT' | 'ACTIVE MODEL' | 'DEPLOYED / EXPERIMENTAL' | 'PUBLISHED TOOL';
  overview: string;
  problemSolved: string;
  architecture: string;
  keyFeatures: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  benchmarkStats?: {
    primaryGain: string;
    details: {
      label: string;
      before: string;
      after: string;
      change: string;
      isRegression?: boolean;
    }[];
    scaleInfo: string;
  };
  accentColor: string; // hex
  devanagariStamp: string;
  symbol: string;
}

export interface SkillCategory {
  category: string;
  devanagariTag: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    isCore?: boolean;
    badge: string;
  }[];
}

export interface CPPlatformProfile {
  platform: string;
  handle: string;
  solvedCount: number;
  rating?: string | number;
  rank?: string;
  profileUrl: string;
  badgeColor: string;
  badgeBorder: string;
  iconName: string;
  status: string;
}

export interface DSATopicNode {
  id: string;
  code: string;
  name: string;
  hindiName: string;
  angle: number; // in radians
  distance: number; // 0.1 to 0.9 (normalized radius)
  problemsSolved: number;
  status: 'COMFORTABLE' | 'ACTIVE PRACTICE' | 'EXPLORING';
  complexityFocus: string;
  frequency: string;
  keyTechniques: string[];
  lastPingTime: number;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  platform: string;
  skillsCovered: string[];
}

export interface AcademicSemester {
  semester: string;
  sgpa: number;
  period: string;
}

// -------------------------------------------------------------
// IDENTITY & PROFILE DETAILS
// -------------------------------------------------------------
export const AKSHAT_PROFILE = {
  name: 'Akshat Jain',
  alias: 'AKSHAT JAIN',
  positioning: 'IT UNDERGRADUATE | SOFTWARE ENGINEERING | DATABASE SYSTEMS | PROBLEM SOLVING',
  role: 'Information Technology Undergraduate & Developer',
  university: 'Delhi Technological University (DTU)',
  universityFormer: 'Formerly Delhi College of Engineering (DCE)',
  department: 'Department of Information Technology',
  duration: '2024 – Present',
  location: 'New Delhi, India',
  coordinates: '28.6139°N / 77.2090°E',
  cgpa: '8.97',
  status: 'ACTIVELY BUILDING // OPEN TO SWE INTERNSHIPS',
  dsaCount: '650+',
  email: 'akshat.jain0411@gmail.com',
  linkedin: 'https://www.linkedin.com/in/akshat-jain-7b92a5313/',
  github: 'https://github.com/Akshat-Jain-sudo',
  phone: '+91-6284168704',
  leetcodeUrl: 'https://leetcode.com/u/wRTkNlWd5L',
  codeforcesUrl: 'https://codeforces.com/profile/akshat.jain0411',
  codechefUrl: 'https://www.codechef.com/users/writer0411',
  gfgUrl: 'https://www.geeksforgeeks.org/user/akshatjac1tg',
  hackerrankUrl: 'https://www.hackerrank.com/profile/akshat_jain0411',
  codeStudioUrl: 'https://www.naukri.com/code360/profile/7df04252-3450-45b4-bc5b-a992',
  atcoderUrl: 'https://atcoder.jp/users/Wwriter',
  algoMasterUrl: 'https://algomaster.io/profile/akshat-jain',
  tagline: 'BUILDING THINGS. BREAKING LIMITS. DEBUGGING REALITY.',
  shortIntro: "I'm an Information Technology undergraduate at Delhi Technological University interested in software engineering, database systems, algorithmic problem-solving and machine learning. I enjoy building practical systems, benchmarking their performance and understanding the engineering decisions behind them.",
  languages: ['English', 'Hindi', 'Punjabi'],
  coursework: [
    'Data Structures and Algorithms',
    'Object-Oriented Design',
    'Operating Systems',
    'Relational Database Management Systems',
    'Software Engineering',
  ],
};

// -------------------------------------------------------------
// ACADEMIC BREAKDOWN & ENTRANCE ACHIEVEMENTS
// -------------------------------------------------------------
export const ACADEMIC_SEMESTERS: AcademicSemester[] = [
  { semester: 'Semester I', sgpa: 9.20, period: 'Autumn 2024' },
  { semester: 'Semester II', sgpa: 8.80, period: 'Spring 2025' },
  { semester: 'Semester III', sgpa: 9.17, period: 'Autumn 2025' },
  { semester: 'Semester IV', sgpa: 8.73, period: 'Spring 2026' },
];

export const ACADEMIC_HONORS = {
  jeeMain: {
    title: 'JEE Main 2024',
    rank: 'AIR 6690',
    percentile: '99.59%ile',
  },
  jeeAdvanced: {
    title: 'JEE Advanced 2024',
    rank: 'AIR 8417',
    percentile: 'Top 0.8%',
  },
  schoolClass12: {
    school: 'Kendriya Vidyalaya, Mohali',
    exam: 'Class XII — CBSE, 2024',
    aggregate: '96.2%',
    highlights: ['Mathematics: 100/100', 'Computer Science: 99/100'],
  },
  schoolClass10: {
    school: 'Manav Mangal Smart School, Mohali',
    exam: 'Class X — CBSE, 2022',
    aggregate: '94.6%',
    highlights: ['Distinction in Mathematics & Science'],
  },
};

// -------------------------------------------------------------
// TECHNICAL CAPABILITIES / SKILLS (VERIFIED RESUME CATEGORIES)
// -------------------------------------------------------------
export const TECHNICAL_SKILLS: SkillCategory[] = [
  {
    category: 'PROGRAMMING LANGUAGES',
    devanagariTag: 'प्रोग्रामिंग भाषाएँ',
    description: 'High-performance and analytical languages utilized across systems, databases, and problem solving.',
    skills: [
      { name: 'C++', isCore: true, badge: 'Primary / 650+ DSA' },
      { name: 'C', isCore: false, badge: 'Low-Level Foundations' },
      { name: 'Python', isCore: true, badge: 'ML & Benchmarking' },
      { name: 'SQL', isCore: true, badge: 'Complex Querying' },
    ],
  },
  {
    category: 'FRAMEWORKS & LIBRARIES',
    devanagariTag: 'फ्रेमवर्क एवं लाइब्रेरीज़',
    description: 'High-throughput data processing, scientific computing, and backend service frameworks.',
    skills: [
      { name: 'Polars', isCore: true, badge: 'Streaming Ingestion' },
      { name: 'FastAPI', isCore: true, badge: 'High-Perf REST APIs' },
      { name: 'Pandas', isCore: false, badge: 'Data Manipulation' },
      { name: 'NumPy', isCore: false, badge: 'Numerical Arrays' },
      { name: 'scikit-learn', isCore: false, badge: 'ML Modeling' },
      { name: 'Matplotlib', isCore: false, badge: 'Visualization' },
    ],
  },
  {
    category: 'DATABASES & DATA TOOLS',
    devanagariTag: 'डेटाबेस एवं डेटा उपकरण',
    description: 'Relational storage engines, dimensional schemas, indexing, and tabular export libraries.',
    skills: [
      { name: 'PostgreSQL', isCore: true, badge: 'Deep Optimization' },
      { name: 'MySQL', isCore: false, badge: 'Relational RDBMS' },
      { name: 'Firebase', isCore: false, badge: 'Cloud Data' },
      { name: 'exceljs', isCore: false, badge: 'Spreadsheet Export' },
      { name: 'json2csv', isCore: false, badge: 'Tabular Parsing' },
    ],
  },
  {
    category: 'AI & APIS',
    devanagariTag: 'कृत्रिम बुद्धिमत्ता एवं एपीआई',
    description: 'LLM orchestration, prompt engineering, and intelligent system integration.',
    skills: [
      { name: 'Gemini API', isCore: false, badge: 'Multimodal LLM' },
      { name: 'OpenAI API', isCore: false, badge: 'GPT Integration' },
      { name: 'Claude API', isCore: false, badge: 'Anthropic LLMs' },
      { name: 'Ollama', isCore: false, badge: 'Local Model Inference' },
      { name: 'Antigravity', isCore: false, badge: 'Agentic Workflows' },
    ],
  },
  {
    category: 'DEVELOPER TOOLS',
    devanagariTag: 'डेवलपर टूल्स',
    description: 'Development environment, containerization, version control, and business analytics.',
    skills: [
      { name: 'Git', isCore: false, badge: 'Version Control' },
      { name: 'GitHub', isCore: false, badge: 'Collaboration' },
      { name: 'Docker', isCore: false, badge: 'Containerization' },
      { name: 'Tableau', isCore: false, badge: 'Data Visualization' },
    ],
  },
];

// -------------------------------------------------------------
// FEATURED PROJECTS (VERIFIED PRIORITY ORDER)
// -------------------------------------------------------------
export const PROJECTS_ARCHIVE: ProjectCaseFile[] = [
  {
    id: 'postgres-benchmarking',
    code: '#PRJ-001',
    name: 'POSTGRESQL QUERY OPTIMIZATION LAB',
    classification: 'DATABASE ENGINEERING / PERFORMANCE BENCHMARKING',
    year: '2026',
    tagline: 'High-throughput benchmarking platform engineering 797× query speedups across 12.87M NYC taxi trip records using PostgreSQL 18, Polars, and FastAPI.',
    status: 'FLAGSHIP EXPERIMENT',
    overview: 'Built a PostgreSQL query optimization and performance benchmarking platform using 12.87 million NYC TLC Yellow Taxi trip records (January–April 2024). Designed dimensional schemas, benchmarked composite covering indexes, range partitioning, CTE rewrites and materialized views with EXPLAIN (ANALYZE, BUFFERS), and exposed execution plans through a FastAPI and React dashboard.',
    problemSolved: 'Analytical queries across millions of rows suffer from catastrophic sequential scans and massive buffer cache thrashing when unoptimized. This lab isolates the exact indexing and restructuring strategies that minimize execution latency under rigorous median-of-runs testing.',
    architecture: 'Polars streaming ingests 12.87M parquet records into PostgreSQL 18 via binary COPY at 50,000–70,000 rows/sec. A FastAPI backend executes warm-up runs and collects median execution times with buffer hits, while a React/TypeScript interface visualizes execution trees and comparison metrics.',
    keyFeatures: [
      'Loaded 12.87M records using Polars streaming and PostgreSQL COPY at 50,000–70,000 rows/second',
      'Designed a normalized dimensional database schema optimized for analytical rollups',
      'Engineered a 10-query analytical workload with automated validation checks',
      'Achieved a 797× performance improvement on daily zone aggregation: 10.9s → 13.7ms',
      'Achieved 1.67× speedup via CTE early-aggregation rewrite: 1,136ms → 682ms',
      'Documented 11.4% regression on cross-partition scans without pruning (15.4s → 17.2s)',
      'Inspected buffer usage and node costs with EXPLAIN (ANALYZE, BUFFERS)',
      'Verified query correctness and execution integrity with an 11-test pytest suite',
    ],
    techStack: ['PostgreSQL 18', 'Python', 'Polars', 'FastAPI', 'React', 'TypeScript', 'pytest'],
    githubUrl: 'https://github.com/Akshat-Jain-sudo',
    benchmarkStats: {
      primaryGain: '797× SPEEDUP',
      scaleInfo: '12.87M Records Ingested @ 50k–70k rows/s',
      details: [
        {
          label: 'Daily Zone Aggregation',
          before: '10.9 s',
          after: '13.7 ms',
          change: '797× Faster',
        },
        {
          label: 'CTE Early-Aggregation Rewrite',
          before: '1,136 ms',
          after: '682 ms',
          change: '1.67× Faster',
        },
        {
          label: 'Cross-Partition Scan (Without Pruning)',
          before: '15.4 s',
          after: '17.2 s',
          change: '11.4% Regression',
          isRegression: true,
        },
      ],
    },
    accentColor: '#00E5FF',
    devanagariStamp: 'दक्षता',
    symbol: '⚡',
  },
  {
    id: 'ipl-win-probability',
    code: '#PRJ-002',
    name: 'IPL LIVE WIN-PROBABILITY MODEL',
    classification: 'MACHINE LEARNING / SPORTS ANALYTICS',
    year: '2026',
    tagline: 'Ball-by-ball machine learning win-probability prediction model for IPL run chases trained on Cricsheet data with leak-free season splitting.',
    status: 'ACTIVE MODEL',
    overview: 'Built a ball-by-ball win-probability prediction model for Indian Premier League (IPL) run chases using historical Cricsheet ball-by-ball data. Engineered dynamic match-state features, compared Logistic Regression against Gradient Boosting, strictly enforced season-based train/test splitting to prevent intra-match data leakage, and evaluated calibrated probabilities via log loss and reliability curves.',
    problemSolved: 'In dynamic T20 run chases, static run-rate calculations fail to capture non-linear momentum shifts caused by rapid wicket falls and high required run rates. This model continuously updates calibrated win probabilities ball-by-ball.',
    architecture: 'Raw Cricsheet JSON/CSV ball data is parsed with Pandas and NumPy. Features are dynamically accumulated across innings (runs needed, balls remaining, wickets in hand, CRR, RRR). Models are benchmarked via scikit-learn with season-based cross-validation, and match probability progressions are rendered with Matplotlib.',
    keyFeatures: [
      'Processed granular ball-by-ball cricket data spanning multiple IPL seasons',
      'Engineered critical match-state features: runs left, balls left, wickets in hand, CRR, RRR',
      'Trained and evaluated Logistic Regression against Gradient Boosting classifiers',
      'Employed strict season-based train/test splitting to prevent match-level leakage',
      'Assessed probability calibration using log loss metrics and calibration curves',
      'Visualized complete win-probability trajectories across historical run chases',
    ],
    techStack: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'Matplotlib', 'Cricsheet Data'],
    githubUrl: 'https://github.com/Akshat-Jain-sudo',
    accentColor: '#EFFF00',
    devanagariStamp: 'संभाव्यता',
    symbol: '🏏',
  },
  {
    id: 'symbiote-pricing',
    code: '#PRJ-003',
    name: 'SYMBIOTE',
    classification: 'FULL-STACK DEVELOPMENT / PRICE INTELLIGENCE',
    year: '2025',
    tagline: 'Full-stack multi-store price comparison engine aggregating products across 8 retail & quick-commerce platforms with automated best-deal detection.',
    status: 'DEPLOYED / EXPERIMENTAL',
    overview: 'Built a full-stack price comparison engine that aggregates live product information across 8 major Indian retail and quick-commerce platforms: Flipkart, Snapdeal, Croma, Myntra, Ajio, Blinkit, Swiggy Instamart, and Zepto. Features an Express/Cheerio/Axios scraping layer with rotating headers, rate-limit fallback handling, auto best-deal highlighting, and CSV/Excel exports.',
    problemSolved: 'Online consumers waste substantial time manually cross-referencing prices across e-commerce giants and quick-commerce delivery apps. Symbiote queries multiple vendors concurrently, normalizing disparate data structures to identify the optimal price.',
    architecture: 'Single-service deployment serving a React (Vite) frontend through an Express and Node.js backend. The server orchestrates concurrent Cheerio/Axios scraping routines with rotating headers and fallback datasets, outputting clean JSON or formatted spreadsheets via json2csv and exceljs.',
    keyFeatures: [
      'Aggregates across 8 platforms: Flipkart, Snapdeal, Croma, Myntra, Ajio, Blinkit, Swiggy Instamart, Zepto',
      'Covers multiple retail categories: Electronics, Fashion, and Quick Commerce',
      'Engineered Express/Cheerio/Axios scraping layer with rotating request headers',
      'Resilient fallback data handling to preserve UI functionality during network timeouts or IP blocks',
      'Automated product comparison with real-time best-deal highlighting',
      'Analytics dashboard visualizing price distributions, store comparisons, and discount margins',
      'Built-in tabular export in both CSV and Microsoft Excel (.xlsx) formats',
      'Single-service unified deployment serving the Vite build through Express',
    ],
    techStack: ['React (Vite)', 'Node.js', 'Express', 'Cheerio', 'Axios', 'json2csv', 'exceljs'],
    githubUrl: 'https://github.com/Akshat-Jain-sudo',
    accentColor: '#FF2E93',
    devanagariStamp: 'तुलना',
    symbol: '🛍️',
  },
  {
    id: 'code-to-word',
    code: '#PRJ-004',
    name: 'CODE TO WORD',
    classification: 'DEVELOPER PRODUCTIVITY VS CODE EXTENSION',
    year: '2025',
    tagline: 'VS Code extension that converts source code into university-formatted Word lab manuals (.docx) with AI explanations and DTU cover page.',
    status: 'PUBLISHED TOOL',
    overview: 'A specialized developer productivity extension built for VS Code that automates the generation of formatted university lab-manual reports (.docx) from source code files. Integrates multi-provider AI APIs (Gemini, OpenAI, Groq, Ollama) for explanation generation and includes automated DTU cover page generation.',
    problemSolved: 'Eliminates hours spent manually copying code into Microsoft Word, formatting syntax highlights, and generating flowcharts for university lab assessments.',
    architecture: 'Built on the VS Code Extension API in TypeScript. Utilizes docx for native OpenXML generation, Prism.js for code styling, and a smart AI router supporting both local Ollama models and cloud APIs.',
    keyFeatures: [
      'One-click automated .docx lab manual generation from single files or folders',
      'Multi-model AI Provider Pool (Gemini, Groq, OpenAI, Ollama, OpenRouter)',
      'Configurable DTU Cover Page generation with department and roll credentials',
      'Automated Mermaid flowchart and pseudocode generation',
      'Prism.js syntax highlighting preserved natively inside Microsoft Word formats',
    ],
    techStack: ['TypeScript', 'VS Code Extension API', 'docx', 'Prism.js', 'Gemini API', 'Ollama', 'Groq'],
    githubUrl: 'https://github.com/Akshat-Jain-sudo',
    accentColor: '#00E5FF',
    devanagariStamp: 'लेखन',
    symbol: '📄',
  },
];

// -------------------------------------------------------------
// CERTIFICATIONS & TRAINING
// -------------------------------------------------------------
export const CERTIFICATIONS_ARCHIVE: CertificationItem[] = [
  {
    id: 'cert-01',
    title: 'Supervised Machine Learning: Regression and Classification',
    issuer: 'Andrew Ng, DeepLearning.AI',
    year: '2025',
    platform: 'Coursera',
    skillsCovered: ['Linear Regression', 'Logistic Regression', 'Gradient Descent', 'Cost Functions', 'scikit-learn'],
  },
  {
    id: 'cert-02',
    title: 'Databases and SQL for Data Science with Python',
    issuer: 'IBM',
    year: '2026',
    platform: 'Coursera',
    skillsCovered: ['SQL', 'Relational Databases', 'Python Database APIs', 'Stored Procedures', 'Advanced SQL Joins'],
  },
  {
    id: 'cert-03',
    title: 'Python, Pandas, Data Visualization',
    issuer: 'Kaggle Learn',
    year: '2025',
    platform: 'Kaggle',
    skillsCovered: ['Pandas', 'Data Cleaning', 'Matplotlib', 'Seaborn', 'Exploratory Data Analysis'],
  },
  {
    id: 'cert-04',
    title: 'Decode C++ with DSA',
    issuer: 'Physics Wallah',
    year: '2025 – Present',
    platform: 'Physics Wallah',
    skillsCovered: ['Advanced C++', 'Time & Space Complexity', 'Dynamic Programming', 'Graph Theory', 'Trees & BSTs'],
  },
];

// -------------------------------------------------------------
// COMPETITIVE PROGRAMMING & CODING PLATFORMS
// -------------------------------------------------------------
export const CP_PLATFORMS: CPPlatformProfile[] = [
  {
    platform: 'LeetCode',
    handle: 'wRTkNlWd5L',
    solvedCount: 650,
    rating: 'Top 5%',
    rank: 'Knight / Top Tier',
    profileUrl: 'https://leetcode.com/u/wRTkNlWd5L',
    badgeColor: 'text-[#e2b13c]',
    badgeBorder: 'border-[#e2b13c]/40',
    iconName: 'LC',
    status: 'Daily Active Practice',
  },
  {
    platform: 'Codeforces',
    handle: 'akshat.jain0411',
    solvedCount: 220,
    rating: 'Pupil / Specialist',
    rank: 'Active Division Rounds',
    profileUrl: 'https://codeforces.com/profile/akshat.jain0411',
    badgeColor: 'text-[#38bdf8]',
    badgeBorder: 'border-[#38bdf8]/40',
    iconName: 'CF',
    status: 'Div. 2 / Div. 3 Contests',
  },
  {
    platform: 'CodeChef',
    handle: 'writer0411',
    solvedCount: 180,
    rating: '3★ Div 2',
    rank: 'Contest Challenger',
    profileUrl: 'https://www.codechef.com/users/writer0411',
    badgeColor: 'text-[#a78bfa]',
    badgeBorder: 'border-[#a78bfa]/40',
    iconName: 'CC',
    status: 'Starters & Cook-Offs',
  },
  {
    platform: 'GeeksforGeeks',
    handle: 'akshatjac1tg',
    solvedCount: 150,
    rating: 'POTD Streak',
    rank: 'Campus Rank Top Tier',
    profileUrl: 'https://www.geeksforgeeks.org/user/akshatjac1tg',
    badgeColor: 'text-[#34d399]',
    badgeBorder: 'border-[#34d399]/40',
    iconName: 'GFG',
    status: 'POTD & Practice Archives',
  },
  {
    platform: 'CodeStudio',
    handle: '7df04252',
    solvedCount: 120,
    rating: 'Specialist',
    rank: 'Naukri Code360',
    profileUrl: 'https://www.naukri.com/code360/profile/7df04252-3450-45b4-bc5b-a992',
    badgeColor: 'text-[#fb923c]',
    badgeBorder: 'border-[#fb923c]/40',
    iconName: 'CS',
    status: 'DSA Curated Tracks',
  },
  {
    platform: 'HackerRank',
    handle: 'akshat_jain0411',
    solvedCount: 100,
    rating: '5★ Gold Badge',
    rank: 'Problem Solving (C++)',
    profileUrl: 'https://www.hackerrank.com/profile/akshat_jain0411',
    badgeColor: 'text-[#22c55e]',
    badgeBorder: 'border-[#22c55e]/40',
    iconName: 'HR',
    status: 'C++ & Algorithms',
  },
  {
    platform: 'AtCoder',
    handle: 'Wwriter',
    solvedCount: 85,
    rating: 'Contestant',
    rank: 'AtCoder Beginner / Reg',
    profileUrl: 'https://atcoder.jp/users/Wwriter',
    badgeColor: 'text-[#94a3b8]',
    badgeBorder: 'border-[#94a3b8]/40',
    iconName: 'AC',
    status: 'Beginner Contests',
  },
  {
    platform: 'AlgoMaster',
    handle: 'akshat-jain',
    solvedCount: 60,
    rating: 'Pattern Master',
    rank: 'Curated 75 Sheet',
    profileUrl: 'https://algomaster.io/profile/akshat-jain',
    badgeColor: 'text-[#06b6d4]',
    badgeBorder: 'border-[#06b6d4]/40',
    iconName: 'AM',
    status: 'Patterns & Blind 75',
  },
];

// -------------------------------------------------------------
// DSA RADAR NODES (650+ PROBLEMS)
// -------------------------------------------------------------
export const DSA_TOPIC_NODES: DSATopicNode[] = [
  {
    id: 'dsa-dp',
    code: '#ALGO-01',
    name: 'DYNAMIC PROGRAMMING',
    hindiName: 'गतिक प्रोग्रामन',
    angle: 0.78,
    distance: 0.62,
    problemsSolved: 105,
    status: 'ACTIVE PRACTICE',
    complexityFocus: '2D/3D Tabulation, State Compression',
    frequency: '92.4 GHz',
    keyTechniques: ['0/1 Knapsack Variations', 'Longest Common Subsequence', 'Digit DP', 'Partition DP'],
    lastPingTime: 0,
  },
  {
    id: 'dsa-graphs',
    code: '#ALGO-02',
    name: 'GRAPH THEORY',
    hindiName: 'ग्राफ सिद्धांत',
    angle: 2.35,
    distance: 0.74,
    problemsSolved: 95,
    status: 'COMFORTABLE',
    complexityFocus: 'O(V + E) Traversals & Shortest Paths',
    frequency: '104.1 GHz',
    keyTechniques: ['BFS & Multi-Source BFS', 'Dijkstra & Bellman-Ford', 'Disjoint Set Union (DSU)', 'Kahn Algorithm TopoSort'],
    lastPingTime: 0,
  },
  {
    id: 'dsa-trees',
    code: '#ALGO-03',
    name: 'TREES & BST',
    hindiName: 'ट्री एवं बाइनरी सर्च',
    angle: 3.92,
    distance: 0.52,
    problemsSolved: 115,
    status: 'COMFORTABLE',
    complexityFocus: 'O(H) Recursive & Iterative Traversals',
    frequency: '44.8 GHz',
    keyTechniques: ['Lowest Common Ancestor (LCA)', 'Morris Traversal', 'Tree Diameter', 'Segment Tree Basics'],
    lastPingTime: 0,
  },
  {
    id: 'dsa-bs-twopointers',
    code: '#ALGO-04',
    name: 'BINARY SEARCH & TWO POINTERS',
    hindiName: 'द्वि-सूचक एवं खोज',
    angle: 5.12,
    distance: 0.82,
    problemsSolved: 150,
    status: 'COMFORTABLE',
    complexityFocus: 'O(log N) Search Spaces & O(N) In-Place',
    frequency: '128.6 GHz',
    keyTechniques: ['Search on Monotonic Answer', 'Rotated Sorted Array', 'Dutch National Flag', 'Trapping Rain Water'],
    lastPingTime: 0,
  },
  {
    id: 'dsa-sliding-strings',
    code: '#ALGO-05',
    name: 'SLIDING WINDOW & STRINGS',
    hindiName: 'विंडो एवं स्ट्रिंग',
    angle: 1.57,
    distance: 0.45,
    problemsSolved: 95,
    status: 'COMFORTABLE',
    complexityFocus: 'O(N) Amortized Window Shrinking',
    frequency: '76.2 GHz',
    keyTechniques: ['Variable Length Windows', 'Longest Substring Without Repeats', 'String Hashing', 'Trie Prefix Trees'],
    lastPingTime: 0,
  },
  {
    id: 'dsa-arrays-bits',
    code: '#ALGO-06',
    name: 'ARRAYS & BIT MANIPULATION',
    hindiName: 'ऐरे एवं बिट मैनिपुलेशन',
    angle: 4.71,
    distance: 0.38,
    problemsSolved: 130,
    status: 'COMFORTABLE',
    complexityFocus: 'O(1) Bitwise Operations & O(N) Passes',
    frequency: '18.9 GHz',
    keyTechniques: ['Kadane Algorithm', 'Bitmasking Subsets', 'Power Set', 'XOR Duplicate Elimination'],
    lastPingTime: 0,
  },
];
