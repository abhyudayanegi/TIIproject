import React, { useState } from 'react';
import { WIP_CAT } from './ascii';
import TextbookPanel from './TextbookPanel';

const WIREFRAME_CONFIGS = {
  Stegano: {
    title: '_STEGANOGRAPHY_MODULES_ [7 CHALLENGES]',
    description: 'Steganography Arena. Master data concealment across metadata, trailing bytes, pixel bits, color planes, and audio spectrums.',
    questions: [
      { id: 1, title: '1. EXIF Header Comments (Warm-Up 1)', desc: 'Inspect hidden metadata tags and comment fields inside an image file header.', placeholder: 'CAT{exif_metadata_revealed}', tool: 'Jimpl / EXIF Viewer' },
      { id: 2, title: '2. Magic Bytes & File Signatures (Warm-Up 2)', desc: 'Verify the leading magic bytes of an altered file to uncover its genuine file format.', placeholder: 'CAT{png_magic_header_valid}', tool: 'HexEd.it' },
      { id: 3, title: '3. Trailing Byte Append (Chain Stage 1)', desc: 'Find hidden data appended after the IEND PNG trailer marker using a hex viewer.', placeholder: 'CAT{trailing_hex_data}', tool: 'HexEd.it' },
      { id: 4, title: '4. Pixel Peeping LSB Extraction (Chain Stage 2)', desc: 'Inspect the least significant bits of the image using the key discovered in Question 3.', placeholder: 'CAT{stego_lsb_found}', tool: 'Aperisolve' },
      { id: 5, title: '5. Color Plane Shift (Chain Stage 3)', desc: 'Unmask secret contrast layers by separating red, green, blue, and alpha color channels.', placeholder: 'CAT{rgb_channel_secret}', tool: 'Aperisolve' },
      { id: 6, title: '6. The Sonic Secret (Chain Stage 4)', desc: 'Convert an audio recording into a spectrogram visualizer to read the passphrase drawn in high frequencies.', placeholder: 'CAT{sound_of_silence}', tool: 'Academo Spectrum' },
      { id: 7, title: '7. Passphrase Steghide Hunt (Chain Stage 5)', desc: 'Extract an encrypted archive hidden inside a JPEG file using the audio passphrase from Question 6.', placeholder: 'CAT{master_steganographer_unmasked}', tool: 'FutureBoy Stego' },
    ],
  },
  'Web Sec': {
    title: '_WEB_SECURITY_MODULES_ [7 CHALLENGES]',
    description: 'Web Security Arena. Hunt for client-side bypasses, cookie flaws, parameter tampering, and injection vectors.',
    questions: [
      { id: 1, title: '1. HTTP Verbs & Request Headers (Warm-Up 1)', desc: 'Inspect HTTP methods and headers to discover hidden API endpoints.', placeholder: 'CAT{http_verbs_mastered}', tool: 'Hoppscotch / DevTools' },
      { id: 2, title: '2. Client-Side DOM & Form Bypass (Warm-Up 2)', desc: 'Inspect DOM form source code and bypass client-side hidden price modification fields.', placeholder: 'CAT{inspect_element_pro}', tool: 'Browser Inspect Element' },
      { id: 3, title: '3. Insecure Cookie Manipulation (Chain Stage 1)', desc: 'Inspect browser storage and modify session cookie privilege flags from user to admin.', placeholder: 'CAT{cookie_admin_true}', tool: 'DevTools Application Tab' },
      { id: 4, title: '4. Parameter Tampering & IDOR (Chain Stage 2)', desc: 'Enumerate sequential account IDs in the query string using the admin session from Question 3.', placeholder: 'CAT{idor_data_leakage}', tool: 'Browser URL Navigation' },
      { id: 5, title: '5. Directory Path Traversal (Chain Stage 3)', desc: 'Exploit relative path syntax (../../etc/passwd) on the file endpoint revealed in Question 4.', placeholder: 'CAT{path_traversal_master}', tool: 'Browser URL Navigation' },
      { id: 6, title: '6. SQL Injection Authentication Bypass (Chain Stage 4)', desc: 'Craft SQL injection payloads (\' OR 1=1--) on the admin login page discovered in Question 5.', placeholder: 'CAT{sqli_bypass_successful}', tool: 'Browser Form / SQLi' },
      { id: 7, title: '7. Reflected XSS & Session Exfiltration (Chain Stage 5)', desc: 'Execute JavaScript via unescaped search reflection to capture the final administrative flag.', placeholder: 'CAT{master_websec_pwned}', tool: 'Browser Console' },
    ],
  },
};

export default function WireframeChallenges({ domain, onBack }) {
  const config = WIREFRAME_CONFIGS[domain] || WIREFRAME_CONFIGS['Stegano'];

  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [activeTextbook, setActiveTextbook] = useState(null);

  const openTextbook = (id, title) => {
    setActiveTextbook({ id, title });
  };

  const closeTextbook = () => {
    setActiveTextbook(null);
  };

  const handleInputChange = (id, val) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
    if (results[id] !== undefined) {
      setResults(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleTestSubmit = (id, expected) => {
    const entered = (answers[id] || '').trim().toLowerCase();
    if (!entered) return;
    const cleanExpected = expected.toLowerCase().replace(/^(cat|ctf)\{/, '').replace(/\}$/, '');
    const cleanEntered = entered.replace(/^(cat|ctf)\{/, '').replace(/\}$/, '');
    setResults(prev => ({ ...prev, [id]: entered === expected.toLowerCase() || cleanEntered === cleanExpected }));
  };

  return (
    <div className="challenges-section">
      <TextbookPanel
        open={activeTextbook !== null}
        domain={domain}
        questionId={activeTextbook ? activeTextbook.id : null}
        questionTitle={activeTextbook ? activeTextbook.title : null}
        onClose={closeTextbook}
      />

      {/* Clean Terminal Header */}
      <div className="terminal-page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div className="header-meta">
              <span className="badge-tag" style={{ background: 'var(--gb-tint-orange)', color: 'var(--gb-orange)', border: '1px solid rgba(254, 128, 25, 0.4)' }}>
                [7_CHALLENGES_ACTIVE]
              </span>
              <span style={{ fontSize: '12px', color: 'var(--gb-yellow)', fontWeight: 600 }}>
                {domain.toUpperCase()} ARENA
              </span>
            </div>
            <h1 style={{ fontSize: '22px', borderBottom: 'none', margin: '6px 0 4px 0', color: 'var(--gb-fg0)' }}>
              {config.title}
            </h1>
            <p style={{ color: 'var(--gb-fg2)', fontSize: '13.5px', margin: 0, maxWidth: '620px' }}>
              {config.description} Click <strong>[📖 Theory]</strong> on any question below to inspect its topic manual!
            </p>
          </div>
          <pre className="ascii ascii-orange header-ascii">
            {WIP_CAT}
          </pre>
        </div>

        <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed var(--gb-bg3)' }}>
          <button className="btn-small" onClick={onBack}>
            [ &larr; Back to Domains Dashboard ]
          </button>
        </div>
      </div>

      <div className="terminal-hr" />

      {/* 7 Questions with Dotted Divider between Q2 & Q3 */}
      {config.questions.map((q, index) => {
        const isCorrect = results[q.id] === true;
        const isWrong = results[q.id] === false;

        return (
          <React.Fragment key={q.id}>
            {/* Dotted Line Divider after Question 2 */}
            {index === 2 && (
              <div className="chain-divider">
                <div className="chain-divider-header">
                  <span className="chain-divider-badge">• • • [ PHASE 2: 5-STAGE LINKED INVESTIGATION (Q3 &rarr; Q7) ] • • •</span>
                </div>
                <p className="chain-divider-desc">
                  Questions 1 &amp; 2 were standalone warm-ups. The next 5 questions are chained: each discovered clue unlocks the next target!
                </p>
              </div>
            )}

            <div className={`challenge-card ${isCorrect ? 'solved' : ''}`}>
              <div className="challenge-header">
                <div>
                  <h3>
                    <span style={{ color: 'var(--gb-yellow)' }}>[0{q.id}]</span>
                    <span>{q.title}</span>
                  </h3>
                  {q.tool && (
                    <span className="badge-tag" style={{ background: 'var(--gb-tint-aqua)', color: 'var(--gb-aqua)', marginTop: '4px', border: '1px solid rgba(142, 192, 124, 0.4)' }}>
                      [⚡ Online Tool: {q.tool}]
                    </span>
                  )}
                </div>
                <span className={`badge-tag ${isCorrect ? 'badge-live' : 'badge-wireframe'}`}>
                  {isCorrect ? '[✓ SOLVED]' : '[○ PENDING]'}
                </span>
              </div>

              <p style={{ color: 'var(--gb-fg)', fontSize: '14px', margin: '0' }}>
                {q.desc}
              </p>

              <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>TARGET FLAG: </span>
                  <code style={{ color: 'var(--gb-green)' }}>{q.placeholder}</code>
                </div>
              </div>

              <div className="challenge-controls">
                <div className="input-wrapper">
                  <span className="input-prompt-icon">&gt;</span>
                  <input
                    type="text"
                    placeholder="Enter flag..."
                    autoComplete="off"
                    value={answers[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                  />
                </div>
                <button className="btn-small btn-primary" onClick={() => handleTestSubmit(q.id, q.placeholder)}>
                  [Submit]
                </button>
                <button className="btn-small btn-textbook" onClick={() => openTextbook(q.id, q.title)}>
                  [📖 Theory]
                </button>
              </div>

              {isCorrect && (
                <div className="feedback-box feedback-success">
                  <span>[✓] Correct flag captured!</span>
                </div>
              )}
              {isWrong && (
                <div className="feedback-box feedback-error">
                  <span>[!] Incorrect test flag. Check placeholder value!</span>
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}

      <div className="terminal-hr" />

      <button className="btn-large" onClick={onBack}>
        [ &larr; Back to Domains Dashboard ]
      </button>
    </div>
  );
}
