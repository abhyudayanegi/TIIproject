import React, { useState } from 'react';
import { TUTORIAL_ROBOT, TUTORIAL_PARTY } from './ascii';

const TUTORIAL_CHALLENGES = [
  {
    id: 1,
    title: 'Question 1: Standard Flag Format',
    instructions: 'Every CTF challenge hides a secret password called a "flag". Flags almost always follow a standard template like CAT{secret_text}. Try entering the flag below and press Submit:',
    flagToFind: 'CAT{welcome_to_cybersec}',
    hint: 'Type or paste exactly: CAT{welcome_to_cybersec}',
  },
  {
    id: 2,
    title: 'Question 2: Case & Symbol Precision',
    instructions: 'Flags are exact! Punctuation, underscores, and letter case must match precisely. Practice typing this second flag with symbols:',
    flagToFind: 'CAT{look_beneath_the_surface}',
    hint: 'Enter: CAT{look_beneath_the_surface}',
  },
  {
    id: 3,
    title: 'Question 3: Final Calibration Drill',
    instructions: 'You are now ready to test hypotheses and verify flags one by one. Enter this final calibration flag to unlock all arena dashboards:',
    flagToFind: 'CAT{ready_to_hack}',
    hint: 'Enter: CAT{ready_to_hack}',
  },
];

export default function Onboarding({ onComplete }) {
  const [inputs, setInputs] = useState({});
  const [status, setStatus] = useState({});
  const [showHint, setShowHint] = useState({});

  const handleInputChange = (id, val) => {
    setInputs(prev => ({ ...prev, [id]: val }));
    if (status[id] !== undefined) {
      setStatus(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSingleSubmit = (id, targetFlag) => {
    const val = (inputs[id] || '').trim();
    if (!val) return;

    if (val === targetFlag) {
      setStatus(prev => ({ ...prev, [id]: true }));
    } else {
      setStatus(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleAutoFill = (id, flag) => {
    setInputs(prev => ({ ...prev, [id]: flag }));
  };

  const toggleHint = (id) => {
    setShowHint(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = TUTORIAL_CHALLENGES.filter(q => status[q.id] === true).length;
  const isAllCompleted = completedCount === TUTORIAL_CHALLENGES.length;

  return (
    <div className="challenges-section">
      {/* Clean Terminal Header */}
      <div className="terminal-page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="header-meta">
              <span className="badge-tag" style={{ background: 'var(--gb-tint-yellow)', color: 'var(--gb-yellow)', border: '1px solid rgba(250, 189, 47, 0.4)' }}>
                [CALIBRATION_TUTORIAL]
              </span>
              <span style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>
                Progress: {completedCount} / {TUTORIAL_CHALLENGES.length} passed
              </span>
            </div>
            <h1 style={{ fontSize: '24px', borderBottom: 'none', margin: '6px 0 6px 0', color: 'var(--gb-fg0)' }}>
              Onboarding &amp; Flag Calibration
            </h1>
            <p style={{ color: 'var(--gb-fg2)', fontSize: '14px', margin: 0, maxWidth: '580px' }}>
              Learn how to submit flags, inspect clues, and get instant feedback in this safe simulator before entering real CTF domains.
            </p>
          </div>
          <pre className="ascii ascii-aqua header-ascii">
            {TUTORIAL_ROBOT}
          </pre>
        </div>

        {/* Instructions callout */}
        <div className="terminal-callout text-green" style={{ marginTop: '14px' }}>
          <span className="callout-symbol">&gt;&gt;</span>
          <span>
            <strong>HOW TO PLAY:</strong> Each challenge asks for a hidden secret string (flag). Enter the flag into the input field below and click <strong>[Submit]</strong>. Complete all 3 to unlock the arenas!
          </span>
        </div>
      </div>

      <div className="terminal-hr" />

      {/* Tutorial Question Cards */}
      {TUTORIAL_CHALLENGES.map((q) => {
        const isSolved = status[q.id] === true;
        const isFailed = status[q.id] === false;

        return (
          <div
            key={q.id}
            className={`challenge-card ${isSolved ? 'solved' : ''}`}
          >
            <div className="challenge-header">
              <h3>
                <span style={{ color: 'var(--gb-yellow)' }}>[#]</span>
                <span>{q.title}</span>
              </h3>
              <span className={`badge-tag ${isSolved ? 'badge-live' : 'badge-wireframe'}`}>
                {isSolved ? '[SOLVED]' : '[PENDING]'}
              </span>
            </div>

            <p style={{ margin: '0', color: 'var(--gb-fg)', fontSize: '14px', lineHeight: '1.6' }}>
              {q.instructions}
            </p>

            <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ color: 'var(--gb-gray)', fontSize: '12px' }}>TARGET FLAG: </span>
                <code style={{ color: 'var(--gb-green)', fontWeight: 'bold' }}>{q.flagToFind}</code>
              </div>
              <button
                type="button"
                className="btn-small"
                style={{ padding: '3px 8px', fontSize: '11.5px', background: 'var(--gb-bg2)' }}
                onClick={() => handleAutoFill(q.id, q.flagToFind)}
                title="Click to copy into the input box"
              >
                [Auto-fill]
              </button>
            </div>

            <div className="challenge-controls">
              <div className="input-wrapper">
                <span className="input-prompt-icon">&gt;</span>
                <input
                  type="text"
                  placeholder="Enter flag here (e.g. CAT{...})"
                  autoComplete="off"
                  value={inputs[q.id] || ''}
                  disabled={isSolved}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                />
              </div>

              <button
                className="btn-small btn-primary"
                onClick={() => handleSingleSubmit(q.id, q.flagToFind)}
                disabled={isSolved}
              >
                {isSolved ? '[Solved]' : '[Submit]'}
              </button>

              <button className="btn-small btn-hint" onClick={() => toggleHint(q.id)}>
                {showHint[q.id] ? '[Hide Hint]' : '[Hint]'}
              </button>
            </div>

            {isSolved && (
              <div className="feedback-box feedback-success">
                <span>[+] Correct flag submitted! Great job.</span>
              </div>
            )}
            {isFailed && (
              <div className="feedback-box feedback-error">
                <span>[!] Flag mismatch. Make sure casing, brackets, and underscores match exactly!</span>
              </div>
            )}
            {showHint[q.id] && (
              <div className="visible-hint">
                <span>&gt;&gt; {q.hint}</span>
              </div>
            )}
          </div>
        );
      })}

      {/* Completion section */}
      {isAllCompleted ? (
        <div style={{ border: '1px dashed var(--gb-green)', background: 'rgba(184, 187, 38, 0.04)', padding: '20px', textAlign: 'center', marginTop: '10px' }}>
          <div className="ascii-center">
            <pre className="ascii ascii-yellow" style={{ textAlign: 'left' }}>{TUTORIAL_PARTY}</pre>
          </div>
          <h2 style={{ color: 'var(--gb-green)', margin: '8px 0 4px 0', fontSize: '20px' }}>
            [+] Calibration Complete! Tutorial Passed!
          </h2>
          <p style={{ color: 'var(--gb-fg2)', margin: '0 auto 16px auto', fontSize: '14px', maxWidth: '600px' }}>
            You've mastered how flags work, how syntax parsing operates, and how to verify solutions. The main CTF domains are now unlocked!
          </p>
          <button className="btn-large" onClick={onComplete} style={{ maxWidth: '360px', margin: '0 auto' }}>
            [ Enter CTF Domains Dashboard &rarr; ]
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: 'var(--gb-gray)', fontSize: '12.5px', padding: '12px 0' }}>
          {"// Status: "}{completedCount} of {TUTORIAL_CHALLENGES.length} calibration drills passed. Complete all 3 to continue.
        </div>
      )}
    </div>
  );
}
