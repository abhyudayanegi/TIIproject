import React, { useState } from 'react';
import TextbookPanel from './TextbookPanel';
import { CAT_DETECTIVE } from './ascii';

const ACCEPTED_OSINT_FLAGS = {
  1: ['CAT{eiffeltower}', 'eiffeltower', 'eiffel_tower', 'eiffel tower', 'the eiffel tower'],
  2: ['CAT{google}', 'google', 'google llc', 'google inc'],
  3: ['CAT{football}', 'football', 'soccer'],
  4: ['CAT{church_gate}', 'church_gate', 'churchgate', 'church gate', 'CAT{churchgate}'],
  5: ['CAT{beatlesashram}', 'beatlesashram', 'beatles_ashram', 'beatles ashram', 'the beatles ashram', 'chaurasi kutia'],
  6: ['CAT{abhyudaya}', 'abhyudaya', 'abhyudaya negi'],
  7: ['CAT{9:30-19:00}', '9:30-19:00', '09:30-19:00', '9:30 - 19:00', '09:30 - 19:00', 'CAT{09:30-19:00}']
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
    const isLocalValid = checkOsintLocally(id, flag);

    if (isLocalValid) {
      updateResult(id, true);
    }

    fetch('http://localhost:3001/api/validate-single', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain: 'OSINT', id, flag })
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
      body: JSON.stringify({ domain: 'OSINT', answers: payload })
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
                [OPERATION_OPEN_TRACE_ACTIVE]
              </span>
              <span style={{ fontSize: '12px', color: 'var(--gb-yellow)', fontWeight: 600 }}>
                TARGET: PUBLIC INTEL &bull; SOLVED: {solvedCount} / 7
              </span>
            </div>
            <h1 style={{ fontSize: '22px', borderBottom: 'none', margin: '6px 0 4px 0', color: 'var(--gb-fg0)' }}>
              🔍 Open Source Intelligence (OSINT) Arena
            </h1>
            <p style={{ color: 'var(--gb-fg2)', fontSize: '13.5px', margin: 0, maxWidth: '620px' }}>
              Investigate geographic coordinates, track suspicious server IP ownership, unmask an elusive Instagram persona, and reconstruct an individual's digital life pattern from public breadcrumbs.
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
            Zero local downloads needed! Questions with recommended online tools are tagged with ⚡. Standard flag prefix: <code>CAT&#123;...&#125;</code>
          </div>
        </div>
      </div>

      <div className="terminal-hr" />

      {/* Global Error Banner */}
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
            <span>Coordinates (Warm-Up 1) ⚡</span>
          </h3>
          <span className={`badge-tag ${results[1] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[1] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>
        
        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          An anonymous tip gives you only these coordinates: <code style={{ color: 'var(--gb-yellow)', background: 'var(--gb-bg0h)', padding: '2px 6px' }}>48.8584, 2.2945</code>. Paste them into Google Maps. Which landmark is at this location?
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px' }}>
          <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>TIP INTEL: </span>
          <span style={{ color: 'var(--gb-fg1)', fontSize: '13px' }}>Latitude: 48.8584 &bull; Longitude: 2.2945</span>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input 
              type="text" 
              placeholder="Enter landmark (e.g. CTF{...})" 
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
          <button className="btn-small btn-textbook" onClick={() => openTextbook(1, '1. Geographic Coordinates & Map OSINT')}>
            [📖 Theory]
          </button>
        </div>
        
        {results[1] === true && <div className="feedback-box feedback-success"><span>[✓] Coordinates resolved! The landmark is the Eiffel Tower in Paris: "eiffeltower".</span></div>}
        {results[1] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect landmark. Paste 48.8584, 2.2945 into Google Maps and check what monument sits at the pin!</span></div>}
        {hintsVisible[1] && (
          <div className="visible-hint">
            <span>&gt;&gt; Open maps.google.com and paste "48.8584, 2.2945" into the search bar. The red pin drops on a world-famous iron lattice tower in France!</span>
          </div>
        )}
      </div>

      {/* Challenge 2 */}
      <div className={`challenge-card ${results[2] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[02]</span>
            <span>Who owns this IP? (Warm-Up 2) ⚡</span>
          </h3>
          <span className={`badge-tag ${results[2] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[2] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>
        
        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          A suspicious log entry shows traffic from <code style={{ color: 'var(--gb-yellow)', background: 'var(--gb-bg0h)', padding: '2px 6px' }}>8.8.8.8</code>. Run it through an IP lookup tool. Which company operates this address?
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px' }}>
          <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>ROUTER LOG: </span>
          <span style={{ color: 'var(--gb-fg1)', fontSize: '13px' }}>SRC_IP: 8.8.8.8 &bull; PROTO: DNS (PORT 53)</span>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input 
              type="text" 
              placeholder="Enter company name (e.g. CTF{...})" 
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
          <button className="btn-small btn-textbook" onClick={() => openTextbook(2, '2. IP Address Reconnaissance & Whois')}>
            [📖 Theory]
          </button>
        </div>
        
        {results[2] === true && <div className="feedback-box feedback-success"><span>[✓] IP owner verified! ASN WHOIS points directly to "google".</span></div>}
        {results[2] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect organization. Use an IP lookup tool like ipinfo.io or whois to query 8.8.8.8!</span></div>}
        {hintsVisible[2] && (
          <div className="visible-hint">
            <span>&gt;&gt; Visit ipinfo.io/8.8.8.8 or bgp.he.net/ip/8.8.8.8. What technology conglomerate runs this public DNS service?</span>
          </div>
        )}
      </div>

      {/* Dotted divider between Warm-Ups and the Chained Investigation */}
      <div className="chain-divider">
        <span className="chain-divider-badge">{"// PHASE 2: THE INSTAGRAM RECONNAISSANCE CHAIN (Q3 - Q7) //"}</span>
        <p className="chain-divider-text">
          The following 5 challenges form a connected social media investigation (SOCMINT). Finding the target's Instagram account leads to their sports interests, favorite haunts, first travel photo, cross-platform identity on YouTube, and civic library timing.
        </p>
      </div>

      {/* ========================================================= */}
      {/* PHASE 2: THE CHAINED INVESTIGATION (Q3 - Q7)              */}
      {/* ========================================================= */}

      {/* Challenge 3 */}
      <div className={`challenge-card ${results[3] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[03]</span>
            <span>The Target's Sport (Chain Stage 1) ⚡</span>
          </h3>
          <span className={`badge-tag ${results[3] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[3] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>
        
        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          Find <strong style={{ color: 'var(--gb-yellow)' }}>"a guy who hates to click photos"</strong> on Instagram. What is a sport he seems to watch?
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px' }}>
          <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>SOCMINT TARGET: </span>
          <span style={{ color: 'var(--gb-fg1)', fontSize: '13px' }}>Search Instagram bio / handle matching "a guy who hates to click photos"</span>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input 
              type="text" 
              placeholder="Enter sport (e.g. CTF{...})" 
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
          <button className="btn-small btn-textbook" onClick={() => openTextbook(3, '3. Social Media Intelligence (SOCMINT)')}>
            [📖 Theory]
          </button>
        </div>
        
        {results[3] === true && <div className="feedback-box feedback-success"><span>[✓] Instagram feed analyzed! Sport confirmed: "football".</span></div>}
        {results[3] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect sport. Search Instagram for "a guy who hates to click photos" and inspect his post captions!</span></div>}
        {hintsVisible[3] && (
          <div className="visible-hint">
            <span>&gt;&gt; Use Instagram or Google search: search for "a guy who hates to click photos" on instagram.com. Look at his posts: which world sport appears repeatedly in his photos and stories?</span>
          </div>
        )}
      </div>

      {/* Challenge 4 */}
      <div className={`challenge-card ${results[4] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[04]</span>
            <span>Favorite Place (Chain Stage 2) ⚡</span>
          </h3>
          <span className={`badge-tag ${results[4] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[4] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>
        
        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          What seems to be his favorite place to visit?
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px' }}>
          <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>PATTERN OF LIFE: </span>
          <span style={{ color: 'var(--gb-fg1)', fontSize: '13px' }}>Review the target's post geotags and location labels</span>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input 
              type="text" 
              placeholder="Enter location (e.g. CTF{...})" 
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
          <button className="btn-small btn-textbook" onClick={() => openTextbook(4, '4. Geotag Clustering & Pattern-of-Life')}>
            [📖 Theory]
          </button>
        </div>
        
        {results[4] === true && <div className="feedback-box feedback-success"><span>[✓] Location cluster identified! His favorite place to visit is "church_gate".</span></div>}
        {results[4] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect place. Check which location or landmark is tagged most frequently across his feed!</span></div>}
        {hintsVisible[4] && (
          <div className="visible-hint">
            <span>&gt;&gt; Look at the location stamps above each photo on his feed. Which historic Mumbai terminus or neighborhood appears most often across his posts?</span>
          </div>
        )}
      </div>

      {/* Challenge 5 */}
      <div className={`challenge-card ${results[5] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[05]</span>
            <span>The Start (Chain Stage 3) ⚡</span>
          </h3>
          <span className={`badge-tag ${results[5] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[5] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>
        
        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          What is the location of the first photo he took?
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px' }}>
          <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>CHRONOLOGICAL TRACE: </span>
          <span style={{ color: 'var(--gb-fg1)', fontSize: '13px' }}>Scroll down to the bottom of the feed to his earliest uploaded photo</span>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input 
              type="text" 
              placeholder="Enter location (e.g. CTF{...})" 
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
          <button className="btn-small btn-textbook" onClick={() => openTextbook(5, '5. Visual GeoINT & Historical Photo Analysis')}>
            [📖 Theory]
          </button>
        </div>
        
        {results[5] === true && <div className="feedback-box feedback-success"><span>[✓] Origin landmark identified! The first photo was taken at "beatlesashram".</span></div>}
        {results[5] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect location. Scroll to his very first uploaded picture and run a reverse image search on it!</span></div>}
        {hintsVisible[5] && (
          <div className="visible-hint">
            <span>&gt;&gt; Take a screenshot of the very first photo he ever posted on the account. Drop it into Google Lens. What famous Rishikesh ashram visited by a British rock band in 1968 appears?</span>
          </div>
        )}
      </div>

      {/* Challenge 6 */}
      <div className={`challenge-card ${results[6] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[06]</span>
            <span>The Connection (Chain Stage 4) ⚡</span>
          </h3>
          <span className={`badge-tag ${results[6] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[6] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>
        
        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          What is the account owner's first name?
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px' }}>
          <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>CROSS-PLATFORM PIVOT: </span>
          <span style={{ color: 'var(--gb-fg1)', fontSize: '13px' }}>Pivot from the Instagram account name to search engines and video platforms</span>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input 
              type="text" 
              placeholder="Enter first name (e.g. CTF{...})" 
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
          <button className="btn-small btn-textbook" onClick={() => openTextbook(6, '6. Cross-Platform Pivot to YouTube')}>
            [📖 Theory]
          </button>
        </div>
        
        {results[6] === true && <div className="feedback-box feedback-success"><span>[✓] Identity unmasked! The account owner's first name is "abhyudaya".</span></div>}
        {results[6] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect name. Search the account handle on Google / YouTube to find the community post!</span></div>}
        {hintsVisible[6] && (
          <div className="visible-hint">
            <span>&gt;&gt; Google the exact Instagram handle or account title in quotes. Look for a YouTube community post where the creator is named!</span>
          </div>
        )}
      </div>

      {/* Challenge 7 */}
      <div className={`challenge-card ${results[7] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <h3>
            <span style={{ color: 'var(--gb-yellow)' }}>[07]</span>
            <span>The Final Clue (Chain Finale) ⚡</span>
          </h3>
          <span className={`badge-tag ${results[7] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[7] === true ? '[✓ SOLVED]' : '[○ PENDING]'}
          </span>
        </div>
        
        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          Look at the latest photo posted. What is the opening and closing time of the library in the area on a regular Monday [24 hour time]?
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px' }}>
          <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>FLAG FORMAT GUIDE: </span>
          <span style={{ color: 'var(--gb-fg1)', fontSize: '13px' }}>24-hour range format: <code>CTF&#123;HH:MM-HH:MM&#125;</code> (e.g. <code>CTF&#123;09:00-17:00&#125;</code>)</span>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input 
              type="text" 
              placeholder="Enter Monday hours (e.g. CTF{...})" 
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
          <button className="btn-small btn-textbook" onClick={() => openTextbook(7, '7. Civic Infrastructure & Public Operating Hours')}>
            [📖 Theory]
          </button>
        </div>
        
        {results[7] === true && <div className="feedback-box feedback-success"><span>[✓] Master intelligence complete! Monday library schedule verified: "9:30-19:00".</span></div>}
        {results[7] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect hours. Find the library located in the neighborhood of his latest photo and check regular Monday hours!</span></div>}
        {hintsVisible[7] && (
          <div className="visible-hint">
            <span>&gt;&gt; Identify the area of his latest post. Locate the prominent public library in that district and check its official operating hours on Monday in 24-hour format (e.g. HH:MM-HH:MM).</span>
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
