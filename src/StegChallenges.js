import React, { useState } from 'react';
import TextbookPanel from './TextbookPanel';
import { CAT_STEGO } from './ascii';

const ACCEPTED_STEG_FLAGS = {
  1: ['CAT{but_i_refuse}', 'but_i_refuse'],
  2: ['CAT{detailed_search}', 'detailed_search'],
  3: ['CAT{l1ghtw0rks}', 'l1ghtw0rks'],
  4: ['CAT{whysoserious}', 'whysoserious'],
  5: ['CAT{saveaseat}', 'saveaseat'],
  6: ['CAT{waverunner}', 'cat{waverunner}', 'waverunner'],
  7: ['CAT{youfoundme!}', 'youfoundme!', 'CAT{youfoundme}', 'youfoundme']
};

const normalizeFlag = (str) => {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/^(cat|ctf)\{/i, '')
    .replace(/\}$/, '');
};

const checkStegLocally = (id, input) => {
  if (!input) return false;
  const cleanInput = input.trim().toLowerCase();
  const normInput = normalizeFlag(input);
  const targets = ACCEPTED_STEG_FLAGS[id] || [];
  return targets.some(target => {
    const cleanTarget = target.trim().toLowerCase();
    const normTarget = normalizeFlag(target);
    return cleanInput === cleanTarget || normInput === normTarget;
  });
};

export default function StegChallenges(props) {
  const [hintsVisible, setHintsVisible] = useState({});
  const [answers, setAnswers] = useState({});
  const [localResults, setLocalResults] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTextbook, setActiveTextbook] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
    const isLocalValid = checkStegLocally(id, flag);

    if (isLocalValid) {
      updateResult(id, true);
    }

    fetch('http://localhost:3001/api/validate-single', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain: 'Stegano', id, flag })
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
      body: JSON.stringify({ domain: 'Stegano', answers: payload })
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
  let submitButtonText = '[ Submit All & Complete Stegano Arena → ]';
  if (isSubmitting) submitButtonText = '[ Validating Responses... ]';

  return (
    <div className="challenges-section">
      <TextbookPanel
        open={activeTextbook !== null}
        domain="Stegano"
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
                [OPERATION_INSIDER_TRACE_ACTIVE]
              </span>
              <span style={{ fontSize: '12px', color: 'var(--gb-yellow)', fontWeight: 600 }}>
                TARGET: EVILCORP INSIDER TRAILS &bull; SOLVED: {solvedCount} / 7
              </span>
            </div>
            <h1 style={{ fontSize: '22px', borderBottom: 'none', margin: '6px 0 4px 0', color: 'var(--gb-fg0)' }}>
              🎨 Steganography Arena :: The Whistleblower Trail
            </h1>
            <p style={{ color: 'var(--gb-fg2)', fontSize: '13.5px', margin: 0, maxWidth: '620px' }}>
              EvilCorp executives thought their internal documents, propaganda mugs, and audio memory-wipes were clean. An insider left a trail of hidden payloads encoded across files, images, and audio frequencies. Uncover the truth.
            </p>
          </div>
          <pre className="ascii ascii-purple header-ascii">
            {CAT_STEGO}
          </pre>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed var(--gb-bg3)' }}>
          <button className="btn-small" onClick={props.onBack}>
            [ &larr; Back to Dashboard ]
          </button>
          <div style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>
            Zero local downloads needed! Questions with recommended online tools are tagged with ⚡. Standard flag prefix: <code>CAT&#123;...&#125;</code>
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
            <span>Evil Terms Of Service (Warm-Up 1) ⚡</span>
          </h3>
          <span className={`badge-tag ${results[1] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[1] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          EvilCorp's Terms of Service says you give up all rights by scrolling to the bottom. Read it carefully. Someone left something in this document that a normal reader would never see. What is it?
        </p>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <a
            href="/steg/q1_terms_of_service.docx"
            download="Evil_Terms_Of_Service.docx"
            className="btn-small"
            style={{ textDecoration: 'none', background: 'var(--gb-bg1)' }}
          >
            [ 📥 Download: Evil_Terms_Of_Service.docx ]
          </a>
          <span style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>
            Tip: Open in Word / LibreOffice / Google Docs or view strings in CyberChef.
          </span>
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
            {hintsVisible[1] ? '[Hide Hint]' : '[💡 Hint]'}
          </button>
          <button className="btn-small btn-textbook" onClick={() => openTextbook(1, '1. Document Hidden Text & Whitespace')}>
            [📖 Theory]
          </button>
        </div>

        {results[1] === true && <div className="feedback-box feedback-success"><span>[✓] Document inspected! Hidden text revealed: "but_i_refuse".</span></div>}
        {results[1] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. The flag is white text on a white page at the very end. Select all (Ctrl+A) and change font color!</span></div>}
        {hintsVisible[1] && (
          <div className="visible-hint">
            <span>&gt;&gt; The flag is written in white text on a white page at the very end. Select all text (Ctrl+A / Cmd+A) and change the font color to dark black or red!</span>
          </div>
        )}
      </div>

      {/* Challenge 2 */}
      <div className={`challenge-card ${results[2] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[02]</span>
            <span>Evil Mug (Warm-Up 2) ⚡</span>
          </h3>
          <span className={`badge-tag ${results[2] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[2] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          EvilCorp hands out branded mugs to new recruits. This photo of one looks harmless, but the file itself carries a note. What does the note say?
        </p>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
          <img
            src="/steg/q2_evil_mug.jpg"
            alt="Evil Mug Preview"
            style={{ width: '90px', height: '65px', objectFit: 'cover', border: '1px solid var(--gb-bg3)', background: 'var(--gb-bg0h)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <a
              href="/steg/q2_evil_mug.jpg"
              download="Evil_Mug.jpg"
              className="btn-small"
              style={{ textDecoration: 'none', background: 'var(--gb-bg1)', alignSelf: 'flex-start' }}
            >
              [ 📥 Download: Evil_Mug.jpg ]
            </a>
            <span style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>
              Inspect image metadata headers or upload to exif.tools!
            </span>
          </div>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="Enter flag (e.g. CAT{...})"
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
            {hintsVisible[2] ? '[Hide Hint]' : '[💡 Hint]'}
          </button>
          <button className="btn-small btn-textbook" onClick={() => openTextbook(2, '2. Image EXIF & Metadata Comments')}>
            [📖 Theory]
          </button>
        </div>

        {results[2] === true && <div className="feedback-box feedback-success"><span>[✓] Mug inspected! EXIF comment extracted: "detailed_search".</span></div>}
        {results[2] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Look inside the image metadata (EXIF "Comments"). Right-click -> Properties -> Details or use exif.tools!</span></div>}
        {hintsVisible[2] && (
          <div className="visible-hint">
            <span>&gt;&gt; Check the image EXIF tags. On Windows: right-click the file &rarr; Properties &rarr; Details &rarr; Comments. Online: upload to exif.tools or jimpl.com!</span>
          </div>
        )}
      </div>

      {/* Dotted divider between Warm-Ups and the Chained Challenges */}
      <div className="chain-divider">
        <span className="chain-divider-badge">{"// PHASE 2: THE WHISTLEBLOWER REVELATION CHAIN (Q3 - Q7) //"}</span>
        <p className="chain-divider-text">
          The following 5 challenges form a linked forensic investigation. Each extracted artifact reveals the target, tools, or passwords needed to solve the next phase.
        </p>
      </div>

      {/* ========================================================= */}
      {/* PHASE 2: THE CHAINED CHALLENGES (Q3 - Q7)                */}
      {/* ========================================================= */}

      {/* Challenge 3 */}
      <div className={`challenge-card ${results[3] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[03]</span>
            <span>BLACKBOOK (Chain Stage 1) ⚡</span>
          </h3>
          <span className={`badge-tag ${results[3] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[3] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          The trail from the terms and the mug leads to an insider's "black book", which looks like a blank black rectangle. Make the invisible visible. What is written in it?
        </p>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
          <img
            src="/steg/q3_blackbook.png"
            alt="Blackbook Preview"
            style={{ width: '90px', height: '65px', objectFit: 'cover', border: '1px solid var(--gb-bg3)', background: '#000000' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <a
              href="/steg/q3_blackbook.png"
              download="BLACKBOOK.png"
              className="btn-small"
              style={{ textDecoration: 'none', background: 'var(--gb-bg1)', alignSelf: 'flex-start' }}
            >
              [ 📥 Download: BLACKBOOK.png ]
            </a>
            <span style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>
              Online tool: Photopea (photopea.com) &rarr; Image &rarr; Adjustments &rarr; Brightness/Contrast
            </span>
          </div>
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
            {hintsVisible[3] ? '[Hide Hint]' : '[💡 Hint]'}
          </button>
          <button className="btn-small btn-textbook" onClick={() => openTextbook(3, '3. Low-Contrast Pixel Luminance')}>
            [📖 Theory]
          </button>
        </div>

        {results[3] === true && <div className="feedback-box feedback-success"><span>[✓] Shadows brightened! Hidden blackbook text recovered: "l1ghtw0rks".</span></div>}
        {results[3] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. The text is dark gray on black. Open in Photopea, adjust Brightness/Contrast or Levels to make it pop!</span></div>}
        {hintsVisible[3] && (
          <div className="visible-hint">
            <span>&gt;&gt; Open BLACKBOOK.png in Photopea (photopea.com) or GIMP. Go to Image &rarr; Adjustments &rarr; Brightness/Contrast and slide brightness to maximum, or adjust Levels!</span>
          </div>
        )}
      </div>

      {/* Challenge 4 */}
      <div className={`challenge-card ${results[4] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[04]</span>
            <span>Gimmick Boss (Chain Stage 2) ⚡</span>
          </h3>
          <span className={`badge-tag ${results[4] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[4] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          The black book names the insider's boss, and this photo is the boss. The photo's metadata holds a note from the insider, and the image itself hides a file. Recover the hidden message. It ends with a final encoded line. Decode it to get the flag.
        </p>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
          <img
            src="/steg/q4_gimmick_boss.jpg"
            alt="Boss Preview"
            style={{ width: '90px', height: '65px', objectFit: 'cover', border: '1px solid var(--gb-bg3)', background: 'var(--gb-bg0h)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <a
              href="/steg/q4_gimmick_boss.jpg"
              download="Gimmick_Boss.jpg"
              className="btn-small"
              style={{ textDecoration: 'none', background: 'var(--gb-bg1)', alignSelf: 'flex-start' }}
            >
              [ 📥 Download: Gimmick_Boss.jpg ]
            </a>
            <span style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>
              Step 1: Check EXIF comment for password &bull; Step 2: Extract with Steghide &bull; Step 3: Decode binary
            </span>
          </div>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="Enter flag (e.g. CAT{...})"
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
            {hintsVisible[4] ? '[Hide Hint]' : '[💡 Hint]'}
          </button>
          <button className="btn-small btn-textbook" onClick={() => openTextbook(4, '4. Steghide Passphrase & Binary')}>
            [📖 Theory]
          </button>
        </div>

        {results[4] === true && <div className="feedback-box feedback-success"><span>[✓] Steghide payload unpacked and binary decoded: "whysoserious".</span></div>}
        {results[4] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Metadata says password:lifeisajoke. Use Steghide to extract, then decode the ending binary to ASCII!</span></div>}
        {hintsVisible[4] && (
          <div className="visible-hint">
            <span>&gt;&gt; The EXIF comment gives the password: lifeisajoke. Use futureboy.us/stegano/decinput.html (or steghide extract -sf) with that password. The extracted text ends with 8-bit binary; paste it into CyberChef ("From Binary")!</span>
          </div>
        )}
      </div>

      {/* Challenge 5 */}
      <div className={`challenge-card ${results[5] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[05]</span>
            <span>EvilChair (Chain Stage 3) ⚡</span>
          </h3>
          <span className={`badge-tag ${results[5] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[5] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          The insider photographed the boss's chair before leaving. A JPEG viewer shows only the chair, but the file holds more than the picture. What is appended to the end of it?
        </p>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
          <img
            src="/steg/q5_evil_chair.jpg"
            alt="Chair Preview"
            style={{ width: '90px', height: '65px', objectFit: 'cover', border: '1px solid var(--gb-bg3)', background: 'var(--gb-bg0h)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <a
              href="/steg/q5_evil_chair.jpg"
              download="EvilChair.jpg"
              className="btn-small"
              style={{ textDecoration: 'none', background: 'var(--gb-bg1)', alignSelf: 'flex-start' }}
            >
              [ 📥 Download: EvilChair.jpg ]
            </a>
            <span style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>
              Online tool: HexEd.it (hexed.it) or CyberChef (Strings operation)
            </span>
          </div>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="Enter flag (e.g. CAT{...})"
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
            {hintsVisible[5] ? '[Hide Hint]' : '[💡 Hint]'}
          </button>
          <button className="btn-small btn-textbook" onClick={() => openTextbook(5, '5. Appended Trailing Payloads')}>
            [📖 Theory]
          </button>
        </div>

        {results[5] === true && <div className="feedback-box feedback-success"><span>[✓] Appended bytes read past EOF: "saveaseat".</span></div>}
        {results[5] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Open the file in HexEd.it or run strings on it and scroll to the very end!</span></div>}
        {hintsVisible[5] && (
          <div className="visible-hint">
            <span>&gt;&gt; Open EvilChair.jpg in an online hex editor (hexed.it) or CyberChef. Scroll directly to the bottom (past the FF D9 marker) to find the plaintext string!</span>
          </div>
        )}
      </div>

      {/* Challenge 6 */}
      <div className={`challenge-card ${results[6] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[06]</span>
            <span>EvilCorp Memory Wipe (Chain Stage 4) ⚡</span>
          </h3>
          <span className={`badge-tag ${results[6] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[6] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          The insider also recorded EvilCorp's "memory wipe" broadcast. The file warns of a high-frequency component. Don't listen to it, look at it. What does the audio spell out?
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
            <a
              href="/steg/q6_memory_wipe.wav"
              download="EvilCorp_memory_wipe.wav"
              className="btn-small"
              style={{ textDecoration: 'none', background: 'var(--gb-bg1)' }}
            >
              [ 📥 Download: EvilCorp_memory_wipe.wav (16 MB) ]
            </a>
            <span style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>
              Online tool: Academo Spectrum Analyzer or AudioMass. Look between 5 kHz and 15 kHz.
            </span>
          </div>
          <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>AUDIO PREVIEW:</span>
            <audio controls style={{ height: '32px', width: '100%', maxWidth: '420px' }} src="/steg/q6_memory_wipe.wav">
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="Enter flag (e.g. CAT{...} or cat{...})"
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
            {hintsVisible[6] ? '[Hide Hint]' : '[💡 Hint]'}
          </button>
          <button className="btn-small btn-textbook" onClick={() => openTextbook(6, '6. Audio Spectrogram Steganography')}>
            [📖 Theory]
          </button>
        </div>

        {results[6] === true && <div className="feedback-box feedback-success"><span>[✓] Spectrogram visualized! Sound frequencies spell: "waverunner".</span></div>}
        {results[6] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Open the audio in an online spectrogram viewer (like academo.org) and inspect the 5 kHz - 15 kHz band!</span></div>}
        {hintsVisible[6] && (
          <div className="visible-hint">
            <span>&gt;&gt; Upload the .wav file to academo.org/demos/spectrum-analyzer/ or open in Audacity (select "Spectrogram" view from the track menu). The word is drawn between 5 kHz and 15 kHz!</span>
          </div>
        )}
      </div>

      {/* Challenge 7 */}
      <div className={`challenge-card ${results[7] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[07]</span>
            <span>tryfindme (Master Flag & Chain Finale) ⚡</span>
          </h3>
          <span className={`badge-tag ${results[7] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[7] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          This last photo's comment says the password isn't in the metadata and tells you to play with the image. Find the password hidden in the picture, use it to unlock the embedded file, then decode the final line to get the flag.
        </p>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
          <img
            src="/steg/q7_tryfindme.jpg"
            alt="tryfindme Preview"
            style={{ width: '90px', height: '65px', objectFit: 'cover', border: '1px solid var(--gb-bg3)', background: 'var(--gb-bg0h)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <a
              href="/steg/q7_tryfindme.jpg"
              download="tryfindme.jpg"
              className="btn-small"
              style={{ textDecoration: 'none', background: 'var(--gb-bg1)', alignSelf: 'flex-start' }}
            >
              [ 📥 Download: tryfindme.jpg ]
            </a>
            <span style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>
              Step 1: Boost brightness/levels &bull; Step 2: Find password &bull; Step 3: Steghide unpack &bull; Step 4: Base64 decode
            </span>
          </div>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="Enter flag (e.g. CAT{...})"
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
            {hintsVisible[7] ? '[Hide Hint]' : '[💡 Hint]'}
          </button>
          <button className="btn-small btn-textbook" onClick={() => openTextbook(7, '7. Visual Password & Base64 Payload')}>
            [📖 Theory]
          </button>
        </div>

        {results[7] === true && <div className="feedback-box feedback-success"><span>[✓] Password extracted, steghide unpacked, Base64 decoded: "youfoundme!". Stegano master unmasked!</span></div>}
        {results[7] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Adjust levels until 0004 appears below the silhouettes, use it as steghide password, and decode the Base64!</span></div>}
        {hintsVisible[7] && (
          <div className="visible-hint">
            <span>&gt;&gt; In Photopea, crank up Levels/Exposure until a faint number "0004" appears below the silhouettes. Use "0004" as the steghide password to extract the file, which gives a Base64 string (Q0FUe3lvdWZvdW5kbWUhfQ==)!</span>
          </div>
        )}
      </div>

      <div className="terminal-hr" style={{ marginTop: '24px' }} />

      {/* Arena Completion Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', padding: '10px 0' }}>
        <div>
          <span style={{ fontSize: '13px', color: 'var(--gb-fg2)' }}>
            Current Progress: <strong style={{ color: 'var(--gb-yellow)' }}>{solvedCount} / 7</strong> challenges resolved.
          </span>
        </div>
        <button
          className="btn-small btn-primary"
          style={{ padding: '8px 18px', fontSize: '13px', fontWeight: 600 }}
          onClick={handleFinalSubmit}
          disabled={isSubmitting}
        >
          {submitButtonText}
        </button>
      </div>
    </div>
  );
}
