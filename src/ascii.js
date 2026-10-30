// =====================================================================
//  CUTE TERMINAL ASCII ART COLLECTION
//  Crisp monospace terminal aesthetics with cute feline charm.
// =====================================================================

export const NAV_CAT = '(=^･ω･^=)';

export const ASCII_LOGO = String.raw`
  /\_/\   ____________________________________________
 ( o.o ) <  PWN_INIT :: CYBERSECURITY AWARENESS CTF   |
  > ^ <   \___________________________________________/
`;

export const CAT_WAVING = String.raw`
     /\_/\
    ( o.o )  *waves paw*
     > ^ <   "welcome to the academy!"
    /     \
   (_)-(_)
`;

export const CAT_DETECTIVE = String.raw`
      _       /\_/\
     / \     ( -.- )  *sniff sniff*
    |   |     > ^ <   "following the digital scent..."
     \_/     /     \
            (_)-(_)
`;

export const CAT_HACKER = String.raw`
     /\_/\      +--------------------------+
    ( >.< )  <  | [!] 0-day detected!      |
     > ^ <      +--------------------------+
    /|   |\     [==== KEYBOARD ====]
`;

export const CAT_READING = String.raw`
     /\_/\
    ( 'w' )  [__]  *flips page*
    /     \  \  \  "knowledge is your best firewall."
   (_)-(_)    \__\
`;

export const CAT_PARTY = String.raw`
    \ ( ^o^ ) /  * * sparkle * *
       )   (     calibration passed!
      /     \
     (_)-(_)
`;

export const CAT_GUARD = String.raw`
     /\_/\
    ( -.- ) zzZ  [ W I P ]
     > ^ <       "guarding this arena while it's built..."
   |_______|
`;

export const CAT_STEGO = String.raw`
   +-------------+
   |  /\_/\  .   |   *peeks from pixels*
   | ( o.o )  !  |   "can you see me now?"
   +-------------+
`;

export const TROPHY_CAT = String.raw`
         /\_/\
        ( ^.^ )  *purrrrr*
       .-'---'-.
      /  VICTORY \
     |  [ *** ]   |
      \          /
       '-..__..-'
          ||||
         _||||_
`;

export const ROBOT_ASSISTANT = String.raw`
      [o_o]
     /|___|\   "beep boop! calibrating your flag skills..."
      d   b
`;

export const DOMAIN_ASCII = {
  OSINT: String.raw`
    .-""-.       /\_/\
   /  ..  \     ( o.o )
  |  (  )  |     > ^ <   [GeoINT & Footprints]
   \  ''  /     /     \
    '-..-'\\   (_)-(_)
           \\
`,
  Stegano: String.raw`
   +-------------+
   |  /\_/\  .   |   "hidden in the pixels"
   | ( -.- )  ?  |
   +-------------+
`,
  Crypto: String.raw`
       .---.       /\_/\
      /  .  \     ( 'o' )  "cracking the cipher"
     |  (_)  |     > ^ <
     '-------'
`,
  'Web Sec': String.raw`
   .-------------------.
   | [<>] http://hack  |   "breaking abstractions"
   |-------------------|
   | $ curl -i target  |
   '-------------------'
`,
};

export const ASCII_DIVIDER = "--------------------------------------------------------------------------------";
export const ASCII_DOTS_DIVIDER = "•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•-•";

// Backwards compatibility aliases
export const HOME_CAT = CAT_WAVING;
export const DASHBOARD_CAT = CAT_WAVING;
export const DOMAIN_ART = DOMAIN_ASCII;
export const TUTORIAL_ROBOT = ROBOT_ASSISTANT;
export const TUTORIAL_PARTY = CAT_PARTY;
export const WIP_CAT = CAT_GUARD;
