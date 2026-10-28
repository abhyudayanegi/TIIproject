# Cyber Awareness Academy :: In-Browser CTF

```text
  /\_/\   ____________________________________________
 ( o.o ) <  PWN_INIT :: CYBERSECURITY AWARENESS CTF   |
  > ^ <   \___________________________________________/
```

> "In an era of corporate surveillance, digital awareness is your best firewall."

An educational, 100% in-browser Capture The Flag (CTF) platform built for curious newcomers, students, and everyday internet users.

Most cybersecurity resources assume you were born with a Linux terminal in your hands and a copy of Kali Linux under your pillow. Platforms like TryHackMe and HackTheBox are great, but on day one they hit you with OpenVPN config files, command-line jargon, and virtual machine setups.

Cyber Awareness Academy takes the opposite approach: **zero prerequisites, zero downloads, zero setup friction**. Everything runs directly in your browser with a clean Gruvbox Dark terminal interface, interactive textbook guides, and realistic puzzles based on actual digital footprints.

---

## The Big Idea: Why This Exists

Big tech platforms thrive when people don't understand how their data moves. When everyday users don't know how tracking cookies, EXIF photo metadata, or public account correlations work, it becomes trivial to harvest their behavioral habits quietly.

Most people genuinely want to protect their digital privacy, but the resources to learn how are gatekept behind impenetrable jargon and elitist forums.

Here is how we flip that:

* **100% In-Browser:** No virtual machines, no Docker containers, and no VPN profiles. Open the link and start playing immediately.
* **Built For Non-Coders:** Designed from scratch for students and curious citizens who have never touched a terminal or written a line of Python.
* **In-App Theory Textbooks:** Stuck on a concept? Every single question has a slide-out field manual explaining what it is in plain English, why it matters in real life, key vocabulary, and direct links to free tools.
* **Flag Calibration Tutorial:** A gentle 3-step sandbox that teaches you what a flag (`CTF{...}`) is, how syntax validation works, and why casing matters before you enter real arenas.
* **Zero-Config Embedded Database:** Powered by SQLite3. It automatically provisions tables and seeds question data on boot. No local database installation, no credentials, no headache.
* **Gruvbox Terminal Aesthetic:** A soothing, distraction-free retro terminal look using Gruvbox Dark tones and Fira Code monospace typography, complete with friendly ASCII mascots.

---

## Curriculum: The 4 Domains

| Discipline | Status | Challenges | What You Actually Learn |
|---|:---:|:---:|---|
| **OSINT (Open Source Intelligence)** | Live Arena | 7 Challenges | Track public internet footprints, reverse-search images, extract GPS coordinates from EXIF metadata, and correlate scattered social profiles. |
| **Steganography** | Wireframe Beta | 5 Challenges | Discover how secret payloads hide in plain sight inside innocent pictures, audio spectrograms, and file padding without changing how they look. |
| **Cryptography** | Wireframe Beta | 6 Challenges | Break through classical substitution ciphers, decode multi-layer base encodings, exploit predictable pseudo-random seeds, and inspect RSA math flaws. |
| **Web Security** | Wireframe Beta | 8 Challenges | Dissect browser inspector tabs, manipulate session cookies, and exploit fundamental flaws like basic SQL Injection (' OR 1=1--) and cross-site scripting. |

---

## Key Features

### 1. The Slide-Out Field Manual (Textbook)
Instead of throwing you into Google to get lost in StackOverflow threads, every challenge includes a `[Theory]` button that slides out a comprehensive textbook drawer right on the page:
* **What is it?** A plain-English explanation with zero gatekeeping.
* **Why does it matter?** How real-world surveillance companies and threat actors exploit this vector.
* **Jargon Buster:** Straightforward definitions for scary-sounding terms (EXIF, Dorking, LSB, SQLi, IDOR).
* **Curated Links:** Hand-picked articles and tutorials if you want to read further.
* **Recommended Toolkit:** Instant browser tools to solve the challenge, plus installable offline tools for power users.

### 2. Guided Flag Calibration
Before you tackle real challenges, an interactive 3-step tutorial walks you through:
* What a flag looks like (`CTF{secret_string}`).
* Exact matching rules (casing, underscores, punctuation).
* Real-time verification with hint toggles and auto-fill buttons.

### 3. Full Terminal Navigation
* Clean prompt reflecting your active location: `guest@cyber-academy:~/dashboard/osint/arena$`.
* Native browser history integration: forward and back buttons work everywhere.
* Live challenge scoreboard and an elapsed mission stopwatch.

---

## Tech Stack

* **Frontend:** React 19, Gruvbox Dark CSS variables, Fira Code monospace typography.
* **Backend:** Node.js, Express REST API with individual and batch validation endpoints.
* **Database:** SQLite3 (`ctf.db`), embedded with zero configuration and automated self-seeding.

---

## Quickstart Guide

### 1. Prerequisites
Install [Node.js](https://nodejs.org) (version 16 or newer).

### 2. Clone the Repository
```bash
git clone https://github.com/abhyudayanegi/TIIproject.git
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
> Boots on `http://localhost:3001` and automatically initializes `ctf.db`.

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
|   |-- public/                 # Static assets and challenge clues (hint.jpg)
|   |-- src/
|   |   |-- ascii.js            # Monospace terminal ASCII art collection
|   |   |-- textbookData.js     # Theory, links, and tool database for all challenges
|   |   |-- TextbookPanel.js    # Left-sliding textbook drawer component
|   |   |-- TextbookPanel.css   # Drawer styling and layout
|   |   |-- NavBar.js           # Terminal prompt navigation bar
|   |   |-- HomePage.js         # Academy manifesto and intro document
|   |   |-- Onboarding.js       # Flag calibration tutorial
|   |   |-- MainPage.js         # 4-domain dashboard with progress bars
|   |   |-- DomainPage.js       # Domain mission briefs and toolkits
|   |   |-- Challenges.js       # Live OSINT arena with single-submit checks
|   |   |-- WireframeChallenges.js # Stego, Crypto, and Web Sec prototypes
|   |   |-- EndPage.js          # Mission completion, stats, and takeaways
|   |   |-- App.js              # State machine and browser history router
|   |   |-- App.css             # Terminal layout and challenge cards
|   |   `-- index.css           # Gruvbox palette and typography rules
|   |-- server.js               # Express + SQLite3 backend API
|   |-- package.json
|   `-- ReadMe.md
`-- ReadMe.md
```

---

## Team & Credits

* **Course:** Turning Ideas Into Innovations
* **Institution:** NMIMS MPSTME - Sem III Project

**Authors:**
* Abhyudaya Negi — K053
* Swara Pawde — K055
* Smit Vartak — K075
* Sarthak Vikas — K077

---

## Legal & Ethics Notice

This project was built strictly for education, digital literacy, and personal security awareness. All challenge targets, accounts, and clues are synthetic or authorized public puzzles. Always investigate responsibly, respect privacy, and stay within legal boundaries.
