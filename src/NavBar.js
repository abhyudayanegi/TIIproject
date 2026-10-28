import React from 'react';
import { NAV_CAT } from './ascii';

const DOMAINS = [
  { id: 'OSINT', label: 'osint' },
  { id: 'Stegano', label: 'stegano' },
  { id: 'Crypto', label: 'crypto' },
  { id: 'Web Sec', label: 'websec' }
];

function pathFor(view, domain) {
  const slug = (domain || '').toLowerCase().replace(/\s+/g, '_');
  switch (view) {
    case 'home': return '~';
    case 'onboarding': return '~/tutorial';
    case 'main': return '~/dashboard';
    case 'domain': return `~/dashboard/${slug}`;
    case 'osint': return '~/dashboard/osint/arena';
    case 'wireframe': return `~/dashboard/${slug}/arena`;
    case 'end': return '~/dashboard/osint/results';
    default: return '~';
  }
}

export default function NavBar({
  view,
  domain,
  canBack,
  canForward,
  onBack,
  onForward,
  onNavigate,
  tutorialDone,
}) {
  const lockedTitle = 'Complete the tutorial first to unlock arenas!';
  const inDomain = (d) =>
    ((view === 'domain' || view === 'wireframe') && domain === d) ||
    (d === 'OSINT' && (view === 'osint' || view === 'end'));

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Terminal history pager */}
        <div className="nav-history">
          <button onClick={onBack} disabled={!canBack} title="Previous page (history)">
            &larr; prev
          </button>
          <button onClick={onForward} disabled={!canForward} title="Next page (history)">
            next &rarr;
          </button>
        </div>

        {/* Cute terminal prompt */}
        <div className="nav-prompt" title={pathFor(view, domain)}>
          <span className="nav-mascot">{NAV_CAT}</span>
          <span className="user">guest</span>
          <span className="sym">@</span>
          <span className="host">cyber-academy</span>
          <span className="sym">:</span>
          <span className="path">{pathFor(view, domain)}</span>
          <span className="sym">$</span>
          <span className="cursor" />
        </div>

        {/* Crisp terminal nav buttons */}
        <div className="nav-links">
          <button
            className={`nav-link ${view === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            [home]
          </button>
          <button
            className={`nav-link ${view === 'onboarding' ? 'active' : ''}`}
            onClick={() => onNavigate('onboarding')}
          >
            [tutorial]
          </button>
          <button
            className={`nav-link ${view === 'main' ? 'active' : ''}`}
            onClick={() => onNavigate('main')}
            disabled={!tutorialDone}
            title={tutorialDone ? 'All CTF cards' : lockedTitle}
          >
            [dashboard]
          </button>
          <span className="nav-sep">|</span>
          {DOMAINS.map((d) => (
            <button
              key={d.id}
              className={`nav-link ${inDomain(d.id) ? 'active' : ''}`}
              onClick={() => onNavigate('domain', d.id)}
              disabled={!tutorialDone}
              title={tutorialDone ? `${d.id} mission brief` : lockedTitle}
            >
              [{d.label}]
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
