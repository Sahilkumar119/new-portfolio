import React from 'react';
import { cx } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from './button';
import { cn } from '../../lib/utils';

const SPEED_FACTOR = 1;
const FORM_WIDTH = 320;
const FORM_HEIGHT = 220;
const PANEL_OFFSET = 8;

function ColorOrb({
  dimension = '192px',
  className,
  tones,
  spinDuration = 20,
}) {
  const fallbackTones = {
    base: 'oklch(95% 0.02 264.695)',
    accent1: 'oklch(75% 0.15 350)',
    accent2: 'oklch(80% 0.12 200)',
    accent3: 'oklch(78% 0.14 280)',
  };

  const palette = { ...fallbackTones, ...tones };
  const dimValue = parseInt(dimension.replace('px', ''), 10);

  const blurStrength =
    dimValue < 50 ? Math.max(dimValue * 0.008, 1) : Math.max(dimValue * 0.015, 4);

  const contrastStrength =
    dimValue < 50 ? Math.max(dimValue * 0.004, 1.2) : Math.max(dimValue * 0.008, 1.5);

  const pixelDot = dimValue < 50 ? Math.max(dimValue * 0.004, 0.05) : Math.max(dimValue * 0.008, 0.1);
  const shadowRange = dimValue < 50 ? Math.max(dimValue * 0.004, 0.5) : Math.max(dimValue * 0.008, 2);
  const maskRadius = dimValue < 30 ? '0%' : dimValue < 50 ? '5%' : dimValue < 100 ? '15%' : '25%';

  const adjustedContrast =
    dimValue < 30 ? 1.1 : dimValue < 50 ? Math.max(contrastStrength * 1.2, 1.3) : contrastStrength;

  return (
    <div
      className={cn('ai-color-orb', className)}
      style={{
        width: dimension,
        height: dimension,
        '--base': palette.base,
        '--accent1': palette.accent1,
        '--accent2': palette.accent2,
        '--accent3': palette.accent3,
        '--spin-duration': `${spinDuration}s`,
        '--blur': `${blurStrength}px`,
        '--contrast': adjustedContrast,
        '--dot': `${pixelDot}px`,
        '--shadow': `${shadowRange}px`,
        '--mask': maskRadius,
      }}
    />
  );
}

const FormContext = React.createContext({});
const useFormContext = () => React.useContext(FormContext);

const InputForm = React.forwardRef(function InputForm({ onSuccess }, textareaRef) {
  const { triggerClose, showForm, answer, citations, isLoading, setAnswer, setCitations, setLoading } = useFormContext();
  const btnRef = React.useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const message = String(form.get('message') || '').trim();
    if (!message) return;
    setLoading(true);
    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: message, top_k: 4 }),
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const payload = await response.json();
      setAnswer(payload.answer || 'No answer returned.');
      setCitations(Array.isArray(payload.citations) ? payload.citations : []);
      onSuccess();
    } catch (error) {
      setAnswer('Unable to reach assistant backend right now.');
      setCitations([]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeys(e) {
    if (e.key === 'Escape') triggerClose();
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      btnRef.current?.click();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute left-0"
      style={{
        width: FORM_WIDTH,
        height: FORM_HEIGHT,
        pointerEvents: showForm ? 'all' : 'none',
        bottom: 44 + PANEL_OFFSET,
      }}
    >
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 550 / SPEED_FACTOR, damping: 45, mass: 0.7 }}
            className="flex h-full flex-col p-2"
          >
            <div className="flex items-center justify-between py-1">
              <p className="text-foreground ml-7 flex items-center gap-1 text-xs select-none">Ask AI</p>
              <button
                type="submit"
                ref={btnRef}
                className="text-foreground mt-1 mr-1 flex items-center justify-center gap-1 rounded-[12px] bg-transparent text-center select-none"
                disabled={isLoading}
              >
                <KeyHint>Ctrl</KeyHint>
                <KeyHint className="w-fit">Enter</KeyHint>
              </button>
            </div>
            <textarea
              ref={textareaRef}
              placeholder="Ask me anything about my work..."
              name="message"
              className="h-[120px] w-full resize-none rounded-md p-3 text-sm outline-0"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
              required
              onKeyDown={handleKeys}
              spellCheck={false}
            />
            <div
              className="mt-2 h-[52px] overflow-y-auto rounded-md p-2 text-[11px]"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--glass-border)' }}
            >
              {isLoading ? (
                'Thinking...'
              ) : answer ? (
                <>
                  <p className="leading-snug">{answer}</p>
                  {citations.length > 0 && (
                    <ul className="mt-2 list-disc space-y-1 pl-4">
                      {citations.map((citation, index) => {
                        const isObject = typeof citation === 'object' && citation !== null;
                        const label = isObject
                          ? citation.title || citation.label || citation.url || `Source ${index + 1}`
                          : String(citation);
                        const url = isObject && citation.url ? citation.url : null;

                        return (
                          <li key={`${label}-${index}`}>
                            {url ? (
                              <a href={url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                                {label}
                              </a>
                            ) : (
                              <span>{label}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              ) : (
                <span className="opacity-70">Send a question to see the answer here.</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-3 left-3"
          >
            <ColorOrb dimension="16px" tones={{ base: 'oklch(22.64% 0 0)' }} />
          </motion.div>
        )}
      </AnimatePresence>

    </form>
  );
});

export function MorphPanel() {
  const wrapperRef = React.useRef(null);
  const textareaRef = React.useRef(null);

  const [showForm, setShowForm] = React.useState(false);
  const [successFlag, setSuccessFlag] = React.useState(false);
  const [answer, setAnswer] = React.useState('');
  const [citations, setCitations] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const triggerClose = React.useCallback(() => {
    setShowForm(false);
    textareaRef.current?.blur();
  }, []);

  const triggerOpen = React.useCallback(() => {
    setShowForm(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  }, []);

  const handleSuccess = React.useCallback(() => {
    setSuccessFlag(true);
    setTimeout(() => setSuccessFlag(false), 1500);
  }, []);

  React.useEffect(() => {
    function clickOutsideHandler(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target) && showForm) {
        triggerClose();
      }
    }
    document.addEventListener('mousedown', clickOutsideHandler);
    return () => document.removeEventListener('mousedown', clickOutsideHandler);
  }, [showForm, triggerClose]);

  const ctx = React.useMemo(
    () => ({ showForm, successFlag, triggerOpen, triggerClose, answer, citations, isLoading, setAnswer, setCitations, setLoading }),
    [showForm, successFlag, triggerOpen, triggerClose, answer, citations, isLoading]
  );

  return (
    <>
      <style>{`
        @property --angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }

        .ai-color-orb {
          display: grid;
          grid-template-areas: 'stack';
          overflow: hidden;
          border-radius: 50%;
          position: relative;
          transform: scale(1.1);
        }

        .ai-color-orb::before,
        .ai-color-orb::after {
          content: '';
          display: block;
          grid-area: stack;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: translateZ(0);
        }

        .ai-color-orb::before {
          background:
            conic-gradient(from calc(var(--angle) * 2) at 25% 70%, var(--accent3), transparent 20% 80%, var(--accent3)),
            conic-gradient(from calc(var(--angle) * 2) at 45% 75%, var(--accent2), transparent 30% 60%, var(--accent2)),
            conic-gradient(from calc(var(--angle) * -3) at 80% 20%, var(--accent1), transparent 40% 60%, var(--accent1));
          box-shadow: inset var(--base) 0 0 var(--shadow) calc(var(--shadow) * 0.2);
          filter: blur(var(--blur)) contrast(var(--contrast));
          animation: ai-spin var(--spin-duration) linear infinite;
        }

        .ai-color-orb::after {
          background-image: radial-gradient(circle at center, var(--base) var(--dot), transparent var(--dot));
          background-size: calc(var(--dot) * 2) calc(var(--dot) * 2);
          backdrop-filter: blur(calc(var(--blur) * 2)) contrast(calc(var(--contrast) * 2));
          mix-blend-mode: overlay;
          mask-image: radial-gradient(black var(--mask), transparent 75%);
        }

        @keyframes ai-spin {
          to {
            --angle: 360deg;
          }
        }
      `}</style>
      <div className="flex items-center justify-center" style={{ width: showForm ? FORM_WIDTH : 92, height: 44 }}>
        <motion.div
          ref={wrapperRef}
          data-panel
          className={cx('bg-background relative z-10 flex flex-col items-center overflow-visible border')}
          style={{
            background: 'var(--glass-bg)',
            borderColor: 'var(--glass-border)',
            backdropFilter: 'blur(16px) saturate(180%)',
            borderRadius: showForm ? 14 : 20,
          }}
          initial={false}
          animate={{ width: showForm ? FORM_WIDTH : 92, height: 44 }}
          transition={{
            type: 'spring',
            stiffness: 550 / SPEED_FACTOR,
            damping: 45,
            mass: 0.7,
            delay: showForm ? 0 : 0.08,
          }}
        >
          <FormContext.Provider value={ctx}>
            <DockBar />
            <InputForm ref={textareaRef} onSuccess={handleSuccess} />
          </FormContext.Provider>
        </motion.div>
      </div>
    </>
  );
}

function DockBar() {
  const { showForm, triggerOpen } = useFormContext();
  return (
    <footer className="mt-auto flex h-[44px] items-center justify-center whitespace-nowrap select-none">
      <div className="flex items-center justify-center gap-2 px-3">
        <div className="flex w-fit items-center gap-2" style={{ transform: 'translateY(1px)' }}>
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div key="blank" initial={{ opacity: 0 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} className="h-5 w-5" />
            ) : (
              <motion.div key="orb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <ColorOrb dimension="18px" tones={{ base: 'oklch(22.64% 0 0)' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button type="button" className="flex h-7 items-center justify-center rounded-full px-3 text-xs" variant="ghost" onClick={triggerOpen}>
          <span className="truncate">Ask AI</span>
        </Button>
      </div>
    </footer>
  );
}

function KeyHint({ children, className }) {
  return (
    <kbd className={cx('text-foreground flex h-6 w-fit items-center justify-center rounded-sm border px-[6px] text-[10px] font-sans', className)}>
      {children}
    </kbd>
  );
}

export default MorphPanel;
