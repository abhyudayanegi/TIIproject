import { useState } from 'react';
import TextbookPanel from './TextbookPanel';
import { CAT_DETECTIVE } from './ascii';

const ACCEPTED_OSINT_FLAGS = {
  1: ['pizzaexpress', 'pizza express'],
  2: ['mumbai', 'bombay'],
  3: ['cat', 'the cat', 'stray cat'],
  4: ['mahapatraabheek0@gmail.com'],
  5: ['github', 'github.com'],
  6: ['ironeye_abheek', 'ironeye abheek'],
  7: ['CAT{H1DD3N_1N_PL41N_51GH7}', 'CTF{H1DD3N_1N_PL41N_51GH7}', 'H1DD3N_1N_PL41N_51GH7']
};

const normalizeOsintFlag = (str) => {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/^(cat|ctf)\{/i, '')
    .replace(/\}$/, '');
};

const checkOsintLocally = (id, input) => {
  if (!input) return false;
  const cleanInput = input.trim().toLowerCase();
  const normInput = normalizeOsintFlag(input);
  const targets = ACCEPTED_OSINT_FLAGS[id] || [];
  return targets.some(target => {
    const cleanTarget = target.trim().toLowerCase();
    const normTarget = normalizeOsintFlag(target);
    return cleanInput === cleanTarget || normInput === normTarget;
  });
};

export default function Challenges(props) {
  let [hintsVisible, setHintsVisible] = useState({});
  let [answers, setAnswers] = useState({});
  let [localResults, setLocalResults] = useState({});
  let [isSubmitting, setIsSubmitting] = useState(false);
  let [activeTextbook, setActiveTextbook] = useState(null);
  let [errorMessage, setErrorMessage] = useState(null);

  const results = props.results !== undefined ? props.results : localResults;

  function updateResult(id, isCorrect) {
    setLocalResults(prev => ({ ...prev, [id]: isCorrect }));
    if (props.onResultChange) {
      props.onResultChange(id, isCorrect);
    }
  }

  function openTextbook(id, title) {
    setActiveTextbook({ id, title });
  }

  function closeTextbook() {
    setActiveTextbook(null);
  }

  function toggleHint(id) {
    let newHints = Object.assign({}, hintsVisible);
    newHints[id] = !newHints[id];
    setHintsVisible(newHints);
  }

  function handleInputChange(id, val) {
    let newAnswers = Object.assign({}, answers);
    newAnswers[id] = val;
    setAnswers(newAnswers);
    
    if (results[id] !== undefined) {
      updateResult(id, undefined);
    }
  }

  function handleSingleSubmit(id) {
    let flag = answers[id];
    if (flag === undefined || flag === "") return;
    
    setErrorMessage(null);
    const isLocalValid = checkOsintLocally(id, flag);

    if (isLocalValid) {
      updateResult(id, true);
    }

    fetch('http://localhost:3001/api/validate-single', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain: 'OSINT', id: id, flag: flag })
    })
    .then(function(response) {
      return response.json().then(function(data) {
        if (response.ok === false) {
          if (!isLocalValid) {
            setErrorMessage(data.error || "Failed to validate answer.");
          }
        } else {
          const isCorrect = data.correct || isLocalValid;
          updateResult(id, isCorrect);
        }
      });
    })
    .catch(function() {
      if (!isLocalValid) {
        setErrorMessage("Could not connect to backend server. Make sure `node server.js` is running on port 3001!");
      }
    });
  }

  function handleFinalSubmit() {
    setIsSubmitting(true);
    setErrorMessage(null);
    
    let payload = [];
    for (let i = 1; i <= 7; i++) {
      payload.push({ id: i, flag: answers[i] !== undefined ? answers[i] : "" });
    }
    
    fetch('http://localhost:3001/api/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain: 'OSINT', answers: payload })
    })
    .then(function(response) {
      return response.json().then(function(data) {
        const localScore = Object.values(results).filter(v => v === true).length;
        const finalScore = data.score !== undefined && data.score >= localScore ? data.score : localScore;
        props.onSubmit(finalScore, 7);
        setIsSubmitting(false);
      });
    })
    .catch(function() {
      const localScore = Object.values(results).filter(v => v === true).length;
      props.onSubmit(localScore, 7);
      setIsSubmitting(false);
    });
  }

  const solvedCount = Object.values(results).filter(v => v === true).length;
  let submitButtonText = "[ Submit All & Complete Arena → ]";
  if (isSubmitting === true) {
    submitButtonText = "[ Validating Responses... ]";
  }

  return (
    <div className="challenges-section">
      <TextbookPanel
        open={activeTextbook !== null}
        domain="OSINT"
        questionId={activeTextbook ? activeTextbook.id : null}
        questionTitle={activeTextbook ? activeTextbook.title : null}
        onClose={closeTextbook}
      />

      {/* Clean Terminal Arena Header */}
      <div className="terminal-page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div className="header-meta">
              <span className="badge-tag" style={{ background: 'var(--gb-tint-green)', color: 'var(--gb-green)', border: '1px solid rgba(184, 187, 38, 0.4)' }}>
                [OSINT_ARENA_ACTIVE]
              </span>
              <span style={{ fontSize: '12px', color: 'var(--gb-yellow)', fontWeight: 600 }}>
                SOLVED: {solvedCount} / 7
              </span>
            </div>
            <h1 style={{ fontSize: '22px', borderBottom: 'none', margin: '6px 0 4px 0', color: 'var(--gb-fg0)' }}>
              🔍 Open Source Intelligence (OSINT) Arena
            </h1>
            <p style={{ color: 'var(--gb-fg2)', fontSize: '13.5px', margin: 0, maxWidth: '620px' }}>
              Investigate visual clues, inspect metadata, correlate public accounts, and piece together the digital breadcrumbs.
            </p>
          </div>
          <pre className="ascii ascii-aqua header-ascii">
            {CAT_DETECTIVE}
          </pre>
        </div>

        {/* Header toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed var(--gb-bg3)' }}>
          <button className="btn-small" onClick={props.onBack}>
            [ &larr; Back to Dashboard ]
          </button>
          <div style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>
            Need theory help? Click the purple <strong>[📖 Theory]</strong> button on any question!
          </div>
        </div>
      </div>

      <div className="terminal-hr" />

      {/* Global Error Banner if backend is not running */}
      {errorMessage && (
        <div className="feedback-box feedback-error" style={{ padding: '10px 14px' }}>
          <span>[!] {errorMessage}</span>
        </div>
      )}

      {/* Challenge 1 */}
      <div className={`challenge-card ${results[1] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[01]</span>
            <span>Geolocation Intelligence 1</span>
          </h3>
          <span className={`badge-tag ${results[1] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[1] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>
        
        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          Find the name of the restaurant visited by ██████.
        </p>
        
        <div className="link-group">
          <a href="/hint.jpg" target="_blank" rel="noreferrer" className="btn-small" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span>[ 🖼️ Download Photo Clue ]</span>
          </a>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input 
              type="text" 
              placeholder="Enter restaurant name..." 
              autoComplete="off" 
              value={answers[1] !== undefined ? answers[1] : ""}
              onChange={function(e) { handleInputChange(1, e.target.value) }}
            />
          </div>
          <button className="btn-small btn-primary" onClick={function() { handleSingleSubmit(1) }}>
            [Submit]
          </button>
          <button className="btn-small btn-hint" onClick={function() { toggleHint(1) }}>
            {hintsVisible[1] === true ? "[Hide Hint]" : "[💡 Hint]"}
          </button>
          <button className="btn-small btn-textbook" onClick={function() { openTextbook(1, "1. Geolocation Intelligence 1") }}>
            [📖 Theory]
          </button>
        </div>
        
        {results[1] === true && <div className="feedback-box feedback-success"><span>[✓] Correct flag captured!</span></div>}
        {results[1] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect flag. Check spelling and hints!</span></div>}
        {hintsVisible[1] === true && (
          <div className="visible-hint">
            <span>&gt;&gt; Search for the Name of the restaurant visible in the photo. Answer is 12 alphabets.</span>
          </div>
        )}
      </div>

      {/* Challenge 2 */}
      <div className={`challenge-card ${results[2] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[02]</span>
            <span>Geolocation Intelligence 2</span>
          </h3>
          <span className={`badge-tag ${results[2] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[2] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>
        
        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          What city was the picture taken in?
        </p>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input 
              type="text" 
              placeholder="Enter city name..." 
              autoComplete="off" 
              value={answers[2] !== undefined ? answers[2] : ""}
              onChange={function(e) { handleInputChange(2, e.target.value) }}
            />
          </div>
          <button className="btn-small btn-primary" onClick={function() { handleSingleSubmit(2) }}>
            [Submit]
          </button>
          <button className="btn-small btn-hint" onClick={function() { toggleHint(2) }}>
            {hintsVisible[2] === true ? "[Hide Hint]" : "[💡 Hint]"}
          </button>
          <button className="btn-small btn-textbook" onClick={function() { openTextbook(2, "2. Geolocation Intelligence 2") }}>
            [📖 Theory]
          </button>
        </div>
        
        {results[2] === true && <div className="feedback-box feedback-success"><span>[✓] Correct flag captured!</span></div>}
        {results[2] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect city. Try checking image metadata or search!</span></div>}
        {hintsVisible[2] === true && (
          <div className="visible-hint">
            <span>&gt;&gt; Check the photo metadata (EXIF data) or search it up. Answer is 6 letters.</span>
          </div>
        )}
      </div>

      {/* Phase Divider between Warm-ups (Q1-Q2) and Linked Chain (Q3-Q7) */}
      <div className="chain-divider">
        <div className="chain-divider-header">
          <span className="chain-divider-badge">• • • [ PHASE 2: 5-STAGE LINKED INVESTIGATION (Q3 &rarr; Q7) ] • • •</span>
        </div>
        <p className="chain-divider-desc">
          Questions 1 &amp; 2 were standalone photo warm-ups. The next 5 questions form a connected intelligence trail: finding the avatar leads to the personal email, which reveals the host platform, the cipher clue, and the final profile flag!
        </p>
      </div>

      {/* Challenge 3 */}
      <div className={`challenge-card ${results[3] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[03]</span>
            <span>Avatar Identification</span>
          </h3>
          <span className={`badge-tag ${results[3] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[3] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>
        
        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          What is ███████'s GitHub avatar of?
        </p>
        
        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input 
              type="text" 
              placeholder="Enter avatar subject..." 
              autoComplete="off" 
              value={answers[3] !== undefined ? answers[3] : ""}
              onChange={function(e) { handleInputChange(3, e.target.value) }}
            />
          </div>
          <button className="btn-small btn-primary" onClick={function() { handleSingleSubmit(3) }}>
            [Submit]
          </button>
          <button className="btn-small btn-hint" onClick={function() { toggleHint(3) }}>
            {hintsVisible[3] === true ? "[Hide Hint]" : "[💡 Hint]"}
          </button>
          <button className="btn-small btn-textbook" onClick={function() { openTextbook(3, "3. Avatar Identification") }}>
            [📖 Theory]
          </button>
        </div>
        
        {results[3] === true && <div className="feedback-box feedback-success"><span>[✓] Correct flag captured!</span></div>}
        {results[3] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Inspect the target's online profile!</span></div>}
        {hintsVisible[3] === true && (
          <div className="visible-hint">
            <span>&gt;&gt; Inspect the GitHub profile found from the photo clues.</span>
          </div>
        )}
      </div>

      {/* Challenge 4 */}
      <div className={`challenge-card ${results[4] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[04]</span>
            <span>Finding Contact Info</span>
          </h3>
          <span className={`badge-tag ${results[4] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[4] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>
        
        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          What is ███████'s personal email address?
        </p>
        
        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input 
              type="text" 
              placeholder="Enter email address..." 
              autoComplete="off" 
              value={answers[4] !== undefined ? answers[4] : ""}
              onChange={function(e) { handleInputChange(4, e.target.value) }}
            />
          </div>
          <button className="btn-small btn-primary" onClick={function() { handleSingleSubmit(4) }}>
            [Submit]
          </button>
          <button className="btn-small btn-hint" onClick={function() { toggleHint(4) }}>
            {hintsVisible[4] === true ? "[Hide Hint]" : "[💡 Hint]"}
          </button>
          <button className="btn-small btn-textbook" onClick={function() { openTextbook(4, "4. Finding Contact Info") }}>
            [📖 Theory]
          </button>
        </div>
        
        {results[4] === true && <div className="feedback-box feedback-success"><span>[✓] Correct email found!</span></div>}
        {results[4] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect email. Check commit logs and public repos!</span></div>}
        {hintsVisible[4] === true && (
          <div className="visible-hint">
            <span>&gt;&gt; A thorough search of the GitHub repositories and commits will reveal it.</span>
          </div>
        )}
      </div>

      {/* Challenge 5 */}
      <div className={`challenge-card ${results[5] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[05]</span>
            <span>Source Tracking</span>
          </h3>
          <span className={`badge-tag ${results[5] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[5] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>
        
        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          What site did you find his email address on?
        </p>
        
        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input 
              type="text" 
              placeholder="Enter platform name..." 
              autoComplete="off" 
              value={answers[5] !== undefined ? answers[5] : ""}
              onChange={function(e) { handleInputChange(5, e.target.value) }}
            />
          </div>
          <button className="btn-small btn-primary" onClick={function() { handleSingleSubmit(5) }}>
            [Submit]
          </button>
          <button className="btn-small btn-hint" onClick={function() { toggleHint(5) }}>
            {hintsVisible[5] === true ? "[Hide Hint]" : "[💡 Hint]"}
          </button>
          <button className="btn-small btn-textbook" onClick={function() { openTextbook(5, "5. Source Tracking") }}>
            [📖 Theory]
          </button>
        </div>
        
        {results[5] === true && <div className="feedback-box feedback-success"><span>[✓] Correct platform!</span></div>}
        {results[5] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect platform name.</span></div>}
        {hintsVisible[5] === true && (
          <div className="visible-hint">
            <span>&gt;&gt; Answer is 6 alphabets.</span>
          </div>
        )}
      </div>

      {/* Challenge 6 */}
      <div className={`challenge-card ${results[6] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[06]</span>
            <span>Cryptography</span>
          </h3>
          <span className={`badge-tag ${results[6] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[6] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>
        
        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          Decipher the following encrypted code to unlock the next step: <code style={{ color: 'var(--gb-yellow)' }}>evpgial_npssks</code>
        </p>
        
        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input 
              type="text" 
              placeholder="Enter decrypted plaintext..." 
              autoComplete="off" 
              value={answers[6] !== undefined ? answers[6] : ""}
              onChange={function(e) { handleInputChange(6, e.target.value) }}
            />
          </div>
          <button className="btn-small btn-primary" onClick={function() { handleSingleSubmit(6) }}>
            [Submit]
          </button>
          <button className="btn-small btn-hint" onClick={function() { toggleHint(6) }}>
            {hintsVisible[6] === true ? "[Hide Hint]" : "[💡 Hint]"}
          </button>
          <button className="btn-small btn-textbook" onClick={function() { openTextbook(6, "6. Cryptography") }}>
            [📖 Theory]
          </button>
        </div>
        
        {results[6] === true && <div className="feedback-box feedback-success"><span>[✓] Correct plaintext!</span></div>}
        {results[6] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect cipher solution. Check cipher tools!</span></div>}
        {hintsVisible[6] === true && (
          <div className="visible-hint">
            <span>&gt;&gt; Convert encrypted text using substitution / Vigenère / Caesar. Answer is 14 characters.</span>
          </div>
        )}
      </div>

      {/* Challenge 7 */}
      <div className={`challenge-card ${results[7] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[07]</span>
            <span>The Final Flag</span>
          </h3>
          <span className={`badge-tag ${results[7] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[7] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>
        
        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          Find the final flag located on the target's Instagram account.
        </p>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input 
              type="text" 
              placeholder="Enter final flag..." 
              autoComplete="off" 
              value={answers[7] !== undefined ? answers[7] : ""}
              onChange={function(e) { handleInputChange(7, e.target.value) }}
            />
          </div>
          <button className="btn-small btn-primary" onClick={function() { handleSingleSubmit(7) }}>
            [Submit]
          </button>
          <button className="btn-small btn-hint" onClick={function() { toggleHint(7) }}>
            {hintsVisible[7] === true ? "[Hide Hint]" : "[💡 Hint]"}
          </button>
          <button className="btn-small btn-textbook" onClick={function() { openTextbook(7, "7. The Final Flag") }}>
            [📖 Theory]
          </button>
        </div>
        
        {results[7] === true && <div className="feedback-box feedback-success"><span>[✓] Mission complete! Final flag verified.</span></div>}
        {results[7] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect flag. Inspect the Instagram account thoroughly!</span></div>}
        {hintsVisible[7] === true && (
          <div className="visible-hint">
            <span>&gt;&gt; Answer is 21 characters long.</span>
          </div>
        )}
      </div>

      <div className="terminal-hr" />

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
        <button className="btn-large" style={{ marginTop: 0, flex: 1, background: 'var(--gb-bg2)', color: 'var(--gb-fg0)', borderColor: 'var(--gb-bg3)' }} onClick={props.onBack} disabled={isSubmitting}>
          [ &larr; Back to Dashboard ]
        </button>
        <button className="btn-large btn-primary" style={{ marginTop: 0, flex: 2 }} onClick={handleFinalSubmit} disabled={isSubmitting}>
          {submitButtonText}
        </button>
      </div>
    </div>
  );
}
