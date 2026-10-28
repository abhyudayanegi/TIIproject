// =====================================================================
//  TEXTBOOK CONTENT WIREFRAME
//  One entry per question, keyed by domain -> question id.
//  Each entry includes:
//  - topic:        Name of the concept/technique covered
//  - whatIsIt:     Plain-English explanation for total beginners
//  - whyItMatters: Real-world cybersecurity impact & why you should care
//  - keyTerms:     Key vocabulary explained simply
//  - links:        Curated external reading & guides
//  - onlineTools:  Recommended browser-based tools for solving the CTF
//  - offlineTools: Advanced installable tools to explore deeper
// =====================================================================

export const TEXTBOOK = {
  OSINT: {
    1: {
      topic: 'Geolocation Intelligence (GeoINT)',
      whatIsIt: 'Geolocation Intelligence is the discipline of pinpointing the physical, real-world location where a photo, video, or post originated. Instead of magical satellite tracking, analysts look for subtle environmental clues: street signs, architectural styles, store logos, reflections in windows, license plate patterns, and sun shadows.',
      whyItMatters: 'Every day people post casual photos online without realizing they are broadcasting their exact location. Stalkers, burglars, and threat actors use GeoINT to track routines, discover homes, and plan physical breaches.',
      keyTerms: [
        { term: 'GeoINT', meaning: 'Geospatial Intelligence — extracting location clues from visual and public assets.' },
        { term: 'Landmark Pivoting', meaning: 'Using a visible business name or distinct structure to narrow coordinates on maps.' },
        { term: 'Reverse Image Search', meaning: 'Submitting a cropped portion of an image to find matching web pages.' }
      ],
      links: [
        { label: 'Bellingcat Guide to Image Geolocation', url: 'https://www.bellingcat.com/resources/how-tos/2019/07/09/buy-the-ticket-take-the-ride-a-beginners-guide-to-geolocation/', note: 'Step-by-step primer by investigative journalists' },
        { label: 'Geoguessr Tips & Visual Recognition Guide', url: 'https://www.geoguessr.com', note: 'Techniques for recognizing countries and regions by visual cues' }
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
        { name: 'JPEGsnoop', url: 'https://www.impulseadventure.com/photo/jpeg-snoop.html', note: 'In-depth JPEG structure and compression inspector' },
        { name: 'Jimpl EXIF Viewer', url: 'https://jimpl.com', note: 'Fast in-browser EXIF and geotag reader' }
      ],
      offlineTools: [
        { name: 'ExifTool by Phil Harvey', url: 'https://exiftool.org', note: 'The gold-standard command-line metadata reader and editor' },
        { name: 'Strings (Sysinternals / Unix)', url: 'https://learn.microsoft.com/en-us/sysinternals/downloads/strings', note: 'Quickly dump ASCII strings from any file' }
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
        { name: 'Sherlock (Python CLI)', url: 'https://github.com/sherlock-project/sherlock', note: 'Hunt social accounts by username across 300+ networks' },
        { name: 'Maigret', url: 'https://github.com/soxoj/maigret', note: 'Advanced dossier generator using public username footprints' }
      ]
    },
    4: {
      topic: 'Public Code Repositories & Git Forensics',
      whatIsIt: 'Version control systems like Git track every change made to code. Whenever someone commits code, Git records the commit author name and email address in plain text. Even if a user sets their GitHub account email to private, older commits, GPG key signatures, or patch URLs frequently expose their real personal address.',
      whyItMatters: 'Developers accidentally leak passwords, database API keys, and personal contact info into public repositories every hour. Automated bots scrape GitHub within seconds to harvest exposed credentials.',
      keyTerms: [
        { term: 'Commit Metadata', meaning: 'The author name, email, and timestamp stamped into each Git commit object.' },
        { term: 'Patch Endpoint (.patch)', meaning: 'Appending .patch to a GitHub commit URL shows raw diff headers with emails.' },
        { term: 'Secret Leaks', meaning: 'Accidental check-ins of keys, tokens, or emails into public history.' }
      ],
      links: [
        { label: 'GitHub Docs: About Commit Email Addresses', url: 'https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address', note: 'Official guide on how GitHub emails leak and how to hide them' },
        { label: 'Git Secrets and Security Best Practices', url: 'https://owasp.org', note: 'OWASP guidelines on avoiding credentials in source repositories' }
      ],
      onlineTools: [
        { name: 'GitHub Search & Commit Dorks', url: 'https://github.com/search', note: 'Search repositories using author:, extension:, and keyword filters' },
        { name: 'Wayback Machine (Archive.org)', url: 'https://archive.org/web/', note: 'View past versions of deleted repositories and user profile pages' }
      ],
      offlineTools: [
        { name: 'Git Log CLI (`git log -p`)', url: 'https://git-scm.com', note: 'Inspect local commit author headers and line differences' },
        { name: 'TruffleHog', url: 'https://github.com/trufflesecurity/trufflehog', note: 'Scan Git histories for leaked credentials and emails' }
      ]
    },
    5: {
      topic: 'Service Identification & Platform Footprinting',
      whatIsIt: 'Once an intelligence researcher discovers an email or handle, the next step is determining which services, hosting providers, or platforms it is registered on. Services often leak registration status through password reset pages, avatar lookups, or API profile queries.',
      whyItMatters: 'Finding out where someone has accounts allows threat actors to orchestrate credential stuffing, password spray attacks, or spear-phishing campaigns tailored to the services the victim uses daily.',
      keyTerms: [
        { term: 'Credential Stuffing', meaning: 'Testing leaked credentials from one service against dozens of other websites.' },
        { term: 'Account Enumeration', meaning: 'Probing login forms to see if an email is registered based on error messages.' }
      ],
      links: [
        { label: 'IntelTechniques: Email and Handle Investigation', url: 'https://inteltechniques.com', note: 'Techniques from former FBI cyber investigator Michael Bazzell' },
        { label: 'HaveIBeenPwned', url: 'https://haveibeenpwned.com', note: 'Check whether an email has been leaked in historic data breaches' }
      ],
      onlineTools: [
        { name: 'Epieos', url: 'https://epieos.com', note: 'Reverse email search verifying Google, GitHub, Skype, and Gravatar profiles' },
        { name: 'Hunter.io', url: 'https://hunter.io', note: 'Find email patterns and verify company domain contacts' },
        { name: 'OSINT Industries', url: 'https://osint.industries', note: 'Real-time module checks for email-to-service links' }
      ],
      offlineTools: [
        { name: 'Holehe (Python CLI)', url: 'https://github.com/megadose/holehe', note: 'Checks if an email is attached to 120+ sites without notifying target' },
        { name: 'theHarvester', url: 'https://github.com/laramies/theHarvester', note: 'Gathers emails, names, subdomains, and open ports from public sources' }
      ]
    },
    6: {
      topic: 'Classical Substitution Ciphers (Vigenère & Caesar)',
      whatIsIt: 'Classical ciphers manipulate text by shifting or substituting characters along the alphabet. A Caesar cipher shifts every letter by a fixed number (e.g. A becomes D with shift 3). A Vigenère cipher uses a repeating keyword to shift each letter by a different amount, providing multi-alphabet protection.',
      whyItMatters: 'While obsolete for protecting modern banking, classical ciphers are widely used in CTFs and malware obfuscation to hide configuration strings, command endpoints, and anti-virus evasion payloads.',
      keyTerms: [
        { term: 'Substitution Cipher', meaning: 'Replacing units of plaintext with ciphertext according to a system.' },
        { term: 'Vigenère Cipher', meaning: 'Polyalphabetic substitution using a keyword to shift each character.' },
        { term: 'ROT13', meaning: 'A Caesar cipher with a fixed shift of 13 characters (A <-> N).' }
      ],
      links: [
        { label: 'Khan Academy: Journey into Cryptography', url: 'https://www.khanacademy.org/computing/computer-science/cryptography', note: 'Engaging interactive visual walkthrough of Caesar and Vigenère ciphers' },
        { label: 'dcode.fr Cipher Identifier', url: 'https://www.dcode.fr/cipher-identifier', note: 'Analyzes ciphertext frequency to guess the cipher algorithm' }
      ],
      onlineTools: [
        { name: 'CyberChef', url: 'https://gchq.github.io/CyberChef/', note: 'The ultimate tool for ROT13, Vigenère, Base64, and Hex decoding' },
        { name: 'dcode.fr Vigenère Solver', url: 'https://www.dcode.fr/vigenere-cipher', note: 'Cracks Vigenère with or without a known keyword' },
        { name: 'Rumkin Cipher Tools', url: 'https://rumkin.com/tools/cipher/', note: 'Clean browser-based classical cipher workbench' }
      ],
      offlineTools: [
        { name: 'CrypTool', url: 'https://www.cryptool.org', note: 'Open-source desktop software for learning and testing cryptography' },
        { name: 'Python PyCryptodome', url: 'https://pycryptodome.readthedocs.io', note: 'Python cryptographic library for writing custom solvers' }
      ]
    },
    7: {
      topic: 'Social Media Intelligence (SOCMINT)',
      whatIsIt: 'SOCMINT is the gathering and analysis of data published on social networks like Instagram, LinkedIn, Facebook, and Twitter. This includes biographical summaries, geotagged stories, comments, followers, friend graphs, and tagged photos posted by friends.',
      whyItMatters: 'Even if your personal account is private, friends tagging you in group photos, comments on public posts, and bio links often reveal your location, interests, and affiliations to any observer.',
      keyTerms: [
        { term: 'SOCMINT', meaning: 'Social Media Intelligence — extracting intel from social platforms.' },
        { term: 'Digital Footprint', meaning: 'The trail of data you leave behind while navigating the internet.' },
        { term: 'Google Dorking for Socials', meaning: 'Using `site:instagram.com "keyword"` to find indexed public posts.' }
      ],
      links: [
        { label: 'SANS Institute: SOCMINT Fundamentals', url: 'https://www.sans.org', note: 'Practical methodologies for auditing social media presence' },
        { label: 'EFF: Surveillance Self-Defense for Social Media', url: 'https://ssd.eff.org', note: 'How to lock down social media settings against scrapers' }
      ],
      onlineTools: [
        { name: 'Google Advanced Search Operators', url: 'https://www.google.com/advanced_search', note: 'Search within specific platforms with exact matches' },
        { name: 'Picuki / Dumpor (Instagram Viewers)', url: 'https://www.picuki.com', note: 'Browse public Instagram profiles and tags without logging in' }
      ],
      offlineTools: [
        { name: 'Instaloader (Python CLI)', url: 'https://instaloader.github.io', note: 'Download pictures, captions, and metadata from public profiles' },
        { name: 'Maltego', url: 'https://www.maltego.com', note: 'Visual link analysis tool mapping social relationships' }
      ]
    }
  },
  Stegano: {
    1: {
      topic: 'Least Significant Bit (LSB) Steganography',
      whatIsIt: 'Digital image pixels are made of Red, Green, and Blue values (0 to 255). Changing the very last bit (the Least Significant Bit) of a color value alters the pixel by such a tiny fraction that human eyes cannot notice the difference. Steganographers hide secret binary data by replacing these last bits.',
      whyItMatters: 'Malware authors hide malicious download commands inside ordinary image memes on websites to evade antivirus file scanners.',
      keyTerms: [
        { term: 'LSB', meaning: 'Least Significant Bit — the lowest bit in a binary number with minimal visual impact.' },
        { term: 'Carrier Image', meaning: 'The innocent host image containing the hidden payload.' }
      ],
      links: [
        { label: 'Aperisolve Steganography Guide', url: 'https://www.aperisolve.com', note: 'Visualizes color bit planes and LSB extractions' }
      ],
      onlineTools: [
        { name: 'Aperisolve', url: 'https://www.aperisolve.com', note: 'Online multi-layer image analysis tool' },
        { name: 'StegOnline', url: 'https://stegonline.georgeom.net', note: 'In-browser pixel color plane and LSB viewer' }
      ],
      offlineTools: [
        { name: 'Zsteg (Ruby gem)', url: 'https://github.com/zed-0xff/zsteg', note: 'Detects hidden data in PNG and BMP files automatically' }
      ]
    },
    2: {
      topic: 'Audio Spectrograms & Frequency Concealment',
      whatIsIt: 'Audio files can hide images and text visually within their frequency spectrum. While the audio sounds like normal noise or music to human ears, visualizing it with a spectrogram reveals clear words and pictures drawn in frequency waves.',
      whyItMatters: 'Shows that data can exist in alternate representations that normal playback programs ignore.',
      keyTerms: [
        { term: 'Spectrogram', meaning: 'A visual representation of sound frequencies over time.' },
        { term: 'Sonic Stego', meaning: 'Encoding data or graphics into high audio frequencies.' }
      ],
      links: [
        { label: 'Audacity Spectrogram View Tutorial', url: 'https://manual.audacityteam.org/man/spectrogram_view.html', note: 'Official guide on revealing hidden audio pictures' }
      ],
      onlineTools: [
        { name: 'Academo Spectrum Analyzer', url: 'https://academo.org/demos/spectrum-analyzer/', note: 'In-browser sound wave and spectrogram generator' }
      ],
      offlineTools: [
        { name: 'Audacity', url: 'https://www.audacityteam.org', note: 'Free audio editor with built-in Spectrogram view mode' },
        { name: 'Sonic Visualiser', url: 'https://www.sonicvisualiser.org', note: 'Advanced acoustic analysis tool' }
      ]
    },
    3: {
      topic: 'File Structure & Appended Trailing Bytes',
      whatIsIt: 'Image file formats like PNG and JPEG have strict start and end markers (like `IEND` in PNGs or `FF D9` in JPEGs). Image viewers stop reading after this marker. If someone attaches secret text or a whole ZIP file after that marker, the image still opens normally, but the secret rides along unnoticed.',
      whyItMatters: 'Threat actors append malware payloads to legitimate files, bypassing basic inspection.',
      keyTerms: [
        { term: 'Magic Bytes', meaning: 'Specific byte sequences at the start and end of files indicating file type.' },
        { term: 'Polyglot File', meaning: 'A single file that can validly execute as two different formats (e.g. GIF and ZIP).' }
      ],
      links: [
        { label: 'Gary Kessler File Signatures Table', url: 'https://www.garykessler.net/library/file_sigs.html', note: 'Reference list of all file header and trailer magic bytes' }
      ],
      onlineTools: [
        { name: 'HexEd.it', url: 'https://hexed.it', note: 'Browser-based hex editor to inspect trailing bytes' }
      ],
      offlineTools: [
        { name: 'Binwalk', url: 'https://github.com/ReFirmLabs/binwalk', note: 'Fast firmware and image carving tool' },
        { name: 'HxD Hex Editor', url: 'https://mh-nexus.de/en/hxd/', note: 'Classic fast Windows hex viewer' }
      ]
    },
    4: {
      topic: 'Steghide & Password-Protected Stego',
      whatIsIt: 'Steghide is a classical steganography program that embeds data into JPEG and WAV files using graph-theoretic algorithms, encrypted with a passphrase. Without the passphrase, statistical tests cannot even detect the presence of data.',
      whyItMatters: 'Combines the concealment of steganography with the mathematical strength of password-based encryption.',
      keyTerms: [
        { term: 'Passphrase Salt', meaning: 'A secret key used to scramble where bits are stored.' },
        { term: 'Carving', meaning: 'Extracting an embedded file using known dictionary attacks.' }
      ],
      links: [
        { label: 'Steghide Project Homepage', url: 'http://steghide.sourceforge.net', note: 'Manual and algorithmic background' }
      ],
      onlineTools: [
        { name: 'FutureBoy Stego Decoders', url: 'https://futureboy.us/stegano/decinput.html', note: 'Online Steghide extraction tool' }
      ],
      offlineTools: [
        { name: 'Steghide CLI', url: 'http://steghide.sourceforge.net', note: 'Command-line embedding and extraction tool' },
        { name: 'Stegcracker', url: 'https://github.com/Paradoxis/StegCracker', note: 'Dictionary attack tool against Steghide passphrases' }
      ]
    },
    5: {
      topic: 'Color Plane & Palette Separation',
      whatIsIt: 'An image is made of color channels (Red, Green, Blue, Alpha). Sometimes secrets are hidden not in the raw pixels, but only in the Alpha transparency layer or a single isolated color channel with high brightness contrast.',
      whyItMatters: 'Demonstrates multi-dimensional data storage and visual forensics.',
      keyTerms: [
        { term: 'Color Plane', meaning: 'The isolated grayscale layer representing one color intensity.' },
        { term: 'Alpha Channel', meaning: 'The transparency channel of an image.' }
      ],
      links: [
        { label: 'GIMP Color Channel Separation Tutorial', url: 'https://docs.gimp.org', note: 'How to split RGB layers' }
      ],
      onlineTools: [
        { name: 'Aperisolve', url: 'https://www.aperisolve.com', note: 'Shows all 8 bit planes per channel simultaneously' }
      ],
      offlineTools: [
        { name: 'GIMP', url: 'https://www.gimp.org', note: 'Free image manipulation program' }
      ]
    }
  },
  Crypto: {
    1: {
      topic: 'Caesar & Shift Ciphers',
      whatIsIt: 'The earliest known historical cipher, used by Julius Caesar to protect military messages by shifting each letter of the alphabet forward by a fixed number of spaces.',
      whyItMatters: 'Understanding shift ciphers introduces the foundational concept of keys, algorithms, and key spaces.',
      keyTerms: [{ term: 'Shift Offset', meaning: 'The numeric distance each letter moves along the alphabet.' }],
      links: [{ label: 'Khan Academy Shift Ciphers', url: 'https://www.khanacademy.org' }],
      onlineTools: [{ name: 'CyberChef', url: 'https://gchq.github.io/CyberChef/' }],
      offlineTools: [{ name: 'Python string.ascii_lowercase', url: 'https://python.org' }]
    },
    2: {
      topic: 'Encoding vs Hashing vs Encryption',
      whatIsIt: 'Encoding (Base64, Hex) transforms data for transmission (not for security). Hashing (MD5, SHA256) is a one-way fingerprint. Encryption (AES, RSA) scrambles data so only someone with the key can reverse it.',
      whyItMatters: 'A widespread mistake in apps is using Base64 and believing it protects passwords!',
      keyTerms: [
        { term: 'Base64', meaning: 'An encoding scheme that represents binary in 64 printable ASCII characters.' },
        { term: 'One-Way Hash', meaning: 'A function that cannot be mathematically inverted.' }
      ],
      links: [{ label: 'OWASP Guide to Cryptography', url: 'https://owasp.org' }],
      onlineTools: [{ name: 'CyberChef', url: 'https://gchq.github.io/CyberChef/' }],
      offlineTools: [{ name: 'OpenSSL CLI', url: 'https://openssl.org' }]
    },
    3: {
      topic: 'Pseudo-Random Number Generators (PRNG)',
      whatIsIt: 'Computers cannot generate truly random numbers without special hardware; they use algorithms called PRNGs seeded with a starting value (often the current timestamp). If the seed is known or predictable, all future numbers are known in advance.',
      whyItMatters: 'Predictable PRNGs allow attackers to guess password reset tokens and session IDs.',
      keyTerms: [{ term: 'Seed Value', meaning: 'The starting state for a pseudo-random sequence.' }],
      links: [{ label: 'Randomness in Cryptography', url: 'https://wikipedia.org' }],
      onlineTools: [{ name: 'CyberChef', url: 'https://gchq.github.io/CyberChef/' }],
      offlineTools: [{ name: 'Python secrets module', url: 'https://python.org' }]
    },
    4: {
      topic: 'XOR Encryption & Key Re-use',
      whatIsIt: 'XOR (exclusive OR) is the fundamental operation powering symmetric encryption. If a message is XORed with a key, XORing it again with the same key restores the original plaintext.',
      whyItMatters: 'Reusing a one-time key with XOR completely breaks secrecy through frequency analysis.',
      keyTerms: [{ term: 'XOR Operation', meaning: 'Returns 1 if bits differ, 0 if bits match.' }],
      links: [{ label: 'XOR Cipher Explanation', url: 'https://wikipedia.org' }],
      onlineTools: [{ name: 'CyberChef XOR Recipe', url: 'https://gchq.github.io/CyberChef/' }],
      offlineTools: [{ name: 'Python itertools.cycle', url: 'https://python.org' }]
    },
    5: {
      topic: 'Hash Collisions & Legacy Hashing (MD5)',
      whatIsIt: 'A hash collision occurs when two completely different inputs produce the exact same output hash. Legacy algorithms like MD5 are broken because collisions can be generated on standard laptops in seconds.',
      whyItMatters: 'Attackers can forge digital certificates and malware signatures using MD5 collisions.',
      keyTerms: [{ term: 'Collision', meaning: 'Two distinct inputs sharing an identical hash.' }],
      links: [{ label: 'MD5 Collision Demo', url: 'https://wikipedia.org' }],
      onlineTools: [{ name: 'CyberChef MD5', url: 'https://gchq.github.io/CyberChef/' }],
      offlineTools: [{ name: 'md5sum CLI', url: 'https://gnu.org' }]
    },
    6: {
      topic: 'Asymmetric Encryption & RSA Mathematics',
      whatIsIt: 'Asymmetric encryption uses a key pair: a public key that anyone can use to encrypt messages, and a private key that only the recipient possesses to decrypt them.',
      whyItMatters: 'Forms the security foundation of HTTPS, SSH, and digital signatures worldwide.',
      keyTerms: [{ term: 'Public Key', meaning: 'Shared openly for encryption and signature verification.' }],
      links: [{ label: 'RSA Simplified Explained', url: 'https://wikipedia.org' }],
      onlineTools: [{ name: 'CyberChef RSA Decrypt', url: 'https://gchq.github.io/CyberChef/' }],
      offlineTools: [{ name: 'RsaCtfTool', url: 'https://github.com/RsaCtfTool/RsaCtfTool' }]
    }
  },
  'Web Sec': {
    1: {
      topic: 'Cookies, Sessions & Privilege Flags',
      whatIsIt: 'Because HTTP is stateless, servers use cookies stored in your browser to remember who you are. Cookies contain session tokens and privilege flags (e.g. `role=user` or `isAdmin=false`).',
      whyItMatters: 'If cookies are not signed or encrypted, users can open dev tools, change `isAdmin=true`, and gain root administrative rights.',
      keyTerms: [{ term: 'Session Cookie', meaning: 'A piece of state stored by the browser for authentication.' }],
      links: [{ label: 'MDN Web Docs: HTTP Cookies', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies' }],
      onlineTools: [{ name: 'Browser DevTools (F12 Application/Storage)', url: 'https://developer.chrome.com' }],
      offlineTools: [{ name: 'Burp Suite Community', url: 'https://portswigger.net/burp' }]
    },
    2: {
      topic: 'Client-Side Validation & Hidden Input Fields',
      whatIsIt: 'Web forms often use hidden input tags (`<input type="hidden">`) to pass values like product prices. Any restriction enforced purely in the browser can be modified by the user.',
      whyItMatters: 'Never trust user input—servers must validate every field independently.',
      keyTerms: [{ term: 'Client-Side Bypass', meaning: 'Editing browser HTML/JS to circumvent intended rules.' }],
      links: [{ label: 'OWASP Input Validation Cheat Sheet', url: 'https://cheatsheetseries.owasp.org' }],
      onlineTools: [{ name: 'Browser Inspector (Inspect Element)', url: 'https://developer.chrome.com' }],
      offlineTools: [{ name: 'cURL', url: 'https://curl.se' }]
    },
    3: {
      topic: 'SQL Injection (SQLi)',
      whatIsIt: "When user input is directly concatenated into database queries without sanitization, an attacker can input SQL commands like `' OR 1=1--` to bypass logins or dump database contents.",
      whyItMatters: 'One of the most destructive web vulnerabilities in history, responsible for massive data leaks.',
      keyTerms: [{ term: 'SQLi', meaning: 'Injecting malicious database queries via user input fields.' }],
      links: [{ label: 'PortSwigger Web Security Academy: SQLi', url: 'https://portswigger.net/web-security/sql-injection' }],
      onlineTools: [{ name: 'PortSwigger SQLi Labs', url: 'https://portswigger.net' }],
      offlineTools: [{ name: 'sqlmap', url: 'https://sqlmap.org' }]
    },
    4: {
      topic: 'Cross-Site Scripting (XSS)',
      whatIsIt: 'XSS happens when a website includes untrusted data in a page without proper validation, allowing attackers to execute malicious JavaScript in the victim’s browser.',
      whyItMatters: 'Allows attackers to hijack active user accounts, steal session cookies, and deface websites.',
      keyTerms: [{ term: 'Reflected XSS', meaning: 'Script payload reflected immediately from the HTTP request.' }],
      links: [{ label: 'OWASP XSS Prevention', url: 'https://owasp.org' }],
      onlineTools: [{ name: 'PortSwigger XSS Academy', url: 'https://portswigger.net' }],
      offlineTools: [{ name: 'OWASP ZAP', url: 'https://zaproxy.org' }]
    },
    5: {
      topic: 'Insecure Direct Object References (IDOR)',
      whatIsIt: 'When an app uses user-supplied input to access objects directly (e.g. `/profile?id=101`), changing the number to `102` can reveal another user\'s private data if the server fails to verify authorization.',
      whyItMatters: 'Trivial to exploit and extremely prevalent across modern web apps and APIs.',
      keyTerms: [{ term: 'IDOR', meaning: 'Missing access control when referencing internal database objects.' }],
      links: [{ label: 'PortSwigger IDOR Guide', url: 'https://portswigger.net' }],
      onlineTools: [{ name: 'Browser URL bar & Network tab', url: 'https://developer.chrome.com' }],
      offlineTools: [{ name: 'Postman / cURL', url: 'https://postman.com' }]
    },
    6: {
      topic: 'Directory Path Traversal',
      whatIsIt: 'An attacker uses dot-dot-slash (`../../etc/passwd`) syntax in file request parameters to escape the web root and read restricted files on the host server.',
      whyItMatters: 'Exposes operating system configuration files, passwords, and source code.',
      keyTerms: [{ term: 'Path Traversal', meaning: 'Navigating outside target folders using relative path notation.' }],
      links: [{ label: 'OWASP Path Traversal', url: 'https://owasp.org' }],
      onlineTools: [{ name: 'PortSwigger Directory Traversal', url: 'https://portswigger.net' }],
      offlineTools: [{ name: 'wfuzz / ffuf', url: 'https://github.com/ffuf/ffuf' }]
    },
    7: {
      topic: 'Cross-Site Request Forgery (CSRF)',
      whatIsIt: 'Tricks an authenticated victim into executing unwanted actions on a web application in which they are currently logged in (like changing passwords or transferring funds).',
      whyItMatters: 'Mitigated by anti-CSRF tokens and SameSite cookie attributes.',
      keyTerms: [{ term: 'CSRF Token', meaning: 'A unique secret token included in forms to verify request origin.' }],
      links: [{ label: 'OWASP CSRF Prevention', url: 'https://owasp.org' }],
      onlineTools: [{ name: 'Browser Console / Network tab', url: 'https://developer.chrome.com' }],
      offlineTools: [{ name: 'Burp Suite CSRF PoC Generator', url: 'https://portswigger.net' }]
    },
    8: {
      topic: 'Command Injection (RCE)',
      whatIsIt: 'When an application passes unsafe user-supplied data to a system shell (e.g. executing `ping [user_ip]`), appending `; cat /etc/passwd` or `& whoami` executes arbitrary system commands.',
      whyItMatters: 'Leads to complete server takeover (Remote Code Execution).',
      keyTerms: [{ term: 'RCE', meaning: 'Remote Code Execution — executing commands directly on the server OS.' }],
      links: [{ label: 'PortSwigger OS Command Injection', url: 'https://portswigger.net' }],
      onlineTools: [{ name: 'Browser DevTools', url: 'https://developer.chrome.com' }],
      offlineTools: [{ name: 'Netcat / Commix', url: 'https://github.com/commixproject/commix' }]
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
