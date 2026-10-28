import React, { useState, useEffect, useCallback } from 'react';
import HomePage from './HomePage';
import Onboarding from './Onboarding';
import MainPage from './MainPage';
import DomainPage from './DomainPage';
import Challenges from './Challenges';
import WireframeChallenges from './WireframeChallenges';
import EndPage from './EndPage';
import NavBar from './NavBar';
import './App.css';

const DOMAIN_ORDER = ['OSINT', 'Stegano', 'Crypto', 'Web Sec'];
const TUTORIAL_KEY = 'cyberacademy_tutorial_done';

function App() {
  // ----- Navigation history (synced with the browser's back/forward) -----
  // Each entry: { view, domain }
  // Views: 'home' | 'onboarding' | 'main' | 'domain' | 'osint' | 'wireframe' | 'end'
  const [entries, setEntries] = useState([{ view: 'home', domain: null }]);
  const [idx, setIdx] = useState(0);

  const safeIdx = Math.min(idx, entries.length - 1);
  const { view, domain } = entries[safeIdx];

  // ----- App state -----
  const [tutorialDone, setTutorialDone] = useState(
    () => localStorage.getItem(TUTORIAL_KEY) === 'true'
  );
  const [osintStarted, setOsintStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [finalScore, setFinalScore] = useState(null);

  // Hook into the browser history so the browser's own back/forward buttons work too
  useEffect(() => {
    window.history.replaceState({ idx: 0 }, '');
    const onPop = (e) => {
      const i = e.state && typeof e.state.idx === 'number' ? e.state.idx : 0;
      setIdx(i);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [safeIdx]);

  // Start the OSINT timer the first time the user enters the challenges
  useEffect(() => {
    if (view === 'osint' && !osintStarted) {
      setOsintStarted(true);
      setStartTime(Date.now());
    }
  }, [view, osintStarted]);

  const navigate = useCallback(
    (nextView, nextDomain = null) => {
      const cur = entries[safeIdx];
      if (cur.view === nextView && cur.domain === nextDomain) return;
      const next = entries.slice(0, safeIdx + 1).concat({ view: nextView, domain: nextDomain });
      setEntries(next);
      setIdx(next.length - 1);
      window.history.pushState({ idx: next.length - 1 }, '');
    },
    [entries, safeIdx]
  );

  const canBack = safeIdx > 0;
  const canForward = safeIdx < entries.length - 1;
  const goBack = () => canBack && window.history.back();
  const goForward = () => canForward && window.history.forward();

  // ----- Handlers -----
  const handleOnboardingComplete = () => {
    setTutorialDone(true);
    localStorage.setItem(TUTORIAL_KEY, 'true');
    navigate('main');
  };

  const handleDomainContinue = (d) => {
    if (d === 'OSINT') navigate('osint', 'OSINT');
    else navigate('wireframe', d);
  };

  const handleOsintSubmit = (score, total) => {
    if (startTime) setTimeTaken(Date.now() - startTime);
    setFinalScore({ score, total });
    navigate('end', 'OSINT');
  };

  // ----- Logical "previous / next step" for the bottom pager -----
  const nextDomainAfter = (d) => {
    const i = DOMAIN_ORDER.indexOf(d);
    return i >= 0 && i < DOMAIN_ORDER.length - 1 ? DOMAIN_ORDER[i + 1] : null;
  };

  const steps = (() => {
    switch (view) {
      case 'home':
        return { prev: null, next: { label: 'tutorial', go: () => navigate('onboarding') } };
      case 'onboarding':
        return {
          prev: { label: 'home', go: () => navigate('home') },
          next: tutorialDone ? { label: 'dashboard', go: () => navigate('main') } : null,
          nextHint: tutorialDone ? null : 'solve all 3 to unlock the dashboard',
        };
      case 'main':
        return {
          prev: { label: 'tutorial', go: () => navigate('onboarding') },
          next: { label: 'osint brief', go: () => navigate('domain', 'OSINT') },
        };
      case 'domain':
        return {
          prev: { label: 'dashboard', go: () => navigate('main') },
          next: {
            label: `${domain.toLowerCase()} challenges`,
            go: () => handleDomainContinue(domain),
          },
        };
      case 'osint':
        return {
          prev: { label: 'osint brief', go: () => navigate('domain', 'OSINT') },
          next: finalScore ? { label: 'results', go: () => navigate('end', 'OSINT') } : null,
          nextHint: finalScore ? null : 'submit your answers to see results',
        };
      case 'wireframe': {
        const nd = nextDomainAfter(domain);
        return {
          prev: { label: `${domain.toLowerCase()} brief`, go: () => navigate('domain', domain) },
          next: nd
            ? { label: `${nd.toLowerCase()} brief`, go: () => navigate('domain', nd) }
            : { label: 'dashboard', go: () => navigate('main') },
        };
      }
      case 'end':
        return {
          prev: { label: 'challenges', go: () => navigate('osint', 'OSINT') },
          next: { label: 'dashboard', go: () => navigate('main') },
        };
      default:
        return { prev: null, next: null };
    }
  })();

  // ----- Page content -----
  let content = null;
  switch (view) {
    case 'home':
      content = <HomePage onAgree={() => navigate('onboarding')} />;
      break;
    case 'onboarding':
      content = <Onboarding onComplete={handleOnboardingComplete} />;
      break;
    case 'main':
      content = (
        <MainPage onSelectDomain={(d) => navigate('domain', d)} osintScore={finalScore} />
      );
      break;
    case 'domain':
      content = (
        <DomainPage
          domain={domain}
          onBack={() => navigate('main')}
          onContinue={handleDomainContinue}
        />
      );
      break;
    case 'wireframe':
      content = <WireframeChallenges domain={domain} onBack={() => navigate('main')} />;
      break;
    case 'end':
      content = (
        <EndPage
          timeTaken={timeTaken}
          finalScore={finalScore}
          onBackToQuestions={() => navigate('osint', 'OSINT')}
          onBackToMain={() => navigate('main')}
        />
      );
      break;
    default:
      content = null;
  }

  return (
    <div className="app-shell">
      <NavBar
        view={view}
        domain={domain}
        canBack={canBack}
        canForward={canForward}
        onBack={goBack}
        onForward={goForward}
        onNavigate={navigate}
        tutorialDone={tutorialDone}
      />

      <div className="app-container">
        {/* OSINT challenges stay mounted once started, so typed answers survive back/forward */}
        {osintStarted && (
          <div style={{ display: view === 'osint' ? 'block' : 'none' }}>
            <Challenges
              onSubmit={handleOsintSubmit}
              onBack={() => navigate('domain', 'OSINT')}
            />
          </div>
        )}
        {content}
      </div>

      <div className="pager">
        <button onClick={steps.prev?.go} disabled={!steps.prev}>
          {steps.prev ? `< prev: ${steps.prev.label}` : '< prev'}
        </button>
        <span className="pager-hint">
          {steps.nextHint || 'tip: your browser back/forward buttons work too'}
        </span>
        <button onClick={steps.next?.go} disabled={!steps.next}>
          {steps.next ? `next: ${steps.next.label} >` : 'next >'}
        </button>
      </div>
    </div>
  );
}

export default App;
