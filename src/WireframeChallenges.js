import React, { useState } from 'react';
import { WIP_CAT } from './ascii';
import TextbookPanel from './TextbookPanel';

const WIREFRAME_CONFIGS = {
  Stegano: {
    title: '_STEGANOGRAPHY_MODULES_ [WIREFRAME]',
    description: 'Steganography Wireframe Arena. Real challenge payloads and media files will be linked here.',
    questions: [
      { id: 1, title: '1. Pixel Peeping (LSB Extraction)', desc: 'Inspect the least significant bits of an uploaded PNG image to discover the hidden text string.', placeholder: 'CTF{stego_lsb_found}' },
      { id: 2, title: '2. The Sonic Secret', desc: 'Convert an MP3 recording into a spectrogram visualizer to read the message drawn in frequency spikes.', placeholder: 'CTF{sound_of_silence}' },
      { id: 3, title: '3. Trailing Byte Append', desc: 'Find files embedded after the IEND PNG trailer marker using a hex editor or binwalk.', placeholder: 'CTF{trailing_hex_data}' },
      { id: 4, title: '4. Passphrase Steghide Hunt', desc: 'Extract an encrypted zip archive hidden inside a JPEG file using steghide with wordlist clues.', placeholder: 'CTF{embedded_zip_archive}' },
      { id: 5, title: '5. Color Plane Shift', desc: 'Unmask secret contrast layers by separating red, green, and blue color channels.', placeholder: 'CTF{rgb_channel_secret}' },
    ],
  },
  Crypto: {
    title: '_CRYPTOGRAPHY_MODULES_ [WIREFRAME]',
    description: 'Cryptography Wireframe Arena. Cipher texts, key exchanges, and hash cracks will be added here.',
    questions: [
      { id: 1, title: '1. Caesar\'s Forgotten Scroll', desc: 'A classical shift cipher intercepted from historical records. Shift offset unknown.', placeholder: 'CTF{caesar_rot_decoded}' },
      { id: 2, title: '2. Multi-Layered Base Encoding', desc: 'Data encoded across base64 -> hex -> binary -> ASCII.', placeholder: 'CTF{encoding_is_not_encryption}' },
      { id: 3, title: '3. Weak PRNG Salt', desc: 'Predict pseudo-random number generator output using known timestamps and seed states.', placeholder: 'CTF{predictable_randomness}' },
      { id: 4, title: '4. The Broken Key (XOR)', desc: 'Single-byte XOR repeating key ciphertext analysis.', placeholder: 'CTF{xor_single_byte_cracked}' },
      { id: 5, title: '5. Hash Collision Encounter', desc: 'Analyze legacy MD5 hash properties and demonstrate collision vulnerabilities.', placeholder: 'CTF{md5_is_broken}' },
      { id: 6, title: '6. RSA Small Exponent Weakness', desc: 'Decrypt an RSA message generated with e = 3 and small modulus values.', placeholder: 'CTF{cube_root_attack}' },
    ],
  },
  'Web Sec': {
    title: '_WEB_SECURITY_MODULES_ [WIREFRAME]',
    description: 'Web Security Wireframe Arena. Live target containers and endpoints will be mounted here.',
    questions: [
      { id: 1, title: '1. Cookie Manipulation', desc: 'Inspect browser storage and modify session cookie privilege flags from user to admin.', placeholder: 'CTF{cookie_admin_true}' },
      { id: 2, title: '2. Hidden Form Parameters', desc: 'Inspect DOM form source code and bypass client-side price modification fields.', placeholder: 'CTF{inspect_element_pro}' },
      { id: 3, title: '3. Authentication Bypass (SQLi)', desc: 'Craft basic SQL authentication injection payloads (\' OR 1=1--) on a mock login screen.', placeholder: 'CTF{sqli_bypass_successful}' },
      { id: 4, title: '4. Cross-Site Scripting (Reflected XSS)', desc: 'Execute JavaScript via unescaped search parameter reflection.', placeholder: 'CTF{alert_xss_executed}' },
      { id: 5, title: '5. Insecure Direct Object Reference (IDOR)', desc: 'Enumerate sequential account IDs in the URL query string to view other users\' private profiles.', placeholder: 'CTF{idor_data_leakage}' },
      { id: 6, title: '6. Directory Traversal Path', desc: 'Exploit relative path syntax (../../etc/passwd) to access restricted server files.', placeholder: 'CTF{path_traversal_master}' },
      { id: 7, title: '7. CSRF Token Omission', desc: 'Submit state-changing actions without anti-forgery validation tokens.', placeholder: 'CTF{csrf_unprotected_endpoint}' },
      { id: 8, title: '8. Command Injection', desc: 'Chain shell commands using semicolons into a server ping diagnostic utility.', placeholder: 'CTF{rce_ping_chain}' },
    ],
  },
};

export default function WireframeChallenges({ domain, onBack }) {
  const config = WIREFRAME_CONFIGS[domain] || {
    title: `_${domain.toUpperCase()}_MODULES_ [WIREFRAME]`,
    description: 'Wireframe arena for this domain.',
    questions: [
      { id: 1, title: '1. Sample Wireframe Challenge', desc: 'Question details will be added soon.', placeholder: 'CTF{sample}' }
    ]
  };

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
    const entered = (answers[id] || '').trim();
    if (!entered) return;
    setResults(prev => ({ ...prev, [id]: entered === expected }));
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
                [WIREFRAME_BETA]
              </span>
              <span style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>
                Prototype specification
              </span>
            </div>
            <h1 style={{ fontSize: '22px', borderBottom: 'none', margin: '6px 0 4px 0', color: 'var(--gb-fg0)' }}>
              {config.title}
            </h1>
            <p style={{ color: 'var(--gb-fg2)', fontSize: '13.5px', margin: 0, maxWidth: '620px' }}>
              {config.description} Click <strong>[📖 Theory]</strong> on any question below to inspect its topic textbook!
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

      {/* Wireframe Question Cards */}
      {config.questions.map((q) => {
        const isCorrect = results[q.id] === true;
        const isWrong = results[q.id] === false;

        return (
          <div key={q.id} className="challenge-card">
            <div className="challenge-header">
              <h3>
                <span style={{ color: 'var(--gb-orange)' }}>[&gt;]</span>
                <span>{q.title}</span>
              </h3>
              <span className={`badge-tag ${isCorrect ? 'badge-live' : 'badge-wireframe'}`}>
                {isCorrect ? '[✓ VALIDATED]' : '[○ WIREFRAME PENDING]'}
              </span>
            </div>

            <p style={{ color: 'var(--gb-fg)', fontSize: '14px', margin: '0' }}>
              {q.desc}
            </p>

            <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>PROTOTYPE TEST FLAG: </span>
                <code style={{ color: 'var(--gb-orange)' }}>{q.placeholder}</code>
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
                <span>[✓] Correct! (Wireframe validated)</span>
              </div>
            )}
            {isWrong && (
              <div className="feedback-box feedback-error">
                <span>[!] Incorrect test flag. Check placeholder value!</span>
              </div>
            )}
          </div>
        );
      })}

      <div className="terminal-hr" />

      <button className="btn-large" onClick={onBack}>
        [ &larr; Back to Domains Dashboard ]
      </button>
    </div>
  );
}
