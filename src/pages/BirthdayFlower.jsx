import React, { useEffect, useState, useMemo } from "react";

const OUTER_PETALS = 16;
const INNER_PETALS = 16;

export default function BirthdaySunflower() {
  const [bloom, setBloom] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [name, setName] = useState("Someone Special");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setBloom(false);
    const t1 = setTimeout(() => setBloom(true), 500);
    return () => clearTimeout(t1);
  }, [replayKey]);

  const fallingPetals = useMemo(
    () =>
      [...Array(14)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 7 + Math.random() * 6,
        size: 9 + Math.random() * 8,
        drift: -40 + Math.random() * 80,
      })),
    [replayKey],
  );

  const sparklePositions = useMemo(
    () =>
      [...Array(10)].map((_, i) => ({
        id: i,
        angle: (i / 10) * 360,
        radius: 96 + Math.random() * 26,
        delay: i * 0.18,
      })),
    [replayKey],
  );

  const outerAngles = useMemo(
    () => [...Array(OUTER_PETALS)].map((_, i) => (360 / OUTER_PETALS) * i),
    [],
  );
  const innerAngles = useMemo(
    () =>
      [...Array(INNER_PETALS)].map(
        (_, i) => (360 / INNER_PETALS) * i + 360 / INNER_PETALS / 2,
      ),
    [],
  );

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-[#FFF8E7] via-[#FFF0D6] to-[#FDE6C8]">
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.85; }
          90% { opacity: 0.85; }
          100% { transform: translateY(110vh) translateX(var(--drift)) rotate(360deg); opacity: 0; }
        }
        @keyframes floatGlow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.08); }
        }
        @keyframes gentleSway {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.5deg); }
        }
        @keyframes riseIn {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes popSparkle {
          0% { opacity: 0; transform: scale(0.3); }
          40% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(0.6); }
        }
        .petal-fall { animation: fall linear infinite; }
        .flower-sway { animation: gentleSway 6s ease-in-out infinite; transform-origin: bottom center; }
        .title-in { animation: riseIn 0.9s ease-out both; }
        .msg-in { animation: riseIn 0.9s ease-out both; animation-delay: 2.3s; }
      `}</style>

      {/* Falling petals */}
      {fallingPetals.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 petal-fall pointer-events-none"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 2.6}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--drift": `${p.drift}px`,
            background: "linear-gradient(180deg, #FFE08A 0%, #F7B733 100%)",
            borderRadius: "50% 50% 4px 4px",
          }}
        />
      ))}

      {/* Ambient glow */}
      <div
        className="absolute w-72 h-72 rounded-full bg-amber-200/40 blur-3xl pointer-events-none"
        style={{
          top: "10%",
          left: "8%",
          animation: "floatGlow 7s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-72 h-72 rounded-full bg-orange-100/50 blur-3xl pointer-events-none"
        style={{
          bottom: "8%",
          right: "10%",
          animation: "floatGlow 8s ease-in-out infinite 1s",
        }}
      />

      <div className="relative flex flex-col items-center px-6 text-center">
        {/* Editable name */}
        <div className="title-in mb-2">
          {/* {editing ? (
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditing(false)}
              className="text-center bg-transparent border-b-2 border-amber-500 outline-none text-2xl sm:text-3xl font-semibold text-amber-800 placeholder-amber-300 px-2"
              placeholder="Type a name"
            />
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="text-2xl sm:text-3xl font-semibold text-amber-700/80 tracking-wide hover:text-amber-800 transition-colors"
              title="Click to personalize"
            >
              For {name} ✎
            </button>
          )} */}

          <div className="text-2xl sm:text-3xl font-semibold text-amber-700/80 tracking-wide hover:text-amber-800 transition-colors">
            Kohli Ji
          </div>
        </div>

        <h1
          className="title-in mb-10 sm:mb-14 text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500"
          style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}
        >
          Happy Birthday
        </h1>

        {/* Flower */}
        <div className="relative mt-32 flex flex-col items-center flower-sway">
          {/* Stem */}
          <div className="w-3 h-64 sm:h-72 bg-gradient-to-b from-emerald-500 to-emerald-700 rounded-full" />

          {/* Leaves */}
          <div className="absolute top-32 -left-12">
            <div className="w-20 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full -rotate-[30deg] shadow-sm" />
          </div>
          <div className="absolute top-48 left-4">
            <div className="w-20 h-9 bg-gradient-to-bl from-emerald-400 to-emerald-600 rounded-full rotate-[30deg] shadow-sm" />
          </div>

          {/* Flower head: zero-size anchor point everything centers on */}
          <div className="absolute -top-8 sm:-top-10 left-1/2 w-0 h-0">
            {/* Sparkles ring */}
            {bloom &&
              sparklePositions.map((s) => {
                const rad = (s.angle * Math.PI) / 180;
                const x = Math.cos(rad) * s.radius;
                const y = Math.sin(rad) * s.radius;
                return (
                  <span
                    key={s.id}
                    className="absolute text-amber-300 select-none"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: "translate(-50%, -50%)",
                      fontSize: "14px",
                      animation: "popSparkle 1.6s ease-in-out infinite",
                      animationDelay: `${s.delay}s`,
                    }}
                  >
                    ✦
                  </span>
                );
              })}

            {/* Outer ring: long pointed golden petals */}
            {outerAngles.map((deg, i) => (
              <div
                key={`o-${i}`}
                className="absolute left-0 top-0"
                style={{ transform: `rotate(${deg}deg)` }}
              >
                <div
                  className="absolute transition-transform ease-out"
                  style={{
                    left: 0,
                    top: 0,
                    width: "22px",
                    height: "104px",
                    transform: `translate(-11px, -104px) scale(${bloom ? 1 : 0})`,
                    transformOrigin: "50% 100%",
                    transitionDuration: "900ms",
                    transitionDelay: `${i * 40}ms`,
                    background:
                      "linear-gradient(180deg, #FFE8A3 0%, #FBC02D 55%, #E8930C 100%)",
                    borderRadius: "50% 50% 3px 3px",
                    boxShadow: "0 2px 4px rgba(180,90,0,0.25)",
                  }}
                />
              </div>
            ))}

            {/* Inner ring: shorter petals offset between the outer ones, for fullness */}
            {innerAngles.map((deg, i) => (
              <div
                key={`i-${i}`}
                className="absolute left-0 top-0"
                style={{ transform: `rotate(${deg}deg)` }}
              >
                <div
                  className="absolute transition-transform ease-out"
                  style={{
                    left: 0,
                    top: 0,
                    width: "16px",
                    height: "72px",
                    transform: `translate(-8px, -72px) scale(${bloom ? 1 : 0})`,
                    transformOrigin: "50% 100%",
                    transitionDuration: "900ms",
                    transitionDelay: `${260 + i * 35}ms`,
                    background:
                      "linear-gradient(180deg, #FFDD70 0%, #F5A623 100%)",
                    borderRadius: "50% 50% 3px 3px",
                  }}
                />
              </div>
            ))}

            {/* Center disc with seed texture */}
            <div
              className="absolute z-20 rounded-full shadow-xl transition-transform ease-out overflow-hidden"
              style={{
                left: 0,
                top: 0,
                width: "88px",
                height: "88px",
                transform: `translate(-44px, -44px) scale(${bloom ? 1 : 0})`,
                transformOrigin: "50% 50%",
                transitionDuration: "900ms",
                transitionDelay: "600ms",
                background:
                  "radial-gradient(circle at 38% 32%, #8B5A2B, #5C3A19 70%)",
                border: "3px solid #4A2E14",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(circle, rgba(0,0,0,0.35) 1.2px, transparent 1.2px)",
                  backgroundSize: "9px 9px",
                }}
              />
            </div>
          </div>
        </div>

        <p className="msg-in mt-24 sm:mt-28 max-w-md text-base sm:text-lg font-medium text-amber-900/90 leading-relaxed">
          arrey maire bhai kaa birthday hai aaj 
          i love you very much tu toh apna jigar taa tukda h,
          garrebi h wrna gift deta , chl ess saal esse kaam chla lae baaki next year dekhege 
          enjoy your day my pookie wookie dookie 
        </p>

        <button
          onClick={() => setReplayKey((k) => k + 1)}
          className="msg-in mt-8 px-5 py-2 rounded-full text-sm font-medium text-amber-700 border border-amber-300 bg-white/50 backdrop-blur hover:bg-white/80 transition-colors"
        >
          Bloom again ✨
        </button>
      </div>
    </div>
  );
}
