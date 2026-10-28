import React from 'react';
import { TROPHY_CAT } from './ascii';

export default function EndPage({ domain = 'OSINT', timeTaken, onBackToQuestions, onBackToMain, finalScore }) {
  const formatTime = (ms) => {
    if (ms === null || ms === undefined) return "00:00";
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let leftoverSeconds = totalSeconds % 60;
    let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
    let displaySeconds = leftoverSeconds < 10 ? "0" + leftoverSeconds : leftoverSeconds;
    return displayMinutes + ":" + displaySeconds;
  };

  return (
    <div className="terminal-document">
      {/* Clean Victory Header */}
      <div className="doc-header" style={{ textAlign: 'center' }}>
        <div className="ascii-center" style={{ marginBottom: '14px' }}>
          <pre className="ascii ascii-yellow">{TROPHY_CAT}</pre>
        </div>
        <div className="doc-meta" style={{ justifyContent: 'center' }}>
          <span className="doc-tag" style={{ color: 'var(--gb-green)' }}>[MISSION_ACCOMPLISHED]</span>
          <span className="doc-tag">[ARENA_COMPLETE::{domain.toUpperCase()}]</span>
        </div>
        <h1 style={{ fontSize: '26px', borderBottom: 'none', margin: '8px 0 6px 0', color: 'var(--gb-fg0)' }}>
          Mission Accomplished!
        </h1>
        <p className="doc-subtitle" style={{ margin: '0 auto', maxWidth: '620px' }}>
          Congratulations on completing the {domain} challenge arena! You've successfully practiced identifying vulnerabilities and capturing proof flags.
        </p>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', maxWidth: '440px', margin: '20px auto 0 auto' }}>
          <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '14px' }}>
            <div style={{ fontSize: '11px', color: 'var(--gb-gray)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>TIME ELAPSED</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--gb-aqua)', marginTop: '4px' }}>
              {formatTime(timeTaken)}
            </div>
          </div>

          {finalScore && (
            <div style={{ background: 'var(--gb-bg0h)', border: '1px solid var(--gb-bg3)', padding: '14px' }}>
              <div style={{ fontSize: '11px', color: 'var(--gb-gray)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>FINAL SCORE</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--gb-green)', marginTop: '4px' }}>
                {finalScore.score} / {finalScore.total}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="terminal-hr" />

      {/* Key Lessons */}
      <section className="doc-section">
        <h2 className="doc-heading text-yellow">
          <span className="heading-prefix">[*]</span> Key Lessons from this Arena
        </h2>
        <p>
          This challenge demonstrated how easily pieces of information scattered across the public internet can be connected using completely legal, open-source resources. Always be vigilant about your digital footprint, audit your public visibility, and keep expanding your security knowledge!
        </p>
      </section>

      <div className="terminal-hr" />

      {/* Contributors */}
      <section className="doc-section">
        <h2 className="doc-heading text-aqua">
          <span className="heading-prefix">[i]</span> Project Team &amp; Credits
        </h2>
        <ul className="doc-list">
          <li><span className="list-sym">&gt;</span> K053 - Abhyudaya Negi</li>
          <li><span className="list-sym">&gt;</span> K055 - Swara Pawde</li>
          <li><span className="list-sym">&gt;</span> K075 - Smit Vartak</li>
          <li><span className="list-sym">&gt;</span> K077 - Sarthak Vikas</li>
        </ul>
      </section>

      <div className="terminal-hr" />

      {/* Action Buttons */}
      <div className="doc-actions-row">
        <button className="btn-large" style={{ marginTop: 0, flex: 1, background: 'var(--gb-bg2)', color: 'var(--gb-fg0)', borderColor: 'var(--gb-bg3)' }} onClick={onBackToQuestions}>
          [ &larr; Review Questions ]
        </button>
        <button className="btn-large btn-primary" style={{ marginTop: 0, flex: 1 }} onClick={onBackToMain}>
          [ 🎯 Domains Dashboard &rarr; ]
        </button>
      </div>
    </div>
  );
}
