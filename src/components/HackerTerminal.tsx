import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Shield, CornerDownLeft } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { AKSHAT_PROFILE } from '../data/portfolioData';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system' | 'ascii';
  content: string;
}

const DEV_ASCII = `
      ___   _  __ _____ _   _    _  _____ 
     / _ \\ | |/ // ____| | | |  / \\|_   _|
    / /_\\ \\| ' / \\___ \\| |_| | / _ \\ | |  
    |  _  || . \\  ___) |  _  |/ ___ \\| |  
    |_| |_||_|\\_\\|____/|_| |_/_/   \\_\\_|  
    [ AKSHAT JAIN // SIGNAL FROM NEW DELHI ]
`;

const INITIAL_LINES: TerminalLine[] = [
  { id: '1', type: 'system', content: 'AKSHAT_OS v2.4 [DTU_IT_NODE // NEW DELHI 28.61°N]' },
  { id: '2', type: 'system', content: 'Type "help" to view authorized developer queries.' },
];

export const HackerTerminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>(INITIAL_LINES);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    soundFX.playTypingClick();

    // Append to command history for arrow-up traversal
    setCommandHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    const newHistory: TerminalLine[] = [
      ...history,
      { id: `${Date.now()}-input`, type: 'input', content: raw },
    ];

    const parts = raw.toLowerCase().split(' ');
    const command = parts[0];

    switch (command) {
      case 'help':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          content: `AUTHORIZED COMMAND DIRECTORY:
  whoami        - Interrogate developer identity and status
  about         - Engineering philosophy and background summary
  skills        - Display verified technical capabilities and 5 stack categories
  projects      - List engineering project archives in verified priority order
  postgres      - Deep dive into PostgreSQL Query Optimization Lab (797× speedup)
  ipl           - Inspect IPL Live Win-Probability ML model & calibration
  symbiote      - Deep architectural inspection of Project Symbiote (8 stores)
  codetoword    - Inspect Code to Word VS Code extension specs & AI router
  dsa           - Algorithmic telemetry: 730+ LeetCode problems solved in C++
  education     - University credentials at DTU (CGPA: 8.97) & entrance ranks
  certifications- Verified industry credentials (DeepLearning.AI, IBM, Kaggle)
  resume        - Recruiter dossier summary & link to quick-sheet
  contact       - Retrieve direct transmission channels and verified links
  ascii         - Render Akshat developer ASCII banner
  audio         - Toggle procedural Web Audio sound synthesizer
  clear         - Purge console buffer`,
        });
        break;

      case 'whoami':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          content: `AKSHAT JAIN
POSITIONING:  IT UNDERGRADUATE | SOFTWARE ENGINEERING | DATABASE SYSTEMS | PROBLEM SOLVING
INSTITUTION:  Delhi Technological University (DTU) — B.Tech IT (2024 – Present)
LOCATION:     New Delhi, India [28.6139°N / 77.2090°E]
ACADEMIC:     Current CGPA: 8.97 / 10.0 (Sem I: 9.20 | Sem II: 8.80 | Sem III: 9.17 | Sem IV: 8.73)
ENTRANCE:     JEE Main AIR 6690 (99.59 %ile) | JEE Advanced AIR 8417
PROBLEM SOLV: 730+ LeetCode Problems Solved in C++ (Rank #90,004)
EMAIL:        akshat.jain0411@gmail.com
LINKEDIN:     https://www.linkedin.com/in/akshat-jain-7b92a5313/`,
        });
        break;

      case 'about':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          content: AKSHAT_PROFILE.shortIntro,
        });
        break;

      case 'skills':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          content: `VERIFIED TECHNICAL STACK (5 CATEGORIES):
  [PROGRAMMING LANGUAGES]
  - C++ (Primary Language, STL, 730+ DSA Solved)
  - SQL (Complex Joins, Window Functions, Dimensional Schemas)
  - Python (ML Modeling, Polars/Pandas Benchmarking, FastAPI)
  - C (Low-Level Systems Foundations)

  [FRAMEWORKS & LIBRARIES]
  - Polars (Streaming Ingestion 50k-70k rows/s)
  - FastAPI (High-Performance REST APIs)
  - Pandas, NumPy, scikit-learn, Matplotlib

  [DATABASES & DATA TOOLS]
  - PostgreSQL (Deep Query Optimization, Covering Indexes, Partitioning)
  - MySQL, Firebase
  - exceljs, json2csv (Tabular Export Pipelines)

  [AI & APIS]
  - Gemini API, OpenAI API, Ollama (Local LLM Inference), Claude API, Antigravity

  [DEVELOPER TOOLS]
  - Git, GitHub, Docker, Tableau`,
        });
        break;

      case 'projects':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          content: `FEATURED ENGINEERING CASE FILES (PRIORITY ORDER):
  01 — POSTGRESQL QUERY OPTIMIZATION LAB (2026, FLAGSHIP)
       Classification: Database Engineering / Performance Benchmarking
       Stack: PostgreSQL 18, Python, Polars, FastAPI, React, pytest
       Scale: 12.87M NYC taxi trip records ingested @ 50k–70k rows/s
       Gain: 797× Speedup (10.9s → 13.7ms) on zone aggregation
       Command: "postgres" for detailed benchmark findings

  02 — IPL LIVE WIN-PROBABILITY MODEL (2026)
       Classification: Machine Learning / Sports Analytics
       Stack: Python, Pandas, NumPy, scikit-learn, Matplotlib, Cricsheet Data
       Highlights: Dynamic match-state features, season-based leak-free split
       Command: "ipl" for model telemetry

  03 — SYMBIOTE (2025)
       Classification: Full-Stack Development / Price Intelligence
       Stack: React (Vite), Node.js, Express, Cheerio, Axios, json2csv, exceljs
       Highlights: 8 retail & quick-commerce stores, rotating headers, CSV/XLSX
       Command: "symbiote" for multi-store architecture

  04 — CODE TO WORD (2025)
       Classification: Developer Productivity VS Code Extension
       Stack: TypeScript, VS Code Extension API, docx, Prism.js, Gemini API, Ollama
       Highlights: Automated lab manual generator with DTU cover page
       Command: "codetoword" for extension specs`,
        });
        break;

      case 'postgres':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          content: `CASE FILE #001: POSTGRESQL QUERY OPTIMIZATION LAB (2026)
STATUS:         FLAGSHIP BENCHMARK EXPERIMENT
INGESTION:      12.87M NYC Yellow Taxi trips via Polars + COPY @ 50k–70k rows/s
MEASUREMENT:    Warm-up runs + median-of-runs timing via EXPLAIN (ANALYZE, BUFFERS)
TEST SUITE:     11-test pytest suite for query correctness

BENCHMARK 1 — Daily Zone Aggregation:
  - Baseline (Seq Scan):         10,900 ms (10.9 s)
  - Optimized (Covering Index):  13.7 ms
  - Gain:                        797× FASTER (99.87% reduction)

BENCHMARK 2 — CTE Early-Aggregation Rewrite:
  - Baseline (Cartesian Join):   1,136 ms
  - Optimized (Pre-aggreg CTE):  682 ms
  - Gain:                        1.67× FASTER (39.9% reduction)

BENCHMARK 3 — Cross-Partition Full Scan (Negative Result):
  - Baseline (Single Table):     15.4 s
  - Range-Partitioned:           17.2 s
  - Result:                      11.4% REGRESSION
  - Analysis: Full scan across partitions without pruning keys introduces
    append-node overhead and multiple relation locks.`,
        });
        break;

      case 'ipl':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          content: `CASE FILE #002: IPL LIVE WIN-PROBABILITY MODEL (2026)
STATUS:       ACTIVE ML MODEL
DATASET:      Granular ball-by-ball Cricsheet historical data across IPL seasons
FEATURES:     Dynamic match-state: runs needed, balls left, wickets in hand, CRR, RRR
MODELS:       Logistic Regression vs Gradient Boosting classifiers
VALIDATION:   Strict season-based train/test split to prevent intra-match leakage
CALIBRATION:  Evaluated using log loss metrics and reliability curve calibration`,
        });
        break;

      case 'symbiote':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          content: `CASE FILE #003: SYMBIOTE (2025)
STATUS:       DEPLOYED / EXPERIMENTAL PRICE ENGINE
COVERAGE:     8 Stores across Electronics, Fashion, and Quick-Commerce:
              [Flipkart, Snapdeal, Croma, Myntra, Ajio, Blinkit, Swiggy Instamart, Zepto]
STACK:        React (Vite), Node.js, Express, Cheerio, Axios, json2csv, exceljs
ENGINEERING:
  - Rotating request headers to mitigate IP blocking
  - Fallback data handling for network timeouts
  - Real-time automated best-deal detection
  - Native spreadsheet exports in CSV and Microsoft Excel (.xlsx) formats`,
        });
        break;

      case 'codetoword':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          content: `CASE FILE #004: CODE TO WORD (2025)
STATUS:       PUBLISHED DEVELOPER TOOL (VS CODE EXTENSION)
STACK:        TypeScript, VS Code Extension API, docx, Prism.js, Gemini API, Ollama
FEATURES:
  - One-click .docx lab manual generation from files or directories
  - Multi-model AI router (Gemini API, Groq, OpenAI, Ollama)
  - Configurable DTU Cover Page generation with roll and department credentials
  - Syntax highlighting preserved in OpenXML Word formatting`,
        });
        break;

      case 'dsa':
        soundFX.playRadarPing();
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          content: `ALGORITHMIC TELEMETRY:
  - Total Verified Submissions: 730+ Problems in C++ (Rank #90,004)
  - Core Language:              C++ (STL, Asymptotic Complexity Focus)
  - Core Domains:               Dynamic Programming (1D/2D/3D), Graph Theory,
                                Binary Search, Trees & BSTs, Sliding Window
  - Core Motto:                 "730+ PROBLEMS. HUNDREDS OF EDGE CASES.
                                 ONE CONTINUOUS LEARNING CURVE."
  - Profile:                    https://leetcode.com/u/wRTkNlWd5L`,
        });
        break;

      case 'education':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          content: `ACADEMIC DOSSIER — DELHI TECHNOLOGICAL UNIVERSITY (DTU):
  Degree:           B.Tech in Information Technology (2024 – Present)
  Current CGPA:     8.97 / 10.0
  Semester Breakdown:
    - Semester I:   9.20 SGPA
    - Semester II:  8.80 SGPA
    - Semester III: 9.17 SGPA
    - Semester IV:  8.73 SGPA

ENTRANCE EXAMINATIONS:
  - JEE Main 2024:      AIR 6690, 99.59 percentile
  - JEE Advanced 2024:  AIR 8417

SCHOOL EDUCATION:
  - Class XII (CBSE 2024, Kendriya Vidyalaya Mohali): 96.2%
    * Mathematics: 100/100 | Computer Science: 99/100
  - Class X (CBSE 2022, Manav Mangal Smart School Mohali): 94.6%

COURSEWORK:
  Data Structures & Algorithms, Object-Oriented Design, Operating Systems,
  Relational Database Management Systems, Software Engineering.`,
        });
        break;

      case 'certifications':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          content: `VERIFIED CERTIFICATIONS ARCHIVE:
  1. Supervised Machine Learning: Regression and Classification
     Issuer: Andrew Ng, DeepLearning.AI (Coursera, 2025)
  2. Databases and SQL for Data Science with Python
     Issuer: IBM (Coursera, 2026)
  3. Python, Pandas, Data Visualization
     Issuer: Kaggle Learn (Kaggle, 2025)
  4. Decode C++ with DSA
     Issuer: Physics Wallah (2025 – Present)`,
        });
        break;

      case 'resume':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          content: `AKSHAT JAIN — RESUME QUICK-SHEET:
  Education:    DTU IT (2024-Present), CGPA: 8.97
  Top Ranks:    JEE Main AIR 6690 (99.59 %ile), JEE Adv AIR 8417, XII: 96.2%
  Key Projects: 1. PostgreSQL Lab (797× speedup, 12.87M rows)
                2. IPL Live Win-Probability ML Model
                3. Symbiote (8 stores price comparator)
                4. Code to Word VS Code extension
  LeetCode:     730+ Problems solved in C++ (Rank #90,004)
  Click the [ RESUME ] button in the top navigation or transmission footer to inspect/print.`,
        });
        break;

      case 'contact':
        soundFX.playBootBeep();
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          content: `DIRECT TRANSMISSION CHANNELS:
  Email:        akshat.jain0411@gmail.com
  LinkedIn:     https://www.linkedin.com/in/akshat-jain-7b92a5313/
  GitHub:       https://github.com/Akshat-Jain-sudo
  LeetCode:     https://leetcode.com/u/wRTkNlWd5L (730+ Solved, Rank #90,004)
  Codeforces:   https://codeforces.com/profile/akshat.jain0411 (220+ Solved)
  CodeChef:     https://www.codechef.com/users/writer0411 (180+ Solved)
  GeeksforGeeks:https://www.geeksforgeeks.org/user/akshatjac1tg (150+ Solved)
  CodeStudio:   https://www.naukri.com/code360/profile/7df04252-3450-45b4-bc5b-a992
  HackerRank:   https://www.hackerrank.com/profile/akshat_jain0411
  AtCoder:      https://atcoder.jp/users/Wwriter
  AlgoMaster:   https://algomaster.io/profile/akshat-jain
  Phone:        +91-6284168704 (Optional)
  Location:     New Delhi, India (UTC+5:30 IST)`,
        });
        break;

      case 'ascii':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'ascii',
          content: DEV_ASCII,
        });
        break;

      case 'audio':
        const muted = soundFX.toggleMute();
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          content: `PROCEDURAL AUDIO SYNTHESIZER: ${muted ? 'MUTED' : 'UNMUTED AND ACTIVE'}`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        soundFX.playTypingClick();
        newHistory.push({
          id: `${Date.now()}-err`,
          type: 'error',
          content: `Command not recognized: "${raw}". Type "help" for authorized developer instructions.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const runQuickCommand = (cmd: string) => {
    executeCommand(cmd);
  };

  return (
    <section
      id="terminal"
      className="relative min-h-screen w-full bg-[#050505] py-24 px-4 sm:px-8 border-b border-[#17171C]"
    >
      {/* Background Screentone */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="scanlines absolute inset-0 pointer-events-none z-10" />

      <div className="relative z-20 max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#17171C] pb-8 mb-10 gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs text-[#EFFF00] tracking-wider mb-2">
              <Terminal className="h-4 w-4" />
              <span>// 06. INTERACTIVE CONSOLE: DEVELOPER COMMAND SHELL</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              HACKER <span className="text-[#EFFF00]">TERMINAL</span>
            </h2>
            <p className="mt-2 text-zinc-400 font-sans-tech max-w-xl text-sm sm:text-base">
              Interactive command-line frontend to query Akshat's background, inspect project architectures
              (`postgres`, `ipl`, `symbiote`), check 650+ DSA status, or retrieve verified contact channels.
            </p>
          </div>

          {/* Quick command buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {['whoami', 'skills', 'projects', 'postgres', 'dsa', 'education', 'certifications', 'resume', 'contact'].map((btn) => (
              <button
                key={btn}
                onClick={() => runQuickCommand(btn)}
                className="border border-zinc-700 bg-zinc-900/80 px-2.5 py-1 font-mono-tech text-xs text-[#00E5FF] hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 transition-colors cursor-pointer"
              >
                ${btn}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Window Box */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="border-2 border-zinc-800 bg-[#09090D] shadow-[0_0_40px_rgba(0,0,0,0.9)] overflow-hidden text-left cursor-text"
        >
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-[#0d0d14] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-600/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono-tech text-xs text-zinc-400">
                guest@akshat-dev: ~/dtu-it/manifest
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono-tech text-zinc-500">
              <Shield className="h-3.5 w-3.5 text-[#00E5FF]" />
              <span>DELHI_NODE_ACTIVE</span>
            </div>
          </div>

          {/* Terminal Output Log Area */}
          <div className="p-4 sm:p-6 font-mono-tech text-xs sm:text-sm min-h-[380px] max-h-[520px] overflow-y-auto space-y-3">
            {history.map((line) => (
              <div key={line.id} className="leading-relaxed whitespace-pre-wrap">
                {line.type === 'input' && (
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="text-[#EFFF00]">guest@akshat-dev:~$</span>
                    <span>{line.content}</span>
                  </div>
                )}
                {line.type === 'output' && (
                  <div className="text-zinc-300 pl-4 border-l-2 border-[#00E5FF]/40 text-xs sm:text-sm">
                    {line.content}
                  </div>
                )}
                {line.type === 'system' && (
                  <div className="text-[#00E5FF] text-xs">
                    [SYS] {line.content}
                  </div>
                )}
                {line.type === 'error' && (
                  <div className="text-[#FF2E93] font-bold pl-4 border-l-2 border-[#FF2E93] text-xs">
                    {line.content}
                  </div>
                )}
                {line.type === 'ascii' && (
                  <div className="text-[#EFFF00] font-mono text-[11px] leading-tight select-all">
                    {line.content}
                  </div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Input Prompt Row */}
          <div className="flex items-center gap-2 border-t border-zinc-800 bg-[#0d0d14] px-4 py-3">
            <span className="font-mono-tech text-xs sm:text-sm text-[#EFFF00] font-bold shrink-0">
              guest@akshat-dev:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help', 'whoami', 'skills', 'projects'..."
              className="w-full bg-transparent font-mono-tech text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="text-zinc-500 hover:text-[#EFFF00] cursor-pointer"
            >
              <CornerDownLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
