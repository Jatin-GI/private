import { useCallback, useEffect, useRef, useState } from "react";

const TXN_CODE = "TXN-JATIN-520";

const Q1_OPTIONS = ["bauni", "5'5", "5'2", "6"];
const Q2_OPTIONS = ["devta", "dost", "pookie", "boyfriend"];

/** Stylized mock QR matrix — fixed pattern for a consistent look */
function MockQR() {
  const pattern = [
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
  ];

  const mid = Math.floor(pattern.length / 2);

  return (
    <div className="relative mx-auto h-[220px] w-[220px] border-[3px] border-slate-800 bg-white p-2.5 shadow-inner sm:h-[260px] sm:w-[260px]">
      <div
        className="grid h-full w-full gap-[1.5px]"
        style={{
          gridTemplateColumns: `repeat(${pattern[0].length}, 1fr)`,
          gridTemplateRows: `repeat(${pattern.length}, 1fr)`,
        }}
      >
        {pattern.map((row, ri) =>
          row.map((cell, ci) => {
            const isCenter =
              ri >= mid - 1 && ri <= mid + 1 && ci >= mid - 1 && ci <= mid + 1;
            if (isCenter) {
              return <div key={`${ri}-${ci}`} className="bg-transparent" />;
            }
            return (
              <div
                key={`${ri}-${ci}`}
                className={cell ? "bg-slate-900" : "bg-white"}
              />
            );
          }),
        )}
      </div>
      <div className="absolute left-1/2 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md bg-[#00baf2] shadow-md ring-2 ring-white sm:h-12 sm:w-12">
        <span className="text-[10px] font-black tracking-tighter text-white sm:text-xs">
          ₹
        </span>
      </div>
    </div>
  );
}

function AngryFace() {
  return (
    <div
      className="angry-bounce flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg sm:h-20 sm:w-20"
      aria-hidden
    >
      <svg viewBox="0 0 64 64" className="h-12 w-12 sm:h-14 sm:w-14">
        <circle cx="32" cy="32" r="28" fill="#FEE2E2" />
        <path
          d="M18 22 L26 26 M38 26 L46 22"
          stroke="#7F1D1D"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="22" cy="30" r="3.5" fill="#7F1D1D" />
        <circle cx="42" cy="30" r="3.5" fill="#7F1D1D" />
        <path
          d="M22 46 Q32 38 42 46"
          fill="none"
          stroke="#7F1D1D"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M28 36 L30 40 L34 36"
          fill="none"
          stroke="#DC2626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** Option that flees from the cursor / finger across a playground */
function RunawayOption({ label, onCaught, className, playgroundRef, initial }) {
  const btnRef = useRef(null);
  const [pos, setPos] = useState(initial);
  const lastFlee = useRef(0);
  const fleeTimer = useRef(null);

  useEffect(() => () => clearTimeout(fleeTimer.current), []);

  const flee = useCallback(
    (clientX, clientY) => {
      const now = Date.now();
      if (now - lastFlee.current < 100) return;
      lastFlee.current = now;

      const btn = btnRef.current;
      const parent = playgroundRef?.current;
      if (!btn || !parent) return;

      const parentRect = parent.getBoundingClientRect();
      const btnW = btn.offsetWidth || 140;
      const btnH = btn.offsetHeight || 56;
      const pad = 6;
      const maxX = Math.max(0, parentRect.width - btnW - pad);
      const maxY = Math.max(0, parentRect.height - btnH - pad);

      const relX = clientX - parentRect.left;
      const relY = clientY - parentRect.top;
      const cx = pos.x + btnW / 2;
      const cy = pos.y + btnH / 2;
      const angle = Math.atan2(cy - relY, cx - relX);
      const dist = 110 + Math.random() * 130;

      let nextX = pos.x + Math.cos(angle) * dist + (Math.random() - 0.5) * 50;
      let nextY = pos.y + Math.sin(angle) * dist + (Math.random() - 0.5) * 50;
      nextX = Math.min(maxX, Math.max(pad, nextX));
      nextY = Math.min(maxY, Math.max(pad, nextY));

      if (Math.hypot(nextX - pos.x, nextY - pos.y) < 50) {
        nextX = Math.random() * maxX;
        nextY = Math.random() * maxY;
      }

      setPos({ x: nextX, y: nextY });
    },
    [playgroundRef, pos.x, pos.y],
  );

  const scheduleFlee = (clientX, clientY) => {
    clearTimeout(fleeTimer.current);
    // Short delay so a quick click can still land
    fleeTimer.current = setTimeout(() => flee(clientX, clientY), 140);
  };

  const handleTouch = (e) => {
    e.preventDefault();
    const t = e.touches[0] || e.changedTouches[0];
    if (t) flee(t.clientX, t.clientY);
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={() => {
        clearTimeout(fleeTimer.current);
        onCaught?.(label);
      }}
      onMouseEnter={(e) => scheduleFlee(e.clientX, e.clientY)}
      onMouseLeave={() => clearTimeout(fleeTimer.current)}
      onTouchStart={handleTouch}
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width: "calc(50% - 8px)",
        maxWidth: 180,
        zIndex: 20,
        transition: "left 0.2s ease-out, top 0.2s ease-out",
      }}
      className={className}
    >
      {label}
    </button>
  );
}

function WelcomeScreen({ onStart }) {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a0a14] via-[#3b1228] to-[#7a1f3d] px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(251,113,133,0.35) 0%, transparent 55%), radial-gradient(circle at 15% 80%, rgba(244,63,94,0.2) 0%, transparent 40%), radial-gradient(circle at 85% 70%, rgba(253,186,116,0.15) 0%, transparent 40%)",
        }}
      />

      {/* Soft floating orbs */}
      <div className="welcome-orb pointer-events-none absolute left-[12%] top-[22%] h-3 w-3 rounded-full bg-rose-300/70" />
      <div className="welcome-orb-slow pointer-events-none absolute right-[18%] top-[30%] h-2 w-2 rounded-full bg-amber-200/60" />
      <div className="welcome-orb pointer-events-none absolute left-[70%] bottom-[28%] h-2.5 w-2.5 rounded-full bg-pink-200/50" style={{ animationDelay: "1.2s" }} />

      <div className="float-in relative z-10 flex max-w-lg flex-col items-center text-center">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-rose-300/80">
          A little surprise for you
        </p>

        <h1
          className="welcome-title text-5xl font-bold leading-[1.1] text-white sm:text-7xl"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Happy Birthday
        </h1>
        <p
          className="welcome-name mt-3 bg-gradient-to-r from-rose-200 via-pink-100 to-amber-100 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Nishtha
        </p>

        <p className="mt-6 max-w-xs text-sm leading-relaxed text-rose-100/70 sm:text-base">
          pehle thoda sa game khelna padega…
        </p>

        <button
          type="button"
          onClick={onStart}
          className="mt-10 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-rose-900 shadow-[0_0_40px_rgba(251,113,133,0.35)] transition hover:scale-105 hover:bg-rose-50 active:scale-100"
        >
          Start the game
        </button>
      </div>
    </section>
  );
}

export default function BirthdayQuiz({ onComplete }) {
  const [step, setStep] = useState(0);
  const [q1Angry, setQ1Angry] = useState(false);
  const [q2AngryCount, setQ2AngryCount] = useState(0);
  const [q2Round, setQ2Round] = useState(0);
  const [showFateMsg, setShowFateMsg] = useState(false);
  const [boyfriendTried, setBoyfriendTried] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [showScanModal, setShowScanModal] = useState(false);
  const [txnInput, setTxnInput] = useState("");
  const [txnError, setTxnError] = useState(false);
  const playgroundRef = useRef(null);

  // Reset runaway positions when Q2 round restarts
  useEffect(() => {
    if (step === 2) setShowFateMsg(false);
  }, [step, q2Round]);

  const handleQ1 = (option) => {
    if (option === "bauni") {
      setStep(2);
      return;
    }
    setQ1Angry(true);
    setShakeKey((k) => k + 1);
  };

  const handleQ2 = (option) => {
    if (option === "devta") {
      setStep(3);
      return;
    }
    if (option === "boyfriend") {
      setBoyfriendTried(true);
      setShowFateMsg(true);
      return;
    }
    // Caught a fleeing wrong option somehow
    setQ2AngryCount((c) => c + 1);
    setShakeKey((k) => k + 1);
    setQ2Round((r) => r + 1);
  };

  const dismissFateMsg = () => {
    setShowFateMsg(false);
    setQ2Round((r) => r + 1);
    setShakeKey((k) => k + 1);
  };

  const handleTxnSubmit = (e) => {
    e.preventDefault();
    if (txnInput.trim().toUpperCase() === TXN_CODE) {
      onComplete?.();
      return;
    }
    setTxnError(true);
    setShakeKey((k) => k + 1);
  };

  const optionBtnClass =
    "rounded-2xl border-2 border-teal-200/80 bg-white/95 px-4 py-5 text-lg font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:border-teal-400 hover:bg-teal-50 hover:shadow-md active:scale-95 select-none";

  return (
    <div className="quiz-root relative min-h-dvh overflow-hidden">
      <style>{`
        .quiz-root {
          font-family: 'Outfit', sans-serif;
        }
        .quiz-display {
          font-family: 'Fredoka', sans-serif;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        @keyframes angryBounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.08) rotate(-6deg); }
          50% { transform: scale(1.02) rotate(4deg); }
          75% { transform: scale(1.1) rotate(-3deg); }
        }
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulseSoft {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 186, 242, 0.45); }
          50% { box-shadow: 0 0 0 12px rgba(0, 186, 242, 0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.9) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes backdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes optionPop {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes welcomeOrb {
          0%, 100% { transform: translateY(0); opacity: 0.55; }
          50% { transform: translateY(-14px); opacity: 1; }
        }
        @keyframes welcomeTitle {
          from { opacity: 0; letter-spacing: 0.2em; transform: translateY(12px); }
          to { opacity: 1; letter-spacing: 0.02em; transform: translateY(0); }
        }
        @keyframes welcomeName {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }

        .shake-me { animation: shake 0.45s ease-in-out; }
        .angry-bounce { animation: angryBounce 0.7s ease-in-out infinite; }
        .float-in { animation: floatIn 0.5s ease-out both; }
        .scan-pulse { animation: pulseSoft 2s ease-in-out infinite; }
        .modal-in { animation: modalIn 0.35s ease-out both; }
        .backdrop-in { animation: backdropIn 0.25s ease-out both; }
        .option-pop { animation: optionPop 0.4s ease-out both; }
        .welcome-orb { animation: welcomeOrb 3.5s ease-in-out infinite; }
        .welcome-orb-slow { animation: welcomeOrb 5s ease-in-out infinite 0.6s; }
        .welcome-title { animation: welcomeTitle 1s ease-out both; }
        .welcome-name { animation: welcomeName 0.9s ease-out both; animation-delay: 0.35s; }
      `}</style>

      {/* —— Welcome —— */}
      {step === 0 && <WelcomeScreen onStart={() => setStep(1)} />}

      {/* —— Question 1: Height —— */}
      {step === 1 && (
        <section className="relative flex min-h-dvh flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-amber-50 to-sky-100 px-4 py-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(251,113,133,0.25) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.2) 0%, transparent 45%)",
            }}
          />

          <div
            key={shakeKey}
            className={`float-in relative z-10 w-full max-w-md ${q1Angry ? "shake-me" : ""}`}
          >
            <div className="mb-6 flex flex-col items-center gap-3 text-center">
              {q1Angry && (
                <div className="float-in flex flex-col items-center gap-2">
                  <AngryFace />
                  <p className="quiz-display text-sm font-semibold text-red-600">
                    galat jawab! dobara soch…
                  </p>
                </div>
              )}
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
                Question 1
              </p>
              <h1 className="quiz-display text-3xl font-semibold text-slate-800 sm:text-4xl">
                apni height btta
              </h1>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {Q1_OPTIONS.map((option, i) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleQ1(option)}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className="option-pop rounded-2xl border-2 border-rose-200/80 bg-white/90 px-4 py-5 text-lg font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-rose-400 hover:bg-rose-50 hover:shadow-md active:scale-95"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* —— Question 2: Jatin —— */}
      {step === 2 && (
        <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-100 px-4 py-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 20%, rgba(14,165,233,0.22) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(244,114,182,0.16) 0%, transparent 45%)",
            }}
          />

          <div
            key={`${q2Round}-${shakeKey}`}
            className={`float-in relative z-10 w-full max-w-md ${q2AngryCount > 0 ? "shake-me" : ""}`}
          >
            <div className="mb-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-500">
                Question 2
              </p>
              <h1 className="quiz-display mt-2 flex flex-wrap items-center justify-center gap-2 text-3xl font-semibold text-slate-800 sm:text-4xl">
                <span>jatin kon h</span>
                {q2AngryCount > 0 && (
                  <span
                    className="inline-flex gap-0.5 text-3xl sm:text-4xl"
                    aria-label="angry"
                  >
                    {Array.from({ length: Math.min(q2AngryCount, 5) }).map(
                      (_, i) => (
                        <span key={i} className="angry-bounce inline-block">
                          😡
                        </span>
                      ),
                    )}
                  </span>
                )}
              </h1>
              {q2AngryCount > 0 && (
                <p className="mt-2 text-sm font-medium text-red-500">
                  soch ke jawab de!
                </p>
              )}
            </div>

            {/* Playground: runaway options roam; boyfriend stays put */}
            <div
              ref={playgroundRef}
              className="relative h-[280px] w-full sm:h-[300px]"
            >
              {Q2_OPTIONS.filter((o) => o !== "boyfriend").map((option, i) => {
                const staysStill = option === "devta" && boyfriendTried;
                const initials = [
                  { x: 8, y: 8 },
                  { x: 168, y: 8 },
                  { x: 8, y: 78 },
                ];

                if (staysStill) {
                  return (
                    <button
                      key={`${option}-${q2Round}`}
                      type="button"
                      onClick={() => handleQ2(option)}
                      className={`option-pop absolute left-2 top-2 z-10 w-[calc(50%-8px)] max-w-[180px] ${optionBtnClass} border-amber-300 hover:border-amber-400 hover:bg-amber-50`}
                    >
                      {option}
                    </button>
                  );
                }

                return (
                  <RunawayOption
                    key={`${option}-${q2Round}`}
                    label={option}
                    onCaught={handleQ2}
                    playgroundRef={playgroundRef}
                    initial={initials[i] || { x: 40 + i * 30, y: 40 }}
                    className={`option-pop ${optionBtnClass}`}
                  />
                );
              })}

              <button
                key={`boyfriend-${q2Round}`}
                type="button"
                onClick={() => handleQ2("boyfriend")}
                className={`option-pop absolute bottom-2 left-1/2 z-10 w-[calc(50%-8px)] max-w-[180px] -translate-x-1/2 ${optionBtnClass} border-rose-300 hover:border-rose-400 hover:bg-rose-50`}
              >
                boyfriend
              </button>
            </div>
          </div>

          {/* Fate message after boyfriend */}
          {showFateMsg && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <button
                type="button"
                aria-label="Close"
                className="backdrop-in absolute inset-0 bg-slate-900/45 backdrop-blur-sm"
                onClick={dismissFateMsg}
              />
              <div className="modal-in relative z-10 w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl">
                <p className="text-4xl" aria-hidden>
                  😌
                </p>
                <p className="quiz-display mt-4 text-xl font-semibold leading-snug text-slate-800 sm:text-2xl">
                  itni achi kismat nhi h apki
                </p>
                <button
                  type="button"
                  onClick={dismissFateMsg}
                  className="mt-6 w-full rounded-xl bg-teal-600 py-3 text-base font-bold text-white transition hover:bg-teal-700 active:scale-[0.98]"
                >
                  ok try again
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* —— Paytm QR Screen —— */}
      {step === 3 && (
        <section className="relative flex min-h-dvh flex-col bg-[#e8f1f8]">
          <header className="bg-[#0f4c81] px-4 pb-8 pt-6 text-white shadow-lg">
            <div className="mx-auto flex max-w-md items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00baf2] font-black text-white">
                  ₹
                </div>
                <span className="text-lg font-bold tracking-tight">Paytm</span>
              </div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#7dd3fc]">
                Accepted Here
              </span>
            </div>
            <p className="mx-auto mt-4 max-w-md text-center text-sm font-medium text-sky-200/90">
              Paytm Accepted Here
            </p>
          </header>

          <div className="relative z-10 mx-auto -mt-4 w-full max-w-md flex-1 px-4 pb-10">
            <div className="float-in rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200/80">
              <h2 className="quiz-display text-center text-xl font-semibold leading-snug text-slate-800 sm:text-2xl">
                chl paisa dae gift lena h taire liye
              </h2>

              <div className="mt-6">
                <MockQR />
              </div>

              <p className="mt-3 text-center text-xs text-slate-400">
                Scan to pay · UPI · Wallet
              </p>

              <button
                type="button"
                onClick={() => setShowScanModal(true)}
                className="scan-pulse mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00baf2] py-3.5 text-base font-bold text-white transition hover:bg-[#00a8db] active:scale-[0.98]"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M7 8h10v8H7V8z"
                  />
                </svg>
                Scan / Tap QR
              </button>
            </div>
          </div>

          {showScanModal && (
            <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
              <button
                type="button"
                aria-label="Close"
                className="backdrop-in absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                onClick={() => setShowScanModal(false)}
              />
              <div
                key={shakeKey}
                className={`modal-in relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl ${txnError ? "shake-me" : ""}`}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl">
                  ✓
                </div>
                <p className="quiz-display text-center text-lg font-semibold leading-snug text-slate-800">
                  chl garreb nhi leta paise party bhi toh daige abhi tu
                </p>

                <div className="mt-5 rounded-xl border border-dashed border-[#0f4c81]/30 bg-[#e8f1f8] px-4 py-3 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#0f4c81]/60">
                    Transaction Code
                  </p>
                  <p className="mt-1 font-mono text-xl font-bold tracking-wider text-[#0f4c81]">
                    {TXN_CODE}
                  </p>
                </div>

                <form onSubmit={handleTxnSubmit} className="mt-5 space-y-3">
                  <input
                    type="text"
                    value={txnInput}
                    onChange={(e) => {
                      setTxnInput(e.target.value);
                      setTxnError(false);
                    }}
                    placeholder="Enter Transaction Code"
                    className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-center font-mono text-sm outline-none transition focus:ring-2 focus:ring-[#00baf2]/40 ${
                      txnError
                        ? "border-red-400 text-red-600"
                        : "border-slate-200 text-slate-800 focus:border-[#00baf2]"
                    }`}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  {txnError && (
                    <p className="text-center text-xs font-medium text-red-500">
                      galat code — upar wala copy kar
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#0f4c81] py-3.5 text-base font-bold text-white transition hover:bg-[#0a3a63] active:scale-[0.98]"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
