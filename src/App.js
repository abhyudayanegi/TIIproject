import React, { useState, useEffect, useCallback } from 'react';
import HomePage from './HomePage';
import Onboarding from './Onboarding';
import MainPage from './MainPage';
import DomainPage from './DomainPage';
import Challenges from './Challenges';
import CryptoChallenges from './CryptoChallenges';
import StegChallenges from './StegChallenges';
import WireframeChallenges from './WireframeChallenges';
import EndPage from './EndPage';
import NavBar from './NavBar';
import './App.css';

const DOMAIN_ORDER = ['OSINT', 'Stegano', 'Crypto', 'Web Sec'];
const TUTORIAL_KEY = 'cyberacademy_tutorial_done';

function App() {
  // Navigation history (synced with the browser back/forward)
  const [entries, setEntries] = useState([{ view: 'home', domain: null }]);
  const [idx, setIdx] = useState(0);

  const safeIdx = Math.min(idx, entries.length - 1);
  const { view, domain } = entries[safeIdx];

  // App state
  const [tutorialDone, setTutorialDone] = useState(
    () => localStorage.getItem(TUTORIAL_KEY) === 'true'
  );

  // OSINT state
  const [osintStarted, setOsintStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [finalScore, setFinalScore] = useState(null);

  // Crypto state
  const [cryptoStarted, setCryptoStarted] = useState(false);
  const [cryptoStartTime, setCryptoStartTime] = useState(null);
  const [cryptoTimeTaken, setCryptoTimeTaken] = useState(null);
  const [cryptoScore, setCryptoScore] = useState(null);

  // Stegano state
  const [stegoStarted, setStegoStarted] = useState(false);
  const [stegoStartTime, setStegoStartTime] = useState(null);
  const [stegoTimeTaken, setStegoTimeTaken] = useState(null);
  const [stegoScore, setStegoScore] = useState(null);

  // Live results tracking across arenas (updates progress bars in real-time)
  const [osintResults, setOsintResults] = useState({});
  const [cryptoResults, setCryptoResults] = useState({});
  const [stegoResults, setStegoResults] = useState({});

  const handleOsintResultChange = useCallback((id, isCorrect) => {
    setOsintResults(prev => ({ ...prev, [id]: isCorrect }));
  }, []);

  const handleCryptoResultChange = useCallback((id, isCorrect) => {
    setCryptoResults(prev => ({ ...prev, [id]: isCorrect }));
  }, []);

  const handleStegoResultChange = useCallback((id, isCorrect) => {
    setStegoResults(prev => ({ ...prev, [id]: isCorrect }));
  }, []);

  const osintSolvedCount = Object.values(osintResults).filter(v => v === true).length;
  const cryptoSolvedCount = Object.values(cryptoResults).filter(v => v === true).length;
  const stegoSolvedCount = Object.values(stegoResults).filter(v => v === true).length;

  // Hook into browser history so browser buttons work
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

  // Timers for arenas
  useEffect(() => {
    if (view === 'osint' && !osintStarted) {
      setOsintStarted(true);
      setStartTime(Date.now());
    }
    if (view === 'crypto' && !cryptoStarted) {
      setCryptoStarted(true);
      setCryptoStartTime(Date.now());
    }
    if (view === 'stegano' && !stegoStarted) {
      setStegoStarted(true);
      setStegoStartTime(Date.now());
    }
  }, [view, osintStarted, cryptoStarted, stegoStarted]);

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

  // Handlers
  const handleOnboardingComplete = () => {
    setTutorialDone(true);
    localStorage.setItem(TUTORIAL_KEY, 'true');
    navigate('main');
  };

  const handleDomainContinue = (d) => {
    if (d === 'OSINT') navigate('osint', 'OSINT');
    else if (d === 'Crypto') navigate('crypto', 'Crypto');
    else if (d === 'Stegano') navigate('stegano', 'Stegano');
    else navigate('wireframe', d);
  };

  const handleOsintSubmit = (score, total) => {
    if (startTime) setTimeTaken(Date.now() - startTime);
    setFinalScore({ score, total });
    navigate('end', 'OSINT');
  };

  const handleCryptoSubmit = (score, total) => {
    if (cryptoStartTime) setCryptoTimeTaken(Date.now() - cryptoStartTime);
    setCryptoScore({ score, total });
    navigate('end', 'Crypto');
  };

  const handleStegoSubmit = (score, total) => {
    if (stegoStartTime) setStegoTimeTaken(Date.now() - stegoStartTime);
    setStegoScore({ score, total });
    navigate('end', 'Stegano');
  };

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
      case 'stegano':
        return {
          prev: { label: 'stegano brief', go: () => navigate('domain', 'Stegano') },
          next: stegoScore ? { label: 'results', go: () => navigate('end', 'Stegano') } : null,
          nextHint: stegoScore ? null : 'submit your answers to see results',
        };
      case 'crypto':
        return {
          prev: { label: 'crypto brief', go: () => navigate('domain', 'Crypto') },
          next: cryptoScore ? { label: 'results', go: () => navigate('end', 'Crypto') } : null,
          nextHint: cryptoScore ? null : 'submit your answers to see results',
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
      case 'end': {
        let returnView = 'osint';
        if (domain === 'Crypto') returnView = 'crypto';
        else if (domain === 'Stegano') returnView = 'stegano';

        return {
          prev: {
            label: `${(domain || 'osint').toLowerCase()} challenges`,
            go: () => navigate(returnView, domain || 'OSINT'),
          },
          next: { label: 'dashboard', go: () => navigate('main') },
        };
      }
      default:
        return { prev: null, next: null };
    }
  })();

  // Page content
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
        <MainPage
          onSelectDomain={(d) => navigate('domain', d)}
          osintScore={finalScore}
          cryptoScore={cryptoScore}
          stegoScore={stegoScore}
          osintSolvedCount={osintSolvedCount}
          cryptoSolvedCount={cryptoSolvedCount}
          stegoSolvedCount={stegoSolvedCount}
        />
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
    case 'end': {
      let finalScoreObj = finalScore;
      let finalDuration = timeTaken;
      let returnView = 'osint';
      if (domain === 'Crypto') {
        finalScoreObj = cryptoScore;
        finalDuration = cryptoTimeTaken;
        returnView = 'crypto';
      } else if (domain === 'Stegano') {
        finalScoreObj = stegoScore;
        finalDuration = stegoTimeTaken;
        returnView = 'stegano';
      }

      content = (
        <EndPage
          domain={domain || 'OSINT'}
          timeTaken={finalDuration}
          finalScore={finalScoreObj}
          onBackToQuestions={() => navigate(returnView, domain || 'OSINT')}
          onBackToMain={() => navigate('main')}
        />
      );
      break;
    }
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
        {/* OSINT challenges stay mounted so answers survive back/forward */}
        {osintStarted && (
          <div style={{ display: view === 'osint' ? 'block' : 'none' }}>
            <Challenges
              onSubmit={handleOsintSubmit}
              onBack={() => navigate('domain', 'OSINT')}
              results={osintResults}
              onResultChange={handleOsintResultChange}
            />
          </div>
        )}

        {/* Stegano challenges stay mounted once started */}
        {stegoStarted && (
          <div style={{ display: view === 'stegano' ? 'block' : 'none' }}>
            <StegChallenges
              onSubmit={handleStegoSubmit}
              onBack={() => navigate('domain', 'Stegano')}
              results={stegoResults}
              onResultChange={handleStegoResultChange}
            />
          </div>
        )}

        {/* Crypto challenges stay mounted once started */}
        {cryptoStarted && (
          <div style={{ display: view === 'crypto' ? 'block' : 'none' }}>
            <CryptoChallenges
              onSubmit={handleCryptoSubmit}
              onBack={() => navigate('domain', 'Crypto')}
              results={cryptoResults}
              onResultChange={handleCryptoResultChange}
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
