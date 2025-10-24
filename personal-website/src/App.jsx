import React, { useEffect, useMemo, useRef, useState } from "react";

// --- Draggable Retro Window ---
function RetroWindow({ id, title, children, onClose, isOpen, onFocus, z, pos, setPos }) {
  const ref = useRef(null);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, baseX: 0, baseY: 0 });

  useEffect(() => {
    function onMove(e) {
      const d = dragRef.current;
      if (!d.dragging) return;
      const x = d.baseX + (e.clientX - d.startX);
      const y = d.baseY + (e.clientY - d.startY);
      setPos(id, { x, y });
    }
    function onUp() {
      dragRef.current.dragging = false;
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [id, setPos]);

  if (!isOpen) return null;
  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={title}
      onMouseDown={() => onFocus(id)}
      className="absolute shadow-2xl border border-black/40 bg-[#EDEDED] rounded-sm overflow-hidden select-none"
      style={{ zIndex: z, width: 820, height: 480, left: pos.x, top: pos.y }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-3 py-1 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] text-white text-sm cursor-move"
        onMouseDown={(e) => {
          dragRef.current = {
            dragging: true,
            startX: e.clientX,
            startY: e.clientY,
            baseX: pos.x,
            baseY: pos.y,
          };
        }}
      >
        <div className="font-semibold tracking-wide">{title}</div>
        <div className="flex gap-1">
          <button
            aria-label="Close"
            onClick={onClose}
            className="w-5 h-5 grid place-items-center bg-white/20 hover:bg-red-500 rounded-sm border border-white/30"
          >
            <span className="-mt-0.5">×</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-white/70 border-b border-black/10">
        <div className="w-3 h-3 bg-black/70" />
        <div className="w-3 h-3 bg-black/70" />
        <div className="w-3 h-3 bg-black/70" />
        <div className="text-[11px] ml-2 text-black/70">Address:</div>
        <div className="text-[11px] bg-white border border-black/20 rounded px-2 py-0.5 w-80 truncate">www.about-me.com</div>
      </div>

      {/* Content */}
      <div className="w-full h-[calc(100%-52px)] overflow-auto bg-white">
        {children}
      </div>
    </div>
  );
}

function SidebarIcon({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
    >
      <div className="w-14 h-14 rounded-md bg-white/30 border border-white/40" />
      <div className="text-white/90 text-xs">{label}</div>
    </button>
  );
}

export default function App() {
  // which windows are open
  const [open, setOpen] = useState({ profile: true, experience: true, paint: true });

  // positions for windows
  const [positions, setPositions] = useState({
    profile: { x: 140, y: 40 },
    experience: { x: 160, y: 560 - 480 }, // stacked below then shifted up
    paint: { x: 520, y: 140 },
  });

  const setPos = (id, p) => setPositions((cur) => ({ ...cur, [id]: { ...cur[id], ...p } }));

  // bring-to-front ordering
  const [order, setOrder] = useState(["profile", "paint", "experience"]);
  const zIndexMap = useMemo(() => {
    const base = 10;
    return order.reduce((acc, id, i) => ({ ...acc, [id]: base + i }), {});
  }, [order]);

  const focus = (id) => setOrder((cur) => [...cur.filter((x) => x !== id), id]);
  const close = (id) => setOpen((o) => ({ ...o, [id]: false }));
  const reopen = (id) => {
    setOpen((o) => ({ ...o, [id]: true }));
    focus(id);
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden font-sans">
      {/* Desktop gradient + ornaments */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#bde0fe] via-[#cdb4db] to-[#ffc8dd]" />
      <div className="absolute inset-0 p-6 grid grid-cols-[120px_1fr_120px] gap-4">
        {/* Left launcher */}
        <div className="flex flex-col justify-between items-center py-6">
          <div className="flex flex-col gap-6">
            <SidebarIcon label="Projects" onClick={() => reopen("profile")} />
            <SidebarIcon label="Sarah's Profile" onClick={() => reopen("profile")} />
          </div>
          <div className="flex flex-col gap-6">
            <SidebarIcon label="Sudoku" onClick={() => reopen("experience")} />
            <SidebarIcon label="Profile pic" onClick={() => reopen("paint")} />
          </div>
        </div>

        {/* Desktop area */}
        <div className="relative">
          {/* Windows */}
          <RetroWindow
            id="profile"
            title="Sarah's Profile • Internet"
            isOpen={open.profile}
            onClose={() => close("profile")}
            onFocus={focus}
            z={zIndexMap.profile || 10}
            pos={positions.profile}
            setPos={setPos}
          >
            <div className="grid grid-cols-[1.2fr_1fr] h-full">
              {/* Left: header + skills */}
              <div className="p-6">
                <div className="text-2xl font-bold">Sarah Shakim</div>
                <div className="mt-2 text-sm text-black/60 space-y-1">
                  <div>📞 (647) 772 – 7216</div>
                  <div>✉️ sarahshakim@gmail.com</div>
                  <div>📍 Toronto, ON</div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-extrabold underline decoration-[#6c5ce7]">SKILLS</h3>
                  <div className="grid grid-cols-5 gap-3 mt-3 text-xs">
                    {[
                      "Angular","React","HTML5","CSS3","JavaScript","Flask","XML","TypeScript",
                      "Python","C#","Rust","SQL","MATLAB","Powershell","NodeJS",
                      "VS Code","Linux","Git","npm","GitHub","PowerBI","ASP.NET"
                    ].map((s) => (
                      <div key={s} className="px-2 py-1 rounded border text-center bg-white">{s}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div className="p-6 border-l bg-[#fff7f0]">
                <h3 className="text-lg font-bold text-[#0ea5e9]">EDUCATION</h3>
                <div className="mt-3 text-sm leading-relaxed">
                  <div className="font-semibold">University of Waterloo</div>
                  <div>BASc, Computer Engineering</div>
                  <div>2020 – 2025</div>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold">About me</h4>
                  <p className="text-sm text-black/70 mt-1">
                    I love building playful, performant UIs and exploring ML/analytics.
                    This site mimics a cozy retro desktop—click icons on the left to reopen any windows you close.
                  </p>
                </div>
              </div>
            </div>
          </RetroWindow>

          <RetroWindow
            id="experience"
            title="Sarah's Profile • Internet"
            isOpen={open.experience}
            onClose={() => close("experience")}
            onFocus={focus}
            z={zIndexMap.experience || 11}
            pos={positions.experience}
            setPos={setPos}
          >
            <div className="h-full grid grid-cols-[320px_1fr]">
              {/* Left column */}
              <div className="p-5 bg-[#eafaf1] border-r">
                <div className="bg-white/70 p-4 rounded-lg border">
                  <h3 className="text-xl font-extrabold">Hobbies & Interests</h3>
                  <ul className="list-disc ml-5 mt-3 text-sm space-y-1">
                    <li>Avid Gamer</li>
                    <li>Hackathons</li>
                    <li>Experimenting with new tech</li>
                    <li>Baking</li>
                  </ul>
                </div>
                <div className="bg-white/70 p-4 rounded-lg border mt-6">
                  <h3 className="text-xl font-extrabold">Relevant Courses</h3>
                  <ul className="list-disc ml-5 mt-3 text-sm space-y-1">
                    <li>Data structures & algorithms</li>
                    <li>Programming for performance</li>
                    <li>Linear algebra</li>
                    <li>Electronic circuits</li>
                  </ul>
                </div>
              </div>

              {/* Right column: Work experience */}
              <div className="p-6">
                <h2 className="text-2xl font-extrabold text-[#6c5ce7]">WORK EXPERIENCE</h2>

                {[1,2].map((i) => (
                  <div key={i} className="mt-6">
                    <a className="text-sm font-semibold text-[#6c5ce7] underline" href="#">Machine Learning / Data Analytics Specialist</a>
                    <div className="text-xs text-black/60 font-mono">Advanced Micro Devices (AMD) [May 2023 - Aug 2023]</div>
                    <div className="mt-2 text-sm font-semibold">Python | React | TensorFlow | JavaScript | Angular | Neural Networks | PowerBI</div>
                    <ul className="list-disc ml-5 text-sm text-black/80 mt-2 space-y-1">
                      <li>Built dashboards and ML pipelines improving insight latency.</li>
                      <li>Collaborated across design and backend teams.</li>
                      <li>Presented findings to stakeholders and leadership.</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </RetroWindow>

          <RetroWindow
            id="paint"
            title="Profile pic • paint"
            isOpen={open.paint}
            onClose={() => close("paint")}
            onFocus={focus}
            z={zIndexMap.paint || 12}
            pos={positions.paint}
            setPos={setPos}
          >
            <div className="h-full grid grid-cols-[180px_1fr]">
              <div className="p-3 bg-[#f5f5f5] border-r">
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="h-8 bg-white border" />
                  ))}
                </div>
              </div>
              <div className="relative bg-[#fff] grid place-items-center">
                <div className="w-72 h-80 bg-gradient-to-b from-[#fff] to-[#f0f0f0] border"></div>
                <div className="absolute bottom-2 left-0 right-0 mx-3 h-8 bg-white border grid grid-cols-14 gap-1 px-2 items-center">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="h-5 border" />
                  ))}
                </div>
              </div>
            </div>
          </RetroWindow>
        </div>

        {/* Right spacer to match mockup look */}
        <div />
      </div>

      {/* Footer helper text */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 text-xs bg-white/70 rounded shadow">Tip: Drag windows by the top bar. Click the × to close, and use the left icons to re-open.</div>
    </div>
  );
}
