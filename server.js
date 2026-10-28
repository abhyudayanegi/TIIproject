const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'ctf.db');
const db = new sqlite3.Database(dbPath);

// Answers for all CTF domains (7 questions each, CAT{...} standard)
const defaultAnswers = {
  OSINT: [
    { id: 1, flag: 'pizzaexpress' },
    { id: 2, flag: 'mumbai' },
    { id: 3, flag: 'cat' },
    { id: 4, flag: 'mahapatraabheek0@gmail.com' },
    { id: 5, flag: 'github' },
    { id: 6, flag: 'ironeye_abheek' },
    { id: 7, flag: 'CAT{H1DD3N_1N_PL41N_51GH7}' }
  ],
  Crypto: [
    { id: 1, flag: 'CAT{evilcorp_privacy_is_a_myth}' },
    { id: 2, flag: 'CAT{telemetry_is_not_encrypted}' },
    { id: 3, flag: 'CAT{whistleblower_key_is_SHADOWCORP}' },
    { id: 4, flag: 'CAT{caesar_shift_is_seven}' },
    { id: 5, flag: 'CAT{target_vault_cerberus}' },
    { id: 6, flag: 'CAT{cerberus123}' },
    { id: 7, flag: 'CAT{evilcorp_surveillance_neutralized_2026}' }
  ],
  Stegano: [
    { id: 1, flag: 'CAT{exif_metadata_revealed}' },
    { id: 2, flag: 'CAT{png_magic_header_valid}' },
    { id: 3, flag: 'CAT{trailing_hex_data}' },
    { id: 4, flag: 'CAT{stego_lsb_found}' },
    { id: 5, flag: 'CAT{rgb_channel_secret}' },
    { id: 6, flag: 'CAT{sound_of_silence}' },
    { id: 7, flag: 'CAT{master_steganographer_unmasked}' }
  ],
  'Web Sec': [
    { id: 1, flag: 'CAT{http_verbs_mastered}' },
    { id: 2, flag: 'CAT{inspect_element_pro}' },
    { id: 3, flag: 'CAT{cookie_admin_true}' },
    { id: 4, flag: 'CAT{idor_data_leakage}' },
    { id: 5, flag: 'CAT{path_traversal_master}' },
    { id: 6, flag: 'CAT{sqli_bypass_successful}' },
    { id: 7, flag: 'CAT{master_websec_pwned}' }
  ]
};

// Alternate accepted flag forms for beginner convenience
const alternateAnswers = {
  'OSINT_7': ['H1DD3N_1N_PL41N_51GH7', 'CTF{H1DD3N_1N_PL41N_51GH7}'],
  'Crypto_1': ['evilcorp_privacy_is_a_myth'],
  'Crypto_2': ['telemetry_is_not_encrypted'],
  'Crypto_3': ['SHADOWCORP', 'whistleblower_key_is_SHADOWCORP', 'key_is_SHADOWCORP'],
  'Crypto_4': ['seven', '7', 'shift_is_seven', 'caesar_shift_is_seven'],
  'Crypto_5': ['cerberus', 'target_vault_cerberus', 'vault_cerberus'],
  'Crypto_6': ['cerberus123'],
  'Crypto_7': ['evilcorp_surveillance_neutralized_2026']
};

// Initialize SQLite table and populate answers
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS ctf_answers (
    domain TEXT NOT NULL,
    id INTEGER NOT NULL,
    flag TEXT NOT NULL,
    PRIMARY KEY (domain, id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS answers (
    id INTEGER PRIMARY KEY,
    flag TEXT NOT NULL
  )`);

  // Seed domain answers
  Object.keys(defaultAnswers).forEach(domain => {
    defaultAnswers[domain].forEach(item => {
      db.run(
        `INSERT OR REPLACE INTO ctf_answers (domain, id, flag) VALUES (?, ?, ?)`,
        [domain, item.id, item.flag]
      );
      if (domain === 'OSINT') {
        db.run(
          `INSERT OR REPLACE INTO answers (id, flag) VALUES (?, ?)`,
          [item.id, item.flag]
        );
      }
    });
  });

  console.log('SQLite database initialized with Anti-Corpo CAT{...} challenges.');
});

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const sendJson = (statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  // Normalizes flags by stripping CAT{...} or CTF{...} and lowercase trimming
  const normalize = (str) => {
    if (!str) return '';
    return str
      .trim()
      .toLowerCase()
      .replace(/^(cat|ctf)\{/i, '')
      .replace(/\}$/, '');
  };

  const checkMatch = (domain, id, userFlag, targetFlag) => {
    const cleanUser = (userFlag || '').trim().toLowerCase();
    const cleanTarget = (targetFlag || '').trim().toLowerCase();
    
    // Direct match
    if (cleanUser === cleanTarget) return true;
    
    // Normalized match (ignoring outer CAT{...} or CTF{...})
    if (normalize(cleanUser) === normalize(cleanTarget)) return true;

    // Check alternate accepted forms
    const key = `${domain}_${id}`;
    if (alternateAnswers[key]) {
      const matchAlt = alternateAnswers[key].some(
        alt => cleanUser === alt.toLowerCase() || normalize(cleanUser) === normalize(alt)
      );
      if (matchAlt) return true;
    }

    return false;
  };

  // Validate all answers in a domain
  if (req.method === 'POST' && req.url === '/api/validate') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { domain = 'OSINT', answers } = JSON.parse(body || '{}');
        if (!Array.isArray(answers)) return sendJson(200, { score: 0, total: 7 });

        db.all('SELECT id, flag FROM ctf_answers WHERE domain = ?', [domain], (err, rows) => {
          if (err || !rows || rows.length === 0) {
            db.all('SELECT id, flag FROM answers', (err2, rows2) => {
              if (err2) return sendJson(500, { score: 0, total: 7, error: err2.message });
              let score = 0;
              answers.forEach(userAns => {
                const row = rows2.find(r => r.id === userAns.id);
                if (row && userAns.flag && checkMatch(domain, userAns.id, userAns.flag, row.flag)) {
                  score++;
                }
              });
              sendJson(200, { score, total: rows2.length });
            });
            return;
          }

          let score = 0;
          answers.forEach(userAns => {
            const dbRow = rows.find(r => r.id === userAns.id);
            if (dbRow && userAns.flag) {
              if (checkMatch(domain, userAns.id, userAns.flag, dbRow.flag)) {
                score++;
              }
            }
          });
          sendJson(200, { score, total: rows.length });
        });
      } catch (e) {
        sendJson(400, { score: 0, total: 7, error: 'Invalid JSON payload' });
      }
    });
    return;
  }

  // Validate a single question
  if (req.method === 'POST' && req.url === '/api/validate-single') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { domain = 'OSINT', id, flag } = JSON.parse(body || '{}');
        if (!id || flag === undefined) return sendJson(200, { correct: false });

        db.get('SELECT flag FROM ctf_answers WHERE domain = ? AND id = ?', [domain, id], (err, row) => {
          if (err || !row) {
            db.get('SELECT flag FROM answers WHERE id = ?', [id], (err2, row2) => {
              if (err2 || !row2) return sendJson(200, { correct: false });
              const isCorrect = checkMatch(domain, id, flag, row2.flag);
              sendJson(200, { correct: isCorrect });
            });
            return;
          }
          const isCorrect = checkMatch(domain, id, flag, row.flag);
          sendJson(200, { correct: isCorrect });
        });
      } catch (e) {
        sendJson(400, { correct: false, error: 'Invalid JSON payload' });
      }
    });
    return;
  }

  // Health check endpoint
  if (req.method === 'GET' && req.url === '/api/health') {
    sendJson(200, { status: 'ok', server: 'CTF SQLite Backend Anti-Corpo Edition' });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
