import React, { useEffect } from 'react';
import { getTextbook } from './textbookData';
import { CAT_READING } from './ascii';
import './TextbookPanel.css';

const EmptyState = ({ children }) => (
  <div className="tb-todo">
    <span>{"//"}</span>
    <span>{children}</span>
  </div>
);

function Section({ icon, title, badge, children }) {
  return (
    <section className="tb-section">
      <div className="tb-section-header">
        <h3>
          <span className="tb-icon">{icon}</span>
          <span>{title}</span>
        </h3>
        {badge && <span className="badge-tag" style={{ fontSize: '10px', background: 'var(--gb-bg1)', color: 'var(--gb-yellow)', border: '1px solid var(--gb-bg3)' }}>[{badge}]</span>}
      </div>
      <div className="tb-section-content">
        {children}
      </div>
    </section>
  );
}

function LinkList({ items, toolType, empty }) {
  if (!items || items.length === 0) return <EmptyState>{empty}</EmptyState>;
  return (
    <ul className="tb-list">
      {items.map((it, i) => (
        <li key={i} className="tb-list-item">
          <a href={it.url} target="_blank" rel="noreferrer" className="tb-link">
            <span>&gt;</span>
            <span>{it.label || it.name}</span>
          </a>
          {it.note && <span className="tb-note"> — {it.note}</span>}
          {toolType && (
            <span className="badge-tag" style={{
              fontSize: '10px',
              padding: '1px 5px',
              marginLeft: '6px',
              background: toolType === 'online' ? 'var(--gb-tint-green)' : 'var(--gb-tint-purple)',
              color: toolType === 'online' ? 'var(--gb-green)' : 'var(--gb-purple)',
              border: '1px solid currentColor'
            }}>
              {toolType === 'online' ? '[Browser Tool]' : '[Offline CLI]'}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function TextbookPanel({ open, domain, questionId, questionTitle, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const book = getTextbook(domain, questionId);

  return (
    <>
      <div className={`tb-backdrop ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`tb-panel ${open ? 'open' : ''}`} aria-hidden={!open}>
        {/* Panel Header */}
        <div className="tb-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div>
              <div className="tb-chapter">
                <span>📖</span> [{domain} :: CHAPTER {questionId}]
              </div>
              <h2>{book.topic}</h2>
              {questionTitle && <div className="tb-sub">Challenge: {questionTitle}</div>}
            </div>

            <button className="tb-close" onClick={onClose} title="Close (or press Esc)">
              [x]
            </button>
          </div>
        </div>

        {/* Panel Body */}
        <div className="tb-body">
          {/* Cute mascot banner */}
          <div style={{ background: 'var(--gb-bg)', border: '1px solid var(--gb-bg3)', padding: '8px 12px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--gb-yellow)', fontWeight: 'bold' }}>{"// FIELD MANUAL & THEORY"}</div>
              <div style={{ fontSize: '12px', color: 'var(--gb-fg2)', marginTop: '2px' }}>Read before attempting the challenge!</div>
            </div>
            <pre className="ascii ascii-aqua tb-art" style={{ fontSize: '10.5px' }}>{CAT_READING}</pre>
          </div>

          <Section icon="[?]" title="What is it?" badge="CONCEPT">
            {book.whatIsIt ? <p>{book.whatIsIt}</p> : <EmptyState>Plain-English breakdown coming soon.</EmptyState>}
          </Section>

          <Section icon="[!]" title="Why does it matter?" badge="RELEVANCE">
            {book.whyItMatters ? <p>{book.whyItMatters}</p> : <EmptyState>Real-world security impact notes coming soon.</EmptyState>}
          </Section>

          <Section icon="[#]" title="Key terms &amp; Jargon" badge="VOCABULARY">
            {book.keyTerms && book.keyTerms.length > 0 ? (
              <dl className="tb-terms">
                {book.keyTerms.map((k, i) => (
                  <div key={i} className="tb-term-row">
                    <dt>{k.term}</dt>
                    <dd>{k.meaning}</dd>
                  </div>
                ))}
              </dl>
            ) : <EmptyState>Vocabulary definitions coming soon.</EmptyState>}
          </Section>

          <Section icon="[>]" title="Learn more (links &amp; tutorials)" badge="READING">
            <LinkList items={book.links} empty="External articles and walkthroughs." />
          </Section>

          <Section icon="[~]" title="Online Tools (For this CTF)" badge="RECOMMENDED">
            <LinkList items={book.onlineTools} toolType="online" empty="Browser-based tools for solving this challenge." />
          </Section>

          <Section icon="[+]" title="Offline Tools (Dive Deeper)" badge="EXPLORE">
            <LinkList items={book.offlineTools} toolType="offline" empty="Installable utilities for deep-dive investigation." />
          </Section>
        </div>

        {/* Panel Footer */}
        <div className="tb-footer">
          <span style={{ fontSize: '11.5px', color: 'var(--gb-gray)' }}>
            Press <kbd style={{ background: 'var(--gb-bg0h)', padding: '2px 5px', border: '1px solid var(--gb-bg3)' }}>Esc</kbd> to dismiss
          </span>
          <button className="btn-small" onClick={onClose} style={{ fontSize: '11.5px', padding: '4px 10px' }}>
            [ Done Reading ]
          </button>
        </div>
      </aside>
    </>
  );
}
