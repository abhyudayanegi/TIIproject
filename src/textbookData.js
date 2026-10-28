// =====================================================================
//  COMPREHENSIVE TEXTBOOK DATABASE :: ANTI-CORPO EDITION
//  7 questions per domain (OSINT, Crypto, Stegano, Web Sec).
//  Standard Flag Prefix: CAT{...}
//  Features plain-English concepts, real-world corporate surveillance context,
//  jargon busters, and highlighted free online tools.
// =====================================================================

export const TEXTBOOK = {
  OSINT: {
    1: {
      topic: 'Geolocation Intelligence (GeoINT)',
      whatIsIt: 'Geolocation Intelligence is the discipline of pinpointing the physical, real-world location where a photo, video, or post originated. Instead of magical satellite tracking, analysts look for subtle environmental clues: street signs, architectural styles, store logos, reflections in windows, license plate patterns, and sun shadows.',
      whyItMatters: 'Every day people post casual photos online without realizing they are broadcasting their exact location. Stalkers, corporate data aggregators, and threat actors use GeoINT to track personal routines, discover homes, and map physical locations.',
      keyTerms: [
        { term: 'GeoINT', meaning: 'Geospatial Intelligence — extracting location clues from visual and public assets.' },
        { term: 'Landmark Pivoting', meaning: 'Using a visible business name or distinct structure to narrow coordinates on maps.' },
        { term: 'Reverse Image Search', meaning: 'Submitting a cropped portion of an image to find matching web pages.' }
      ],
      links: [
        { label: 'Bellingcat Guide to Image Geolocation', url: 'https://www.bellingcat.com/resources/how-tos/2019/07/09/buy-the-ticket-take-the-ride-a-beginners-guide-to-geolocation/', note: 'Step-by-step primer by investigative journalists' },
        { label: 'Geoguessr Visual Recognition Guide', url: 'https://www.geoguessr.com', note: 'Techniques for recognizing regions by subtle visual cues' }
      ],
      onlineTools: [
        { name: 'Google Lens', url: 'https://images.google.com', note: 'Crop store signs, menus, and landmarks to find origins' },
        { name: 'Google Maps & Street View', url: 'https://maps.google.com', note: 'Confirm angles, building heights, and street names' },
        { name: 'Overpass Turbo (OpenStreetMap)', url: 'https://overpass-turbo.eu', note: 'Query locations by combining features (e.g. restaurant near a fountain)' }
      ],
      offlineTools: [
        { name: 'Google Earth Pro', url: 'https://www.google.com/earth/about/versions/', note: '3D satellite imagery with historical timeline views' },
        { name: 'SunCalc', url: 'https://www.suncalc.org', note: 'Calculate sun angle and shadow direction for timestamp verification' }
      ]
    },
    2: {
      topic: 'Image EXIF Metadata & Geotags',
      whatIsIt: 'When smartphones and digital cameras capture an image, they do not just record pixel colors. They silently bake a dossier of hidden technical data inside the file header called EXIF (Exchangeable Image File Format). This often includes the camera make, serial number, lens settings, exact timestamp, and GPS coordinates down to a few meters.',
      whyItMatters: 'If you upload an unscrubbed photo to an online forum or email it, anyone who downloads the original file can extract your exact latitude and longitude with a single click.',
      keyTerms: [
        { term: 'EXIF', meaning: 'Exchangeable Image File Format — metadata embedded in JPEG, TIFF, and HEIC files.' },
        { term: 'Geotag', meaning: 'GPS coordinates (latitude/longitude/altitude) embedded in media files.' },
        { term: 'Metadata Scrubbing', meaning: 'Stripping hidden EXIF tags before publishing images online.' }
      ],
      links: [
        { label: 'EFF Guide: What Is Metadata?', url: 'https://www.eff.org/pages/what-metadata', note: 'Explains why metadata is often more revealing than content' },
        { label: 'ExifTool Tag Reference Documentation', url: 'https://exiftool.org/TagNames/EXIF.html', note: 'Comprehensive index of all camera metadata tags' }
      ],
      onlineTools: [
        { name: 'Jeffrey’s Image Metadata Viewer', url: 'http://exif.regex.info/exif.cgi', note: 'Classic online EXIF decoder showing GPS maps' },
        { name: 'Jimpl EXIF Viewer', url: 'https://jimpl.com', note: 'Fast in-browser EXIF and geotag reader' },
        { name: 'ExifMeta Online', url: 'https://exifmeta.com', note: 'Instant metadata analyzer with no upload retention' }
      ],
      offlineTools: [
        { name: 'ExifTool by Phil Harvey', url: 'https://exiftool.org', note: 'The gold-standard command-line metadata reader and editor' }
      ]
    },
    3: {
      topic: 'Avatar & Profile Reconnaissance',
      whatIsIt: 'People are creatures of habit. When someone picks a distinct avatar, cat picture, or digital pseudonym, they rarely use it for just one platform. Avatar reconnaissance involves reverse-searching profile graphics across developer repos, gaming portals, and social networks to connect disparate identities.',
      whyItMatters: 'An anonymous developer account can easily be unmasked if the avatar was previously used on a personal blog or school portal, shattering anonymity.',
      keyTerms: [
        { term: 'Avatar Pivoting', meaning: 'Using an avatar image to hunt for related accounts across the web.' },
        { term: 'Gravatar', meaning: 'Globally Recognized Avatar service that connects email hashes to avatars.' }
      ],
      links: [
        { label: 'OSINT Framework Guide', url: 'https://osintframework.com', note: 'Directory of open-source intelligence tools categorized by asset type' },
        { label: 'Bellingcat: Tracking Avatars and Usernames', url: 'https://www.bellingcat.com', note: 'Methods for correlating anonymous online accounts' }
      ],
      onlineTools: [
        { name: 'WhatsMyName.app', url: 'https://whatsmyname.app', note: 'Check username existence across 500+ social platforms' },
        { name: 'TinEye Reverse Image Search', url: 'https://tineye.com', note: 'Specialized in finding identical and cropped web avatars' },
        { name: 'Google Lens', url: 'https://images.google.com', note: 'Broad AI image matching across social platforms' }
      ],
      offlineTools: [
        { name: 'Sherlock (Python CLI)', url: 'https://github.com/sherlock-project/sherlock', note: 'Hunt social accounts by username across 300+ networks' }
      ]
    },
    4: {
      topic: 'Public Code Repositories & Git Forensics',
      whatIsIt: 'Version control systems like Git track every change made to code. Whenever someone commits code, Git records the commit author name and email address in plain text. Even if a user sets their GitHub account email to private, older commits, GPG key signatures, or patch URLs frequently expose their real personal address.',
      whyItMatters: 'Developers accidentally leak passwords, database API keys, and personal contact info into public repositories every hour. Automated bots scrape GitHub within seconds to harvest exposed credentials.',
      keyTerms: [
        { term: 'Commit Metadata', meaning: 'The author name, email, and timestamp stamped into each Git commit object.' },
        { term: 'Patch Endpoint (.patch)', meaning: 'Appending .patch to a GitHub commit URL shows raw diff headers with emails.' }
      ],
      links: [
        { label: 'GitHub Docs: Commit Email Addresses', url: 'https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address', note: 'Official guide on how GitHub emails leak and how to hide them' }
      ],
      onlineTools: [
        { name: 'GitHub Search & Commit Dorks', url: 'https://github.com/search', note: 'Search repositories using author:, extension:, and keyword filters' },
        { name: 'Wayback Machine (Archive.org)', url: 'https://archive.org/web/', note: 'View past versions of deleted repositories and profile pages' }
      ],
      offlineTools: [
        { name: 'TruffleHog', url: 'https://github.com/trufflesecurity/trufflehog', note: 'Scans Git histories for leaked secrets and emails' }
      ]
    },
    5: {
      topic: 'Platform Verification & Cross-Referencing',
      whatIsIt: 'Digital footprints span across multiple platforms: code hosts (GitHub), creative portfolios, social platforms, and discussion forums. Source tracking entails verifying which platform originated a specific piece of leaked intelligence and validating its authenticity.',
      whyItMatters: 'Threat actors and intelligence agencies fabricate false trails. Verifying platform authenticity ensures investigations rely on solid, verifiable evidence.',
      keyTerms: [
        { term: 'Cross-Correlation', meaning: 'Matching timestamps, bios, and links across two or more services.' },
        { term: 'Primary Source', meaning: 'The root service where the credential or data was first authored.' }
      ],
      links: [
        { label: 'IntelTechniques by Michael Bazzell', url: 'https://inteltechniques.com', note: 'Gold-standard open-source investigative methodologies' }
      ],
      onlineTools: [
        { name: 'Namechk', url: 'https://namechk.com', note: 'Check username consistency across major networks' },
        { name: 'CyberChef', url: 'https://gchq.github.io/CyberChef/', note: 'Format and normalize extracted URLs and handles' }
      ],
      offlineTools: [
        { name: 'Spiderfoot', url: 'https://github.com/smicallef/spiderfoot', note: 'Automated OSINT reconnaissance engine' }
      ]
    },
    6: {
      topic: 'Cipher Clues in Intelligence Operations',
      whatIsIt: 'Often targets scramble text snippets using classic ciphers like Vigenère or substitution ciphers to hide contact handles or private keys in plain view. Recognizing the structure of encrypted strings lets investigators quickly determine the algorithm.',
      whyItMatters: 'Casual obfuscation gives users a false sense of security. Knowing how to break basic ciphers reveals secrets hiding in bios, commit messages, and usernames.',
      keyTerms: [
        { term: 'Substitution Cipher', meaning: 'Replacing characters with other characters according to a rule or key.' },
        { term: 'Vigenère Cipher', meaning: 'Polyalphabetic substitution using a keyword.' }
      ],
      links: [
        { label: 'CryptoCorner Vigenère Solver', url: 'https://cryptii.com', note: 'Interactive cipher manipulation canvas' }
      ],
      onlineTools: [
        { name: 'CyberChef (Vigenère / ROT13)', url: 'https://gchq.github.io/CyberChef/', note: 'The ultimate web tool for instant cipher decryption' },
        { name: 'dcode.fr Cipher Identifier', url: 'https://www.dcode.fr/cipher-identifier', note: 'Analyzes ciphertext and suggests likely ciphers' }
      ],
      offlineTools: [
        { name: 'Python PyCryptodome', url: 'https://pycryptodome.readthedocs.io', note: 'Cryptographic library for custom scripts' }
      ]
    },
    7: {
      topic: 'Social Media Footprinting & The Final Flag',
      whatIsIt: 'Public social networks like Instagram, Twitter, and LinkedIn are treasure troves of personal disclosures. Users routinely post photos containing badges, computer screens, sticky notes with passwords, and flags hidden in image captions or stories (format: CAT{...}).',
      whyItMatters: 'Human behavior is the weakest link in cybersecurity. No amount of encryption helps if an employee posts a selfie with their computer screen in the background.',
      keyTerms: [
        { term: 'Social Media Intelligence (SOCMINT)', meaning: 'Gathering intelligence from social media platforms.' },
        { term: 'OPSEC (Operations Security)', meaning: 'Practices that prevent adversaries from gathering sensitive info.' }
      ],
      links: [
        { label: 'SANS Institute: Introduction to SOCMINT', url: 'https://www.sans.org', note: 'Best practices for social media auditing' }
      ],
      onlineTools: [
        { name: 'Picuki (Instagram Web Viewer)', url: 'https://www.picuki.com', note: 'Browse public Instagram profiles and captions without signing in' },
        { name: 'Google Cache / Archive Today', url: 'https://archive.is', note: 'Inspect archived social media posts' }
      ],
      offlineTools: [
        { name: 'Instaloader', url: 'https://instaloader.github.io', note: 'CLI tool to download Instagram photos, stories, and metadata' }
      ]
    }
  },

  // ===================================================================
  //  CRYPTOGRAPHY DOMAIN (7 QUESTIONS) :: ANTI-CORPO EVILCORP ARC
  // ===================================================================
  Crypto: {
    1: {
      topic: 'Corporate Obfuscation: Caesar Shift & ROT13 (Warm-Up 1)',
      whatIsIt: 'Megacorporations like EvilCorp often hide controversial internal policies from public scrutiny using the simplest monoalphabetic substitution: the Caesar Cipher. In ROT13, every letter of the alphabet is shifted by exactly 13 places. Because the Latin alphabet has 26 letters, applying ROT13 twice restores the original text!',
      whyItMatters: 'EvilCorp uses ROT13 in compliance documentation to obscure anti-whistleblower rules from basic keyword search crawlers. Learning to identify and decode ROT13 exposes corporate duplicity in seconds.',
      keyTerms: [
        { term: 'Symmetric Shift', meaning: 'Advancing every letter by a static number of alphabet positions.' },
        { term: 'ROT13', meaning: 'Rotate by 13 positions. Symmetrical because 13 + 13 = 26.' },
        { term: 'Monoalphabetic', meaning: 'A single fixed shift is used across every letter in the message.' }
      ],
      links: [
        { label: 'Khan Academy: Caesar Cipher Mathematics', url: 'https://www.khanacademy.org/computing/computer-science/cryptography/ciphers/a/caesar-cipher', note: 'Interactive math behind modular alphabet shifts' }
      ],
      onlineTools: [
        { name: 'CyberChef (ROT13 Recipe)', url: 'https://gchq.github.io/CyberChef/#recipe=ROT13(true,true,false,13)', note: 'Highlight: Drag the ROT13 operation into CyberChef and paste the ciphertext' },
        { name: 'ROT13.com', url: 'https://rot13.com', note: 'Instant in-browser ROT13 encoder/decoder' }
      ],
      offlineTools: [
        { name: 'tr command (Unix / Linux / macOS)', url: 'https://man7.org/linux/man-pages/man1/tr.1.html', note: 'tr "A-Za-z" "N-ZA-Mn-za-m"' }
      ]
    },
    2: {
      topic: 'The Fake Telemetry "Encryption": Base64 vs Real Security (Warm-Up 2)',
      whatIsIt: 'EvilCorp advertises that their software features "end-to-end encrypted telemetry." In reality, they are using Base64! Base64 is NOT encryption—it is an encoding scheme that translates arbitrary binary bytes into 64 ASCII characters (A-Z, a-z, 0-9, +, /) so data can travel over web protocols without transmission errors. Anyone who sees a Base64 string can decode it instantly without a key.',
      whyItMatters: 'Tech monopolies intentionally conflate "encoding" with "encryption" in marketing materials to deceive users into trusting intrusive tracking beacons. Recognizing Base64 (identified by its trailing = padding) allows you to audit what data apps are secretly uploading.',
      keyTerms: [
        { term: 'Encoding', meaning: 'Format conversion for transport; completely reversible without any secret key.' },
        { term: 'Encryption', meaning: 'Mathematical scrambling that requires a secret cryptographic key to invert.' },
        { term: 'Padding (=)', meaning: 'Base64 characters end with = or == to pad bytes to a multiple of 4.' }
      ],
      links: [
        { label: 'MDN Web Docs: Base64 Decoded', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Base64', note: 'How Base64 converts 3 8-bit bytes into 4 6-bit chunks' }
      ],
      onlineTools: [
        { name: 'CyberChef (From Base64)', url: 'https://gchq.github.io/CyberChef/#recipe=From_Base64(\'A-Za-z0-9%2B/%3D\',true,false)', note: 'Highlight: Add "From Base64" operation and paste the encoded string' },
        { name: 'Base64Decode.org', url: 'https://www.base64decode.org', note: 'Instant in-browser decoder' }
      ],
      offlineTools: [
        { name: 'base64 command (CLI)', url: 'https://man7.org/linux/man-pages/man1/base64.1.html', note: 'echo "string" | base64 -d' }
      ]
    },
    3: {
      topic: 'The Whistleblower\'s Raw Hex Packet (Chain Stage 1)',
      whatIsIt: 'Inside EvilCorp\'s profiling server, network packets travel as raw binary bytes. To make packets human-readable, engineers display them in Hexadecimal (Base 16, using 0-9 and A-F), where each byte is represented by two hex digits (e.g. 0x43 is the ASCII character "C").',
      whyItMatters: 'Whistleblowers exfiltrating data dumps from surveillance clusters often capture raw hex streams. Converting hex bytes into plaintext ASCII reveals internal passwords and keys that EvilCorp never intended the public to see.',
      keyTerms: [
        { term: 'Hexadecimal (Hex)', meaning: 'Base 16 numbering system using 0-9 and A-F.' },
        { term: 'Nibble', meaning: 'A 4-bit group represented by a single hexadecimal digit.' },
        { term: 'ASCII Table', meaning: 'The international standard mapping numbers (0-127) to characters.' }
      ],
      links: [
        { label: 'ASCII Table & Hexadecimal Converter', url: 'https://www.asciitable.com', note: 'Map characters to hex, decimal, and binary' }
      ],
      onlineTools: [
        { name: 'CyberChef (From Hex)', url: 'https://gchq.github.io/CyberChef/#recipe=From_Hex(\'Auto\')', note: 'Highlight: Add "From Hex" operation to decrypt the raw packet and extract the secret key' },
        { name: 'HexEd.it Online Hex Editor', url: 'https://hexed.it', note: 'Inspect hex streams directly in your browser' }
      ],
      offlineTools: [
        { name: 'xxd / hexdump', url: 'https://linux.die.net/man/1/xxd', note: 'Command line hex dumper and reverser' }
      ]
    },
    4: {
      topic: 'The Boardroom Vigenère Dispatch (Chain Stage 2)',
      whatIsIt: 'While the Caesar cipher shifts every letter by the same fixed number, the Vigenère Cipher shifts letters using a repeating secret keyword. Each letter of the keyword tells you how far to shift the corresponding message letter. Because the letter "E" might be encoded as "M" in one word and "T" in another, simple frequency analysis fails to crack it!',
      whyItMatters: 'EvilCorp directors use Vigenère ciphers with secret corporate passphrases to encrypt internal communications regarding data monetization pipelines. To decrypt the dispatch, you must use the key extracted from the whistleblower\'s hex dump in Question 3 (SHADOWCORP)!',
      keyTerms: [
        { term: 'Polyalphabetic', meaning: 'Using multiple shifting alphabets across the same message.' },
        { term: 'Passphrase Key', meaning: 'The secret word whose letters dictate the shift for each character position.' },
        { term: 'Tabula Recta', meaning: 'The classic 26x26 grid of shifted alphabets used to compute Vigenère ciphers.' }
      ],
      links: [
        { label: 'Khan Academy: Polyalphabetic Ciphers', url: 'https://www.khanacademy.org/computing/computer-science/cryptography/ciphers/a/polyalphabetic-ciphers', note: 'Why Vigenère defeated classic frequency analysis' }
      ],
      onlineTools: [
        { name: 'CyberChef (Vigenère Decode)', url: 'https://gchq.github.io/CyberChef/#recipe=Vigen%C3%A8re_Decode(\'SHADOWCORP\')', note: 'Highlight: Add "Vigenère Decode", paste the key SHADOWCORP, and decode the dispatch' },
        { name: 'dcode.fr Vigenère Solver', url: 'https://www.dcode.fr/vigenere-cipher', note: 'Comprehensive solver with automatic key recognition' }
      ],
      offlineTools: [
        { name: 'Python itertools.cycle script', url: 'https://python.org', note: 'Implement repeating-key Vigenère in 5 lines of Python' }
      ]
    },
    5: {
      topic: 'The Scrambled Vault Backdoor: Derived Shifts (Chain Stage 3)',
      whatIsIt: 'In multi-stage cryptanalysis, cracking one intercept yields the key or numeric parameters needed to decipher the next intercept. When you discover that an adversary is using a specific shift offset (revealed from Question 4, which is 7 positions), you can shift the scrambled letters backward by that exact amount to restore clarity.',
      whyItMatters: 'EvilCorp uses Caesar shifts on logging servers to scramble database codenames. Breaking the offset allows you to unmask the target codename needed for the credential attack.',
      keyTerms: [
        { term: 'Shift Key', meaning: 'The integer offset (e.g. 7 positions) by which characters are advanced.' },
        { term: 'Modulo 26 Arithmetic', meaning: 'Wrapping around the alphabet when a shift goes past Z or before A.' }
      ],
      links: [
        { label: 'Brute-forcing Caesar Shifts Online', url: 'https://www.dcode.fr/caesar-cipher', note: 'Shows all 25 possible rotations simultaneously' }
      ],
      onlineTools: [
        { name: 'CyberChef (ROT13 with Custom Amount)', url: 'https://gchq.github.io/CyberChef/#recipe=ROT13(true,true,false,19)', note: 'Highlight: To shift backward by 7 in CyberChef, use ROT13 with Amount = 19 (since 26 - 7 = 19)' },
        { name: 'Cryptii Caesar Tool', url: 'https://cryptii.com/pipes/caesar-cipher', note: 'Interactive slider to set shift offset directly to 7' }
      ],
      offlineTools: [
        { name: 'Python string rotate', url: 'https://python.org', note: 'One-line list comprehension for Caesar shifting' }
      ]
    },
    6: {
      topic: 'Cracking the EvilCorp CISO Hash: Rainbow Tables (Chain Stage 4)',
      whatIsIt: 'Cryptographic hash functions (like MD5) are mathematical one-way streets: they ingest any input and compute a fixed-size digital fingerprint. You cannot mathematically "decrypt" a hash. Instead, analysts crack hashes using precomputed tables called Rainbow Tables, or by hashing billions of dictionary words until an identical match is found.',
      whyItMatters: 'EvilCorp\'s Chief Information Security Officer (CISO) arrogantly believed their master password was uncrackable, but stored it as an unsalted MD5 hash combining the vault codename from Question 5 (cerberus) with common numbers. Online lookup tables crack it in milliseconds!',
      keyTerms: [
        { term: 'One-Way Hash', meaning: 'A function that cannot be mathematically inverted.' },
        { term: 'MD5', meaning: 'Message Digest 5 — produces 128-bit hashes, now considered cryptographically broken.' },
        { term: 'Rainbow Table', meaning: 'A precomputed lookup table mapping common passwords to their hashes.' },
        { term: 'Salt', meaning: 'Random data added to passwords before hashing to defeat lookup tables.' }
      ],
      links: [
        { label: 'How Rainbow Table Attacks Work', url: 'https://www.geeksforgeeks.org/understanding-rainbow-table-attack/', note: 'Explains precomputed hash chains and reduction functions' }
      ],
      onlineTools: [
        { name: 'CrackStation (Free Hash Lookup)', url: 'https://crackstation.net', note: 'Highlight: Paste the MD5 hash directly to look up its plaintext in massive 15GB lookup tables' },
        { name: 'CyberChef (Generate MD5 / Hashes)', url: 'https://gchq.github.io/CyberChef/#recipe=MD5()', note: 'Verify that the cracked password hashes to the exact target' },
        { name: 'MD5Decrypt.net', url: 'https://md5decrypt.net/en/', note: 'Alternative online database with billions of cracked hashes' }
      ],
      offlineTools: [
        { name: 'Hashcat', url: 'https://hashcat.net/hashcat/', note: 'The world\'s fastest GPU-accelerated password recovery utility' },
        { name: 'John the Ripper', url: 'https://www.openwall.com/john/', note: 'Classic command-line password security auditing tool' }
      ]
    },
    7: {
      topic: 'Neutralizing the Surveillance Master Payload: Chained XOR (Chain Stage 5)',
      whatIsIt: 'To prevent rebels from deactivating their surveillance network, EvilCorp enveloped their master kill-switch payload: first encrypting the plaintext with repeating-key XOR (using the CISO\'s password cracked in Question 6), and then encoding the raw bytes in Base64 for transport.',
      whyItMatters: 'Deciphering corporate kill-switches requires chaining operations in reverse: first stripping the outer Base64 layer, and then decrypting the inner stream XOR cipher with the cracked password.',
      keyTerms: [
        { term: 'XOR Encryption', meaning: 'A symmetric stream operation where data ^ key ^ key = original data.' },
        { term: 'Repeating Key XOR', meaning: 'Repeating a secret passphrase cyclically across the entire payload.' },
        { term: 'Cipher Recipe Chaining', meaning: 'Executing multiple cryptographic transformations in sequential order.' }
      ],
      links: [
        { label: 'The Cryptopals Crypto Challenges: Set 1', url: 'https://cryptopals.com/sets/1', note: 'The legendary cryptography exercises on XOR and stream ciphers' }
      ],
      onlineTools: [
        { name: 'CyberChef (Chained Recipe: From Base64 + XOR)', url: 'https://gchq.github.io/CyberChef/#recipe=From_Base64(\'A-Za-z0-9%2B/%3D\',true,false)XOR(%7B\'option\':\'UTF8\',\'string\':\'cerberus123\'%7D,\'Standard\',false)', note: 'Highlight: In CyberChef, add [From Base64], then add [XOR] with Key = cerberus123 (UTF8), and paste the payload to reveal the victory flag!' }
      ],
      offlineTools: [
        { name: 'Python pwntools xor()', url: 'https://docs.pwntools.com/en/stable/util/cyclic.html', note: 'Fast binary XOR manipulation library for exploit writers' }
      ]
    }
  },

  // ===================================================================
  //  STEGANOGRAPHY DOMAIN (7 QUESTIONS)
  // ===================================================================
  Stegano: {
    1: {
      topic: 'EXIF & File Header Comments (Warm-Up 1)',
      whatIsIt: 'Steganography begins with the simplest hiding places: metadata tags, user comment fields, and header descriptions inside image files.',
      whyItMatters: 'Users and malware droppers frequently stash base64 keys inside EXIF Artist or UserComment tags.',
      keyTerms: [{ term: 'Header Comment', meaning: 'Freeform text fields embedded in image headers.' }],
      links: [{ label: 'ExifTool Overview', url: 'https://exiftool.org' }],
      onlineTools: [{ name: 'Jimpl EXIF Viewer', url: 'https://jimpl.com', note: 'Inspect image metadata online' }],
      offlineTools: [{ name: 'exiftool CLI', url: 'https://exiftool.org' }]
    },
    2: {
      topic: 'Magic Bytes & File Signature Integrity (Warm-Up 2)',
      whatIsIt: 'Every file format has distinct leading bytes (magic bytes). A PNG always starts with 89 50 4E 47. Changing the file extension does not fool real security scanners.',
      whyItMatters: 'Attackers rename executables to .jpg to bypass upload filters.',
      keyTerms: [{ term: 'Magic Bytes', meaning: 'Leading byte sequence defining the true file type.' }],
      links: [{ label: 'Gary Kessler File Signatures Table', url: 'https://www.garykessler.net/library/file_sigs.html' }],
      onlineTools: [{ name: 'HexEd.it', url: 'https://hexed.it', note: 'Browser hex editor to check leading magic bytes' }],
      offlineTools: [{ name: 'file command', url: 'https://man7.org/linux/man-pages/man1/file.1.html' }]
    },
    3: {
      topic: 'Appended Trailing Bytes (Chain Stage 1)',
      whatIsIt: 'Image viewers stop parsing when they hit the end-of-file marker (IEND in PNG). Anything pasted after the trailer marker remains hidden from standard image viewers.',
      whyItMatters: 'Malware often glues encrypted archives to the tail of legitimate meme pictures.',
      keyTerms: [{ term: 'Trailing Bytes', meaning: 'Data appended after the official EOF marker.' }],
      links: [{ label: 'PNG Specification (IEND chunk)', url: 'http://www.libpng.org/pub/png/spec/1.2/PNG-Chunks.html' }],
      onlineTools: [{ name: 'HexEd.it', url: 'https://hexed.it', note: 'Scroll to bottom of hex viewer to find appended text' }],
      offlineTools: [{ name: 'binwalk', url: 'https://github.com/ReFirmLabs/binwalk' }]
    },
    4: {
      topic: 'Least Significant Bit (LSB) Extraction (Chain Stage 2)',
      whatIsIt: 'Colors are stored as numbers from 0 to 255. Altering the least significant bit (the 1s column) changes a color value by only 1 point, which is completely invisible to the human eye.',
      whyItMatters: 'Allows embedding entire secret books or executable files inside cover photos without altering visual appearance.',
      keyTerms: [{ term: 'LSB', meaning: 'Least Significant Bit — the bit that has the least visual impact on pixel color.' }],
      links: [{ label: 'LSB Steganography Explained', url: 'https://wikipedia.org' }],
      onlineTools: [{ name: 'Aperisolve', url: 'https://www.aperisolve.com', note: 'Automated online LSB layer extractor' }],
      offlineTools: [{ name: 'zsteg (Ruby)', url: 'https://github.com/zed-0xff/zsteg' }]
    },
    5: {
      topic: 'Color Plane & Alpha Channel Separation (Chain Stage 3)',
      whatIsIt: 'Images have 4 channels: Red, Green, Blue, and Alpha (transparency). Secret messages can be painted exclusively into an unused color plane or transparent layer.',
      whyItMatters: 'Teaches multi-dimensional data manipulation and forensics.',
      keyTerms: [{ term: 'Alpha Channel', meaning: 'The opacity/transparency layer of an image.' }],
      links: [{ label: 'Steganography in Color Planes', url: 'https://wikipedia.org' }],
      onlineTools: [{ name: 'Aperisolve', url: 'https://www.aperisolve.com', note: 'Split RGB and Alpha channels online' }],
      offlineTools: [{ name: 'GIMP', url: 'https://www.gimp.org' }]
    },
    6: {
      topic: 'Audio Spectrogram Visualizer (Chain Stage 4)',
      whatIsIt: 'Sound files can be converted into spectrograms showing frequency over time. Artists and steganographers draw visual images directly into ultrasonic frequencies.',
      whyItMatters: 'Listening to the audio reveals ordinary music or static; visualizing it reveals the hidden image.',
      keyTerms: [{ term: 'Spectrogram', meaning: 'Visual representation of the spectrum of audio frequencies over time.' }],
      links: [{ label: 'Audacity Spectrogram View Tutorial', url: 'https://manual.audacityteam.org/man/spectrogram_view.html' }],
      onlineTools: [{ name: 'Academo Spectrum Analyzer', url: 'https://academo.org/demos/spectrum-analyzer/', note: 'In-browser sound wave analyzer' }],
      offlineTools: [{ name: 'Audacity', url: 'https://www.audacityteam.org' }]
    },
    7: {
      topic: 'Passphrase-Protected Steghide (Chain Stage 5)',
      whatIsIt: 'Steghide combines graph-theoretic concealment with password-based encryption so bits cannot be extracted without the passphrase.',
      whyItMatters: 'Represents the pinnacle of covert digital communications.',
      keyTerms: [{ term: 'Steghide', meaning: 'Algorithm embedding data into JPEG and WAV with passphrases.' }],
      links: [{ label: 'Steghide Sourceforge', url: 'http://steghide.sourceforge.net' }],
      onlineTools: [{ name: 'FutureBoy Stego Decoders', url: 'https://futureboy.us/stegano/decinput.html', note: 'Online Steghide extraction tool' }],
      offlineTools: [{ name: 'Steghide CLI', url: 'http://steghide.sourceforge.net' }]
    }
  },

  // ===================================================================
  //  WEB SECURITY DOMAIN (7 QUESTIONS)
  // ===================================================================
  'Web Sec': {
    1: {
      topic: 'HTTP Verbs, Headers & Status Codes (Warm-Up 1)',
      whatIsIt: 'The web communicates using HTTP methods (GET, POST, PUT, DELETE, OPTIONS). Servers inspect request headers to decide how to respond.',
      whyItMatters: 'Unrestricted HTTP verbs allow attackers to upload files or inspect hidden endpoints.',
      keyTerms: [{ term: 'HTTP Method', meaning: 'The verb indicating the action to perform on a resource.' }],
      links: [{ label: 'MDN: HTTP Request Methods', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods' }],
      onlineTools: [{ name: 'Hoppscotch Online API Client', url: 'https://hoppscotch.io', note: 'Browser-based HTTP request tester' }],
      offlineTools: [{ name: 'cURL', url: 'https://curl.se' }]
    },
    2: {
      topic: 'Client-Side DOM & Hidden Form Bypass (Warm-Up 2)',
      whatIsIt: 'Web forms often use hidden inputs (<input type="hidden">) to store values like product prices. Any restriction enforced purely in the browser can be edited in developer tools.',
      whyItMatters: 'Never trust user input—servers must validate all data independently.',
      keyTerms: [{ term: 'Client-Side Bypass', meaning: 'Modifying browser HTML/JS to bypass restrictions.' }],
      links: [{ label: 'OWASP Input Validation', url: 'https://cheatsheetseries.owasp.org' }],
      onlineTools: [{ name: 'Browser Developer Tools (F12)', url: 'https://developer.chrome.com', note: 'Inspect and edit DOM elements' }],
      offlineTools: [{ name: 'cURL', url: 'https://curl.se' }]
    },
    3: {
      topic: 'Insecure Session Cookie Privilege Flags (Chain Stage 1)',
      whatIsIt: 'Servers use cookies to remember active user sessions. Cookies often hold privilege flags like role=user or isAdmin=false.',
      whyItMatters: 'If cookies are not signed or encrypted, editing isAdmin=true gives instant administrative privileges.',
      keyTerms: [{ term: 'Session Cookie', meaning: 'State held by the browser to maintain login identity.' }],
      links: [{ label: 'MDN Web Docs: HTTP Cookies', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies' }],
      onlineTools: [{ name: 'Browser DevTools (Application/Storage Tab)', url: 'https://developer.chrome.com', note: 'Inspect and modify session cookies' }],
      offlineTools: [{ name: 'Burp Suite Community', url: 'https://portswigger.net/burp' }]
    },
    4: {
      topic: 'Parameter Tampering & IDOR (Chain Stage 2)',
      whatIsIt: 'Insecure Direct Object References (IDOR) occur when an app uses predictable user-supplied IDs (like /profile?id=101) to fetch private records without verifying permission.',
      whyItMatters: 'Changing 101 to 102 lets anyone view other users\' private profiles or download bank statements.',
      keyTerms: [{ term: 'IDOR', meaning: 'Missing access control when accessing internal object keys.' }],
      links: [{ label: 'PortSwigger IDOR Guide', url: 'https://portswigger.net/web-security/access-control/idor' }],
      onlineTools: [{ name: 'Browser URL Navigation', url: 'https://developer.chrome.com', note: 'Test query string parameter modifications' }],
      offlineTools: [{ name: 'Postman', url: 'https://postman.com' }]
    },
    5: {
      topic: 'Directory Path Traversal (Chain Stage 3)',
      whatIsIt: 'An attacker uses relative path syntax (../../etc/passwd) inside file request parameters to break out of the website folder and read operating system files.',
      whyItMatters: 'Exposes server configuration files, passwords, and source code.',
      keyTerms: [{ term: 'Dot-Dot-Slash (../)', meaning: 'Relative path syntax to move up one folder.' }],
      links: [{ label: 'PortSwigger Directory Traversal', url: 'https://portswigger.net/web-security/file-path-traversal' }],
      onlineTools: [{ name: 'PortSwigger Web Academy Labs', url: 'https://portswigger.net', note: 'Free interactive web security playground' }],
      offlineTools: [{ name: 'ffuf', url: 'https://github.com/ffuf/ffuf' }]
    },
    6: {
      topic: 'SQL Injection Authentication Bypass (Chain Stage 4)',
      whatIsIt: 'When user input is directly glued into SQL queries without sanitization, entering special characters like \' OR 1=1-- tricks the database into returning TRUE, logging the attacker in as administrator without any password.',
      whyItMatters: 'One of the most destructive web vulnerabilities in history, responsible for massive corporate database breaches.',
      keyTerms: [{ term: 'SQLi', meaning: 'Injecting malicious database query fragments via user input fields.' }],
      links: [{ label: 'PortSwigger SQL Injection Guide', url: 'https://portswigger.net/web-security/sql-injection' }],
      onlineTools: [{ name: 'PortSwigger SQLi Labs', url: 'https://portswigger.net', note: 'Interactive browser SQL injection training' }],
      offlineTools: [{ name: 'sqlmap', url: 'https://sqlmap.org' }]
    },
    7: {
      topic: 'Reflected XSS & Session Exfiltration (Chain Stage 5)',
      whatIsIt: 'Cross-Site Scripting (XSS) occurs when an application echoes unescaped user input directly into HTML. An attacker crafts a link containing JavaScript that steals the victim\'s session cookie when clicked.',
      whyItMatters: 'Allows complete account takeover and credential harvesting.',
      keyTerms: [{ term: 'Reflected XSS', meaning: 'Malicious script payload delivered via URL query parameters and executed in the victim browser.' }],
      links: [{ label: 'OWASP XSS Prevention Cheat Sheet', url: 'https://cheatsheetseries.owasp.org' }],
      onlineTools: [{ name: 'PortSwigger XSS Academy', url: 'https://portswigger.net/web-security/cross-site-scripting' }],
      offlineTools: [{ name: 'OWASP ZAP', url: 'https://zaproxy.org' }]
    }
  }
};

export function getTextbook(domain, id) {
  return (TEXTBOOK[domain] && TEXTBOOK[domain][id]) || {
    topic: `${domain} Chapter ${id}`,
    whatIsIt: `This chapter covers the technical fundamentals for question ${id} in ${domain}.`,
    whyItMatters: 'Understanding this concept helps demystify how digital systems function.',
    keyTerms: [],
    links: [],
    onlineTools: [],
    offlineTools: []
  };
}
