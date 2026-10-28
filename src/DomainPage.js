import React from 'react';
import './DomainPage.css';
import { DOMAIN_ART } from './ascii';

const DOMAIN_DETAILS = {
  OSINT: {
    icon: '🔍',
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
    icon: '🎨',
    title: 'Steganography (Stego)',
    tagline: 'The art of concealing secret messages within innocent-looking media files.',
    whatIsIt: 'Derived from the Greek words for "hidden writing", Steganography is the science of hiding data inside ordinary cover mediums like PNG images, MP3 songs, or WAV audio files without visibly altering the host carrier.',
    howUseful: 'While historically used by undercover spies, malware authors and state-sponsored APT groups now use steganography to conceal command-and-control payloads inside innocent meme images on social media, evading deep packet inspection and antivirus firewalls.',
    criticalWarning: 'What looks like a harmless cat picture or music track can harbor an encrypted executable or banking trojan within the least-significant bits of its pixels. Believing that "if it looks fine, it is safe" is a dangerous fallacy in modern cyber warfare.',
    requirements: [
      'Hex Editor (e.g. HxD or online hex tools)',
      'Steganography tools (Steghide, Zsteg, Aperisolve)',
      'Image inspection and color plane splitters',
      'Audio spectrum visualizer (Audacity)'
    ],
    isLive: false,
    totalQuestions: 7,
  },
  Crypto: {
    icon: '🔐',
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
    icon: '🌐',
    title: 'Web Security',
    tagline: 'Dissect how the web works under the hood and hunt for systemic vulnerabilities.',
    whatIsIt: 'Web Security focuses on finding, understanding, and mitigating security vulnerabilities within web applications, browser clients, and REST APIs.',
    howUseful: 'The entire global economy runs on web applications. Ethical hackers and security engineers audit web platforms to protect user data from account takeovers, payment tampering, and database exfiltration.',
    criticalWarning: 'Web developers frequently trust user input blindly. A single unescaped quote mark can trigger SQL Injection to dump an entire customer database; a missing parameter validation can allow any user to edit another person\'s bank account.',
    requirements: [
      'Browser Developer Tools (Network tab, Console, Storage inspector)',
      'Hoppscotch / Postman for API request crafting',
      'HTML/JS/HTTP inspection awareness'
    ],
    isLive: false,
    totalQuestions: 7,
  },
};

export default function DomainPage({ domain: rawDomain, onBack, onContinue }) {
  const domain = DOMAIN_DETAILS[rawDomain] ? rawDomain : 'OSINT';
  const info = DOMAIN_DETAILS[domain];

  return (
    <div className="terminal-document">
      {/* Terminal Mission Brief Header */}
      <div className="doc-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="doc-meta">
              <span className="doc-tag" style={{ color: 'var(--gb-yellow)' }}>
                [MISSION_BRIEF::{domain.toUpperCase().replace(/\s+/g, '_')}]
              </span>
              <span className="doc-tag" style={{ color: info.isLive ? 'var(--gb-green)' : 'var(--gb-orange)' }}>
                {info.isLive ? '[LIVE ARENA]' : '[WIREFRAME BETA]'}
              </span>
              <span className="doc-tag">[{info.totalQuestions} challenges]</span>
            </div>
            <h1 style={{ fontSize: '24px', borderBottom: 'none', margin: '6px 0 6px 0', color: 'var(--gb-fg0)' }}>
              {info.icon} {info.title}
            </h1>
            <p className="doc-subtitle" style={{ margin: 0 }}>
              {info.tagline}
            </p>
          </div>
          <pre className="ascii ascii-purple doc-ascii">
            {DOMAIN_ART[domain]}
          </pre>
        </div>
      </div>

      <div className="terminal-hr" />

      {/* Section 1: Core Concept */}
      <section className="doc-section">
        <h2 className="doc-heading text-aqua">
          <span className="heading-prefix">[01]</span> Core Concept &amp; Definition
        </h2>
        <p>{info.whatIsIt}</p>
      </section>

      <div className="terminal-hr" />

      {/* Section 2: Real-World Application */}
      <section className="doc-section">
        <h2 className="doc-heading text-blue">
          <span className="heading-prefix">[02]</span> Real-World Impact &amp; Investigation
        </h2>
        <p>{info.howUseful}</p>
      </section>

      <div className="terminal-hr" />

      {/* Section 3: Critical Warning */}
      <section className="doc-section">
        <h2 className="doc-heading text-orange">
          <span className="heading-prefix">[!]</span> Why You Cannot Take This Discipline Lightly
        </h2>
        <div className="terminal-callout text-orange">
          <span className="callout-symbol">&gt;&gt;</span>
          <span>{info.criticalWarning}</span>
        </div>
      </section>

      <div className="terminal-hr" />

      {/* Section 4: Recommended Toolkit */}
      <section className="doc-section">
        <h2 className="doc-heading text-green">
          <span className="heading-prefix">[04]</span> Recommended Toolkit &amp; Environment
        </h2>
        <ul className="doc-list">
          {info.requirements.map((req, idx) => (
            <li key={idx}>
              <span className="list-sym">&gt;</span> <span>{req}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="terminal-hr" />

      {/* Actions */}
      <div className="doc-actions-row">
        <button className="btn-small" onClick={onBack}>
          [ &larr; Back to Dashboard ]
        </button>
        <button className="btn-primary" onClick={() => onContinue(domain)}>
          {info.isLive ? `[ Launch ${domain} Challenges Arena → ]` : `[ Enter ${domain} CTF Arena (Wireframe) → ]`}
        </button>
      </div>
    </div>
  );
}
