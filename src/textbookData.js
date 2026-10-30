// =====================================================================
//  COMPREHENSIVE CYBERSECURITY TEXTBOOK :: ANTI-CORPO FIELD MANUAL
//  Covers OSINT, Steganography, Cryptography, and Web Security (7 Chapters each).
//  Designed for complete beginners to understand real-world digital mechanics,
//  featuring everyday analogies, famous real-world breaches, investigator steps,
//  and zero-download online tools.
// =====================================================================

export const TEXTBOOK = {
  // ===================================================================
  //  1. OSINT (OPEN SOURCE INTELLIGENCE)
  // ===================================================================
  OSINT: {
    1: {
      topic: 'Geographic Coordinates & Global Landmark Geolocation (Warm-Up 1)',
      whatIsIt: 'Every point on the surface of the Earth can be pinpointed using a pair of numbers known as Geographic Coordinates: Latitude (north-south position relative to the Equator) and Longitude (east-west position relative to the Prime Meridian in Greenwich, London). Modern GPS systems and mapping platforms use Decimal Degrees (such as 48.8584, 2.2945). By entering these coordinates into mapping software, investigators can instantly jump across continents to inspect specific buildings, terrain, and monuments.',
      beginnerAnalogy: 'Think of the planet as a giant chessboard with numbered grid lines. If someone tells you "move your piece to square D4", there is only one square in the world that matches. Latitude and Longitude are the world\'s GPS chessboard coordinates.',
      realWorldCase: {
        headline: 'How Citizen Sleuths Geocached The Stolen "He Will Not Divide Us" Flag',
        story: 'In 2017, actor Shia LaBeouf installed an anti-Trump art project featuring a white flag with the slogan "He Will Not Divide Us" streaming on a 24/7 webcam from an undisclosed rural hideout with only the sky and occasional birds visible. Internet sleuths on 4chan studied commercial airline flight contrails overhead, cross-referenced the flight paths with FAA flight logs, matched star constellations visible at night, and pinpointed the exact latitude and longitude of the flag to a field in Greenville, Tennessee within 36 hours.',
        takeaway: 'Global coordinates can be determined from the sky above or directly mapped to uncover hidden assets.'
      },
      whyItMatters: 'Investigators frequently receive anonymous tips, flight manifests, or phone dumps containing raw coordinate pairs. Knowing how to paste and interpret coordinate formats instantly reveals where real-world operations are anchored.',
      stepByStep: [
        '1. Copy the coordinate pair provided in the tip: 48.8584, 2.2945.',
        '2. Open Google Maps (maps.google.com) or OpenStreetMap (openstreetmap.org).',
        '3. Paste the numbers into the search bar and hit Enter.',
        '4. Observe where the red pin drops in Paris, France: on the Champ de Mars at the base of the Eiffel Tower (eiffeltower)!'
      ],
      keyTerms: [
        { term: 'Decimal Degrees (DD)', meaning: 'Coordinate format expressing latitude and longitude as decimal fractions (e.g. 48.8584, 2.2945).' },
        { term: 'Latitude', meaning: 'Distance north or south of the Equator, measured in degrees from -90° to +90°.' },
        { term: 'Longitude', meaning: 'Distance east or west of the Prime Meridian, measured in degrees from -180° to +180°.' }
      ],
      links: [
        { label: 'Google Maps Coordinate Search Guide', url: 'https://support.google.com/maps/answer/18539' },
        { label: 'Bellingcat Geolocation Guide for Beginners', url: 'https://www.bellingcat.com' }
      ],
      onlineTools: [
        { name: 'Google Maps', url: 'https://maps.google.com', note: 'Paste coordinates directly into the search bar to place a pinpoint' },
        { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org', note: 'Community-driven global map with detailed building outlines' },
        { name: 'GeoHack', url: 'https://www.geohack.net', note: 'Universal coordinate gateway linking to satellite and topographical maps' }
      ],
      offlineTools: [
        { name: 'Google Earth Pro', url: 'https://www.google.com/earth/about/versions/', note: 'Desktop 3D globe with historical satellite imagery' }
      ]
    },
    2: {
      topic: 'IP Address Reconnaissance, ASN Ownership & WHOIS (Warm-Up 2)',
      whatIsIt: 'Every device and server connected to the global internet is assigned an IP (Internet Protocol) address. An address like 8.8.8.8 looks like random digits, but the global internet is partitioned into blocks managed by organizations and routed via Autonomous System Numbers (ASNs). Through WHOIS registration registries (ARIN, RIPE, APNIC), investigators can query any IP address to discover which company operates it, its geographic routing hub, and its registered technical contacts.',
      beginnerAnalogy: 'An IP address is like a telephone number with international and area codes. Looking up an IP in WHOIS is like checking the global yellow pages to see whether a phone number belongs to a local bakery, an electric utility, or a multinational corporation.',
      realWorldCase: {
        headline: 'Unmasking the Mirai Botnet Command Servers',
        story: 'In 2016, the massive Mirai botnet knocked major services like Twitter, Netflix, and Spotify offline by enslaving millions of smart cameras and home routers. Cybersecurity researchers traced the denial-of-service traffic back to specific IP addresses. Running those IPs through WHOIS and BGP routing tables revealed the botnet controllers were hosted on specialized "bulletproof" hosting providers in Eastern Europe, leading the FBI directly to the university student authors.',
        takeaway: 'No server communicates on the internet without an IP address; WHOIS records link digital infrastructure to corporate owners.'
      },
      whyItMatters: 'Network logs and server traffic dumps are filled with external IP connections. Determining who owns an address (e.g. Google Public DNS at 8.8.8.8 vs a rogue VPN provider) is critical to assessing whether traffic is routine or malicious.',
      stepByStep: [
        '1. Copy the target IP address: 8.8.8.8.',
        '2. Open an IP lookup service like ipinfo.io or whois.domaintools.com.',
        '3. Query 8.8.8.8 and inspect the "Organization" / "OrgName" / "AS Name" field.',
        '4. Notice that 8.8.8.8 belongs to Autonomous System AS15169 operated by Google LLC (google) as their global public DNS server!'
      ],
      keyTerms: [
        { term: 'IP Address (IPv4)', meaning: 'A 32-bit numeric address (four octets) identifying a network interface on the internet.' },
        { term: 'WHOIS', meaning: 'A query and response protocol used for querying databases that store the registered users of an IP address or domain.' },
        { term: 'Autonomous System (ASN)', meaning: 'A collection of connected IP routing prefixes under the control of a single network operator.' }
      ],
      links: [
        { label: 'Hurricane Electric BGP & IP Toolkit', url: 'https://bgp.he.net' },
        { label: 'ARIN (American Registry for Internet Numbers)', url: 'https://www.arin.net' }
      ],
      onlineTools: [
        { name: 'ipinfo.io', url: 'https://ipinfo.io', note: 'Instant IP lookup showing ISP, Organization, Country, and ASN' },
        { name: 'BGP HE IP Toolkit', url: 'https://bgp.he.net/ip/8.8.8.8', note: 'Complete routing hierarchy and prefix ownership' },
        { name: 'Who.is', url: 'https://who.is', note: 'Global domain and IP address WHOIS search engine' }
      ],
      offlineTools: [
        { name: 'whois CLI', url: 'https://man7.org/linux/man-pages/man1/whois.1.html', note: 'Terminal command: whois 8.8.8.8' }
      ]
    },
    3: {
      topic: 'Social Media Intelligence (SOCMINT) & Profile Footprinting (Chain Stage 1)',
      whatIsIt: 'Social Media Intelligence (SOCMINT) is the discipline of gathering and analyzing information openly shared on social platforms like Instagram, Twitter/X, and LinkedIn. Users inadvertently create a detailed psychological and behavioral dossier about themselves through their account bio, recurring photo subjects, hashtags, stories, and caption commentary. Finding a target based on their bio description ("a guy who hates to click photos") is the first step in establishing an individual\'s digital profile.',
      beginnerAnalogy: 'Imagine walking into someone\'s home for the first time. Even if the owner says nothing, looking at the scarves hanging by the door, the team posters in the hallway, and the books on the coffee table immediately tells you what sports they follow and how they spend their weekends.',
      realWorldCase: {
        headline: 'How Instagram Posts Trapped the "Bling Ring" Celebrities Thieves',
        story: 'In Los Angeles, a ring of teenage burglars stole millions in jewelry from Paris Hilton, Lindsay Lohan, and Orlando Bloom. Police detectives unmasked the culprits by analyzing social media check-ins and Instagram posts where the thieves posed wearing distinctive stolen designer jackets and watches, corroborating their attendance at VIP clubs on the nights of the robberies.',
        takeaway: 'People broadcast their passions and real-time habits on social media without realizing investigators are taking notes.'
      },
      whyItMatters: 'Finding an elusive target\'s personal account unlocks their real-world habits, passions (like football), travel frequency, and social circles.',
      stepByStep: [
        '1. Search for the target persona on Instagram by searching for the phrase "a guy who hates to click photos" or using Google dorks: `site:instagram.com "a guy who hates to click photos"`.',
        '2. Open the matching Instagram profile.',
        '3. Scroll through his feed and story highlights: observe the stadium photos, match broadcasts, team jerseys, and pitch snapshots.',
        '4. Confirm the sport he watches and follows: football!'
      ],
      keyTerms: [
        { term: 'SOCMINT', meaning: 'Social Media Intelligence — intelligence gathering based on social network content and interactions.' },
        { term: 'Target Profiling', meaning: 'Reconstructing an individual\'s lifestyle, interests, and routines from their digital exhaust.' },
        { term: 'Google Dorking', meaning: 'Using specialized search engine filters (like site:instagram.com) to uncover obscure profiles.' }
      ],
      links: [
        { label: 'OSINT Combine: Social Media Intelligence Guide', url: 'https://www.osintcombine.com' }
      ],
      onlineTools: [
        { name: 'Instagram Search', url: 'https://www.instagram.com', note: 'Search directly in Instagram accounts and bios' },
        { name: 'Google Advanced Search', url: 'https://www.google.com/advanced_search', note: 'Filter search queries by exact phrase and site domain' }
      ],
      offlineTools: []
    },
    4: {
      topic: 'Geotag Clustering & Pattern-of-Life Analysis (Chain Stage 2)',
      whatIsIt: 'Pattern-of-Life analysis is the forensic technique of tracking an individual\'s recurring spatial habits over time. While a single photo geotag only tells you where someone was for one second, plotting dozens of posts onto a timeline creates "clusters"—geographic hotspots that reveal where an individual lives, works, commutes, and relaxes. On Instagram, users frequently attach location tags (like Churchgate) to their posts or photograph identifiable neighborhood street furniture.',
      beginnerAnalogy: 'Like observing a bird\'s flight patterns over a forest. If you plot sightings on a map, 90% of the dots will cluster around a specific oak tree. That tree is the nest. In OSINT, location clusters reveal a person\'s home base and favorite haunts.',
      realWorldCase: {
        headline: 'Strava Fitness Heatmaps Exposing Secret Military Bases',
        story: 'In 2018, fitness-tracking app Strava released a global heatmap visualizing 3 trillion GPS data points recorded by users exercising. In remote deserts of Syria, Somalia, and Afghanistan, the global map was completely dark except for distinct glowing running tracks outline in the shape of forward operating bases and CIA black sites. Soldiers jogging with smartwatches had illuminated the perimeter walls of classified military compounds.',
        takeaway: 'Repeated physical activity always forms a statistical cluster that cannot be hidden.'
      },
      whyItMatters: 'Identifying a target\'s favorite hangout spot (Churchgate / church_gate) narrows down physical surveillance zones, local transportation lines, and nearby civic institutions.',
      stepByStep: [
        '1. Review all the location tags at the top of each photo on the target\'s Instagram feed.',
        '2. Count which location or neighborhood tag appears repeatedly.',
        '3. Notice that the South Mumbai historic district/terminus Churchgate (church_gate) is tagged more than any other place.',
        '4. Confirm the answer: church_gate!'
      ],
      keyTerms: [
        { term: 'Pattern of Life (PoL)', meaning: 'A continuous record of an individual\'s typical behaviors, routes, and habits over time.' },
        { term: 'Geotag Clustering', meaning: 'Grouping geographic coordinates to identify high-frequency routine locations.' }
      ],
      links: [
        { label: 'Bellingcat Pattern of Life Investigation Methods', url: 'https://www.bellingcat.com' }
      ],
      onlineTools: [
        { name: 'Instagram Location Tag Search', url: 'https://www.instagram.com', note: 'View all public photos tagged at a specific venue or station' },
        { name: 'Google Maps', url: 'https://maps.google.com', note: 'Inspect the Churchgate district, suburban rail terminus, and surroundings' }
      ],
      offlineTools: []
    },
    5: {
      topic: 'Visual GeoINT & Historical Photo Analysis (Chain Stage 3)',
      whatIsIt: 'An account\'s digital history is a chronological archive. In OSINT investigations, scrolling down to the very first photograph ever published represents "The Origin"—often taken years earlier when the user was less privacy-conscious. By isolating distinctive architectural structures (such as stone meditation domes, temple ashrams, or natural cliff faces) and running a reverse visual search, investigators can pinpoint the exact historical monument visited.',
      beginnerAnalogy: 'Think of looking through a family photo album. The newest photos show someone in their current home, but if you flip all the way back to Page 1, you see a picture of the old family farm where everything started. The earliest post reveals foundational roots.',
      realWorldCase: {
        headline: 'Geolocation of ISIS Training Camps via First Propaganda Uploads',
        story: 'In 2014, intelligence analysts geolocated a covert training camp in northern Iraq by analyzing the very first training graduation photo posted by a recruit. The photo showed recruits standing in front of a unique stone water intake tower and mountain ridgeline. By reverse-searching the water tower against regional civil engineering archives, analysts matched it to the Mosul Dam reservoir, guiding tactical interdiction.',
        takeaway: 'First photos often capture distinctive, unmodified architectural landmarks.'
      },
      whyItMatters: 'The target\'s earliest post captures an iconic pilgrimage/travel site. Reverse-searching the distinctive dome architecture uncovers the exact landmark: the Beatles Ashram in Rishikesh.',
      stepByStep: [
        '1. Scroll all the way down to the bottom of the target\'s Instagram feed to the earliest posted photo.',
        '2. Take a clear screenshot of the photo.',
        '3. Upload the image to Google Lens (images.google.com) or Yandex Visual Search.',
        '4. Recognize the distinctive circular stone meditation cells (Chaurasi Kutia) of the world-famous Beatles Ashram in Rishikesh: beatlesashram!'
      ],
      keyTerms: [
        { term: 'Chronological Sifting', meaning: 'Reviewing social media history backwards in time to locate origin posts and unedited early photos.' },
        { term: 'Visual Feature Matching', meaning: 'Identifying unique architectural textures, domes, and facades to resolve locations.' }
      ],
      links: [
        { label: 'Google Lens Visual Search Portal', url: 'https://images.google.com' }
      ],
      onlineTools: [
        { name: 'Google Lens', url: 'https://images.google.com', note: 'Drop the cropped photo into Google Lens to identify the monument' },
        { name: 'Yandex Images', url: 'https://yandex.com/images', note: 'Excellent at recognizing obscure historical monuments and ruins' }
      ],
      offlineTools: []
    },
    6: {
      topic: 'Cross-Platform Identity Pivoting & Creator Traces (Chain Stage 4)',
      whatIsIt: 'People rarely maintain an online presence isolated to a single service. A username, custom handle, or personal branding used on Instagram frequently leaves traces across YouTube channels, podcast descriptions, GitHub repositories, or creator forums. In cross-platform pivoting, investigators search the exact account branding across search engines to locate community posts or collaborative media where collaborators or family address the person by their real name.',
      beginnerAnalogy: 'Imagine someone wearing a superhero mask at a party. They don\'t introduce themselves, but a friend walks up, pats them on the back, and says "Hey Abhyudaya, great to see you!" Anyone standing nearby now knows the real identity behind the mask.',
      realWorldCase: {
        headline: 'How Russian FSB Poisoners Were Unmasked by Yandex Food Leaks',
        story: 'In 2022, Bellingcat investigators identified undercover Russian state security operatives involved in chemical poisonings. The operatives used aliases for their operational duties, but investigators took their private phone numbers and handles and queried a leaked Yandex Food delivery database. The delivery records listed their real first and last names and orders placed directly to the FSB headquarters in Moscow.',
        takeaway: 'Cross-referencing an alias on external platforms will eventually lead to a service where the real name was recorded.'
      },
      whyItMatters: 'Finding the real human behind a handle ("Abhyudaya") transforms an anonymous handle into a real, verifiable identity.',
      stepByStep: [
        '1. Take the exact Instagram account name / handle.',
        '2. Search the handle on Google wrapped in quotation marks: `"handle_name"`.',
        '3. Search for the handle on YouTube.',
        '4. Inspect a YouTube community post or creator mention discussing the channel/project.',
        '5. Extract the account owner\'s real first name: abhyudaya!'
      ],
      keyTerms: [
        { term: 'Cross-Platform Pivot', meaning: 'Using an identifier from one platform to discover linked accounts on other networks.' },
        { term: 'Attribution', meaning: 'The process of determining the human individual responsible for a digital persona or operation.' }
      ],
      links: [
        { label: 'Google Advanced Search Operators', url: 'https://www.google.com/advanced_search' }
      ],
      onlineTools: [
        { name: 'Google Search with Quotes', url: 'https://www.google.com', note: 'Search exact string: "handle_name" to find mentions across the web' },
        { name: 'YouTube Search', url: 'https://www.youtube.com', note: 'Look for channel community tab announcements and credits' }
      ],
      offlineTools: []
    },
    7: {
      topic: 'Civic Infrastructure & Public Operating Hours Forensics (Chain Finale)',
      whatIsIt: 'The culmination of physical and social OSINT is bridging digital media with municipal and civic records. Once the geographic neighborhood of an individual\'s latest post is identified, investigators analyze local civic infrastructure—public libraries, reading halls, courthouses, or transport hubs—using municipal websites, Google Business listings, and civic notices to determine operational schedules (such as regular Monday opening and closing hours in 24-hour time format).',
      beginnerAnalogy: 'You see a friend\'s photo showing the front steps of a stately heritage building with stone pillars. You identify the neighborhood, find the public library located right there, and check the library\'s municipal schedule to know that its doors are open on Mondays from 9:30 AM to 7:00 PM (9:30-19:00).',
      realWorldCase: {
        headline: 'Forensic Alibi Verification in High-Profile Legal Trials',
        story: 'In corporate litigation and criminal defense cases, physical alibis frequently depend on verifying municipal operating schedules. Defense investigators examine surveillance footage or social photos claimed to be taken during business hours, then cross-reference municipal gazettes and official library/post office timestamps to prove whether a facility was actually open or closed at that exact hour.',
        takeaway: 'Public municipal timetables and civic records anchor photographic evidence to physical reality.'
      },
      whyItMatters: 'Combining photographic neighborhood clues with municipal operating schedules confirms the exact Monday timetable (9:30-19:00) of the area\'s central public library, completing the master intelligence chain.',
      stepByStep: [
        '1. Look at the latest photo posted on the target\'s Instagram account.',
        '2. Identify the neighborhood and street location shown in the photograph.',
        '3. Search for the prominent public library in that immediate district.',
        '4. Check the library\'s official operating schedule for a regular Monday.',
        '5. Format the opening and closing hours in 24-hour time format: 9:30-19:00!'
      ],
      keyTerms: [
        { term: 'Civic OSINT', meaning: 'Extracting intelligence from public municipal records, library schedules, and government directories.' },
        { term: '24-Hour Time Format', meaning: 'Time notation where the day runs from 00:00 to 23:59 (e.g. 19:00 represents 7:00 PM).' }
      ],
      links: [
        { label: 'OpenStreetMap Civic Buildings', url: 'https://www.openstreetmap.org' }
      ],
      onlineTools: [
        { name: 'Google Maps Business Hours', url: 'https://maps.google.com', note: 'Inspect the "Hours" tab on local public library listings' },
        { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org', note: 'Locate public civic buildings and libraries by district' }
      ],
      offlineTools: []
    }
  },

  // ===================================================================
  //  2. STEGANOGRAPHY (THE WHISTLEBLOWER TRAIL)
  // ===================================================================
  Stegano: {
    1: {
      topic: 'Document Concealment & Whitespace Font Camouflage (Warm-Up 1)',
      whatIsIt: 'Steganography literally means "covered writing" (from Greek steganós, meaning covered or concealed). The simplest form of steganography hides data within digital documents by exploiting human perception: setting text color to pure white (#FFFFFF) against a white page background. While completely invisible to human eyes, the characters remain fully present in the document\'s digital file structure.',
      beginnerAnalogy: 'Imagine writing a secret note on white paper using white invisible ink. Anyone glancing at the desk sees only a blank sheet. But if you brush charcoal dust over the paper or shine an ultraviolet blacklight over it, the words immediately leap out.',
      realWorldCase: {
        headline: 'Sneaky Contract Clauses & The "Invisible Terms" Controversy',
        story: 'In 2005, a major corporate lawsuit erupted between Canadian telecom giant Rogers Communications and Bell Aliant over a 14-page contract. A dispute over a single ambiguous comma cost Rogers $2.13 million. Since then, forensic legal auditors routinely discover predatory employment agreements and shady Terms of Service that use micro-fonts, low opacity, or white-on-white text at the end of agreements to hide mandatory arbitration clauses and non-compete liabilities from casual readers.',
        takeaway: 'Never assume what you see on a digital page is all that exists. Always select all text or inspect raw structure.'
      },
      whyItMatters: 'EvilCorp legal teams bury anti-whistleblower penalties and surveillance consent waivers in plain sight. Whistleblowers use that exact same trick to smuggle resistance messages past automated corporate document scanners.',
      stepByStep: [
        '1. Open the `.docx` document in Microsoft Word, LibreOffice Writer, or Google Docs.',
        '2. Press Ctrl+A (or Cmd+A on Mac) to "Select All" content. Notice if the selection highlight stretches past the visible text.',
        '3. Change the font color from White/Automatic to Dark Black or Bright Red.',
        '4. Alternatively, rename the file extension from `.docx` to `.zip`, open it with 7-Zip, and inspect `word/document.xml` in Notepad!'
      ],
      keyTerms: [
        { term: 'Font Camouflage', meaning: 'Rendering text in a color identical to the background canvas so it is invisible until highlighted.' },
        { term: 'DOCX Format', meaning: 'Modern Microsoft Word files are actually zipped archives containing XML markup and asset folders.' },
        { term: 'Select All (Ctrl+A)', meaning: 'Universal OS shortcut to highlight all text objects, exposing hidden whitespace characters.' }
      ],
      links: [
        { label: 'How DOCX Files Are Structured (XML & ZIP)', url: 'https://en.wikipedia.org/wiki/Office_Open_XML' }
      ],
      onlineTools: [
        { name: 'Google Docs', url: 'https://docs.google.com', note: 'Upload document, press Ctrl+A, and change text color to black' },
        { name: 'CyberChef (Strings)', url: 'https://cyberchef.org', note: 'Drop the docx file into CyberChef and run "Strings" to extract all text' }
      ],
      offlineTools: [
        { name: 'LibreOffice Writer', url: 'https://www.libreoffice.org', note: 'Free, open-source office suite that respects raw XML formatting' },
        { name: '7-Zip', url: 'https://www.7-zip.org', note: 'Right-click .docx -> Open Archive -> extract word/document.xml' }
      ]
    },
    2: {
      topic: 'Image EXIF Metadata & Embedded Header Annotations (Warm-Up 2)',
      whatIsIt: 'When graphic designers and digital cameras save a JPEG or PNG, the file contains a header section dedicated to metadata. Standard fields include the camera lens, exposure, and software used. Crucially, image standards include freeform text fields such as `Comments`, `UserComment`, `Description`, and `Artist`. These fields can hold hundreds of words of hidden text that never appear on the actual picture.',
      beginnerAnalogy: 'Think of a framed oil painting in a museum. Everyone looks at the painted canvas on the front. But if you take the frame off the wall and flip it over, there is an artist\'s handwritten note taped to the wooden backing. EXIF metadata is that note on the back of the frame.',
      realWorldCase: {
        headline: 'Operation Shady RAT & The Malware That Communicated via EXIF Comments',
        story: 'In an infamous state-sponsored cyber espionage campaign dubbed "Operation Shady RAT," threat actors infiltrated defense contractors and international Olympic committees. To evade firewalls, the malware communicated with its command-and-control servers by downloading harmless JPEG images from public websites. The images looked like ordinary vacation photos, but the hackers hid encrypted server IP addresses inside the EXIF "Comments" tag, allowing the malware to receive orders without raising security alarms.',
        takeaway: 'Antivirus software often ignores image metadata tags, making them a favorite hiding spot for covert instructions.'
      },
      whyItMatters: 'EvilCorp hands out promotional swag and recruit mugs. Whistleblowers take photos of these items and stash internal clearance passwords and warning notes inside the image comments where security scanners never look.',
      stepByStep: [
        '1. Download the original `Evil_Mug.jpg` image.',
        '2. On Windows: Right-click the file -> click `Properties` -> switch to the `Details` tab -> look at the `Comments` field.',
        '3. In a web browser: Upload the picture to `exif.tools` or `jimpl.com` to inspect every header tag.',
        '4. Extract the note hidden inside the comment field.'
      ],
      keyTerms: [
        { term: 'EXIF Comment Tag', meaning: 'A freeform text string embedded directly in the image header chunk.' },
        { term: 'Steganographic Carrier', meaning: 'An innocent-looking host file used to smuggle secret information.' }
      ],
      links: [
        { label: 'ExifTool Tag Documentation for JPEGs', url: 'https://exiftool.org/TagNames/EXIF.html' }
      ],
      onlineTools: [
        { name: 'exif.tools', url: 'https://exif.tools', note: 'Instant in-browser EXIF viewer — look at the "Comments" line' },
        { name: 'Jimpl Metadata Viewer', url: 'https://jimpl.com', note: 'Fast online metadata inspector with zero data retention' },
        { name: 'CyberChef (Extract EXIF)', url: 'https://cyberchef.org', note: 'Drop image into CyberChef with the "Extract EXIF" recipe' }
      ],
      offlineTools: [
        { name: 'Windows File Explorer', url: 'https://microsoft.com', note: 'Right-click file -> Properties -> Details tab' },
        { name: 'ExifTool CLI', url: 'https://exiftool.org', note: 'Terminal command: exiftool "Evil Mug.jpg"' }
      ]
    },
    3: {
      topic: 'Low-Contrast Pixel Luminance & Near-Black Text (Chain Stage 1)',
      whatIsIt: 'Digital screens display images using RGB (Red, Green, Blue) color channels, where each channel has a value between 0 (complete darkness) and 255 (maximum brightness). Pure black is RGB(0, 0, 0). If someone paints text in near-black pixels like RGB(10, 10, 10) on a pure black background, human eyes on ordinary computer monitors literally cannot perceive the difference—it looks like a solid black rectangle. But mathematically, the numbers are completely different!',
      beginnerAnalogy: 'Imagine standing in a pitch-black cave. You can\'t see your hand in front of your face. But if you turn on night-vision goggles or a bright flashlight, all the hidden carvings on the cave walls become crystal clear. Image brightness adjustments are digital night-vision goggles.',
      realWorldCase: {
        headline: 'Forensic Video Enhancement in Criminal Investigations',
        story: 'In countless hit-and-run and burglary investigations, security cameras capture footage at night where license plates or suspect faces appear completely black. Forensic video analysts at the FBI use "Histogram Equalization" and luminance curve stretching to amplify faint light values, turning dark shadows into readable license numbers without altering the underlying digital evidence.',
        takeaway: 'What appears invisible to human vision is often fully recorded in the mathematics of the image file.'
      },
      whyItMatters: 'The EvilCorp insider stored their "black book" as a black square to fool corporate surveillance cameras. Forensic investigators stretch the histogram to bring the invisible numbers to light.',
      stepByStep: [
        '1. Open `BLACKBOOK.png` in an image editor like Photopea (free web Photoshop at photopea.com).',
        '2. Navigate to the top menu: `Image` -> `Adjustments` -> `Brightness/Contrast`.',
        '3. Crank the Brightness slider all the way to +100%.',
        '4. Alternatively, use `Image` -> `Adjustments` -> `Levels` or `Curves` and pull the shadow marker to the right until the text appears!'
      ],
      keyTerms: [
        { term: 'Luminance', meaning: 'The photometric measure of luminous intensity per unit area of light traveling in a given direction.' },
        { term: 'Histogram Equalization', meaning: 'A computer vision technique that stretches the dynamic range of an image to increase global contrast.' },
        { term: 'Levels & Curves', meaning: 'Color correction tools that map input brightness values to new output values.' }
      ],
      links: [
        { label: 'Photopea Online Image Editor', url: 'https://www.photopea.com', note: 'Free Photoshop clone that runs entirely in your web browser' }
      ],
      onlineTools: [
        { name: 'Photopea', url: 'https://www.photopea.com', note: 'Image -> Adjustments -> Brightness/Contrast (slide to max) or Levels' },
        { name: 'Aperisolve', url: 'https://www.aperisolve.com', note: 'Automated steganography analyzer that separates contrast layers' }
      ],
      offlineTools: [
        { name: 'GIMP', url: 'https://www.gimp.org', note: 'Open image -> Colors -> Levels -> drag the middle triangle to brighten' },
        { name: 'ImageMagick CLI', url: 'https://imagemagick.org', note: 'Command: magick convert blackbook.png -level 0%,3% output.png' }
      ]
    },
    4: {
      topic: 'Steghide Passphrase Injection & 8-Bit ASCII Binary Decoding (Chain Stage 2)',
      whatIsIt: 'Steghide is one of the most famous and sophisticated steganography utilities ever created. Unlike naive tools that just change pixel colors, Steghide uses advanced graph theory and encryption (Rijndael/AES) to embed files inside JPEGs, BMPs, and WAV audio without changing the file size or degrading visual quality. To extract the hidden file, you MUST supply the exact passphrase. The extracted file can contain further encoded data, such as raw 8-bit binary numbers (e.g. `01000011 01000001 01010100...`).',
      beginnerAnalogy: 'Imagine a safe deposit box inside a bank vault. The safe box is hidden behind a painting on the wall (the cover photo). Even if you find the safe, you cannot open it without the secret combination lock (the passphrase). Inside the box is a sheet of paper with Morse code (binary) that you translate into English.',
      realWorldCase: {
        headline: 'The Russian SVR "Illegals" Spy Ring (Operation Ghostwriter)',
        story: 'In 2010, the FBI arrested 10 deep-cover Russian intelligence agents living ordinary suburban lives in the United States (including Anna Chapman). The FBI\'s court complaint revealed that the Russian foreign intelligence service (SVR) communicated with the agents using specialized steganography software nearly identical to Steghide. Russian handlers embedded encrypted military commands inside ordinary digital photos of cats, sunsets, and sporting events posted on public internet forums, which the agents decrypted using secret passwords.',
        takeaway: 'Steganography is not just a hacker game; it is an active weapon of international covert communications.'
      },
      whyItMatters: 'The whistleblower photographed their boss ("Gimmick Boss") and hid the master infiltration file inside the portrait, leaving the passphrase in the photo\'s metadata comments.',
      stepByStep: [
        '1. Check the image EXIF comment from Question 2\'s methodology: find the note `password:lifeisajoke`.',
        '2. Open an online Steghide extraction tool like FutureBoy (futureboy.us/stegano/decinput.html).',
        '3. Upload `Gimmick_Boss.jpg`, enter the password `lifeisajoke`, and download the extracted file.',
        '4. Open the extracted file: the final line contains 8-bit binary bits.',
        '5. Paste the binary string into CyberChef and select the "From Binary" operation to reveal the flag!'
      ],
      keyTerms: [
        { term: 'Steghide', meaning: 'Open-source steganography program capable of hiding data in various color and sample frequencies.' },
        { term: 'Passphrase-Protected Stego', meaning: 'Steganography where embedded bits are encrypted with a key before insertion.' },
        { term: '8-Bit Binary ASCII', meaning: 'Strings of 8 ones and zeros representing computer characters (e.g. 01000011 = \'C\').' }
      ],
      links: [
        { label: 'FutureBoy Online Stego Portal', url: 'https://futureboy.us/stegano/decinput.html' },
        { label: 'CyberChef From Binary Documentation', url: 'https://cyberchef.org' }
      ],
      onlineTools: [
        { name: 'FutureBoy Stego Decoder', url: 'https://futureboy.us/stegano/decinput.html', note: 'Upload photo, enter password: lifeisajoke, download secret file' },
        { name: 'CyberChef', url: 'https://cyberchef.org', note: 'Use "From Binary" operation with byte length 8' },
        { name: 'Aperisolve', url: 'https://www.aperisolve.com', note: 'Comprehensive web steganography toolkit' }
      ],
      offlineTools: [
        { name: 'Steghide CLI', url: 'http://steghide.sourceforge.net', note: 'Command: steghide extract -sf "Gimmick Boss.jpg" -p lifeisajoke' }
      ]
    },
    5: {
      topic: 'End-of-File (EOF) Appended Trailing Payloads (Chain Stage 3)',
      whatIsIt: 'Every digital file format follows strict international standards. A JPEG file always starts with the two-byte marker `FF D8` (Start of Image) and concludes with `FF D9` (End of Image / EOI). When an image viewer renders a picture on your screen, it reads the header, paints the pixels, and stops reading bytes the exact instant it encounters `FF D9`. Any data, text, or zip file glued AFTER `FF D9` is completely ignored by photo software, but remains permanently inside the file on your hard drive!',
      beginnerAnalogy: 'Imagine a book where the last page clearly says "THE END". Anyone reading the novel closes the book when they reach that line. But what if someone glued a secret diary into the back cover after the "THE END" page? Standard readers never see it, but anyone shaking the back cover discovers the secret.',
      realWorldCase: {
        headline: 'Stegware: How Malware Hides in Trailing Image Bytes',
        story: 'In 2021, cybersecurity researchers discovered a banking trojan disguised as cute animal memes on Discord. The meme photos opened normally when clicked. However, the malware script read past the JPEG `FF D9` trailer marker, extracted an appended executable payload, and launched it into system memory. Because antivirus tools scanned only the valid image dimensions, the file bypassed detection for months.',
        takeaway: 'A file\'s visual size and its byte size on disk are often two very different things.'
      },
      whyItMatters: 'The insider photographed the boss\'s chair ("EvilChair") and appended secret exit notes directly to the tail of the JPEG file past the EOI marker.',
      stepByStep: [
        '1. Open `EvilChair.jpg` in an in-browser hex editor like HexEd.it (hexed.it) or CyberChef.',
        '2. In HexEd.it, scroll all the way down to the very last lines of the file.',
        '3. Locate the `FF D9` marker. Notice the printable ASCII text sitting immediately after it!',
        '4. Read the appended plaintext flag directly from the right-hand text panel.'
      ],
      keyTerms: [
        { term: 'EOI Marker (FF D9)', meaning: 'The End of Image two-byte marker defined by the JPEG specification.' },
        { term: 'Trailing Overlay', meaning: 'Unmapped bytes appended past the natural end of a file.' },
        { term: 'Hex Viewer', meaning: 'Software displaying raw byte values in hexadecimal along with printable ASCII characters.' }
      ],
      links: [
        { label: 'Gary Kessler File Signatures Reference', url: 'https://www.garykessler.net/library/file_sigs.html' }
      ],
      onlineTools: [
        { name: 'HexEd.it', url: 'https://hexed.it', note: 'Browser hex editor — scroll to the very bottom to spot the appended CAT{...} flag' },
        { name: 'CyberChef (Strings)', url: 'https://cyberchef.org', note: 'Drop image and run "Strings" operation with minimum length 6' }
      ],
      offlineTools: [
        { name: 'strings CLI', url: 'https://man7.org/linux/man-pages/man1/strings.1.html', note: 'Command: strings EvilChair.jpg | Select-Object -Last 10' },
        { name: 'HxD Hex Editor', url: 'https://mh-nexus.de/en/hxd/', note: 'Free fast Windows hex editor' }
      ]
    },
    6: {
      topic: 'Audio Frequency Spectrogram Steganography (Chain Stage 4)',
      whatIsIt: 'Sound is composed of pressure waves oscillating at different frequencies (measured in Hertz, or Hz). Humans can hear sounds roughly between 20 Hz (deep bass) and 20,000 Hz (high pitch). A Spectrogram is a 2D visual representation of sound where the X-axis is time, the Y-axis is frequency, and color brightness is volume. By synthetically drawing images or letters into high audio frequencies (5,000 Hz to 15,000 Hz), sound designers can etch visual words directly into the sound wave! When played on a speaker, it sounds like an eerie tone or static—but when viewed on a spectrum analyzer, the words visually paint across the screen.',
      beginnerAnalogy: 'Imagine speaking into a microphone, but instead of words coming out, your voice blows sand across a glass table in such a precise way that the sand grains form visible letters. You don\'t hear the letters, but you see them formed in the vibration.',
      realWorldCase: {
        headline: 'Aphex Twin & The Demonic Face in "Windowlicker" / Doom (2016)',
        story: 'In 1999, electronic musician Aphex Twin released his famous track "Windowlicker". When fans analyzed the audio track through a spectrogram analyzer, an eerie, grinning photograph of his own face materialized out of the frequencies at the very end of the song! In 2016, composer Mick Gordon did the same for the Doom soundtrack, embedding pentagrams and the number "666" into the ultrasonic frequencies of the audio file.',
        takeaway: 'Audio files can hold pictures, and pictures can hold audio; digital signals are interchangeable mathematics.'
      },
      whyItMatters: 'EvilCorp broadcasts a high-frequency "memory wipe" tone over office intercoms to disorient employees. The whistleblower hijacked the broadcast to etch their secret code into the ultrasonic wave.',
      stepByStep: [
        '1. Download the audio recording `EvilCorp_memory_wipe.wav`.',
        '2. Open an online spectrum analyzer like Academo (academo.org/demos/spectrum-analyzer/) or AudioMass.',
        '3. Upload the WAV file and click Play while watching the frequency graph.',
        '4. Inspect the high frequency region between 5 kHz and 15 kHz: the secret word visually spells out in lowercase letters!',
        '5. Alternatively, open in Audacity, click the track title dropdown menu, and select "Spectrogram" view.'
      ],
      keyTerms: [
        { term: 'Spectrogram', meaning: 'A visual representation of the spectrum of frequencies in a signal as they vary with time.' },
        { term: 'FFT (Fast Fourier Transform)', meaning: 'Mathematical algorithm transforming time-domain sound waves into frequency-domain graphs.' },
        { term: 'Acoustic Steganography', meaning: 'Concealing text or visual imagery within audio recordings.' }
      ],
      links: [
        { label: 'Academo In-Browser Spectrum Analyzer', url: 'https://academo.org/demos/spectrum-analyzer/' },
        { label: 'Audacity Official Spectrogram Guide', url: 'https://manual.audacityteam.org/man/spectrogram_view.html' }
      ],
      onlineTools: [
        { name: 'Academo Spectrum Analyzer', url: 'https://academo.org/demos/spectrum-analyzer/', note: 'Upload audio in browser -> view letters drawn between 5kHz and 15kHz' },
        { name: 'AudioMass Web Audio Editor', url: 'https://audiomass.co', note: 'Free browser-based audio editor with spectrogram visualization' }
      ],
      offlineTools: [
        { name: 'Audacity', url: 'https://www.audacityteam.org', note: 'Open .wav -> click track dropdown -> select "Spectrogram" view' },
        { name: 'Sonic Visualiser', url: 'https://www.sonicvisualiser.org', note: 'Specialized scientific sound wave inspector' }
      ]
    },
    7: {
      topic: 'Visual Password Concealment & Chained Base64 Payload (Chain Stage 5)',
      whatIsIt: 'In advanced multi-stage steganography, no single technique is used in isolation. Instead, multiple concealment layers are chained together. In this capstone challenge, the password to an encrypted Steghide container was not written in metadata, but physically painted into the image pixels beneath a silhouette at near-zero opacity. Once high-contrast thresholding reveals the 4-digit PIN (`0004`), Steghide decrypts the payload, which yields a final Base64-encoded string (`Q0FUe3lvdWZvdW5kbWUhfQ==`) that must be decoded to capture the master flag.',
      beginnerAnalogy: 'Imagine an escape room: First you find a puzzle with faint scratch marks on a dark wall. Shining a UV light reveals the 4-digit code "0004". That code unlocks a locked chest. Inside the chest is a slip of paper written in French. You translate the French into English to get the final treasure.',
      realWorldCase: {
        headline: 'Cicada 3301 & The Multi-Layer Steganography Puzzles',
        story: 'In 2012, an anonymous cryptographic organization called Cicada 3301 posted an image on Reddit saying "Hello. We are looking for highly intelligent individuals." To solve the puzzle, contenders had to extract hidden text from an image with OutGuess, discover a hidden book cipher, connect to a Tor hidden service, reverse audio spectrograms, and decode Base64 and PGP signatures across a chain spanning dozens of countries. It remains the most famous multi-layered steganographic puzzle in internet history.',
        takeaway: 'Real adversaries stack visual, mathematical, and cryptographic layers together to create resilient concealment chains.'
      },
      whyItMatters: 'The EvilCorp whistleblower bundled their final master evidence in a 3-stage chain so that even if EvilCorp intercepted the file, they couldn\'t open it without following the entire forensic trail.',
      stepByStep: [
        '1. Open `tryfindme.jpg` in Photopea (photopea.com).',
        '2. Go to `Image` -> `Adjustments` -> `Levels` or `Exposure` and slide to the extreme until the faint 4-digit PIN `0004` appears below the silhouettes.',
        '3. Open the FutureBoy Steghide portal (futureboy.us/stegano/decinput.html) and upload `tryfindme.jpg` using password `0004`.',
        '4. Download the extracted file: it contains the Base64 ciphertext `Q0FUe3lvdWZvdW5kbWUhfQ==`.',
        '5. Paste into CyberChef with the "From Base64" operation to reveal the final flag: `CAT{youfoundme!}`!'
      ],
      keyTerms: [
        { term: 'Multi-Stage Steganography', meaning: 'Chaining multiple layers of concealment (visual hiding -> steghide -> Base64).' },
        { term: 'Base64 Envelope', meaning: 'Encoding a secret string so it looks like alphanumeric gibberish until decoded.' }
      ],
      links: [
        { label: 'The Cicada 3301 Story (TechCrunch Documentary)', url: 'https://en.wikipedia.org/wiki/Cicada_3301' }
      ],
      onlineTools: [
        { name: 'Photopea', url: 'https://www.photopea.com', note: 'Adjust Levels/Exposure to reveal the faint "0004" PIN below the silhouettes' },
        { name: 'FutureBoy Stego Decoder', url: 'https://futureboy.us/stegano/decinput.html', note: 'Extract embedded file using password "0004"' },
        { name: 'CyberChef', url: 'https://cyberchef.org', note: 'Use "From Base64" operation to decode Q0FU... string' }
      ],
      offlineTools: [
        { name: 'Steghide CLI', url: 'http://steghide.sourceforge.net', note: 'Command: steghide extract -sf tryfindme.jpg -p 0004' }
      ]
    }
  },

  // ===================================================================
  //  3. CRYPTOGRAPHY (ANTI-CORPO INFILTRATION)
  // ===================================================================
  Crypto: {
    1: {
      topic: 'ROT13 & Symmetric Caesar Rotation (Warm-Up 1)',
      whatIsIt: 'ROT13 ("rotate by 13 places") is the simplest form of a Caesar substitution cipher. The standard English alphabet has 26 letters. By shifting every letter forward by 13 positions, A becomes N, B becomes O, and M becomes Z. Crucially, because 13 is exactly half of 26, applying ROT13 a second time rotates the letters by another 13 positions (13 + 13 = 26), returning the text back to its original plain English! ROT13 provides ZERO cryptographic security; it is purely visual obfuscation.',
      beginnerAnalogy: 'Imagine a circular clock face with 26 hours instead of 12. If you turn the clock hand forward halfway around the circle (13 hours), and then turn it forward another halfway around (13 hours), you end up right back where you started.',
      realWorldCase: {
        headline: 'Usenet Spoilers & The Lazy Corporate Obfuscation',
        story: 'ROT13 was invented in the early 1980s on Usenet newsgroups so forum members could post movie spoilers, puzzle solutions, and offensive jokes without accidental reading. However, countless corporate software developers lazily used ROT13 to "encrypt" internal passwords. In the 1990s, early versions of Microsoft Windows stored user program execution histories in the Windows Registry obfuscated with ROT13, believing auditors wouldn\'t notice.',
        takeaway: 'Never mistake obfuscation for encryption. If an algorithm requires no secret key, anyone can reverse it.'
      },
      whyItMatters: 'EvilCorp compliance directors used a lazy ROT13 rotation to hide anti-privacy memos from external auditors, believing regulators wouldn\'t bother rotating the letters.',
      stepByStep: [
        '1. Inspect the ciphertext: `PNG{rivypbec_cevinpl_vf_n_zlgu}`.',
        '2. Notice the `PNG{` prefix: rotating P by 13 steps gives C; N gives A; G gives T (`CAT{`).',
        '3. Open CyberChef (cyberchef.org) and add the "ROT13" operation, or visit rot13.com.',
        '4. Paste the ciphertext to immediately read EvilCorp\'s secret memo in plain English.'
      ],
      keyTerms: [
        { term: 'ROT13', meaning: 'Symmetric Caesar substitution cipher with a fixed shift offset of 13.' },
        { term: 'Substitution Cipher', meaning: 'Replacing each character with a corresponding character from a shifted alphabet.' }
      ],
      links: [
        { label: 'CyberChef ROT13 Recipe', url: 'https://cyberchef.org' }
      ],
      onlineTools: [
        { name: 'CyberChef', url: 'https://cyberchef.org', note: 'Search for "ROT13" in the operations menu' },
        { name: 'ROT13.com', url: 'https://rot13.com', note: 'Instant in-browser ROT13 encoder and decoder' }
      ],
      offlineTools: [
        { name: 'tr a-zA-Z n-za-mN-ZA-M', url: 'https://man7.org/linux/man-pages/man1/tr.1.html', note: 'Classic Unix terminal one-liner for ROT13' }
      ]
    },
    2: {
      topic: 'Base64 Representation & Telemetry Deobfuscation (Warm-Up 2)',
      whatIsIt: 'Base64 is NOT encryption! It is an encoding scheme designed in the early days of computing to transport 8-bit binary data (like images or compiled code) across legacy text-only networks (like email and HTTP URLs) without data corruption. It takes binary bytes and translates them into an alphabet of 64 safe ASCII characters: uppercase A-Z, lowercase a-z, numbers 0-9, plus `+` and `/`. If the input data is not an exact multiple of 3 bytes, Base64 pads the end with `=` or `==`.',
      beginnerAnalogy: 'Imagine packaging a fragile glass vase into a standardized cardboard shipping box covered in bubble wrap and duct tape. The box protects the vase while it moves through the postal system, but anyone with a pair of scissors can open the tape. Base64 is the cardboard box, not a locked safe.',
      realWorldCase: {
        headline: 'The False "Encrypted" Telemetry Lawsuit',
        story: 'In 2018, several mobile health and flashlight apps were sued by consumer protection agencies after advertising that patient and location data transmitted to advertising brokers was "securely encrypted". In reality, network sniffers revealed the apps were simply converting raw user GPS coordinates and phone contacts into Base64 strings. Because Base64 requires no password or cryptographic key, any eavesdropper on public Wi-Fi could read the medical data in plain text.',
        takeaway: 'Marketing brochures often label Base64 as "encryption" to deceive non-technical users.'
      },
      whyItMatters: 'EvilCorp claims their desktop telemetry is "end-to-end encrypted", but sniffing their outbound network packet reveals they are simply wrapping surveillance logs in standard Base64.',
      stepByStep: [
        '1. Inspect the intercepted string: `Q0FUe3RlbGVtZXRyeV9pc19ub3RfZW5jcnlwdGVkfQ==`.',
        '2. Notice the classic Base64 indicators: alphanumeric mix and trailing `==` padding.',
        '3. Open CyberChef (cyberchef.org) and add the "From Base64" operation.',
        '4. Paste the string to decode the plain text message.'
      ],
      keyTerms: [
        { term: 'Base64', meaning: 'Binary-to-text encoding scheme representing binary data in an ASCII string format.' },
        { term: 'Padding (=)', meaning: 'Characters appended to the end of a Base64 string to make its length a multiple of 4.' }
      ],
      links: [
        { label: 'MDN Web Docs: Base64 Encoding and Decoding', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Base64' }
      ],
      onlineTools: [
        { name: 'CyberChef', url: 'https://cyberchef.org', note: 'Use "From Base64" operation' },
        { name: 'Base64Decode.org', url: 'https://www.base64decode.org', note: 'Instant in-browser Base64 decoder' }
      ],
      offlineTools: [
        { name: 'base64 -d', url: 'https://man7.org/linux/man-pages/man1/base64.1.html', note: 'Standard Linux/Mac command: echo "..." | base64 -d' }
      ]
    },
    3: {
      topic: 'Hexadecimal Byte Streams & ASCII Conversion (Chain Stage 1)',
      whatIsIt: 'Computers do not understand letters; they only understand binary switches (0 and 1). Because reading long strings of ones and zeros (`01000011 01000001...`) is exhausting for humans, engineers represent every byte (8 bits) as a two-digit hexadecimal number (Base-16, using digits 0-9 and letters A-F). In the standard ASCII table, the byte `43` represents \'C\', `41` represents \'A\', and `54` represents \'T\'.',
      beginnerAnalogy: 'Think of Morse code where combinations of dots and dashes represent alphabet letters. Hexadecimal is simply the computer\'s native shorthand: every two characters represent one keyboard key.',
      realWorldCase: {
        headline: 'Wireshark Packet Analysis & The Cleartext Credential Sniff',
        story: 'When network engineers and security auditors inspect network traffic using packet sniffers like Wireshark, the raw packets are displayed as a two-column hex dump. In the 2010s, countless corporate FTP and Telnet sessions exposed administrative passwords because investigators could read the hex bytes on the right-hand panel without needing any decryption tools.',
        takeaway: 'Hexadecimal is the native language of network packets and binary memory.'
      },
      whyItMatters: 'EvilCorp\'s internal whistleblower transmitted an emergency raw byte broadcast containing the master infiltration key as a hex stream.',
      stepByStep: [
        '1. Inspect the hex stream: `43 41 54 7b 77 68 69 73 74 6c 65 62 6c 6f 77 65 72...`.',
        '2. Notice that pairs start with `43` (ASCII \'C\') and `41` (ASCII \'A\').',
        '3. Open CyberChef (cyberchef.org) and add the "From Hex" operation with delimiter "Space" or "Auto".',
        '4. Extract the whistleblower key: `SHADOWCORP`.'
      ],
      keyTerms: [
        { term: 'Hexadecimal (Hex)', meaning: 'Base-16 number system where 16 values are represented by 0-9 and A-F.' },
        { term: 'Byte', meaning: 'A unit of digital information consisting of eight bits, represented by two hex digits.' }
      ],
      links: [
        { label: 'ASCII Table and Hex Conversion Chart', url: 'https://www.asciitable.com' }
      ],
      onlineTools: [
        { name: 'CyberChef', url: 'https://cyberchef.org', note: 'Use "From Hex" operation' },
        { name: 'HexEd.it', url: 'https://hexed.it', note: 'Online browser hex editor with live ASCII translation' }
      ],
      offlineTools: [
        { name: 'xxd / hexdump', url: 'https://man7.org/linux/man-pages/man1/xxd.1.html', note: 'CLI tool to convert hex dumps back to binary' }
      ]
    },
    4: {
      topic: 'Polyalphabetic Vigenère Decryption (Chain Stage 2)',
      whatIsIt: 'Unlike a simple Caesar cipher that shifts every letter by the same fixed number, the Vigenère cipher uses a secret keyword to shift each letter by a different amount! If the key is `CAT`, the first letter is shifted by C (3), the second by A (0), and the third by T (19), repeating the key throughout the message. For over 300 years, Vigenère was celebrated as "le chiffre indéchiffrable" (the unbreakable cipher) because letter frequency analysis could not easily crack it without knowing the key.',
      beginnerAnalogy: 'Imagine having a combination lock with 20 dials, but instead of setting every dial to "3", you set dial 1 to "S", dial 2 to "H", dial 3 to "A", cycling through the word "SHADOWCORP". Anyone who tries to slide all dials equally will fail.',
      realWorldCase: {
        headline: 'Confederate Ciphers in the American Civil War',
        story: 'During the American Civil War, the Confederate military relied heavily on the Vigenère cipher, using secret brass cipher disks and rotating keywords like "COMPLETE VICTORY" and "COME RETRIBUTION". Union codebreakers repeatedly intercepted and decrypted their tactical dispatches because the Confederates reused the same short keywords across multiple battlefields.',
        takeaway: 'Repeating keywords creates mathematical cycles that modern cryptanalysis can shatter.'
      },
      whyItMatters: 'EvilCorp encrypted their executive dispatch with Vigenère using the whistleblower key recovered in Question 3 (`SHADOWCORP`).',
      stepByStep: [
        '1. Retrieve the ciphertext: `UHT{foauoi_hzpfw_wo_usmtf}`.',
        '2. Retrieve the key from Question 3: `SHADOWCORP`.',
        '3. Open CyberChef (cyberchef.org) and add the "Vigenère Decode" operation.',
        '4. Enter `SHADOWCORP` into the Key field to uncover the plain text message: `CAT{caesar_shift_is_seven}`.'
      ],
      keyTerms: [
        { term: 'Polyalphabetic Cipher', meaning: 'Any cipher based on substitution using multiple substitution alphabets.' },
        { term: 'Key Cycling', meaning: 'Repeating the secret keyword continuously to match the length of the plaintext.' }
      ],
      links: [
        { label: 'DCode Vigenère Solver & Cryptanalysis', url: 'https://www.dcode.fr/vigenere-cipher' }
      ],
      onlineTools: [
        { name: 'CyberChef', url: 'https://cyberchef.org', note: 'Use "Vigenère Decode" recipe with key SHADOWCORP' },
        { name: 'DCode Vigenère Solver', url: 'https://www.dcode.fr/vigenere-cipher' }
      ],
      offlineTools: []
    },
    5: {
      topic: 'Reverse Caesar Shift by Offset 7 (Chain Stage 3)',
      whatIsIt: 'Named after Julius Caesar, who used it to protect military messages, the Caesar shift moves every letter of the alphabet forward or backward by a specific integer offset. In Question 4, the decrypted dispatch announced: "caesar shift is seven". This means each letter in the ciphertext was shifted forward by 7 positions. To decrypt it, you must shift each character 7 steps backward (or 19 forward, since 26 - 7 = 19).',
      beginnerAnalogy: 'Imagine an alphabet ruler. If you slide the bottom ruler 7 inches to the right, \'A\' lines up with \'H\'. To read the original text, you simply slide the ruler 7 inches back to the left.',
      realWorldCase: {
        headline: 'The Mafia Boss Who Used Caesar Ciphers in the 21st Century',
        story: 'In 2006, Italian police arrested Bernardo Provenzano, the supreme godfather of the Sicilian Mafia, who had been on the run for 43 years. Inside his farmhouse hideout, police found hundreds of typed notes ("pizzini") containing criminal directives. Provenzano believed he was technologically untouchable because he encrypted names using a Caesar shift where A was replaced by 4, B by 5, etc. Police cracked the code within minutes.',
        takeaway: 'Caesar shifts have only 25 possible keys in the English alphabet, making brute-force trivial.'
      },
      whyItMatters: 'EvilCorp locked their target vault coordinate behind a shift of 7. Reversing the offset unlocks the identity of their secure vault server: `cerberus`.',
      stepByStep: [
        '1. Inspect the ciphertext: `JHA{ahynla_chbsa_jlyilybz}`.',
        '2. Notice: J shifted back 7 steps is C; H back 7 is A; A back 7 is T (`CAT{`).',
        '3. In CyberChef, add the "ROT13" operation and set the Amount slider to 19 (which is -7 modulo 26).',
        '4. Read the resulting flag: `CAT{target_vault_cerberus}`.'
      ],
      keyTerms: [
        { term: 'Caesar Cipher', meaning: 'Monoalphabetic substitution where each letter is replaced by a letter fixed positions down the alphabet.' },
        { term: 'Modulo 26 Arithmetic', meaning: 'Wrapping around the alphabet when a shift exceeds \'Z\' back to \'A\'.' }
      ],
      links: [
        { label: 'Cryptii Caesar Cipher Pipeline', url: 'https://cryptii.com/pipes/caesar-cipher' }
      ],
      onlineTools: [
        { name: 'CyberChef', url: 'https://cyberchef.org', note: 'Use "ROT13" operation and set Amount to 19' },
        { name: 'Cryptii', url: 'https://cryptii.com/pipes/caesar-cipher', note: 'Interactive visual Caesar shift slider' }
      ],
      offlineTools: []
    },
    6: {
      topic: 'Cryptographic Hash Reversal & Rainbow Table Lookups (Chain Stage 4)',
      whatIsIt: 'A cryptographic hash function like MD5 or SHA-256 is a mathematical one-way blender. You can feed any amount of data into it, and it outputs a fixed-length hexadecimal fingerprint (MD5 always produces 32 hex characters). Hashing is ONE-WAY: you cannot mathematically "decrypt" a hash back into the password! However, because identical input always produces the exact same hash, attackers precompute billions of hashes for common passwords into massive databases called Rainbow Tables. Looking up a hash in a rainbow table returns the password in milliseconds.',
      beginnerAnalogy: 'Think of blending a banana, strawberry, and milk into a pink smoothie. You cannot put the smoothie back into a machine and reconstruct the whole strawberry (it\'s one-way). But if you have a recipe book containing photos of every smoothie recipe in the world, you can match the pink color and discover: "Ah, this was recipe #123 (cerberus123)!"',
      realWorldCase: {
        headline: 'The Great LinkedIn Password Breach (2012)',
        story: 'In 2012, hackers breached LinkedIn and dumped 6.5 million user passwords onto Russian underground forums. LinkedIn made the catastrophic mistake of storing passwords as raw, unsalted SHA-1 hashes. Within days, security researchers and attackers used rainbow table lookups and tools like Hashcat to crack over 90% of all user passwords, including passwords of Fortune 500 CEOs.',
        takeaway: 'Never store raw hashes without random "salt" strings added to every password.'
      },
      whyItMatters: 'EvilCorp stored their administrator password as an unsalted MD5 hash (`f6be3f2408481885304a362deafa168a`). Querying a rainbow table unmasks their password: `cerberus123`.',
      stepByStep: [
        '1. Copy the MD5 hash: `f6be3f2408481885304a362deafa168a`.',
        '2. Open an online rainbow table lookup engine like CrackStation (crackstation.net).',
        '3. Paste the hash and click "Crack Hashes".',
        '4. Read the unmasked password: `cerberus123`.'
      ],
      keyTerms: [
        { term: 'Cryptographic Hash', meaning: 'A mathematical algorithm mapping arbitrary data to a fixed-size string, designed to be one-way.' },
        { term: 'Rainbow Table', meaning: 'A precomputed lookup table used for reversing cryptographic hash functions.' },
        { term: 'Salt', meaning: 'Random data added to a password before hashing to defeat precomputed lookup tables.' }
      ],
      links: [
        { label: 'CrackStation Free Hash Cracking Service', url: 'https://crackstation.net' }
      ],
      onlineTools: [
        { name: 'CrackStation', url: 'https://crackstation.net', note: 'Free database indexing billions of pre-cracked MD5 and SHA-1 hashes' },
        { name: 'MD5Decrypt', url: 'https://md5decrypt.net/en/', note: 'Instant reverse MD5 search engine' }
      ],
      offlineTools: [
        { name: 'Hashcat', url: 'https://hashcat.net', note: 'The world\'s fastest GPU-accelerated password cracking utility' }
      ]
    },
    7: {
      topic: 'Chained XOR Decryption Envelope (Chain Stage 5)',
      whatIsIt: 'XOR (Exclusive OR) is the fundamental bitwise building block of modern digital encryption. For any two binary bits, XOR outputs 1 if and only if the bits are different (0 ⊕ 1 = 1; 1 ⊕ 1 = 0). XOR has a magical mathematical property: it is completely reversible with the same key! If you XOR text `A` with key `K`, you get ciphertext `C`. If you XOR ciphertext `C` with the exact same key `K`, you instantly get plaintext `A` back! In real-world telemetry envelopes, corporations Base64-encode binary XOR data so it looks like alphanumeric garbage.',
      beginnerAnalogy: 'Imagine a special light switch in a hallway. Flipping the switch once turns the lights off (encryption). Flipping the exact same switch a second time turns the lights back on (decryption). You don\'t need two different keys; the same key locks and unlocks the door.',
      realWorldCase: {
        headline: 'The Venona Project & The Cold War One-Time Pad Flaw',
        story: 'During World War II and the early Cold War, Soviet spies communicated using the "One-Time Pad" (OTP), which uses XOR encryption with a truly random, non-repeating key. Mathematically, a One-Time Pad is provably unbreakable—even by supercomputers. However, due to wartime shortages in 1942, Soviet clerks accidentally manufactured identical copies of key pads and distributed them to different agents. US Army codebreakers in the secret Venona project discovered the reused keys, XORed the intercepted cables against each other, and unmasked top-secret atomic spies (including Julius and Ethel Rosenberg).',
        takeaway: 'XOR with a secret key is unbreakable only if the key is never reused.'
      },
      whyItMatters: 'EvilCorp bundled their master surveillance payload by Base64-encoding it and XOR-encrypting it with their administrative password (`cerberus123`). Stripping the Base64 and XORing with the key neutralizes their telemetry permanently.',
      stepByStep: [
        '1. Copy the master payload: `ICQmGQAEHB9SXUETOgEXFwQQGl1eUg0GFz0LFwAHQ1NfCh8XBjpARUEHTw==`.',
        '2. Open CyberChef (cyberchef.org).',
        '3. Add the "From Base64" operation to decode the raw bytes.',
        '4. Add the "XOR" operation immediately beneath it.',
        '5. In the XOR settings, set Key to `cerberus123` (UTF-8).',
        '6. Read the decrypted master flag: `CAT{evilcorp_surveillance_neutralized_2026}`!'
      ],
      keyTerms: [
        { term: 'XOR (Exclusive OR)', meaning: 'Bitwise operation returning true when inputs differ; basis of symmetric stream ciphers.' },
        { term: 'Stream Cipher', meaning: 'Symmetric cipher where plaintext digits are combined with a pseudorandom cipher digit stream.' }
      ],
      links: [
        { label: 'CyberChef XOR Documentation', url: 'https://cyberchef.org' }
      ],
      onlineTools: [
        { name: 'CyberChef', url: 'https://cyberchef.org', note: 'Chain "From Base64" then "XOR" with key cerberus123' }
      ],
      offlineTools: []
    }
  },

  // ===================================================================
  //  4. WEB SECURITY (OPERATION GLASSHOUSE)
  // ===================================================================
  'Web Sec': {
    1: {
      topic: 'HTML Source Code & Forgotten Developer Comments (Warm-Up 1)',
      whatIsIt: 'Every webpage you visit is really just a plain text file written in HTML (HyperText Markup Language). When you open a website, your browser downloads that raw HTML text file and turns it into visual buttons, colors, and boxes. Developers often write notes to themselves inside the code using HTML comment tags (`<!-- note here -->`). Browsers hide these comments on the visual screen, so beginners assume they are secret—but anyone can right-click and click "View Page Source" (or press Ctrl+U) to read every single comment!',
      beginnerAnalogy: 'Imagine an actor on stage holding a script. The audience only hears the spoken lines, not the stage directions written in the margins. Being able to "View Page Source" is like having a copy of the entire printed script in your lap, including all the secret notes the director scribbled in the margins.',
      realWorldCase: {
        headline: 'The Missouri Governor Press-F12 Incident (2021)',
        story: 'In October 2021, a reporter in Missouri discovered that the state Department of Elementary and Secondary Education website had embedded the full 9-digit Social Security Numbers of over 100,000 school teachers directly inside the raw HTML source code of a public search page. The numbers were not visible on the normal screen, but pressing Ctrl+U (View Page Source) revealed them in plain text to anyone with a web browser.',
        takeaway: 'If data is sent to the browser in the HTML source code, it is 100% public—even if it isn\'t rendered on the screen.'
      },
      whyItMatters: 'Lazy corporate developers frequently leave test passwords, secret API URLs, and debugging notes inside HTML comments assuming regular customers will never look under the hood.',
      stepByStep: [
        '1. Click [ Open Target Webpage: q1_login.html ] on Question 1.',
        '2. Right-click anywhere on the webpage background and click "View Page Source" (or press Ctrl+U on Windows / Cmd+Option+U on Mac).',
        '3. Scroll down to the very bottom of the HTML code.',
        '4. Read the developer comment inside `<!-- ... -->` to grab `CAT{always_view_the_source}`!'
      ],
      keyTerms: [
        { term: 'HTML Source Code', meaning: 'The underlying raw markup text that a browser downloads to render a webpage.' },
        { term: 'HTML Comment (<!-- -->)', meaning: 'Code annotations ignored by the visual renderer but completely visible in the page source.' }
      ],
      links: [
        { label: 'MDN Web Docs: HTML Comments', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started#html_comments' }
      ],
      onlineTools: [
        { name: 'Target Webpage: q1_login.html', url: '/websec/q1_login.html', note: 'Right-click -> View Page Source (Ctrl+U)' }
      ],
      offlineTools: []
    },
    2: {
      topic: 'Crawler Directives & robots.txt Reconnaissance (Warm-Up 2)',
      whatIsIt: 'Search engines like Google use automated bots ("spiders" or "crawlers") that browse the web 24/7 to index pages. Website owners place a public text file named `robots.txt` at the root of their website (e.g. `example.com/robots.txt`) to tell good search bots which secret folders NOT to index (`Disallow: /secret-admin-folder/`). However, `robots.txt` is not a security lock—it is a public roadmap that tells hackers the exact names of every sensitive folder the company wants to hide!',
      beginnerAnalogy: 'Imagine putting a huge neon sign on your front lawn that reads: "ATTENTION BURGLARS: Please do NOT look under the third flowerpot on the back porch where I keep my spare house key!" Polite delivery drivers will ignore the flowerpot, but every thief in town will walk straight to it.',
      realWorldCase: {
        headline: 'Healthcare & Government Portal Leaks via robots.txt',
        story: 'During routine security audits, researchers repeatedly discover corporate and municipal servers that place `Disallow: /backup-sql-dumps/` or `Disallow: /internal-hr-spreadsheets/` inside their `robots.txt` file without putting a password on those folders. Instead of protecting the files, the `robots.txt` entry acts as an instant table of contents for attackers.',
        takeaway: 'Never rely on robots.txt to hide private files; always enforce real login authentication.'
      },
      whyItMatters: 'Checking `/robots.txt` is one of the very first things every web security auditor does when inspecting a company\'s website.',
      stepByStep: [
        '1. Click [ Open Target File: q2_robots.txt ] on Question 2.',
        '2. Inspect the `Disallow:` lines that EvilCorp tried to hide from search engines.',
        '3. Read the compliance note at the bottom of the file to capture `CAT{robots_reveal_secrets}`!'
      ],
      keyTerms: [
        { term: 'robots.txt', meaning: 'A plain-text file in a website\'s root directory that instructs search engine crawlers which paths not to index.' },
        { term: 'Security Through Obscurity', meaning: 'The flawed belief that a system is secure simply because its secret URLs or inner workings are hidden from view.' }
      ],
      links: [
        { label: 'Google Search Central: How robots.txt Works', url: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro' }
      ],
      onlineTools: [
        { name: 'Target File: q2_robots.txt', url: '/websec/q2_robots.txt', note: 'Inspect EvilCorp\'s crawler exclusions directly in browser' }
      ],
      offlineTools: []
    },
    3: {
      topic: 'Client-Side DOM & Disabled Button Manipulation (Chain Stage 1)',
      whatIsIt: 'When you view a website, your browser receives HTML, CSS, and JavaScript and renders the visual layout (the Document Object Model, or DOM). Many novice developers make the fatal mistake of enforcing security rules purely inside the browser by adding the word `disabled` to an HTML button (`<button disabled>`). Because that HTML code is running on YOUR computer, you have 100% control over it and can delete the word `disabled` in five seconds using Inspect Element!',
      beginnerAnalogy: 'Imagine an honor-system self-checkout stand at a grocery store where a paper "Closed" sticker is taped over the cash drawer button. Anyone can peel the paper sticker off with their finger and press the button underneath because there is no real physical lock.',
      realWorldCase: {
        headline: 'The E-Commerce "1 Cent Product" & Disabled Checkout Exploits',
        story: 'In multiple web application audits, companies restricted premium features or early-access downloads simply by rendering `<button disabled>Download Report</button>` for non-paying users, without checking the user\'s subscription on the backend server. Users simply opened Chrome DevTools, deleted the `disabled` attribute, and downloaded the paid reports for free!',
        takeaway: 'Never trust the client browser; any restriction in HTML or CSS can be edited by the user.'
      },
      whyItMatters: 'If a web application relies on greying out a button in HTML instead of verifying permissions on the server, any user can bypass the restriction by pressing F12.',
      stepByStep: [
        '1. Open `q3_helpdesk.html` using the button on Question 3.',
        '2. Right-click directly on the greyed-out `[ Export Classified Directory ]` button and select "Inspect" (or press F12).',
        '3. In the Elements panel, find `<button id="unlock-btn" disabled ...>` and double-click the word `disabled` to delete it, then press Enter.',
        '4. Click the newly enabled green button to get `CAT{never_trust_the_client}` and the cookie role clue (`admin`) for Question 4!'
      ],
      keyTerms: [
        { term: 'DOM (Document Object Model)', meaning: 'The browser\'s live, editable in-memory representation of a webpage\'s HTML elements.' },
        { term: 'Client-Side Validation', meaning: 'UI restrictions enforced in the user\'s browser rather than on the backend server.' }
      ],
      links: [
        { label: 'OWASP Input Validation Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html' }
      ],
      onlineTools: [
        { name: 'Target Webpage: q3_helpdesk.html', url: '/websec/q3_helpdesk.html', note: 'Right-click the grey button -> Inspect -> delete disabled' }
      ],
      offlineTools: []
    },
    4: {
      topic: 'Session Cookies & Privilege Flag Manipulation (Chain Stage 2)',
      whatIsIt: 'HTTP is a "stateless" protocol—it forgets who you are the moment a web page finishes loading. To keep you logged in, servers issue small text snippets called Cookies stored in your browser. Every time you click a link, your browser automatically hands these cookies back to the server. If a developer stores user permissions inside an unsigned plain-text cookie (such as `evilcorp_role=guest`), an attacker can simply edit the cookie to `evilcorp_role=admin` and gain full administrative control!',
      beginnerAnalogy: 'Imagine entering a private club and being handed a paper wristband that says "Standard Guest" written in pencil. If you take an eraser, write "VIP Club Owner" in pencil, and the security guard lets you into the executive suite without checking their computer, the wristband was insecure.',
      realWorldCase: {
        headline: 'The Yahoo! Cookie Forgery Attack (3 Billion Accounts)',
        story: 'Between 2013 and 2014, state-sponsored hackers compromised Yahoo!\'s proprietary user database and stole their internal cookie-minting code. The attackers used this knowledge to forge authentication cookies for any user without knowing their password, granting them unrestricted access to the emails and private messages of over 3 billion accounts.',
        takeaway: 'Cookies must be cryptographically signed (HMAC) or store random unguessable session IDs tied to server-side tables.'
      },
      whyItMatters: 'Web applications that trust client-supplied session tokens or cookie flags allow immediate privilege escalation from a low-level guest to administrator.',
      stepByStep: [
        '1. Open `q4_dashboard.html` using the button on Question 4.',
        '2. Notice that your current cookie is `evilcorp_role=guest`.',
        '3. Using the clue from Question 3 (`admin`), change the cookie value from `guest` to `admin` (either in the Live Cookie Inspector box on the page or in F12 -> Application -> Cookies).',
        '4. Click `[ Save Cookie & Reload ]` to capture `CAT{cookies_are_not_secure}` and the CEO\'s Employee ID (`1042`) for Question 5!'
      ],
      keyTerms: [
        { term: 'HTTP Cookie', meaning: 'A small piece of data stored on the user\'s computer by the web browser while browsing.' },
        { term: 'Privilege Escalation', meaning: 'Exploiting a flaw to gain elevated access (such as admin rights) normally protected from a regular user.' }
      ],
      links: [
        { label: 'MDN Web Docs: Using HTTP Cookies', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies' }
      ],
      onlineTools: [
        { name: 'Target Webpage: q4_dashboard.html', url: '/websec/q4_dashboard.html', note: 'Change evilcorp_role from guest to admin' }
      ],
      offlineTools: []
    },
    5: {
      topic: 'Parameter Tampering & Insecure Direct Object References (IDOR) (Chain Stage 3)',
      whatIsIt: 'Insecure Direct Object References (IDOR) occur when an application uses user-supplied input (like a number in a URL: `q5_profile.html?id=1001`) to fetch an internal database record directly, without verifying whether the currently logged-in user actually has permission to view that record. If employee #1001 can change the URL to `?id=1042` and view the CEO\'s confidential dossier, the application has an IDOR vulnerability.',
      beginnerAnalogy: 'Imagine checking into a gym locker room where the lockers have no padlocks—you just tell the attendant "Give me the bag in locker #1001." If you say "Give me the bag in locker #1042" and the attendant hands you the CEO\'s briefcase without checking whose locker it is, that is IDOR.',
      realWorldCase: {
        headline: 'The First American Financial IDOR Leak (885 Million Records)',
        story: 'In 2019, insurance giant First American Financial exposed 885 million confidential mortgage documents (including bank statements, tax records, and Social Security numbers). The documents were accessible via a web link ending in a sequential document number (`/document/00001001`). Anyone could change the number in their browser address bar and download another person\'s complete mortgage paperwork without any authorization check.',
        takeaway: 'Never expose internal database IDs without strict server-side access control checks.'
      },
      whyItMatters: 'IDOR (Broken Access Control) is currently ranked #1 on the OWASP Top 10 list of most critical web application security risks.',
      stepByStep: [
        '1. Open `q5_profile.html?id=1001` using the button on Question 5.',
        '2. Notice that `?id=1001` shows a junior intern\'s profile.',
        '3. Replace `1001` with the CEO Employee ID you discovered in Question 4 (`1042`) in the URL bar or page input and click `[ Load Record ]`.',
        '4. Copy the flag `CAT{idor_exposes_everyone}` and the secret file path (`../../etc/evilcorp_shadow.conf`) for Question 6!'
      ],
      keyTerms: [
        { term: 'IDOR', meaning: 'Insecure Direct Object Reference — accessing another user\'s private records simply by changing an ID number in the URL.' },
        { term: 'Broken Access Control', meaning: 'When a server fails to verify that the user requesting a record is actually authorized to view it.' }
      ],
      links: [
        { label: 'PortSwigger Web Security Academy: IDOR Guide', url: 'https://portswigger.net/web-security/access-control/idor' }
      ],
      onlineTools: [
        { name: 'Target Webpage: q5_profile.html?id=1001', url: '/websec/q5_profile.html?id=1001', note: 'Change id=1001 to id=1042' }
      ],
      offlineTools: []
    },
    6: {
      topic: 'Directory Path Traversal & Arbitrary File Disclosure (Chain Stage 4)',
      whatIsIt: 'When a web application lets users view documents using a filename parameter in the URL (such as `q6_files.html?file=welcome.txt`), it takes that filename and looks it up inside a public folder on the server. If the developer forgets to block `../` ("go up one folder level"), an attacker can chain multiple `../../` sequences to climb out of the public web folder and read top-secret server configuration files!',
      beginnerAnalogy: 'Imagine being in a public museum gift shop where a clerk fetches postcards from a shelf behind the counter. If you ask the clerk: "Go out the back door, walk up two flights of stairs into the director\'s private office, and bring me the ledger on the desk" (`../../etc/evilcorp_shadow.conf`), and the clerk blindly obeys, that is Path Traversal.',
      realWorldCase: {
        headline: 'The Apache HTTP Server 2.4.49 Path Traversal Zero-Day (CVE-2021-41773)',
        story: 'In October 2021, a critical path traversal flaw was discovered in Apache HTTP Server, which powers millions of websites worldwide. Attackers could send URLs containing `../` sequences to break out of the web root directory and read arbitrary sensitive files (including `/etc/passwd` and source code scripts) across thousands of unpatched corporate servers.',
        takeaway: 'Never pass raw user-supplied filenames directly to operating system file-reading functions.'
      },
      whyItMatters: 'Directory traversal lets attackers steal database configuration files, admin usernames, and private keys straight off the server\'s hard drive.',
      stepByStep: [
        '1. Open `q6_files.html?file=welcome.txt` using the button on Question 6.',
        '2. Take the secret configuration path discovered in Question 5: `../../etc/evilcorp_shadow.conf`.',
        '3. Replace `welcome.txt` with `../../etc/evilcorp_shadow.conf` and click `[ Read File ]`.',
        '4. Capture `CAT{dot_dot_slash_escape}` and note the database admin username (`director_vance`) for Question 7!'
      ],
      keyTerms: [
        { term: 'Path Traversal', meaning: 'Using ../ sequences to escape the intended web directory and access restricted files on the server.' },
        { term: 'Dot-Dot-Slash (../)', meaning: 'Universal file-system shorthand meaning "move up one parent directory."' }
      ],
      links: [
        { label: 'PortSwigger Web Security Academy: Directory Traversal', url: 'https://portswigger.net/web-security/file-path-traversal' }
      ],
      onlineTools: [
        { name: 'Target Webpage: q6_files.html', url: '/websec/q6_files.html?file=welcome.txt', note: 'Enter ../../etc/evilcorp_shadow.conf' }
      ],
      offlineTools: []
    },
    7: {
      topic: 'SQL Injection (SQLi) Authentication Bypass (Chain Stage 5)',
      whatIsIt: 'Websites use SQL (Structured Query Language) databases to check your username and password when you log in: `SELECT * FROM users WHERE username = \'director_vance\' AND password = \'INPUT\'`. If the developer glues your password input directly into that SQL command without sanitizing quotes, typing `\' OR 1=1 --` breaks the command structure! The single quote `\'` closes the password text early, `OR 1=1` is a math fact that is ALWAYS TRUE, and `--` tells the database to ignore the rest of the line. The database evaluates the query as TRUE and logs you straight in without knowing the password!',
      beginnerAnalogy: 'Imagine a robotic security guard programmed to ask for your password. If you say: "My password is... [END OF PASSWORD] OR 1 equals 1, ignore everything else!", the robot checks whether 1 equals 1, sees that it is true, and opens the bank vault door.',
      realWorldCase: {
        headline: 'The TalkTalk Telecom Breach — How a Simple SQLi Cost £77 Million',
        story: 'In 2015, British telecom giant TalkTalk suffered a massive data breach exposing the personal and banking details of 157,000 customers. Investigators shocked the industry when they revealed the hack did not use futuristic spyware—it was carried out by teenagers exploiting a classic SQL Injection flaw on an outdated webpage. The breach cost TalkTalk over £77 million and a record regulatory fine.',
        takeaway: 'Always use Parameterized Queries (Prepared Statements) so user input is never interpreted as SQL commands.'
      },
      whyItMatters: 'SQL Injection is one of the most famous and devastating vulnerabilities in computing history, capable of bypassing any login screen that concatenates raw strings.',
      stepByStep: [
        '1. Open `q7_vault.html` using the button on Question 7.',
        '2. In the Username box, type the admin username discovered in Question 6: `director_vance`.',
        '3. In the Password box, type the SQL Injection payload: `\' OR 1=1 --` (watching the Live Backend SQL Query Monitor highlight how the query changes!).',
        '4. Click `[ Execute SQL Query & Unlock Master Vault ]` to capture the final flag: `CAT{sqli_shatters_evilcorp}`!'
      ],
      keyTerms: [
        { term: 'SQL Injection (SQLi)', meaning: 'Injecting special SQL characters (like single quotes) into an input box to alter the backend database query logic.' },
        { term: 'Prepared Statements', meaning: 'The secure way to write database queries where user input is kept strictly separate from SQL commands.' }
      ],
      links: [
        { label: 'PortSwigger Web Security Academy: SQL Injection', url: 'https://portswigger.net/web-security/sql-injection' }
      ],
      onlineTools: [
        { name: 'Target Webpage: q7_vault.html', url: '/websec/q7_vault.html', note: 'Username: director_vance | Password: \' OR 1=1 --' }
      ],
      offlineTools: []
    }
  }
};

export function getTextbook(domain, id) {
  return (TEXTBOOK[domain] && TEXTBOOK[domain][id]) || {
    topic: `${domain} Chapter ${id}`,
    whatIsIt: `This chapter covers the technical fundamentals for question ${id} in ${domain}.`,
    beginnerAnalogy: 'Think of this concept as a real-world lock and key mechanism.',
    realWorldCase: {
      headline: 'Real-World Vulnerability Pattern',
      story: 'Security auditors encounter this vulnerability pattern across thousands of corporate audits every year.',
      takeaway: 'Applying defensive security best practices prevents unauthorized data disclosure.'
    },
    whyItMatters: 'Understanding this concept helps demystify how digital systems function.',
    stepByStep: ['1. Inspect the challenge input.', '2. Use recommended online tools.', '3. Formulate the proof flag.'],
    keyTerms: [],
    links: [],
    onlineTools: [],
    offlineTools: []
  };
}
