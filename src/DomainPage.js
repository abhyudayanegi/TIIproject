import React from 'react';
import './DomainPage.css';
import { DOMAIN_ART } from './ascii';

const DOMAIN_DETAILS = {
  OSINT: {
    title: 'Open Source Intelligence (OSINT)',
    tagline: 'Track footprints, connect dots, and uncover secrets hiding in plain daylight.',
    whatIsIt: 'OSINT is the intelligence discipline of collecting, assessing, and analyzing publicly available data to discover actionable insights. Everything from public social media profiles, domain registrations, photo metadata, satellite imagery, to archived cached pages is fair game.',
    howUseful: 'Cyber threat analysts use OSINT to identify threat actors and exposed company infrastructure. Journalists use it to uncover corruption and verify warzone footage. Law enforcement uses it to solve missing persons cases and track human trafficking networks.',
    criticalWarning: 'Never underestimate public breadcrumbs! A single casual coffee shop selfie posted online can expose your exact location through reflections, flight schedules visible in windows, or embedded GPS EXIF data. Criminals can correlate your digital presence in minutes to conduct identity theft or spear-phishing attacks.',
    requirements: [
      'Web Browser (Chrome, Firefox, or Brave)',
      'Search Engines with Advanced Dorking Operators (Google, DuckDuckGo)',
      'Reverse Image Search engines (Google Lens, TinEye, Yandex)',
      'Online EXIF Viewer / Metadata reader'
    ],
    isLive: true,
    totalQuestions: 7,
  },
  Stegano: {
    title: 'Steganography (Stego)',
    tagline: 'The art of concealing secret messages within innocent-looking media files.',
    whatIsIt: 'Derived from the Greek words for "hidden writing", Steganography is the science of hiding data inside ordinary cover mediums like Word docs, JPEG images, or WAV audio broadcasts without visibly altering the host carrier.',
    howUseful: 'While historically used by undercover spies, malware authors and corporate leakers now use steganography to conceal sensitive payloads inside innocent documents and images, evading deep packet inspection and corporate firewalls.',
    criticalWarning: 'What looks like an ordinary corporate terms-of-service document or mug photo can harbor an entire hidden whistleblower archive within metadata comments, shadow luminance, or ultrasonic audio spectrograms.',
    requirements: [
      'Photopea (Free In-Browser Photoshop Alternative)',
      'HexEd.it (Online Browser Hex Editor)',
      'Academo Spectrum Analyzer (In-Browser Sound Wave Inspector)',
      'Steghide Online Decoder (Zero Local Downloads Needed)'
    ],
    isLive: true,
    totalQuestions: 7,
  },
  Crypto: {
    title: 'Cryptography',
    tagline: 'The mathematical spine of digital secrecy, trust, and secure communications.',
    whatIsIt: 'Cryptography is the practice and study of techniques for securing communication and sensitive data against third parties. It spans classical substitution ciphers, hashing algorithms, symmetric ciphers (AES), and public-key asymmetric encryption (RSA, ECC).',
    howUseful: 'Every time you send a WhatsApp message, log into your banking app over HTTPS, or verify software signatures, cryptographic mathematics guarantees confidentiality and authenticity against wiretapping and tampering.',
    criticalWarning: 'Cryptographic systems rarely break because of the math—they break because of human implementation errors. Reusing an IV (initialization vector), hardcoding secret keys, or using legacy MD5/SHA1 hashing has directly led to billion-dollar corporate data breaches.',
    requirements: [
      'CyberChef (The Swiss Army Knife of Cyber Decoders)',
      'CrackStation (Free Online Rainbow Table Lookup)',
      'ROT13 and Vigenère cipher decoders',
      'In-browser Base64 & Hex converters'
    ],
    isLive: true,
    totalQuestions: 7,
  },
  'Web Sec': {
    title: 'Web Security',
    tagline: 'Dissect how the web works under the hood and hunt for systemic vulnerabilities.',
    whatIsIt: 'Web Security focuses on finding, understanding, and mitigating security vulnerabilities within web applications, browser clients, and REST APIs.',
    howUseful: 'The entire global economy runs on web applications. Ethical hackers and security engineers audit web platforms to protect user data from account takeovers, payment tampering, and database exfiltration.',
    criticalWarning: 'Web developers frequently trust the user\'s browser blindly. Hiding secrets in HTML comments, disabling buttons solely in HTML, storing admin roles in plain cookies, or gluing user input into SQL queries allows anyone with a normal browser to breach an entire server.',
    requirements: [
      'Browser View Page Source (Right-Click -> View Page Source / Ctrl+U)',
      'Browser Inspect Element (Right-Click -> Inspect / F12)',
      'Cookie Inspector & URL Bar Parameter Editing',
      'Interactive SQL Query Monitor (Built into Target Webpages — Zero Local Downloads)'
    ],
    isLive: true,
    totalQuestions: 7,
  },
};

export default function DomainPage({ domain, onBack, onContinue }) {
  const details = DOMAIN_DETAILS[domain] || DOMAIN_DETAILS.OSINT;

  return (
    <div className="domain-page">
      {/* Clean Terminal Header */}
      <div className="terminal-page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div className="header-meta">
              <span className={`badge-tag ${details.isLive ? 'badge-live' : 'badge-wireframe'}`}>
                {details.isLive ? '[STATUS: READY]' : '[STATUS: CURRICULUM]'}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>
                Field Manual &bull; Section {domain} &bull; {details.totalQuestions} Questions
              </span>
            </div>
            <h1 style={{ fontSize: '24px', borderBottom: 'none', margin: '6px 0 4px 0', color: 'var(--gb-fg0)' }}>
              {details.title}
            </h1>
            <p style={{ color: 'var(--gb-yellow)', fontSize: '14px', margin: 0 }}>
              &gt; {details.tagline}
            </p>
          </div>
          <pre className="ascii ascii-yellow header-ascii">
            {DOMAIN_ART[domain] || DOMAIN_ART.OSINT}
          </pre>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed var(--gb-bg3)' }}>
          <button className="btn-small" onClick={onBack}>
            [ &larr; Back to Dashboard ]
          </button>
          <div style={{ fontSize: '12px', color: 'var(--gb-gray)' }}>
            Read through the discipline dossier below before launching into the challenges.
          </div>
        </div>
      </div>

      <div className="terminal-hr" />

      {/* Field Dossier Grid */}
      <div className="dossier-grid">
        <div className="dossier-card">
          <div className="dossier-card-header">
            <h3>[01] Concept Definition: What is it?</h3>
          </div>
          <p>{details.whatIsIt}</p>
        </div>

        <div className="dossier-card">
          <div className="dossier-card-header">
            <h3>[02] Practical Application: Real-World Use</h3>
          </div>
          <p>{details.howUseful}</p>
        </div>
      </div>

      <div className="dossier-card warning-card" style={{ marginTop: '16px' }}>
        <div className="dossier-card-header">
          <h3 style={{ color: 'var(--gb-red)' }}>[!] Threat Profile: Why This Matters to You</h3>
        </div>
        <p>{details.criticalWarning}</p>
      </div>

      <div className="dossier-card" style={{ marginTop: '16px' }}>
        <div className="dossier-card-header">
          <h3>[03] Recommended Toolkit &amp; Methodology</h3>
        </div>
        <ul className="requirements-list">
          {details.requirements.map((req, i) => (
            <li key={i}>
              <span className="prompt-arrow">&gt;</span>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Footer */}
      <div className="domain-footer-actions">
        <button className="btn-small" onClick={onBack}>
          [ &larr; Back to Dashboard ]
        </button>
        <button className="btn-small btn-primary" onClick={() => onContinue(domain)}>
          {details.isLive
            ? `[ Start ${domain} (7 Challenges) &rarr; ]`
            : `[ View ${domain} Curriculum (7 Challenges) &rarr; ]`}
        </button>
      </div>
    </div>
  );
}
