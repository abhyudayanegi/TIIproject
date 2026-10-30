import React, { useState } from 'react';
import TextbookPanel from './TextbookPanel';
import { CAT_HACKER } from './ascii';

const ACCEPTED_CRYPTO_FLAGS = {
  1: ['CAT{evilcorp_privacy_is_a_myth}', 'evilcorp_privacy_is_a_myth'],
  2: ['CAT{telemetry_is_not_encrypted}', 'telemetry_is_not_encrypted'],
  3: ['CAT{whistleblower_key_is_SHADOWCORP}', 'whistleblower_key_is_SHADOWCORP', 'SHADOWCORP', 'CAT{SHADOWCORP}'],
  4: ['CAT{caesar_shift_is_seven}', 'caesar_shift_is_seven', 'seven', '7', 'shift_is_seven'],
  5: ['CAT{target_vault_cerberus}', 'target_vault_cerberus', 'cerberus', 'vault_cerberus'],
  6: ['CAT{cerberus123}', 'cerberus123'],
  7: ['CAT{evilcorp_surveillance_neutralized_2026}', 'evilcorp_surveillance_neutralized_2026']
};

const normalizeFlag = (str) => {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/^(cat|ctf)\{/i, '')
    .replace(/\}$/, '');
};

const checkCryptoLocally = (id, input) => {
  if (!input) return false;
  const cleanInput = input.trim().toLowerCase();
  const normInput = normalizeFlag(input);
  const targets = ACCEPTED_CRYPTO_FLAGS[id] || [];
  return targets.some(target => {
    const cleanTarget = target.trim().toLowerCase();
    const normTarget = normalizeFlag(target);
    return cleanInput === cleanTarget || normInput === normTarget;
  });
};

export default function CryptoChallenges(props) {
  const [hintsVisible, setHintsVisible] = useState({});
  const [answers, setAnswers] = useState({});
  const [localResults, setLocalResults] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTextbook, setActiveTextbook] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Sync results with parent if provided
  const results = props.results !== undefined ? props.results : localResults;

  const updateResult = (id, isCorrect) => {
    setLocalResults(prev => ({ ...prev, [id]: isCorrect }));
    if (props.onResultChange) {
      props.onResultChange(id, isCorrect);
    }
  };

  const openTextbook = (id, title) => {
    setActiveTextbook({ id, title });
  };

  const closeTextbook = () => {
    setActiveTextbook(null);
  };

  const toggleHint = (id) => {
    setHintsVisible(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleInputChange = (id, val) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
    if (results[id] !== undefined) {
      updateResult(id, undefined);
    }
  };

  const handleSingleSubmit = (id) => {
    const flag = answers[id];
    if (flag === undefined || flag === '') return;

    setErrorMessage(null);
    const isLocalValid = checkCryptoLocally(id, flag);

    // If locally confirmed, mark correct immediately
    if (isLocalValid) {
      updateResult(id, true);
    }

    fetch('http://localhost:3001/api/validate-single', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain: 'Crypto', id, flag })
    })
      .then(res => res.json())
      .then(data => {
        const isCorrect = data.correct || isLocalValid;
        updateResult(id, isCorrect);
      })
      .catch(() => {
        if (!isLocalValid) {
          setErrorMessage('Could not connect to backend server. Make sure `node server.js` is running on port 3001!');
        }
      });
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = [];
    for (let i = 1; i <= 7; i++) {
      payload.push({ id: i, flag: answers[i] !== undefined ? answers[i] : '' });
    }

    fetch('http://localhost:3001/api/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain: 'Crypto', answers: payload })
    })
      .then(res => res.json())
      .then(data => {
        const localScore = Object.values(results).filter(v => v === true).length;
        const finalScore = data.score !== undefined && data.score >= localScore ? data.score : localScore;
        props.onSubmit(finalScore, 7);
        setIsSubmitting(false);
      })
      .catch(() => {
        const localScore = Object.values(results).filter(v => v === true).length;
        props.onSubmit(localScore, 7);
        setIsSubmitting(false);
      });
  };

  const solvedCount = Object.values(results).filter(v => v === true).length;
  let submitButtonText = '[ Submit All & Complete Arena → ]';
  if (isSubmitting) submitButtonText = '[ Validating Responses... ]';

  return (
    <div className="challenges-section">
      <TextbookPanel
        open={activeTextbook !== null}
        domain="Crypto"
        questionId={activeTextbook ? activeTextbook.id : null}
        questionTitle={activeTextbook ? activeTextbook.title : null}
        onClose={closeTextbook}
      />

      {/* Clean Terminal Header */}
      <div className="terminal-page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div className="header-meta">
              <span className="badge-tag" style={{ background: 'var(--gb-tint-purple)', color: 'var(--gb-purple)', border: '1px solid rgba(211, 134, 155, 0.4)' }}>
                [OPERATION_BLACKBOX_ACTIVE]
              </span>
              <span style={{ fontSize: '12px', color: 'var(--gb-yellow)', fontWeight: 600 }}>
                TARGET: EVILCORP SURVEILLANCE &bull; SOLVED: {solvedCount} / 7
              </span>
            </div>
            <h1 style={{ fontSize: '22px', borderBottom: 'none', margin: '6px 0 4px 0', color: 'var(--gb-fg0)' }}>
              Cryptography Arena :: The Anti-Corpo Infiltration
            </h1>
            <p style={{ color: 'var(--gb-fg2)', fontSize: '13.5px', margin: 0, maxWidth: '620px' }}>
              EvilCorp harvests citizen data behind opaque, marketed "encryption". Infiltrate their surveillance clusters, crack their executive dispatches, and neutralize their master telemetry payload.
            </p>
          </div>
          <pre className="ascii ascii-purple header-ascii">
            {CAT_HACKER}
          </pre>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed var(--gb-bg3)' }}>
          <button className="btn-small" onClick={props.onBack}>
            [ &larr; Back to Dashboard ]
          </button>
          <div style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>
            Zero local downloads needed! Questions with recommended online tools are tagged with [Online Tool]. Standard flag prefix: <code>CAT&#123;...&#125;</code>
          </div>
        </div>
      </div>

      <div className="terminal-hr" />

      {errorMessage && (
        <div className="feedback-box feedback-error" style={{ padding: '10px 14px' }}>
          <span>[!] {errorMessage}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* PHASE 1: WARM-UP QUESTIONS (Q1 - Q2)                     */}
      {/* ========================================================= */}

      {/* Challenge 1 */}
      <div className={`challenge-card ${results[1] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[01]</span>
            <span>The Leaked Executive Memo (Warm-Up 1)</span>
          </h3>
          <span className={`badge-tag ${results[1] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[1] === true ? '[SOLVED]' : '[PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          EvilCorp's internal compliance directors use a lazy ROT13 rotation to hide anti-privacy policies from external auditors. Rotate this intercepted directive by 13 positions to reveal what they really think about user data:
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px' }}>
          <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>EVILCORP INTERCEPT: </span>
          <code style={{ color: 'var(--gb-yellow)' }}>PNG&#123;rivypbec_cevinpl_vf_n_zlgu&#125;</code>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="Enter flag (e.g. CAT{...})"
              autoComplete="off"
              value={answers[1] || ''}
              onChange={(e) => handleInputChange(1, e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSingleSubmit(1); }}
            />
          </div>
          <button className="btn-small btn-primary" onClick={() => handleSingleSubmit(1)}>
            [Submit]
          </button>
          <button className="btn-small btn-hint" onClick={() => toggleHint(1)}>
            {hintsVisible[1] ? '[Hide Hint]' : '[Hint]'}
          </button>
          <button className="btn-small btn-textbook" onClick={() => openTextbook(1, '1. Caesar Shift & ROT13')}>
            [Theory]
          </button>
        </div>

        {results[1] === true && <div className="feedback-box feedback-success"><span>[+] Memo decoded! EvilCorp's slogan exposed: "evilcorp_privacy_is_a_myth".</span></div>}
        {results[1] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Rotate each letter forward or backward by 13!</span></div>}
        {hintsVisible[1] && (
          <div className="visible-hint">
            <span>&gt;&gt; In a 26-letter alphabet, rotating by 13 twice restores the message. P becomes C, N becomes A, G becomes T. Use CyberChef (ROT13) or ROT13.com!</span>
          </div>
        )}
      </div>

      {/* Challenge 2 */}
      <div className={`challenge-card ${results[2] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[02]</span>
            <span>The Fake Telemetry "Encryption" (Warm-Up 2)</span>
          </h3>
          <span className={`badge-tag ${results[2] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[2] === true ? '[SOLVED]' : '[PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          EvilCorp publicly advertises that their desktop telemetry is "end-to-end encrypted." But inspecting their outbound network ping reveals they are just wrapping plaintext in standard Base64! Decode the packet:
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px' }}>
          <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>SNIFFED PACKET: </span>
          <code style={{ color: 'var(--gb-yellow)' }}>Q0FUe3RlbGVtZXRyeV9pc19ub3RfZW5jcnlwdGVkfQ==</code>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="Enter decoded flag (e.g. CAT{...})"
              autoComplete="off"
              value={answers[2] || ''}
              onChange={(e) => handleInputChange(2, e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSingleSubmit(2); }}
            />
          </div>
          <button className="btn-small btn-primary" onClick={() => handleSingleSubmit(2)}>
            [Submit]
          </button>
          <button className="btn-small btn-hint" onClick={() => toggleHint(2)}>
            {hintsVisible[2] ? '[Hide Hint]' : '[Hint]'}
          </button>
          <button className="btn-small btn-textbook" onClick={() => openTextbook(2, '2. Base64 Encoding vs True Encryption')}>
            [Theory]
          </button>
        </div>

        {results[2] === true && <div className="feedback-box feedback-success"><span>[+] Deception busted! Telemetry is only Base64-encoded, not encrypted.</span></div>}
        {results[2] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Decode the Base64 string directly in browser!</span></div>}
        {hintsVisible[2] && (
          <div className="visible-hint">
            <span>&gt;&gt; The trailing "==" indicates Base64 byte padding. In CyberChef, add the "From Base64" operation to peel off EvilCorp's fake encryption.</span>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* DOTTED LINED DIVIDER: ENTERING EVILCORP INFILTRATION CHAIN */}
      {/* ========================================================= */}
      <div className="chain-divider">
        <div className="chain-divider-header">
          <span className="chain-divider-badge">• • • [ PHASE 2: OPERATION BLACK-BOX :: 5-STAGE EVILCORP INFILTRATION (Q3 &rarr; Q7) ] • • •</span>
        </div>
        <p className="chain-divider-desc">
          Perimeter breached! You are now inside EvilCorp's private server clusters. The next 5 questions form an unbroken cryptographic chain: each decrypted artifact yields the secret key, shift offset, or credential needed to crack the next defense.
        </p>
      </div>

      {/* ========================================================= */}
      {/* PHASE 2: 5-STAGE LINKED CHAIN (Q3 - Q7)                   */}
      {/* ========================================================= */}

      {/* Challenge 3 (Chain Stage 1) */}
      <div className={`challenge-card ${results[3] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <div>
            <h3>
              <span style={{ color: 'var(--gb-yellow)' }}>[03]</span>
              <span>The Whistleblower's Hex Packet (Chain Stage 1)</span>
            </h3>
            <span className="badge-tag" style={{ background: 'var(--gb-tint-aqua)', color: 'var(--gb-aqua)', marginTop: '4px', border: '1px solid rgba(142, 192, 124, 0.4)' }}>
              [Online Tool: CyberChef (From Hex)]
            </span>
          </div>
          <span className={`badge-tag ${results[3] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[3] === true ? '[SOLVED]' : '[PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          A sympathetic insider at EvilCorp's data harvesting division exfiltrated a raw hex packet from their profiling cluster. Convert this hexadecimal sequence into ASCII text to uncover the secret passphrase key:
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px', wordBreak: 'break-all' }}>
          <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>EXFILTRATED HEX BYTES: </span>
          <code style={{ color: 'var(--gb-green)' }}>4341547b77686973746c65626c6f7765725f6b65795f69735f534841444f57434f52507d</code>
        </div>

        <div className="link-group">
          <a href="/crypto_raw_transmission.hex" download="raw_transmission.hex" className="btn-small" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span>[ Download: raw_transmission.hex ]</span>
          </a>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="Enter flag (e.g. CAT{...})"
              autoComplete="off"
              value={answers[3] || ''}
              onChange={(e) => handleInputChange(3, e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSingleSubmit(3); }}
            />
          </div>
          <button className="btn-small btn-primary" onClick={() => handleSingleSubmit(3)}>
            [Submit]
          </button>
          <button className="btn-small btn-hint" onClick={() => toggleHint(3)}>
            {hintsVisible[3] ? '[Hide Hint]' : '[Hint]'}
          </button>
          <button className="btn-small btn-textbook" onClick={() => openTextbook(3, '3. Raw Hex Representation')}>
            [Theory]
          </button>
        </div>

        {results[3] === true && <div className="feedback-box feedback-success"><span>[+] Packet decoded! Note down the secret key "SHADOWCORP"—you will need it to unlock Question 4!</span></div>}
        {results[3] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Convert the 2-digit hexadecimal pairs into ASCII characters.</span></div>}
        {hintsVisible[3] && (
          <div className="visible-hint">
            <span>&gt;&gt; In CyberChef, add the "From Hex" operation. The key extracted from the flag is "SHADOWCORP".</span>
          </div>
        )}
      </div>

      {/* Challenge 4 (Chain Stage 2) */}
      <div className={`challenge-card ${results[4] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <div>
            <h3>
              <span style={{ color: 'var(--gb-yellow)' }}>[04]</span>
              <span>The Boardroom Vigenère Dispatch (Chain Stage 2)</span>
            </h3>
            <span className="badge-tag" style={{ background: 'var(--gb-tint-aqua)', color: 'var(--gb-aqua)', marginTop: '4px', border: '1px solid rgba(142, 192, 124, 0.4)' }}>
              [Online Tool: CyberChef (Vigenère Decode)]
            </span>
          </div>
          <span className={`badge-tag ${results[4] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[4] === true ? '[SOLVED]' : '[PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          We intercepted a polyalphabetic Vigenère dispatch sent between EvilCorp executives. To decipher it, you MUST use the secret key discovered in Question 3 as the passphrase:
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px' }}>
          <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>INTERCEPTED DISPATCH: </span>
          <code style={{ color: 'var(--gb-yellow)' }}>UHT&#123;foauoi_hzpfw_wo_usmtf&#125;</code>
        </div>

        <div className="link-group">
          <a href="/crypto_intercepted_dispatch.txt" download="intercepted_dispatch.txt" className="btn-small" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span>[ Download: intercepted_dispatch.txt ]</span>
          </a>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="Enter decrypted flag (e.g. CAT{...})"
              autoComplete="off"
              value={answers[4] || ''}
              onChange={(e) => handleInputChange(4, e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSingleSubmit(4); }}
            />
          </div>
          <button className="btn-small btn-primary" onClick={() => handleSingleSubmit(4)}>
            [Submit]
          </button>
          <button className="btn-small btn-hint" onClick={() => toggleHint(4)}>
            {hintsVisible[4] ? '[Hide Hint]' : '[Hint]'}
          </button>
          <button className="btn-small btn-textbook" onClick={() => openTextbook(4, '4. Polyalphabetic Vigenère Ciphers')}>
            [Theory]
          </button>
        </div>

        {results[4] === true && <div className="feedback-box feedback-success"><span>[+] Boardroom memo unmasked! Notice the shift offset "seven" (7) revealed in the flag.</span></div>}
        {results[4] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Did you use the whistleblower's key from Question 3 ("SHADOWCORP") as the Vigenère passphrase?</span></div>}
        {hintsVisible[4] && (
          <div className="visible-hint">
            <span>&gt;&gt; In CyberChef, add "Vigenère Decode" and set Key = "SHADOWCORP". Inspect the plaintext carefully for the numerical shift offset!</span>
          </div>
        )}
      </div>

      {/* Challenge 5 (Chain Stage 3) */}
      <div className={`challenge-card ${results[5] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <div>
            <h3>
              <span style={{ color: 'var(--gb-yellow)' }}>[05]</span>
              <span>The Scrambled Vault Backdoor (Chain Stage 3)</span>
            </h3>
            <span className="badge-tag" style={{ background: 'var(--gb-tint-aqua)', color: 'var(--gb-aqua)', marginTop: '4px', border: '1px solid rgba(142, 192, 124, 0.4)' }}>
              [Online Tool: CyberChef (ROT13 / Caesar)]
            </span>
          </div>
          <span className={`badge-tag ${results[5] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[5] === true ? '[SOLVED]' : '[PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          Question 4 exposed EvilCorp's backdoor shift offset ("seven"). An internal logging server scrambled their database vault codename by shifting every letter forward by 7. Shift backward by 7 to reveal the codename needed for the credential attack:
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px' }}>
          <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>SCRAMBLED VAULT LOG (+7): </span>
          <code style={{ color: 'var(--gb-yellow)' }}>JHA&#123;ahynla_chbsa_jlyilybz&#125;</code>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="Enter unshifted flag (e.g. CAT{...})"
              autoComplete="off"
              value={answers[5] || ''}
              onChange={(e) => handleInputChange(5, e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSingleSubmit(5); }}
            />
          </div>
          <button className="btn-small btn-primary" onClick={() => handleSingleSubmit(5)}>
            [Submit]
          </button>
          <button className="btn-small btn-hint" onClick={() => toggleHint(5)}>
            {hintsVisible[5] ? '[Hide Hint]' : '[Hint]'}
          </button>
          <button className="btn-small btn-textbook" onClick={() => openTextbook(5, '5. Caesar Decryption with Derived Shift')}>
            [Theory]
          </button>
        </div>

        {results[5] === true && <div className="feedback-box feedback-success"><span>[+] Vault target revealed! The codename is "cerberus".</span></div>}
        {results[5] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Shift backward by 7 positions (e.g. J - 7 = C, H - 7 = A, A - 7 = T).</span></div>}
        {hintsVisible[5] && (
          <div className="visible-hint">
            <span>&gt;&gt; To shift backward by 7 in CyberChef using ROT13, set Amount = 19 (since 26 - 7 = 19). The target word discovered inside the flag is "cerberus".</span>
          </div>
        )}
      </div>

      {/* Challenge 6 (Chain Stage 4) */}
      <div className={`challenge-card ${results[6] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <div>
            <h3>
              <span style={{ color: 'var(--gb-yellow)' }}>[06]</span>
              <span>Cracking the EvilCorp CISO Hash (Chain Stage 4)</span>
            </h3>
            <span className="badge-tag" style={{ background: 'var(--gb-tint-aqua)', color: 'var(--gb-aqua)', marginTop: '4px', border: '1px solid rgba(142, 192, 124, 0.4)' }}>
              [Online Tool: CrackStation / CyberChef]
            </span>
          </div>
          <span className={`badge-tag ${results[6] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[6] === true ? '[SOLVED]' : '[PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          You dumped EvilCorp's Chief Information Security Officer's password table. Despite their PR claims, the CISO stored their master key as an unsalted MD5 hash combining the vault codename from Question 5 ("cerberus") with standard numbers. Crack the hash to recover the administrative password:
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px' }}>
          <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>DUMPED MD5 HASH: </span>
          <code style={{ color: 'var(--gb-red)' }}>f6be3f2408481885304a362deafa168a</code>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="Enter cracked password (e.g. CAT{...} or password)"
              autoComplete="off"
              value={answers[6] || ''}
              onChange={(e) => handleInputChange(6, e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSingleSubmit(6); }}
            />
          </div>
          <button className="btn-small btn-primary" onClick={() => handleSingleSubmit(6)}>
            [Submit]
          </button>
          <button className="btn-small btn-hint" onClick={() => toggleHint(6)}>
            {hintsVisible[6] ? '[Hide Hint]' : '[Hint]'}
          </button>
          <button className="btn-small btn-textbook" onClick={() => openTextbook(6, '6. Cryptographic Hashing & Rainbow Tables')}>
            [Theory]
          </button>
        </div>

        {results[6] === true && <div className="feedback-box feedback-success"><span>[+] CISO hash cracked! Password "cerberus123" recovered. This is your master key for Question 7!</span></div>}
        {results[6] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Paste the MD5 hash into CrackStation or CyberChef to look up the plaintext.</span></div>}
        {hintsVisible[6] && (
          <div className="visible-hint">
            <span>&gt;&gt; Paste "f6be3f2408481885304a362deafa168a" into CrackStation (crackstation.net) or an online MD5 lookup table. The recovered plaintext is the key to decrypt the final kill-switch!</span>
          </div>
        )}
      </div>

      {/* Challenge 7 (Chain Stage 5) */}
      <div className={`challenge-card ${results[7] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <div>
            <h3>
              <span style={{ color: 'var(--gb-yellow)' }}>[07]</span>
              <span>Neutralizing the Surveillance Master Payload (Chain Stage 5)</span>
            </h3>
            <span className="badge-tag" style={{ background: 'var(--gb-tint-aqua)', color: 'var(--gb-aqua)', marginTop: '4px', border: '1px solid rgba(142, 192, 124, 0.4)' }}>
              [Online Tool: CyberChef (Recipe: From Base64 + XOR)]
            </span>
          </div>
          <span className={`badge-tag ${results[7] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[7] === true ? '[SOLVED]' : '[PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          To permanently shut down EvilCorp's mass tracking grid, you must decrypt their master kill-switch payload. It was encrypted with repeating-key XOR using the CISO's password cracked in Question 6 ("cerberus123"), and then encoded into Base64. Strip the layers in CyberChef using the recipe [From Base64 &rarr; XOR (Key='cerberus123')] to obtain the master flag and liberate the network!
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px', wordBreak: 'break-all' }}>
          <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>DOUBLE-ENVELOPED PAYLOAD: </span>
          <code style={{ color: 'var(--gb-green)' }}>ICQmGQAEHB9SXUETOgEXFwQQGl1eUg0GFz0LFwAHQ1NfCh8XBjpARUEHTw==</code>
        </div>

        <div className="link-group">
          <a href="/crypto_master_payload.enc" download="master_payload.enc" className="btn-small" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span>[ Download: master_payload.enc ]</span>
          </a>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="Enter master flag (e.g. CAT{...})"
              autoComplete="off"
              value={answers[7] || ''}
              onChange={(e) => handleInputChange(7, e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSingleSubmit(7); }}
            />
          </div>
          <button className="btn-small btn-primary" onClick={() => handleSingleSubmit(7)}>
            [Submit]
          </button>
          <button className="btn-small btn-hint" onClick={() => toggleHint(7)}>
            {hintsVisible[7] ? '[Hide Hint]' : '[Hint]'}
          </button>
          <button className="btn-small btn-textbook" onClick={() => openTextbook(7, '7. Multi-Layered Cryptographic Envelopes')}>
            [Theory]
          </button>
        </div>

        {results[7] === true && <div className="feedback-box feedback-success"><span>[+] EvilCorp surveillance neutralized! Master flag verified. Digital privacy liberated!</span></div>}
        {results[7] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Make sure your CyberChef recipe has: 1) From Base64, and 2) XOR with Key = cerberus123 (UTF8).</span></div>}
        {hintsVisible[7] && (
          <div className="visible-hint">
            <span>&gt;&gt; In CyberChef, construct the 2-step recipe: 1) "From Base64", then 2) "XOR" with Key = "cerberus123" (UTF8). Paste the payload into the Input window to reveal the victory flag!</span>
          </div>
        )}
      </div>

      <div className="terminal-hr" />

      {/* Arena Navigation */}
      <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
        <button
          className="btn-large"
          style={{ marginTop: 0, flex: 1, background: 'var(--gb-bg2)', color: 'var(--gb-fg0)', borderColor: 'var(--gb-bg3)' }}
          onClick={props.onBack}
          disabled={isSubmitting}
        >
          [ &larr; Back to Dashboard ]
        </button>
        <button
          className="btn-large btn-primary"
          style={{ marginTop: 0, flex: 2 }}
          onClick={handleFinalSubmit}
          disabled={isSubmitting}
        >
          {submitButtonText}
        </button>
      </div>
    </div>
  );
}
