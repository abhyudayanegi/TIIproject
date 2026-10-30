import React, { useState } from 'react';
import { DOMAIN_ART } from './ascii';
import TextbookPanel from './TextbookPanel';

const LOCAL_ANSWERS = {
  1: ['CAT{always_view_the_source}', 'always_view_the_source'],
  2: ['CAT{robots_reveal_secrets}', 'robots_reveal_secrets'],
  3: ['CAT{never_trust_the_client}', 'never_trust_the_client'],
  4: ['CAT{cookies_are_not_secure}', 'cookies_are_not_secure'],
  5: ['CAT{idor_exposes_everyone}', 'idor_exposes_everyone'],
  6: ['CAT{dot_dot_slash_escape}', 'dot_dot_slash_escape'],
  7: ['CAT{sqli_shatters_evilcorp}', 'sqli_shatters_evilcorp'],
};

const normalize = (str) =>
  (str || '')
    .trim()
    .toLowerCase()
    .replace(/^(cat|ctf)\{/i, '')
    .replace(/\}$/, '');

const checkLocalAnswer = (id, userFlag) => {
  const raw = (userFlag || '').trim();
  if (!raw) return false;
  const targets = LOCAL_ANSWERS[id] || [];
  return targets.some(
    (t) => raw.toLowerCase() === t.toLowerCase() || normalize(raw) === normalize(t)
  );
};

export default function WebSecChallenges(props) {
  const [answers, setAnswers] = useState({});
  const [localResults, setLocalResults] = useState({});
  const results = props.results || localResults;
  const updateResult = (id, val) => {
    setLocalResults((prev) => ({ ...prev, [id]: val }));
    if (props.onResultChange) props.onResultChange(id, val);
  };
  const [hintsVisible, setHintsVisible] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [textbookQuestion, setTextbookQuestion] = useState(null);

  const openTextbook = (id, title) => setTextbookQuestion({ id, title });
  const closeTextbook = () => setTextbookQuestion(null);

  const toggleHint = (id) => {
    setHintsVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleInputChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (results[id] !== undefined) {
      updateResult(id, undefined);
    }
    if (errorMessage) setErrorMessage('');
  };

  const handleSingleSubmit = async (id) => {
    const flagValue = answers[id] || '';
    if (!flagValue.trim()) {
      updateResult(id, false);
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/validate-single', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: 'Web Sec', id, flag: flagValue }),
      });
      if (response.ok) {
        const data = await response.json();
        updateResult(id, data.correct || checkLocalAnswer(id, flagValue));
      } else {
        updateResult(id, checkLocalAnswer(id, flagValue));
      }
    } catch (error) {
      updateResult(id, checkLocalAnswer(id, flagValue));
    }
  };

  const handleFinalSubmit = async () => {
    const answeredCount = Object.values(answers).filter((val) => val && val.trim() !== '').length;
    if (answeredCount === 0) {
      setErrorMessage('Denied: Please solve at least one challenge before completing the arena!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrorMessage('');
    const formattedAnswers = Object.keys(answers).map((id) => ({
      id: parseInt(id, 10),
      flag: answers[id],
    }));

    try {
      const response = await fetch('http://localhost:3001/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: 'Web Sec', answers: formattedAnswers }),
      });
      if (response.ok) {
        const data = await response.json();
        let localScore = 0;
        for (let i = 1; i <= 7; i++) {
          if (checkLocalAnswer(i, answers[i])) localScore++;
        }
        const finalScoreVal = Math.max(data.score || 0, localScore);
        if (props.onSubmit) props.onSubmit({ score: finalScoreVal, total: 7 });
        return;
      }
    } catch (error) {
      // Fallback to local verification
    }

    let score = 0;
    for (let i = 1; i <= 7; i++) {
      if (checkLocalAnswer(i, answers[i])) score++;
    }
    if (props.onSubmit) props.onSubmit({ score, total: 7 });
  };

  const solvedCount = Object.values(results).filter((r) => r === true).length;

  return (
    <div className="challenges-page">
      <TextbookPanel
        domain="Web Sec"
        questionId={textbookQuestion?.id}
        questionTitle={textbookQuestion?.title}
        open={Boolean(textbookQuestion)}
        onClose={closeTextbook}
      />

      {/* Clean Terminal Header */}
      <div className="terminal-page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div className="header-meta">
              <span className="badge-tag" style={{ background: 'var(--gb-tint-green)', color: 'var(--gb-green)', border: '1px solid rgba(184, 187, 38, 0.4)' }}>
                [OPERATION_GLASSHOUSE_ACTIVE]
              </span>
              <span style={{ fontSize: '12px', color: 'var(--gb-yellow)', fontWeight: 600 }}>
                TARGET: EVILCORP WEB PORTAL &bull; SOLVED: {solvedCount} / 7
              </span>
            </div>
            <h1 style={{ fontSize: '22px', borderBottom: 'none', margin: '6px 0 4px 0', color: 'var(--gb-fg0)' }}>
              Web Security Arena :: Operation Glasshouse
            </h1>
            <p style={{ color: 'var(--gb-fg2)', fontSize: '13.5px', margin: 0, maxWidth: '640px' }}>
              Each question below has a real EvilCorp target webpage built right into this project. Open the target page, inspect how the browser talks to the server, and exploit client-side flaws to breach EvilCorp's Master Vault.
            </p>
          </div>
          <pre className="ascii ascii-yellow header-ascii">
            {DOMAIN_ART['Web Sec']}
          </pre>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed var(--gb-bg3)' }}>
          <button className="btn-small" onClick={props.onBack}>
            [ &larr; Back to Brief ]
          </button>
          <div style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>
            Every challenge includes a live target webpage and a beginner walkthrough. Standard flag prefix: <code>CAT&#123;...&#125;</code>
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

      {/* Q1 */}
      <div className={`challenge-card ${results[1] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <div>
            <h3>
              <span style={{ color: 'var(--gb-yellow)' }}>[01]</span>
              <span>The Forgotten Developer Note (Warm-Up 1)</span>
            </h3>
            <span className="badge-tag" style={{ background: 'var(--gb-tint-aqua)', color: 'var(--gb-aqua)', marginTop: '4px', border: '1px solid rgba(142, 192, 124, 0.4)' }}>
              [Online Tool: Browser View Page Source (Ctrl+U / Right-Click)]
            </span>
          </div>
          <span className={`badge-tag ${results[1] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[1] === true ? '[SOLVED]' : '[PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          EvilCorp's Consumer Opt-Out Portal looks like a normal login screen, but a lazy developer left a secret comment hidden inside the raw HTML code of the webpage. Open the target webpage below, view its HTML page source, and find the flag!
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>TARGET WEBPAGE: </span>
            <code style={{ color: 'var(--gb-aqua)' }}>/websec/q1_login.html</code>
          </div>
          <a
            href="/websec/q1_login.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-small"
            style={{ textDecoration: 'none', padding: '4px 10px', fontSize: '12px', color: 'var(--gb-yellow)', borderColor: 'var(--gb-yellow)' }}
          >
            [ Open Target Webpage: q1_login.html &rarr; ]
          </a>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="CAT{...}"
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
          <button className="btn-small btn-textbook" onClick={() => openTextbook(1, '1. HTML Source Code & Developer Comments')}>
            [Theory]
          </button>
        </div>

        {results[1] === true && <div className="feedback-box feedback-success"><span>[+] Developer comment found! HTML source comments are visible to everyone: "CAT&#123;always_view_the_source&#125;".</span></div>}
        {results[1] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Open q1_login.html, right-click anywhere, select "View Page Source" (or press Ctrl+U), and scroll to the bottom!</span></div>}
        {hintsVisible[1] && (
          <div className="visible-hint">
            <span>&gt;&gt; Click [ Open Target Webpage: q1_login.html ]. Once it opens, right-click on the background and click "View Page Source" (or press Ctrl+U). Look at the green HTML comments (&lt;!-- ... --&gt;) at the very bottom!</span>
          </div>
        )}
      </div>

      {/* Q2 */}
      <div className={`challenge-card ${results[2] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <div>
            <h3>
              <span style={{ color: 'var(--gb-yellow)' }}>[02]</span>
              <span>Where Search Spiders Fear to Tread (Warm-Up 2)</span>
            </h3>
            <span className="badge-tag" style={{ background: 'var(--gb-tint-aqua)', color: 'var(--gb-aqua)', marginTop: '4px', border: '1px solid rgba(142, 192, 124, 0.4)' }}>
              [Online Tool: Browser robots.txt Inspection]
            </span>
          </div>
          <span className={`badge-tag ${results[2] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[2] === true ? '[SOLVED]' : '[PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          EvilCorp didn't want Google to show their secret compliance folder in search results, so they added it to their public <code>robots.txt</code> file. Ironically, anyone can read <code>robots.txt</code> to see exactly what a company is trying to hide! Open EvilCorp's <code>robots.txt</code> file below and grab the flag.
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>TARGET FILE: </span>
            <code style={{ color: 'var(--gb-aqua)' }}>/websec/q2_robots.txt</code>
          </div>
          <a
            href="/websec/q2_robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-small"
            style={{ textDecoration: 'none', padding: '4px 10px', fontSize: '12px', color: 'var(--gb-yellow)', borderColor: 'var(--gb-yellow)' }}
          >
            [ Open Target File: q2_robots.txt &rarr; ]
          </a>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="CAT{...}"
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
          <button className="btn-small btn-textbook" onClick={() => openTextbook(2, '2. Crawler Directives & robots.txt Reconnaissance')}>
            [Theory]
          </button>
        </div>

        {results[2] === true && <div className="feedback-box feedback-success"><span>[+] Crawler policy exposed! Never list sensitive directories in robots.txt: "CAT&#123;robots_reveal_secrets&#125;".</span></div>}
        {results[2] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Click [ Open Target File: q2_robots.txt ] and read the flag at the bottom of the text file!</span></div>}
        {hintsVisible[2] && (
          <div className="visible-hint">
            <span>&gt;&gt; Click [ Open Target File: q2_robots.txt ] above. The flag is written right inside the compliance note at the bottom of the file!</span>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* DOTTED LINE DIVIDER: CHAINED CASCADE (Q3 -> Q7)          */}
      {/* ========================================================= */}
      <div className="chain-divider">
        <div className="chain-divider-header">
          <span className="chain-divider-badge">• • • [ PHASE 2: 5-STAGE LINKED WEB INFILTRATION (Q3 &rarr; Q7) ] • • •</span>
        </div>
        <p className="chain-divider-desc">
          The warm-ups are complete. Questions 3 through 7 form a <strong>connected 5-stage infiltration chain</strong> into EvilCorp's intranet. Solving each target webpage reveals both that stage's flag and the exact cookie, Employee ID, file path, or username required for the next stage!
        </p>
      </div>

      {/* Q3 (Chain Stage 1) */}
      <div className={`challenge-card ${results[3] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <div>
            <h3>
              <span style={{ color: 'var(--gb-yellow)' }}>[03]</span>
              <span>The Greyed-Out Export Button (Chain Stage 1)</span>
            </h3>
            <span className="badge-tag" style={{ background: 'var(--gb-tint-aqua)', color: 'var(--gb-aqua)', marginTop: '4px', border: '1px solid rgba(142, 192, 124, 0.4)' }}>
              [Online Tool: Browser Inspect Element (F12)]
            </span>
          </div>
          <span className={`badge-tag ${results[3] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[3] === true ? '[SOLVED]' : '[PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          You've reached EvilCorp's Internal Helpdesk page, which has a button to export the classified directory—but the button is greyed out (<code>disabled</code> in HTML). Open <code>q3_helpdesk.html</code>, use your browser's <strong>Inspect Element</strong> tool to delete the word <code>disabled</code> from the button, and click it to get the flag and the clue for Question 4!
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>STAGE 1 TARGET WEBPAGE: </span>
            <code style={{ color: 'var(--gb-aqua)' }}>/websec/q3_helpdesk.html</code>
          </div>
          <a
            href="/websec/q3_helpdesk.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-small"
            style={{ textDecoration: 'none', padding: '4px 10px', fontSize: '12px', color: 'var(--gb-yellow)', borderColor: 'var(--gb-yellow)' }}
          >
            [ Open Target Webpage: q3_helpdesk.html &rarr; ]
          </a>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="CAT{...}"
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
          <button className="btn-small btn-textbook" onClick={() => openTextbook(3, '3. Client-Side DOM Manipulation & Inspect Element')}>
            [Theory]
          </button>
        </div>

        {results[3] === true && <div className="feedback-box feedback-success"><span>[+] Disabled button unlocked! Note the clue from the page: set cookie evilcorp_role to "admin" in Question 4!</span></div>}
        {results[3] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Open q3_helpdesk.html, right-click the grey button -&gt; Inspect, delete the "disabled" attribute, and click the button!</span></div>}
        {hintsVisible[3] && (
          <div className="visible-hint">
            <span>&gt;&gt; Open q3_helpdesk.html, right-click the grey button, and click "Inspect". In the HTML code panel, double-click the word "disabled" inside &lt;button id="unlock-btn" disabled&gt;, delete it, and press Enter. Then click the green button!</span>
          </div>
        )}
      </div>

      {/* Q4 (Chain Stage 2) */}
      <div className={`challenge-card ${results[4] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <div>
            <h3>
              <span style={{ color: 'var(--gb-yellow)' }}>[04]</span>
              <span>The VIP Cookie Jar (Chain Stage 2)</span>
            </h3>
            <span className="badge-tag" style={{ background: 'var(--gb-tint-aqua)', color: 'var(--gb-aqua)', marginTop: '4px', border: '1px solid rgba(142, 192, 124, 0.4)' }}>
              [Online Tool: Cookie Inspector / DevTools Storage]
            </span>
          </div>
          <span className={`badge-tag ${results[4] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[4] === true ? '[SOLVED]' : '[PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          Using the clue you uncovered in <strong>Question 3</strong>, open EvilCorp's Executive Session Portal (<code>q4_dashboard.html</code>). Right now your browser cookie says <code>evilcorp_role=guest</code>. Change your cookie value to the role revealed in Question 3 to unlock the Executive Vault and get the CEO's Employee ID for Question 5!
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>STAGE 2 TARGET WEBPAGE: </span>
            <code style={{ color: 'var(--gb-aqua)' }}>/websec/q4_dashboard.html</code>
          </div>
          <a
            href="/websec/q4_dashboard.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-small"
            style={{ textDecoration: 'none', padding: '4px 10px', fontSize: '12px', color: 'var(--gb-yellow)', borderColor: 'var(--gb-yellow)' }}
          >
            [ Open Target Webpage: q4_dashboard.html &rarr; ]
          </a>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="CAT{...}"
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
          <button className="btn-small btn-textbook" onClick={() => openTextbook(4, '4. Session Cookies & Privilege Escalation')}>
            [Theory]
          </button>
        </div>

        {results[4] === true && <div className="feedback-box feedback-success"><span>[+] Cookie forged! Remember the clue from the vault: the CEO's Employee ID is 1042 for Question 5!</span></div>}
        {results[4] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Open q4_dashboard.html, change evilcorp_role from "guest" to "admin", and click [ Save Cookie &amp; Reload ]!</span></div>}
        {hintsVisible[4] && (
          <div className="visible-hint">
            <span>&gt;&gt; Open q4_dashboard.html. In the Live Browser Cookie Inspector box on the page (or in F12 -&gt; Application -&gt; Cookies), change "guest" to "admin" and click [ Save Cookie &amp; Reload ]!</span>
          </div>
        )}
      </div>

      {/* Q5 (Chain Stage 3) */}
      <div className={`challenge-card ${results[5] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <div>
            <h3>
              <span style={{ color: 'var(--gb-yellow)' }}>[05]</span>
              <span>Stepping Into the CEO's Shoes — IDOR (Chain Stage 3)</span>
            </h3>
            <span className="badge-tag" style={{ background: 'var(--gb-tint-aqua)', color: 'var(--gb-aqua)', marginTop: '4px', border: '1px solid rgba(142, 192, 124, 0.4)' }}>
              [Online Tool: Browser URL Bar Parameter Tampering]
            </span>
          </div>
          <span className={`badge-tag ${results[5] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[5] === true ? '[SOLVED]' : '[PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          EvilCorp's HR Dossier Viewer loads employee profiles using the <code>?id=1001</code> parameter in the URL without checking permissions (an <strong>IDOR</strong> vulnerability). Open the webpage below and replace <code>1001</code> with the <strong>CEO's Employee ID</strong> you discovered in <strong>Question 4</strong>!
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>STAGE 3 TARGET WEBPAGE: </span>
            <code style={{ color: 'var(--gb-aqua)' }}>/websec/q5_profile.html?id=1001</code>
          </div>
          <a
            href="/websec/q5_profile.html?id=1001"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-small"
            style={{ textDecoration: 'none', padding: '4px 10px', fontSize: '12px', color: 'var(--gb-yellow)', borderColor: 'var(--gb-yellow)' }}
          >
            [ Open Target Webpage: q5_profile.html?id=1001 &rarr; ]
          </a>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="CAT{...}"
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
          <button className="btn-small btn-textbook" onClick={() => openTextbook(5, '5. Insecure Direct Object Reference (IDOR)')}>
            [Theory]
          </button>
        </div>

        {results[5] === true && <div className="feedback-box feedback-success"><span>[+] CEO Dossier breached! Copy the secret file path "../../etc/evilcorp_shadow.conf" for Question 6!</span></div>}
        {results[5] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Open q5_profile.html?id=1001 and change the ID from 1001 to 1042 (from Question 4)!</span></div>}
        {hintsVisible[5] && (
          <div className="visible-hint">
            <span>&gt;&gt; Open q5_profile.html?id=1001. Change "1001" to "1042" (either in your browser's address bar at the top or in the input box on the page) and click [ Load Record ]!</span>
          </div>
        )}
      </div>

      {/* Q6 (Chain Stage 4) */}
      <div className={`challenge-card ${results[6] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <div>
            <h3>
              <span style={{ color: 'var(--gb-yellow)' }}>[06]</span>
              <span>Climbing Out of the Web Folder — Path Traversal (Chain Stage 4)</span>
            </h3>
            <span className="badge-tag" style={{ background: 'var(--gb-tint-aqua)', color: 'var(--gb-aqua)', marginTop: '4px', border: '1px solid rgba(142, 192, 124, 0.4)' }}>
              [Online Tool: Relative Path Traversal (../)]
            </span>
          </div>
          <span className={`badge-tag ${results[6] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[6] === true ? '[SOLVED]' : '[PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          In <strong>Question 5</strong>, the CEO's private note revealed that EvilCorp's server configuration is stored two folders above the public directory at <code>../../etc/evilcorp_shadow.conf</code>. Open the Cloud File Viewer below and use that path to read the shadow file and uncover the database admin's username for Question 7!
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>STAGE 4 TARGET WEBPAGE: </span>
            <code style={{ color: 'var(--gb-aqua)' }}>/websec/q6_files.html?file=welcome.txt</code>
          </div>
          <a
            href="/websec/q6_files.html?file=welcome.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-small"
            style={{ textDecoration: 'none', padding: '4px 10px', fontSize: '12px', color: 'var(--gb-yellow)', borderColor: 'var(--gb-yellow)' }}
          >
            [ Open Target Webpage: q6_files.html &rarr; ]
          </a>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="CAT{...}"
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
          <button className="btn-small btn-textbook" onClick={() => openTextbook(6, '6. Directory Path Traversal (../)')}>
            [Theory]
          </button>
        </div>

        {results[6] === true && <div className="feedback-box feedback-success"><span>[+] Shadow config dumped! Note the DB_ADMIN_USER "director_vance" for the final SQL Vault in Question 7!</span></div>}
        {results[6] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Open q6_files.html and load the path "../../etc/evilcorp_shadow.conf" discovered in Question 5!</span></div>}
        {hintsVisible[6] && (
          <div className="visible-hint">
            <span>&gt;&gt; Open q6_files.html. Replace "welcome.txt" with "../../etc/evilcorp_shadow.conf" and click [ Read File ] to get the flag and the admin username!</span>
          </div>
        )}
      </div>

      {/* Q7 (Chain Stage 5) */}
      <div className={`challenge-card ${results[7] === true ? 'solved' : ''}`}>
        <div className="challenge-header">
          <div>
            <h3>
              <span style={{ color: 'var(--gb-yellow)' }}>[07]</span>
              <span>Breaking the Master Vault with One Quote — SQL Injection (Chain Finale)</span>
            </h3>
            <span className="badge-tag" style={{ background: 'var(--gb-tint-aqua)', color: 'var(--gb-aqua)', marginTop: '4px', border: '1px solid rgba(142, 192, 124, 0.4)' }}>
              [Online Tool: Interactive SQL Query Monitor]
            </span>
          </div>
          <span className={`badge-tag ${results[7] === true ? 'badge-live' : 'badge-wireframe'}`}>
            {results[7] === true ? '[SOLVED]' : '[PENDING]'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--gb-fg)', fontSize: '14px' }}>
          You have reached EvilCorp's Master Surveillance Database Login (<code>q7_vault.html</code>). Enter the administrator username you found in <strong>Question 6</strong> (<code>director_vance</code>), and inject the classic SQL bypass payload <code>' OR 1=1 --</code> into the password field to shatter EvilCorp's login check!
        </p>

        <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>STAGE 5 TARGET WEBPAGE: </span>
            <code style={{ color: 'var(--gb-aqua)' }}>/websec/q7_vault.html</code>
          </div>
          <a
            href="/websec/q7_vault.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-small"
            style={{ textDecoration: 'none', padding: '4px 10px', fontSize: '12px', color: 'var(--gb-yellow)', borderColor: 'var(--gb-yellow)' }}
          >
            [ Open Target Webpage: q7_vault.html &rarr; ]
          </a>
        </div>

        <div className="challenge-controls">
          <div className="input-wrapper">
            <span className="input-prompt-icon">&gt;</span>
            <input
              type="text"
              placeholder="CAT{...}"
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
          <button className="btn-small btn-textbook" onClick={() => openTextbook(7, '7. SQL Injection (SQLi) Authentication Bypass')}>
            [Theory]
          </button>
        </div>

        {results[7] === true && <div className="feedback-box feedback-success"><span>[+] Master SQL Vault breached! Flag verified: "CAT&#123;sqli_shatters_evilcorp&#125;". Operation Glasshouse complete!</span></div>}
        {results[7] === false && <div className="feedback-box feedback-error"><span>[!] Incorrect. Open q7_vault.html, type "director_vance" as the username and "' OR 1=1 --" as the password!</span></div>}
        {hintsVisible[7] && (
          <div className="visible-hint">
            <span>&gt;&gt; Open q7_vault.html. Type "director_vance" into the Username box and "' OR 1=1 --" (including the single quote at the start) into the Password box, then click the green button!</span>
          </div>
        )}
      </div>

      {/* Footer Submit */}
      <div className="terminal-hr" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button className="btn-small" onClick={props.onBack}>
          [ &larr; Back to Brief ]
        </button>
        <button className="btn-large btn-primary" style={{ marginTop: 0, width: 'auto', minWidth: '280px' }} onClick={handleFinalSubmit}>
          [ Complete Web Security Mission &amp; View Results &rarr; ]
        </button>
      </div>
    </div>
  );
}
