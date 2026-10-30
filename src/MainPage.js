import React from 'react';
import './MainPage.css';
import { DASHBOARD_CAT, DOMAIN_ART } from './ascii';

const DOMAIN_CARDS = [
  {
    id: 'OSINT',
    title: '1. OSINT',
    shortName: 'OSINT',
    fullName: 'Open Source Intelligence',
    badge: '[READY]',
    badgeType: 'badge-live',
    questions: 7,
    about: 'Master digital footprint tracking. Learn how detectives and auditors gather actionable intelligence using only publicly accessible internet data.',
    requirements: 'Browser, search engines (Google, DuckDuckGo), keen eye.',
    teaches: 'Reverse image searching, EXIF metadata, username correlation.',
    actionLabel: '[ View OSINT Brief &rarr; ]',
  },
  {
    id: 'Stegano',
    title: '2. Steganography',
    shortName: 'Stegano',
    fullName: 'Steganography',
    badge: '[READY]',
    badgeType: 'badge-live',
    questions: 7,
    about: 'Follow the whistleblower trail through EvilCorp. Uncover white-on-white text in legal agreements, extract EXIF mug annotations, bright-shift blackbook documents, crack steghide payloads, read EOF bytes, and visualize audio spectrums.',
    requirements: 'Photopea, HexEd.it, Academo Spectrum Analyzer, Steghide online (zero local downloads).',
    teaches: 'Font masking, EXIF comments, luminance levels, Steghide, JPEG EOF overlays, audio spectrograms.',
    actionLabel: '[ View Stegano Brief &rarr; ]',
  },
  {
    id: 'Crypto',
    title: '3. Cryptography',
    shortName: 'Crypto',
    fullName: 'Cryptography',
    badge: '[READY]',
    badgeType: 'badge-live',
    questions: 7,
    about: 'Deconstruct the mathematical spine of digital security. Decipher ROT13, crack Vigenère, reverse Caesar shifts, lookup MD5 hashes, and peel multi-layer XOR envelopes.',
    requirements: 'CyberChef, CrackStation, online decoders (zero local downloads).',
    teaches: 'ROT13, Base64, Hex bytes, Vigenère, Caesar shifts, MD5, chained XOR.',
    actionLabel: '[ View Crypto Brief &rarr; ]',
  },
  {
    id: 'Web Sec',
    title: '4. Web Security',
    shortName: 'Web Sec',
    fullName: 'Web Security',
    badge: '[READY]',
    badgeType: 'badge-live',
    questions: 7,
    about: 'Breach EvilCorp\'s internal web portal across 7 live target webpages. Inspect HTML source comments, check robots.txt, enable disabled buttons, forge session cookies, exploit IDOR, traverse folders, and inject SQL.',
    requirements: 'Web Browser (View Source & F12 Inspect Element — zero local downloads).',
    teaches: 'HTML source, robots.txt, DOM bypass, cookie tampering, IDOR, path traversal, SQL injection.',
    actionLabel: '[ View Web Sec Brief &rarr; ]',
  },
];

export default function MainPage({
  onSelectDomain,
  osintScore,
  cryptoScore,
  stegoScore,
  websecScore,
  osintSolvedCount = 0,
  cryptoSolvedCount = 0,
  stegoSolvedCount = 0,
  websecSolvedCount = 0
}) {
  return (
    <div className="main-page">
      {/* Clean Terminal Header */}
      <div className="terminal-page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="header-meta">
              <span className="badge-tag" style={{ background: 'var(--gb-tint-aqua)', color: 'var(--gb-aqua)', border: '1px solid rgba(142, 192, 124, 0.4)' }}>
                [DOMAINS_DASHBOARD]
              </span>
              <span style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>
                4 domains &bull; 7 questions each &bull; 28 challenges total
              </span>
            </div>
            <h1 style={{ fontSize: '24px', borderBottom: 'none', margin: '6px 0 6px 0', color: 'var(--gb-fg0)' }}>
              Cybersecurity Domains Dashboard
            </h1>
            <p style={{ color: 'var(--gb-fg2)', fontSize: '14px', margin: 0, maxWidth: '580px' }}>
              Choose a discipline below to review its mission brief, inspect required tools, and begin solving challenges.
            </p>
          </div>
          <pre className="ascii ascii-aqua header-ascii">
            {DASHBOARD_CAT}
          </pre>
        </div>
      </div>

      <div className="terminal-hr" />

      {/* Domain Cards Grid (Only actionable cards!) */}
      <div className="cards-grid">
        {DOMAIN_CARDS.map((card) => {
          let currentProgress = 0;
          if (card.id === 'OSINT') {
            currentProgress = osintScore ? osintScore.score : osintSolvedCount;
          }
          if (card.id === 'Crypto') {
            currentProgress = cryptoScore ? cryptoScore.score : cryptoSolvedCount;
          }
          if (card.id === 'Stegano') {
            currentProgress = stegoScore ? stegoScore.score : stegoSolvedCount;
          }
          if (card.id === 'Web Sec') {
            currentProgress = websecScore ? websecScore.score : websecSolvedCount;
          }
          const progressPercent = Math.min(100, Math.round((currentProgress / card.questions) * 100));

          return (
            <div
              key={card.id}
              className="domain-card"
              onClick={() => onSelectDomain(card.id)}
            >
              <div>
                <div className="card-top">
                  <h3 className="card-title">
                    <span>{card.title}</span>
                  </h3>
                  <span className={`card-badge ${card.badgeType}`}>{card.badge}</span>
                </div>

                <div className="card-art-container">
                  <pre className="ascii card-art">{DOMAIN_ART[card.id]}</pre>
                </div>

                <p className="card-about">{card.about}</p>

                <div className="card-details">
                  <div className="detail-row">
                    <span className="detail-label">REQ:</span>
                    <span className="detail-value">{card.requirements}</span>
                  </div>
                  <div className="detail-row" style={{ marginTop: '6px' }}>
                    <span className="detail-label">COVERS:</span>
                    <span className="detail-value">{card.teaches}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="progress-section">
                  <div className="progress-info">
                    <span>Questions: <strong>{card.questions}</strong></span>
                    <span>Solved: <strong>{currentProgress}/{card.questions}</strong> ({progressPercent}%)</span>
                  </div>
                  <div className="custom-progress-bar">
                    <div
                      className="custom-progress-fill"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <button
                  className="btn-card-action"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDomain(card.id);
                  }}
                >
                  {card.actionLabel}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
