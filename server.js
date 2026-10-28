const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'ctf.db');
const db = new sqlite3.Database(dbPath);

// Default answers for the OSINT CTF
const defaultAnswers = [
  { id: 1, flag: 'pizzaexpress' },
  { id: 2, flag: 'mumbai' },
  { id: 3, flag: 'cat' },
  { id: 4, flag: 'mahapatraabheek0@gmail.com' },
  { id: 5, flag: 'github' },
  { id: 6, flag: 'ironeye_abheek' },
  { id: 7, flag: 'H1DD3N_1N_PL41N_51GH7' }
];

// Initialize SQLite table and populate answers
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS answers (
    id INTEGER PRIMARY KEY,
    flag TEXT NOT NULL
  )`);

  // Ensure default OSINT flags exist
  defaultAnswers.forEach(item => {
    db.run(
      `INSERT OR REPLACE INTO answers (id, flag) VALUES (?, ?)`,
      [item.id, item.flag]
    );
  });
  console.log('SQLite database initialized with OSINT challenge answers.');
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

  if (req.method === 'POST' && req.url === '/api/validate') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { answers } = JSON.parse(body || '{}');
        if (!Array.isArray(answers)) return sendJson(200, { score: 0, total: 0 });

        db.all('SELECT id, flag FROM answers', (err, rows) => {
          if (err) return sendJson(500, { score: 0, total: 0, error: err.message });
          
          let score = 0;
          answers.forEach(userAns => {
            const dbRow = rows.find(r => r.id === userAns.id);
            if (dbRow && userAns.flag) {
              if (userAns.flag.trim().toLowerCase() === dbRow.flag.trim().toLowerCase()) {
                score++;
              }
            }
          });
          sendJson(200, { score, total: rows.length });
        });
      } catch (e) {
        sendJson(400, { score: 0, total: 0, error: 'Invalid JSON payload' });
      }
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/validate-single') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { id, flag } = JSON.parse(body || '{}');
        if (!id || flag === undefined) return sendJson(200, { correct: false });

        db.get('SELECT flag FROM answers WHERE id = ?', [id], (err, row) => {
          if (err || !row) return sendJson(200, { correct: false });
          const isCorrect = flag.trim().toLowerCase() === row.flag.trim().toLowerCase();
          sendJson(200, { correct: isCorrect });
        });
      } catch (e) {
        sendJson(400, { correct: false, error: 'Invalid JSON payload' });
      }
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Backend SQLite server running on http://localhost:${PORT}`);
});
