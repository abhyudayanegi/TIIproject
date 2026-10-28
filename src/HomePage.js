import React from 'react';
import { ASCII_LOGO, CAT_WAVING } from './ascii';

export default function HomePage({ onAgree }) {
  return (
    <div className="terminal-document">
      {/* Terminal Title & Cute ASCII Header */}
      <div className="doc-header">
        <pre className="ascii ascii-yellow doc-ascii">
          {ASCII_LOGO}
        </pre>
        <div className="doc-meta">
          <span className="doc-tag">[v2.0-stable]</span>
          <span className="doc-tag">[zero-prerequisites]</span>
          <span className="doc-tag">[in-browser-ctf]</span>
        </div>
        <p className="doc-subtitle">
          Demystifying the modern internet. Breaking black-box abstractions. Learning practical security through intuitive, hands-on puzzles.
        </p>
        <div className="doc-credits">
          <span className="prompt-sym">$</span> <strong>cat team_credits.txt</strong>
          <span className="credits-list">
            K053 - Abhyudaya Negi &bull; K055 - Swara Pawde &bull; K075 - Smit Vartak &bull; K077 - Sarthak Vikas
          </span>
        </div>
      </div>

      <div className="terminal-hr" />

      {/* Cute mascot note */}
      <div className="doc-mascot-row">
        <pre className="ascii ascii-aqua">
          {CAT_WAVING}
        </pre>
        <div className="doc-mascot-speech">
          <div className="speech-title">{"// NOTE FROM THE ACADEMY"}</div>
          <p>
            "You don't need to be a programmer or a Linux wizard to understand how your digital life is tracked. 
            All you need is basic curiosity. Welcome aboard!"
          </p>
        </div>
      </div>

      <div className="terminal-hr" />

      {/* Section 1: The Privacy Paradox */}
      <section className="doc-section">
        <h2 className="doc-heading text-red">
          <span className="heading-prefix">[!]</span> 01. The Illusion of Digital Safety
        </h2>
        <p>
          Daily internet users lack basic cybersecurity awareness. Most of us are complacent, routinely ignoring the steep learning curve of digital safety in favor of effortless convenience. Big tech platforms deliberately wrap computing in sleek, glossy interfaces and opaque black boxes.
        </p>
        <p>
          Meanwhile, <strong className="text-red">tech giants actively exploit this naivety</strong>. Their business model thrives on harvesting non-consensual personal data, tracking physical locations, and profiling behavioral habits. By making everything appear like &quot;magic,&quot; they give you an unearned sense of security while monetizing your private life. In a world governed by code, ignorance makes you an easy target.
        </p>
      </section>

      <div className="terminal-hr" />

      {/* Section 2: What is a CTF? */}
      <section className="doc-section">
        <h2 className="doc-heading text-green">
          <span className="heading-prefix">[+]</span> 02. What is a Capture The Flag (CTF)?
        </h2>
        <p>
          <strong>CTF (Capture The Flag)</strong> is an interactive cybersecurity puzzle format where participants solve real-world challenges to uncover a secret key known as a <em>&quot;flag&quot;</em>.
        </p>
        <p>
          Flags look like <code>CAT&#123;sample_flag_value&#125;</code>.
          Instead of sitting through dry lectures or memorizing abstract theory, you become a digital detective—examining photo clues, decoding ciphers, and inspecting web headers to capture the proof yourself.
        </p>
        <div className="terminal-callout text-yellow">
          <span className="callout-symbol">&gt;&gt;</span>
          <span>Finding a flag proves that you uncovered how personal data leaks or how digital systems fail.</span>
        </div>
      </section>

      <div className="terminal-hr" />

      {/* Section 3: Our Aim */}
      <section className="doc-section">
        <h2 className="doc-heading text-yellow">
          <span className="heading-prefix">[*]</span> 03. Our Aim: Cyber Awareness for Everyone
        </h2>
        <p>
          This platform was crafted specifically for complete newcomers, non-techies, and people who have never touched cybersecurity before. You do not need prior hacking knowledge or complex command-line wizardry.
        </p>
        <p>
          Our mission is to ignite your curiosity across foundational cybersecurity domains—teaching you to think critically, question digital systems, and protect your digital footprint before someone else exploits it.
        </p>
      </section>

      <div className="terminal-hr" />

      {/* Action Button */}
      <div className="doc-action">
        <button className="btn-large" onClick={onAgree}>
          <span>[ Agree &amp; Enter Onboarding Tutorial &rarr; ]</span>
        </button>
      </div>
    </div>
  );
}
