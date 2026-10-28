# Cyber Awareness Academy :: In-Browser Anti-Corpo CTF

```text
  /\_/\   ____________________________________________
 ( o.o ) <  PWN_INIT :: LIBERATE DATA FROM EVILCORP   |
  > ^ <   \___________________________________________/
```

> "In an era of corporate surveillance, digital awareness is your best firewall."

An educational, 100% in-browser Capture The Flag (CTF) platform built for curious newcomers, students, and digital citizens.

The entire academy follows an **anti-corpo narrative**: players act as digital rebels infiltrating the surveillance and profiling clusters of a predatory megacorporation (**EvilCorp**). Across all arenas, flags follow the universal format: **`CAT{...}`**.

Unlike traditional platforms like TryHackMe and HackTheBox that require Linux dexterity, OpenVPN profiles, and terminal command wizardry on day one, **Cyber Awareness Academy** eliminates the barrier to entry with a distraction-free **Gruvbox Dark Terminal UI**, interactive **in-app textbook field manuals**, and practical puzzles grounded in real-world corporate data harvesting tactics.

---

## The Anti-Corpo Mission

Big tech monopolies like EvilCorp thrive when people do not understand how their data is tracked. When everyday users cannot deconstruct fake "encryption" marketing, EXIF photo metadata, or cookie manipulation, corporate brokers harvest private behavioral habits with zero resistance.

Here is how we flip that:

* **100% In-Browser:** No virtual machines, no Docker containers, and no VPN profiles. Open the link and start playing immediately.
* **Standard Flag Prefix (`CAT{...}`):** Every flag follows the feline rebel format `CAT{secret_payload}`.
* **Built For Non-Coders:** Designed from scratch for students and beginners who have never touched a terminal or written a line of Python.
* **Zero Local Tool Downloads:** Every single challenge is solvable directly in-browser using free web tools (such as CyberChef, CrackStation, and online inspectors). Questions with recommended online tools are tagged with `[⚡ Online Tool]`.
* **In-App Theory Textbooks:** Every question features a slide-out field manual explaining the concept in plain English, why it matters against corporate surveillance, jargon busters, and direct links to web tools.
* **Flag Calibration Tutorial:** A guided 3-step sandbox that teaches you what a `CAT{...}` flag is, how syntax validation works, and why exact casing matters before entering live arenas.
* **Zero-Config Embedded Database:** Powered by SQLite3 (`ctf.db`). It automatically provisions tables and seeds question data on boot. No local database installation, no credentials, no headache.
* **Gruvbox Terminal Aesthetic:** A soothing, retro terminal look using Gruvbox Dark tones and Fira Code monospace typography, complete with friendly ASCII companions.

---

## Curriculum: 7 Challenges per Domain

Every CTF domain features **exactly 7 questions** organized into two distinct phases:
1. **Questions 1 & 2 (Warm-Up Drills):** Standalone introductory puzzles teaching core mechanics.
2. **Dotted Chain Divider:** Marks the transition into connected operations.
3. **Questions 3 to 7 (5-Stage Linked Cascade):** An unbroken chain where the key, offset, or hash cracked in each challenge directly unlocks the next stage!

| Discipline | Status | Challenges | Anti-Corpo Mission Objective |
|---|:---:|:---:|---|
| **OSINT (Open Source Intelligence)** | Live Arena | 7 Challenges | Track public internet footprints, reverse-search clues, extract GPS coordinates from metadata, and correlate scattered social accounts. |
| **Cryptography** | Live Arena | 7 Challenges | Infiltrate EvilCorp's surveillance servers. Decode compliance memos (ROT13), bust fake telemetry (Base64), parse hex dumps, crack Vigenère boardroom dispatches, and neutralize their master kill-switch payload (XOR + Base64). |
| **Steganography** | 7 Challenges | 7 Challenges | Uncover hidden corporate payloads concealed inside metadata headers, trailing byte appends, LSB pixel modifications, color planes, and audio spectrograms. |
| **Web Security** | 7 Challenges | 7 Challenges | Exploit web infrastructure flaws: inspect DOM forms, tamper with session cookies, exploit IDOR, traverse directories, bypass logins with SQL injection, and analyze reflected XSS. |

---

## Feature Highlights

### 1. The Slide-Out Field Manual (Textbook)
Instead of throwing you into Google to get lost in StackOverflow threads, every challenge includes a `[Theory]` button that slides out a comprehensive textbook drawer right on the page:
* **What is it?** A plain-English explanation with zero gatekeeping.
* **Why does it matter?** How real-world surveillance companies and threat actors exploit this vector.
* **Jargon Buster:** Straightforward definitions for scary-sounding terms (EXIF, Dorking, LSB, SQLi, IDOR).
* **Curated Links:** Hand-picked articles and tutorials if you want to read further.
* **Recommended Toolkit:** Instant browser tools to solve the challenge, plus installable offline tools for power users.

### 2. Guided Flag Calibration
Before entering live arenas, an interactive 3-step tutorial walks newcomers through:
* What a flag looks like (`CAT{secret_string}`).
* Exact matching rules (casing, underscores, punctuation).
* Real-time verification with hint toggles and auto-fill buttons.

### 3. Full Terminal Navigation
* Clean prompt reflecting your active location: `guest@cyber-academy:~/dashboard/crypto/arena$`.
* Native browser history integration: forward and back buttons work everywhere.
* Live challenge scoreboard and an elapsed mission stopwatch.

---

## Tech Stack

* **Frontend:** React 19, Gruvbox Dark CSS variables, Fira Code monospace typography.
* **Backend:** Node.js, Express REST API with individual and batch validation endpoints (`/api/validate`, `/api/validate-single`).
* **Database:** SQLite3 (`ctf.db`), embedded with zero configuration and automated self-seeding.

---

## Quickstart Guide

### 1. Prerequisites
Install [Node.js](https://nodejs.org) (version 16 or newer).

### 2. Clone the Repository
```bash
git clone https://github.com/Aweek07/CTF_PROJECT.git
cd CTF_PROJECT/ctf_proj
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Fire Up The Project
Open two terminals inside the `ctf_proj` folder:

**Terminal 1 — Backend & SQLite Database:**
```bash
node server.js
```
> Boots on `http://localhost:3001` and automatically initializes `ctf.db` with all `CAT{...}` answers.

**Terminal 2 — React Frontend:**
```bash
npm start
```
> Opens automatically in your default browser at `http://localhost:3000`.

---

## Project Architecture

```text
CTF_PROJECT/
|-- ctf_proj/
|   |-- public/                 # Static assets & downloadable challenge intercepts
|   |   |-- hint.jpg            # OSINT challenge photo clue
|   |   |-- crypto_raw_transmission.hex       # Crypto Q3 raw hex packet
|   |   |-- crypto_intercepted_dispatch.txt   # Crypto Q4 Vigenère dispatch
|   |   `-- crypto_master_payload.enc         # Crypto Q7 master payload
|   |-- src/
|   |   |-- ascii.js            # Monospace terminal ASCII art collection
|   |   |-- textbookData.js     # Comprehensive theory & online tool manual
|   |   |-- TextbookPanel.js    # Left-sliding textbook drawer component
|   |   |-- TextbookPanel.css   # Drawer styling and layout
|   |   |-- NavBar.js           # Terminal prompt navigation bar
|   |   |-- HomePage.js         # Academy manifesto and intro document
|   |   |-- Onboarding.js       # Flag calibration tutorial (CAT{...})
|   |   |-- MainPage.js         # 4-domain dashboard with progress bars
|   |   |-- DomainPage.js       # Domain mission briefs and toolkits
|   |   |-- Challenges.js       # Live OSINT arena (7 challenges + chain divider)
|   |   |-- CryptoChallenges.js # Live Crypto arena (7 anti-corpo challenges + chain divider)
|   |   |-- WireframeChallenges.js # Stego and Web Sec arenas (7 challenges each)
|   |   |-- EndPage.js          # Mission completion, stats, and takeaways
|   |   |-- App.js              # State machine and browser history router
|   |   |-- App.css             # Terminal layout, chain divider, and cards
|   |   `-- index.css           # Gruvbox palette and typography rules
|   |-- server.js               # Express + SQLite3 backend API
|   |-- package.json
|   `-- ReadMe.md
`-- ReadMe.md
```

---

## Team & Credits

* **Course:** Web Technologies
* **Institution:** NMIMS MPSTME — Semester 2 Term-End Project

**Authors:**
* Abhyudaya Negi — K053
* Swara Pawde — K055
* Smit Vartak — K075
* Sarthak Vikas — K077

---

## Legal & Ethics Notice

This project was built strictly for education, digital literacy, and personal security awareness. All challenge targets, accounts, and clues are synthetic or authorized public puzzles. Always investigate responsibly, respect privacy, and stay within legal boundaries.
