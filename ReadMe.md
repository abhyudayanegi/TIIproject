# Cyber Awareness Academy :: In-Browser Anti-Corpo CTF

```text
  /\_/\   ____________________________________________
 ( o.o ) <  PWN_INIT :: LIBERATE DATA FROM EVILCORP   |
  > ^ <   \___________________________________________/
```

> *"In an era of corporate surveillance, digital awareness is your best firewall."*

**Cyber Awareness Academy** is an educational, 100% in-browser Capture The Flag (CTF) platform built for curious newcomers, students, and everyday digital citizens.

The entire platform is built around an **anti-corpo narrative**: players act as digital investigators infiltrating the surveillance networks, deceptive interfaces, and profiling infrastructure of a predatory megacorporation (**EvilCorp**). Across all arenas, flags follow our universal format: **`CAT{...}`**.

Unlike traditional platforms like TryHackMe or HackTheBox that require virtual machines, OpenVPN profiles, and advanced terminal wizardry on day one, **Cyber Awareness Academy** removes the barriers to entry with a distraction-free **Gruvbox Dark Terminal UI**, interactive **slide-out field manuals**, and hands-on puzzles grounded in real-world corporate tracking tactics.

---

## Key Features

* **100% In-Browser Gameplay:** No virtual machines, no Docker containers, and no VPN profiles. Launch the link and start investigating immediately.
* **Standardized Flag Format (`CAT{...}`):** Every challenge uses the consistent feline rebel format `CAT{secret_flag}`, supported by an intelligent normalizer that forgives whitespace and capitalization variations.
* **The 2+5 Linked Cascade Model:** Every domain features 7 questions. The first two are accessible standalone warm-ups, separated by a dotted divider from a 5-stage linked chain where each discovered secret or cracked key directly unlocks the next challenge.
* **Zero Local Tool Downloads:** Every single puzzle can be solved directly in your browser using free, trusted online utilities (CyberChef, Photopea, HexEd.it, CrackStation, Google Lens, and Academo). Questions requiring external tools are badged with `[⚡ Online Tool]`.
* **Interactive Slide-Out Field Manual (`[Theory]`):** Every challenge includes an in-app textbook chapter written in plain English, featuring real-world corporate breach case studies, everyday analogies for non-technical users, step-by-step tool recipes, and jargon busters.
* **Guided Flag Calibration Sandbox:** An interactive 3-step tutorial that teaches beginners how CTF flags work, how syntax validation behaves, and why casing matters before they step into active arenas.
* **Live State & Real-Time Progress Bars:** The main dashboard features dynamic domain cards and animated progress bars (`Solved: X/7`) that update instantaneously as flags are submitted.
* **Zero-Config Embedded SQLite3 Backend:** Powered by an embedded SQLite3 database (`ctf.db`) that automatically provisions schemas and seeds all 28 challenge answers on startup.
* **Distraction-Free Gruvbox Aesthetic:** Built with the retro Gruvbox Dark color palette, Fira Code monospace typography, terminal prompt breadcrumbs, and ASCII feline companions.

---

## Curriculum: 4 Domains, 28 Challenges

Every discipline contains **exactly 7 questions** organized into two distinct phases:
1. **Questions 1 & 2 (Warm-Up Drills):** Standalone introductory puzzles designed to build early momentum and confidence.
2. **Dotted Chain Divider:** Marks the shift from warm-ups into connected investigative operations.
3. **Questions 3 to 7 (5-Stage Linked Cascade):** A progressive story arc where each answer, decryption key, or shift offset is required to solve the subsequent challenge.

```text
 [Q1 & Q2: Warm-Ups] ---> [Dotted Divider] ---> [Q3: Discovery] ---> [Q4: Decrypt] ---> [Q5: Pivot] ---> [Q6: Crack] ---> [Q7: Master Flag]
```

| Discipline | Status | Challenge Count | Mission Narrative & Core Vector |
|---|:---:|:---:|---|
| **OSINT (Open Source Intelligence)** | Live Arena | 7 Challenges | Track digital footprints across public registries, reverse-search landmarks with Google Lens, analyze Instagram location tags, uncover username correlation on YouTube, and cross-reference public municipal records. |
| **Steganography** | Live Arena | 7 Challenges | Intercept leaked insider files from `/public/steg/`. Uncover white-on-white text in DOCX terms of service, extract hidden EXIF metadata, boost near-black pixel levels in Photopea, extract Steghide payloads, inspect trailing JPEG bytes in HexEd.it, and read audio spectrograms in Academo. |
| **Cryptography (Operation Blackbox)** | Live Arena | 7 Challenges | Expose EvilCorp's fake security claims. Reverse ROT13 compliance memos, decode Base64 app telemetry, parse raw hex telemetry, decipher Vigenère boardroom dispatches, calculate Caesar shifts, crack unsalted MD5 hashes on CrackStation, and neutralize repeating-key XOR surveillance payloads. |
| **Web Security** | Interactive Arena | 7 Challenges | Understand client-server web flaws. Inspect hidden DOM comments, analyze HTTP request verbs, re-enable disabled interface buttons in DevTools, hijack session cookies (`role=admin`), exploit IDOR parameters, traverse directory paths, and bypass authentication with SQL injection (`' OR 1=1 --`). |

---

## Challenge Progression Deep Dive

### 1. Open Source Intelligence (OSINT)
* **Q1: Coordinates (Warm-Up 1):** Map GPS latitude and longitude (`48.8584, 2.2945`) to identify the Eiffel Tower.
* **Q2: Who Owns This IP? (Warm-Up 2):** Query WHOIS and DNS records for `8.8.8.8` to identify Google Public DNS.
* *--- Dotted Line Divider ---*
* **Q3: Target Profile (Chain 1):** Locate the target persona's Instagram account and identify their favored sport (Football).
* **Q4: Pattern of Life (Chain 2):** Analyze recurring geotags across account posts to pinpoint Churchgate as their primary hub.
* **Q5: The Start (Chain 3):** Reverse-image search the earliest untagged photo using Google Lens to identify the Beatles Ashram in Rishikesh.
* **Q6: The Connection (Chain 4):** Correlate the Instagram handle to an associated YouTube community post to extract their real first name (Abhyudaya).
* **Q7: The Final Clue (Chain 5):** Match their latest location against Google Maps municipal records to determine local library operating hours (`9:30-19:00`).

### 2. Steganography
* **Q1: Evil Terms of Service (Warm-Up 1):** Highlight white-on-white text buried at the end of `q1_terms_of_service.docx`.
* **Q2: Evil Mug (Warm-Up 2):** Read the hidden operator notes inside the EXIF Comments header of `q2_evil_mug.jpg`.
* *--- Dotted Line Divider ---*
* **Q3: BLACKBOOK (Chain 1):** Adjust levels and brightness in Photopea to illuminate near-black text within `q3_blackbook.png`.
* **Q4: Gimmick Boss (Chain 2):** Use the password found in metadata to extract an embedded Steghide payload and decode 8-bit ASCII binary.
* **Q5: EvilChair (Chain 3):** Open `q5_evil_chair.jpg` in HexEd.it to find secret text appended after the JPEG End-of-Image delimiter (`FF D9`).
* **Q6: Memory Wipe (Chain 4):** Load `q6_memory_wipe.wav` into an audio spectrogram viewer to visualize text rendered across high sound frequencies.
* **Q7: tryfindme (Chain 5):** Brighten the image to recover a hidden PIN, extract the Steghide archive, and decode the final Base64 string.

### 3. Cryptography (Operation Blackbox)
* **Q1: The Leaked Executive Memo (Warm-Up 1):** Rotate a 13-letter Caesar shift (ROT13) in CyberChef to expose EvilCorp's privacy memo.
* **Q2: The Fake Telemetry "Encryption" (Warm-Up 2):** Decode a Base64 string ending in `==` to prove that encoding is not encryption.
* *--- Dotted Line Divider ---*
* **Q3: The Whistleblower's Hex Packet (Chain 1):** Convert raw hex bytes into plain text to recover the passphrase `SHADOWCORP`.
* **Q4: The Encrypted Boardroom Dispatch (Chain 2):** Decrypt a Vigenère cipher using `SHADOWCORP` to discover the Caesar shift value (`7`).
* **Q5: Unlocking the Shadow Vault (Chain 3):** Shift ciphertext backward by 7 positions to identify the target vault codename (`cerberus`).
* **Q6: Cracking the CISO's Password Hash (Chain 4):** Search an unsalted MD5 hash against CrackStation's rainbow tables to recover `cerberus123`.
* **Q7: Neutralizing the Surveillance Master Payload (Chain 5):** Construct a multi-stage CyberChef recipe (`From Base64` + `XOR` with key `cerberus123`) to unlock the master flag.

### 4. Web Security Curriculum
* **Q1: HTML Source Inspection (Warm-Up 1):** Inspect browser page source comments to locate leaked developer credentials.
* **Q2: HTTP Request Verbs (Warm-Up 2):** Understand the difference between `GET` and state-changing `POST`/`PUT` requests.
* *--- Dotted Line Divider ---*
* **Q3: Client-Side Bypass (Chain 1):** Use browser Developer Tools to delete `disabled` attributes on submit buttons.
* **Q4: Cookie Privilege Escalation (Chain 2):** Tamper with session cookies, modifying `role=user` to `role=admin`.
* **Q5: Insecure Direct Object References (IDOR) (Chain 3):** Change numeric URL query parameters (`?user_id=1001` to `1000`) to view unowned records.
* **Q6: Directory Path Traversal (Chain 4):** Exploit relative file paths (`../../etc/passwd`) to escape web roots.
* **Q7: SQL Injection (Chain 5):** Inject SQL syntax (`' OR 1=1 --`) into login parameters to bypass authentication.

---

## Tech Stack & Architecture

* **Frontend:** React 19, CSS3 Custom Properties (Gruvbox Dark theme), Fira Code monospace fonts, HTML5 History API.
* **Backend:** Node.js HTTP server (`server.js`) providing JSON REST endpoints:
  * `POST /api/validate-single` — Validates individual flags in real time with SQLite and alias fallbacks.
  * `POST /api/validate` — Validates batch submissions for entire domains.
* **Database:** SQLite3 (`ctf.db`), automatically provisions the schema and populates all domain answers upon launch.
* **Static Assets:** Downloadable steganography and cryptography intercepts served via `/public/steg/` and `/public/`.

```text
TIIproject/
|-- public/
|   |-- steg/                          # Steganography challenge downloadables
|   |   |-- q1_terms_of_service.docx   # Q1 white text challenge
|   |   |-- q2_evil_mug.jpg            # Q2 EXIF metadata photo
|   |   |-- q3_blackbook.png           # Q3 low-contrast PNG
|   |   |-- q4_gimmick_boss.jpg        # Q4 Steghide + binary payload
|   |   |-- q5_evil_chair.jpg          # Q5 trailing byte append
|   |   |-- q6_memory_wipe.wav         # Q6 audio spectrogram WAV
|   |   `-- q7_tryfindme.jpg           # Q7 multi-layer stego puzzle
|   |-- hint.jpg                       # OSINT landmark clue
|   |-- crypto_raw_transmission.hex    # Crypto Q3 hex dump
|   |-- crypto_intercepted_dispatch.txt# Crypto Q4 Vigenère text
|   `-- crypto_master_payload.enc      # Crypto Q7 XOR payload
|-- src/
|   |-- App.js                         # Application router, history sync & state machine
|   |-- App.css                        # Gruvbox styling, terminal cards & chain divider
|   |-- ascii.js                       # ASCII art banners and mascots
|   |-- Challenges.js                  # Live OSINT arena (7 challenges)
|   |-- CryptoChallenges.js            # Live Cryptography arena (7 challenges)
|   |-- StegChallenges.js              # Live Steganography arena (7 challenges)
|   |-- WireframeChallenges.js         # Web Security curriculum arena (7 challenges)
|   |-- DomainPage.js                  # Domain briefing dossiers and threat profiles
|   |-- EndPage.js                     # Score debrief, stopwatch summary, and takeaways
|   |-- HomePage.js                    # Landing page and Anti-Corpo manifesto
|   |-- MainPage.js                    # Domain dashboard with live progress bars
|   |-- NavBar.js                      # Terminal path breadcrumb navigation bar
|   |-- Onboarding.js                  # Flag calibration 3-step sandbox
|   |-- textbookData.js                # 28 theory chapters, breach studies & tool guides
|   `-- TextbookPanel.js               # Slide-out textbook drawer component
|-- ctf.db                             # Auto-seeded SQLite3 database
|-- server.js                          # Backend API & answer verification engine
|-- package.json                       # Project configuration and scripts
`-- ReadMe.md                          # Project documentation
```

---

## Quickstart Guide

### 1. Prerequisites
Install [Node.js](https://nodejs.org) (v16 or higher).

### 2. Clone the Repository
```bash
git clone https://github.com/abhyudayanegi/TIIproject.git
cd TIIproject
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Application
Open two terminal windows in the project directory:

**Terminal 1 — Backend API & SQLite Engine:**
```bash
node server.js
```
*Boots on `http://localhost:3001` and automatically initializes `ctf.db` with all domain flags.*

**Terminal 2 — React Terminal Frontend:**
```bash
npm start
```
*Compiles the frontend and opens `http://localhost:3000` in your default browser.*

---

## Academic Context & Team Credits

* **Course:** Transforming Ideas into Innovation (TII)
* **Semester:** III
* **Program:** B.Tech Computer Science and Engineering (Cybersecurity)
* **Institution:** Mukesh Patel School of Technology Management & Engineering (MPSTME), NMIMS Mumbai
* **Faculty Mentor:** Dr. Abhinaba Gupta

### Project Team
* **Abhyudaya Negi** (Roll No. K053) — OSINT Design & Threat Research
* **Swara Pawde** (Roll No. K055) — UI/UX Design & Theory Content
* **Smit Vartak** (Roll No. K075 / SAP ID: 70102500066) — Full-Stack Development, Cryptography & Steganography
* **Sarthak Vikas** (Roll No. K077) — Database Architecture & Platform Testing

---

## Recommended Free Online Toolkit

All challenges are 100% solvable without downloading local tools by using these free web utilities:
* **CyberChef** ([gchq.github.io/CyberChef](https://gchq.github.io/CyberChef/)) — For ROT13, Base64, Hex, Vigenère, and XOR recipes.
* **Photopea** ([photopea.com](https://www.photopea.com/)) — In-browser image editor for brightness/level curves.
* **HexEd.it** ([hexed.it](https://hexed.it/)) — In-browser hex editor for inspecting file magic bytes and appended data.
* **CrackStation** ([crackstation.net](https://crackstation.net/)) — Instant rainbow table lookup for unsalted MD5 hashes.
* **Academo Spectrogram** ([academo.org](https://academo.org/demos/spectrum-analyzer/)) — Audio frequency visualizer.
* **Google Lens** ([lens.google](https://lens.google/)) — Visual landmark and building identification.

---

## Legal & Educational Disclaimer

This project is created solely for educational purposes, digital literacy, and personal cybersecurity awareness. All investigation targets, accounts, and puzzles are synthetic or authorized public exercises. Always practice ethical security research and respect user privacy.
