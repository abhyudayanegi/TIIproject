# 🐾 Cyber Awareness Academy :: In-Browser CTF

```text
  /\_/\   ____________________________________________
 ( o.o ) <  PWN_INIT :: CYBERSECURITY AWARENESS CTF   |
  > ^ <   \___________________________________________/
```

> _"In an era of corporate data harvesting, awareness is your best firewall."_

An educational, **100% in-browser Capture The Flag (CTF)** platform designed from the ground up for complete beginners, students, and everyday internet users.

Unlike traditional platforms like TryHackMe or HackTheBox that require Linux dexterity, OpenVPN profiles, and terminal command wizardry on day one, **Cyber Awareness Academy** eliminates the barrier to entry with a distraction-free **Gruvbox Dark Terminal UI**, interactive **in-app textbook drawers**, and practical puzzles grounded in real-world privacy threats.

---

## 💡 Motivation & Innovation

Most people know their personal data is harvested, but technical gatekeeping makes digital defense feel intimidating.

* **100% In-Browser:** No virtual machines, no Docker containers, and no VPN configurations required.
* **Zero Prerequisites:** Designed specifically for curiosity-driven learners with zero coding background.
* **Built-in Theory Textbooks:** Every single challenge features an expandable left-sliding manual covering the underlying concept, real-world relevance, jargon definitions, browser tools, and offline CLI utilities.
* **Interactive Flag Calibration:** Guided onboarding simulator teaches newcomers flag syntax (`CTF{...}`), case precision, and submission mechanics before entering real arenas.
* **Zero-Config SQLite Backend:** Replaces complex database engines with an embedded, zero-setup SQLite database that automatically seeds on initial boot.
* **Crisp Monospace Terminal Aesthetic:** Styled in a soothing **Gruvbox Dark** color scheme with Fira Code typography and cute ASCII companions.

---

## 🎯 The 4 Cybersecurity Disciplines Covered

| Domain | Status | Questions | Description |
|---|:---:|:---:|---|
| **🔍 OSINT (Open Source Intelligence)** | **Live Arena** | **7 Challenges** | Track public digital footprints, reverse-search images, extract EXIF GPS metadata, and correlate social accounts. |
| **🎨 Steganography** | **Wireframe Beta** | **5 Challenges** | Uncover secret payloads concealed inside innocent images, audio spectrograms, and file padding (LSB, Steghide). |
| **🔐 Cryptography** | **Wireframe Beta** | **6 Challenges** | Decode classical substitution ciphers, analyze multi-layered encodings, study weak PRNG salts, and inspect RSA flaws. |
| **🌐 Web Security** | **Wireframe Beta** | **8 Challenges** | Dissect HTTP requests, inspect DOM elements, manipulate session cookies, and explore basic SQL Injection (`' OR 1=1--`) and XSS. |

---

## 📖 Feature Highlights

### 1. Interactive Sliding Field Manual (Textbook)
Stuck on a challenge? Click **`[📖 Theory]`** to slide open a dedicated field manual right inside the browser:
* **What is it?** Plain-English conceptual breakdown.
* **Why does it matter?** Real-world threat vectors and corporate surveillance tactics.
* **Key Terms & Jargon:** Non-intimidating vocabulary definitions (e.g. EXIF, Dorking, LSB, SQLi).
* **Curated Resources:** Direct links to documentation, articles, and video walkthroughs.
* **Recommended Tools:** Quick browser-based online tools for the CTF, plus offline tools for deep-dive exploration.

### 2. Onboarding & Calibration Drill
Before entering the live domain arenas, users complete a guided 3-step drill to understand:
* Flag format standards (`CTF{...}`).
* Case sensitivity, symbol accuracy, and punctuation precision.
* Real-time verification and auto-fill assistance.

### 3. Terminal Navigation & Browser History
* Seamless navigation with full browser **Back / Forward** pager integration.
* Sticky terminal prompt showing active location: `(=^･ω･^=) guest@cyber-academy:~/dashboard/osint/arena$`.
* Live progress bars and completion statistics with elapsed stopwatch.

---

## 🛠️ Tech Stack

* **Frontend:** React 19, Modern Monospace CSS with Gruvbox custom properties (`--gb-bg`, `--gb-yellow`, `--gb-green`, etc.), Fira Code Nerd Font typography.
* **Backend:** Node.js, Express.js REST API with validation endpoints (`/api/validate`, `/api/validate-single`).
* **Database:** SQLite3 embedded database (`ctf.db`) with automatic table creation and challenge seeding.

---

## 🚀 Quickstart Guide

### 1. Prerequisites
Make sure you have **[Node.js](https://nodejs.org)** (v16 or higher) installed on your system.

### 2. Clone the Repository
```bash
git clone https://github.com/Aweek07/CTF_PROJECT.git
cd CTF_PROJECT/ctf_proj
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Application
Open two terminal windows inside the `ctf_proj` folder:

**Terminal 1 — Backend API & SQLite Database:**
```bash
node server.js
```
> *Server starts on `http://localhost:3001` and automatically provisions the SQLite database (`ctf.db`).*

**Terminal 2 — React Frontend:**
```bash
npm start
```
> *The web app will automatically launch in your browser at `http://localhost:3000`.*

---

## 📁 Project Architecture

```text
CTF_PROJECT/
├── ctf_proj/
│   ├── public/                 # Static assets & photo clues (hint.jpg)
│   ├── src/
│   │   ├── ascii.js            # Cute monospace terminal ASCII art collection
│   │   ├── textbookData.js     # Theory, links, and tooling database
│   │   ├── TextbookPanel.js    # Left-sliding textbook drawer component
│   │   ├── TextbookPanel.css   # Textbook styling & responsive layout
│   │   ├── NavBar.js           # Sticky terminal prompt & navigation bar
│   │   ├── HomePage.js         # Introductory terminal document & manifesto
│   │   ├── Onboarding.js       # Flag syntax calibration drill
│   │   ├── MainPage.js         # Interactive 4-domain dashboard & progress
│   │   ├── DomainPage.js       # Domain mission briefs & toolkits
│   │   ├── Challenges.js       # Live OSINT arena with individual verification
│   │   ├── WireframeChallenges.js # Stego, Crypto, and Web Sec prototypes
│   │   ├── EndPage.js          # Mission completion, stats & takeaway screen
│   │   ├── App.js              # State machine with browser history routing
│   │   ├── App.css             # Terminal styling & challenge cards
│   │   └── index.css           # Gruvbox dark theme palette & base rules
│   ├── server.js               # Express + SQLite3 backend API
│   ├── package.json
│   └── ReadMe.md
└── ReadMe.md
```

---

## 👥 Contributors & Credits

**Course:** Web Technologies  
**Institution:** NMIMS MPSTME — Semester 2 Term-End Project  

* **Abhyudaya Negi** — `K053`
* **Swara Pawde** — `K055`
* **Smit Vartak** — `K075`
* **Sarthak Vikas** — `K077`

---

## 📜 License & Usage

This project is created for educational and cybersecurity awareness purposes. All challenges use synthetic or authorized open-source intelligence clues. Always conduct security investigations ethically and legally.
