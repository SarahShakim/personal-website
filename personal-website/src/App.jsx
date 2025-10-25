import React, { useEffect, useMemo, useRef, useState } from "react";
import profilePic from "./assets/SHA_3678.JPG";
/**
 * DROP-IN APP.JSX (Vite + React, Tailwind v3/v4)
 * - Draggable + resizable windows (all edges/corners)
 * - Per-window default & min sizes (edit DEFAULT_SIZES / MIN_SIZES)
 * - Brings focused window to front
 * - Close / reopen from left sidebar
 * - Responsive: caps sizes and clamps positions on browser resize
 * - Initial layout places the "paint" window to the right of "profile"
 */

// ---------- CONFIG: tweak these to your liking ----------
const DEFAULT_SIZES = {
  profile: { w: 900, h: 520 },
  experience: { w: 1000, h: 700 },
  paint: { w: 500, h: 520 },
};

const MIN_SIZES = {
  profile: { w: 520, h: 320 },
  experience: { w: 520, h: 320 },
  paint: { w: 480, h: 320 },
};

const DEFAULT_POSITIONS = {
  profile: { x: 120, y: 40 },
  experience: { x: 40, y: 120 },
  paint: { x: 540, y: 100 }, // will be moved to the right of profile on mount
};
// --------------------------------------------------------

// Toggle global resizing behavior for all windows
const RESIZABLE = false;

// Helper to clamp numbers
function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

// --- Draggable + Resizable Retro Window ---
function RetroWindow({
  id,
  title,
  children,
  onClose,
  isOpen,
  onFocus,
  z,
  pos,
  setPos,
  size,
  setSize,
  minSize,
}) {
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, baseX: 0, baseY: 0 });
  const resizeRef = useRef({
    resizing: false,
    startX: 0,
    startY: 0,
    startW: 0,
    startH: 0,
    startL: 0,
    startT: 0,
    edge: "", // 'n','s','e','w','ne','nw','se','sw'
  });

  useEffect(() => {
    function onMove(e) {
      // Dragging
      if (dragRef.current.dragging) {
        const d = dragRef.current;
        const x = d.baseX + (e.clientX - d.startX);
        const y = d.baseY + (e.clientY - d.startY);
        setPos(id, { x, y });
        return;
      }
      // Resizing
      const r = resizeRef.current;
      if (!r.resizing) return;
      const dx = e.clientX - r.startX;
      const dy = e.clientY - r.startY;

      let newW = r.startW;
      let newH = r.startH;
      let newL = r.startL;
      let newT = r.startT;

      const edge = r.edge;
      // Horizontal
      if (edge.includes("e")) newW = Math.max(minSize.w, r.startW + dx);
      if (edge.includes("w")) {
        const w = Math.max(minSize.w, r.startW - dx);
        newL = r.startL + (r.startW - w);
        newW = w;
      }
      // Vertical
      if (edge.includes("s")) newH = Math.max(minSize.h, r.startH + dy);
      if (edge.includes("n")) {
        const h = Math.max(minSize.h, r.startH - dy);
        newT = r.startT + (r.startH - h);
        newH = h;
      }
      setPos(id, { x: newL, y: newT });
      setSize(id, { w: newW, h: newH });
    }
    function onUp() {
      dragRef.current.dragging = false;
      resizeRef.current.resizing = false;
    }
    // Use document so we keep receiving events even if the cursor leaves the window
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [id, setPos, setSize, minSize.w, minSize.h]);

  if (!isOpen) return null;

  const startDrag = (e) => {
    onFocus(id);
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      baseX: pos.x,
      baseY: pos.y,
    };
  };

  const startResize = (edge) => (e) => {
    e.stopPropagation();
    onFocus(id);
    resizeRef.current = {
      resizing: true,
      startX: e.clientX,
      startY: e.clientY,
      startW: size.w,
      startH: size.h,
      startL: pos.x,
      startT: pos.y,
      edge,
    };
  };

  return (
    <div
      role="dialog"
      aria-label={title}
      onMouseDown={() => onFocus(id)}
      className="absolute shadow-2xl border border-black/40 bg-[#EDEDED] rounded-sm overflow-hidden select-none font-mono"
      style={{ zIndex: z, width: size.w, height: size.h, left: pos.x, top: pos.y }}
    >
      {/* Title bar (drag handle) */}
      <div
        className="flex items-center justify-between px-3 py-1 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] text-white text-sm cursor-move font-bold tracking-wider"
        onMouseDown={startDrag}
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
      <div className="flex items-center gap-2 px-2 py-1 bg-white/70 border-b border-black/10 text-[12px]">
        <div className="text-[11px] ml-2 text-black/70">Address:</div>
        <div className="text-[11px] bg-white border border-black/20 rounded px-2 py-0.5 w-80 truncate">www.about-me.com</div>
      </div>

      {/* Content & resizers */}
      <div className="relative w-full h-[calc(100%-52px)] overflow-auto bg-white text-[13px] leading-relaxed">
        {children}

        {RESIZABLE && (<>{/* Edge handles */}
        <div onMouseDown={startResize("n")} className="absolute top-0 left-2 right-2 h-1.5 cursor-n-resize" />
        <div onMouseDown={startResize("s")} className="absolute bottom-0 left-2 right-2 h-1.5 cursor-s-resize" />
        <div onMouseDown={startResize("e")} className="absolute top-2 bottom-2 right-0 w-1.5 cursor-e-resize" />
        <div onMouseDown={startResize("w")} className="absolute top-2 bottom-2 left-0 w-1.5 cursor-w-resize" />
        {/* Corner handles */}
        <div onMouseDown={startResize("ne")} className="absolute -top-0.5 -right-0.5 w-3 h-3 cursor-ne-resize" />
        <div onMouseDown={startResize("nw")} className="absolute -top-0.5 -left-0.5 w-3 h-3 cursor-nw-resize" />
        <div onMouseDown={startResize("se")} className="absolute -bottom-0.5 -right-0.5 w-3 h-3 cursor-se-resize" />
        <div onMouseDown={startResize("sw")} className="absolute -bottom-0.5 -left-0.5 w-3 h-3 cursor-sw-resize" />
        </>)}
      </div>
    </div>
  );
}

function SidebarIcon({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 font-mono"
    >
      <div className="w-14 h-14 rounded-md bg-white/30 border border-white/40" />
      <div className="text-white/90 text-xs">{label}</div>
    </button>
  );
}

export default function App() {
  const [open, setOpen] = useState({ profile: true, experience: true, paint: true });

  // positions per window
  const [positions, setPositions] = useState({ ...DEFAULT_POSITIONS });
  const setPos = (id, p) => setPositions((cur) => ({ ...cur, [id]: { ...cur[id], ...p } }));

  // sizes per window
  const [sizes, setSizes] = useState({ ...DEFAULT_SIZES });
  const setSize = (id, s) => setSizes((cur) => ({ ...cur, [id]: { ...cur[id], ...s } }));

  // keep a ref of sizes for consistent resize math
  const sizesRef = useRef(sizes);
  useEffect(() => { sizesRef.current = sizes; }, [sizes]);

  // bring-to-front ordering
  const [order, setOrder] = useState(["profile", "paint", "experience"]);
  const zIndexMap = useMemo(() => {
    const base = 10;
    return order.reduce((acc, id, i) => ({ ...acc, [id]: base + i }), {});
  }, [order]);

  const focus = (id) => setOrder((cur) => [...cur.filter((x) => x !== id), id]);
  const close = (id) => setOpen((o) => ({ ...o, [id]: false }));
  const reopen = (id) => { setOpen((o) => ({ ...o, [id]: true })); focus(id); };

  // One-time layout: place "paint" to the right of "profile" on mount
  useEffect(() => {
    const gutter = 24;
    const vw = window.innerWidth || 1440;
    setPositions((prev) => {
      const desiredX = prev.profile.x + sizesRef.current.profile.w + gutter + 20;
      const maxX = Math.max(0, vw - sizesRef.current.paint.w - gutter);
      const x = Math.min(desiredX, maxX);
      return { ...prev, paint: { x, y: prev.profile.y } };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Responsive behavior: cap sizes & clamp positions when viewport changes
  useEffect(() => {
    function computeCappedSize(id, s, vw, vh) {
      // Leave some breathing room around windows so borders/handles remain visible
      const padX = 200; // total horizontal padding
      const padY = 180; // total vertical padding
      const maxW = Math.max(MIN_SIZES[id].w, vw - padX);
      const maxH = Math.max(MIN_SIZES[id].h, vh - padY);
      return { w: Math.min(s.w, maxW), h: Math.min(s.h, maxH) };
    }

    function onResize() {
      const vw = window.innerWidth || 1440;
      const vh = window.innerHeight || 900;

      // First, cap sizes so they don't exceed viewport
      setSizes((prev) => {
        const next = { ...prev };
        for (const id of Object.keys(prev)) {
          next[id] = computeCappedSize(id, prev[id], vw, vh);
        }
        return next;
      });

      // Then, clamp positions so windows stay fully visible
      setPositions((prev) => {
        const next = { ...prev };
        for (const id of Object.keys(prev)) {
          const s = computeCappedSize(id, sizesRef.current[id], vw, vh);
          const maxX = Math.max(0, vw - s.w);
          const maxY = Math.max(0, vh - s.h);
          next[id] = {
            x: clamp(prev[id].x, 0, maxX),
            y: clamp(prev[id].y, 0, maxY),
          };
        }
        return next;
      });
    }

    // Run once and subscribe
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="w-screen h-screen relative overflow-hidden font-mono text-sm">
      {/* Desktop gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#bde0fe] via-[#cdb4db] to-[#ffc8dd]" />
      <div className="absolute inset-0 p-6 grid grid-cols-[120px_1fr_120px] gap-4">
        {/* Sidebar */}
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

        {/* Main area */}
        <div className="relative">
          {/* PROFILE WINDOW */}
          <RetroWindow
            id="profile"
            title="Sarah's Profile • Internet"
            isOpen={open.profile}
            onClose={() => close("profile")}
            onFocus={focus}
            z={zIndexMap.profile || 10}
            pos={positions.profile}
            setPos={setPos}
            size={sizes.profile}
            setSize={setSize}
            minSize={MIN_SIZES.profile}
          >
            <div className="grid grid-cols-[1.2fr_1fr] h-full">
              <div className="p-6">
                <div className="text-2xl font-bold">Sarah Shakim</div>
                <div className="mt-2 text-black/70 space-y-1 text-sm">
                  <div>📞 (647) 772 – 7216</div>
                  <div>✉️ sarahshakim@gmail.com</div>
                  <div>📍 Toronto, ON</div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-extrabold underline decoration-[#6c5ce7]">SKILLS</h3>
                  <div className="grid grid-cols-5 gap-3 mt-3 text-xs">
                    {["Angular","React","HTML5","CSS3","JavaScript","Flask","XML","TypeScript","Python","C#","Rust","SQL","MATLAB","Powershell","NodeJS","VS Code","Linux","Git","npm","GitHub","PowerBI","ASP.NET"].map((s) => (
                      <div key={s} className="px-2 py-1 rounded border text-center bg-white">{s}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-l bg-[#fff7f0]">
                <h3 className="text-lg font-bold text-[#0ea5e9]">EDUCATION</h3>
                <div className="mt-3 leading-relaxed">
                  <div className="font-semibold">University of Waterloo</div>
                  <div>BASc, Computer Engineering</div>
                  <div>2020 – 2025</div>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold">About me</h4>
                  <p className="text-black/70 mt-1">
                    I love building playful, performant UIs and exploring ML/analytics.
                    This site mimics a cozy retro desktop—click icons on the left to reopen any windows you close.
                  </p>
                </div>
              </div>
            </div>
          </RetroWindow>

          {/* EXPERIENCE WINDOW */}
          <RetroWindow
            id="experience"
            title="Sarah's Profile • Internet"
            isOpen={open.experience}
            onClose={() => close("experience")}
            onFocus={focus}
            z={zIndexMap.experience || 11}
            pos={positions.experience}
            setPos={setPos}
            size={sizes.experience}
            setSize={setSize}
            minSize={MIN_SIZES.experience}
          >
            <div className="h-full grid grid-cols-[320px_1fr]">
              <div className="p-5 bg-[#eafaf1] border-r">
                <div className="bg-white/70 p-4 rounded-lg border">
                  <h3 className="text-xl font-extrabold">Hobbies & Interests</h3>
                  <ul className="list-disc ml-5 mt-3 space-y-1">
                    <li>Avid Gamer</li>
                    <li>Hackathons</li>
                    <li>Experimenting with new tech</li>
                    <li>Baking</li>
                  </ul>
                </div>
                <div className="bg-white/70 p-4 rounded-lg border mt-6">
                  <h3 className="text-xl font-extrabold">Relevant Courses</h3>
                  <ul className="list-disc ml-5 mt-3 space-y-1">
                    <li>Data structures & algorithms</li>
                    <li>Programming for performance</li>
                    <li>Linear algebra</li>
                    <li>Electronic circuits</li>
                    <li>Numerical Methods</li>
                    <li>Linear Circuits</li>
                  </ul>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-extrabold text-[#6c5ce7] underline">WORK EXPERIENCE</h2>
                {/* {[1,2].map((i) => ( */}
                  <div className="mt-6">
                    <a className="text-lg font-semibold text-[#6c5ce7]" href="#">Software System Designer</a>
                    <div className="text-base text-black/60 font-mono">AMD [June 2024 - Present]</div>
                    {/* <div className="mt-2 text-sm font-semibold">Python | React | TensorFlow | JavaScript | Angular | Neural Networks | PowerBI</div> */}
                    <ul className="list-disc ml-5 text-sm text-black/80 mt-2 space-y-1">
                      <li>Built an AI-driven test case validation app in Python leveraging OpenAI, enabling automated detection of amibiguous test steps and reducing delivery cycle time by 25%</li>
                      <li>Designed scalable data pipelines and dashboards using SQL and PowerBI that provided actionable insights across teams, including an AI adoption tracker now used company-wide by leadership</li>
                      <li>Architected and executed the migration from SQL Server to Snowflake, achieving 80% faster query performance and enabling scalable, cloud-native analytics and reporting</li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <a className="text-lg font-semibold text-[#6c5ce7]" href="#">Machine Learning / Data Analytics Specialist</a>
                    <div className="text-base text-black/60 font-mono">AMD [May 2023 - Aug 2023]</div>
                    {/* <div className="mt-2 text-sm font-semibold">Python | React | TensorFlow | JavaScript | Angular | Neural Networks | PowerBI</div> */}
                    <ul className="list-disc ml-5 text-sm text-black/80 mt-2 space-y-1">
                      <li>Developed a Python NLP model leveraging semantic embeddings and cosine similarity to identify similar projects from textual descriptions, improving cross-team visibility and knowledge sharing</li>
                      <li>Engineered a dynamic Angular front-end for a company-wide AI Portal, centralizing access to course materials, Q&A, and AI events for improved user engament</li>
                      <li>Unified release data into an interactive PowerBI report, accelerating the executive decision-making process by an average of 25%</li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <a className="text-lg font-semibold text-[#6c5ce7]" href="#">Software Developer Analyst</a>
                    <div className="text-base text-black/60 font-mono">BMO [Jan 2023 - Apr 2023]</div>
                    {/* <div className="mt-2 text-sm font-semibold">Python | React | TensorFlow | JavaScript | Angular | Neural Networks | PowerBI</div> */}
                    <ul className="list-disc ml-5 text-sm text-black/80 mt-2 space-y-1">
                      <li>Revamped existing React app using Redux to track overtime hours worked, enabling resource balancing for 3,000+ employees</li>
                      <li>Automated financial trend reporting in PowerBI, boosting efficiency by 40% which improved productivity, user experience, and simplified processes accross the financial department</li>
                      <li>Delivered technical support and business analysis the Business & Clients Analytics team, enabling data driven models and insights that guided critical strategic decisions</li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <a className="text-lg font-semibold text-[#6c5ce7]" href="#">Web Developer</a>
                    <div className="text-base text-black/60 font-mono">AMD [Sept 2021 - Apr 2022]</div>
                    {/* <div className="mt-2 text-sm font-semibold">Python | React | TensorFlow | JavaScript | Angular | Neural Networks | PowerBI</div> */}
                    <ul className="list-disc ml-5 text-sm text-black/80 mt-2 space-y-1">
                      <li>Engineered an automated ticketing app with JavaScript, React, and C#, enabling self-sevice defect categorization and reducing manual effort by 98%</li>
                      <li>Built a modular Python library with OOP to automate the ingestion, cleansing and storage of web server logs into a SQL relational database, supporting large-scale trend detection and analytics</li>
                      <li>Developed a Python/Flask validation tool to process CSV inputs, detect errors and render results in an interactive UI, decreasing validation time by 94%</li>
                    </ul>
                  </div>
                {/* ))} */}
              </div>
            </div>
          </RetroWindow>

          {/* PAINT WINDOW */}
          <RetroWindow
            id="paint"
            title="Profile pic • paint"
            isOpen={open.paint}
            onClose={() => close("paint")}
            onFocus={focus}
            z={zIndexMap.paint || 12}
            pos={positions.paint}
            setPos={setPos}
            size={sizes.paint}
            setSize={setSize}
            minSize={MIN_SIZES.paint}
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
                <div className="w-72 h-80 bg-gradient-to-b from-[#fff] to-[#f0f0f0] border grid place-items-center">
                  <img src={profilePic} alt="Profile" className="w-72 h-79 object-cover border" />
                </div>
                <div className="absolute bottom-2 left-0 right-0 mx-3 h-8 bg-white border grid grid-cols-14 gap-1 px-2 items-center">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="h-5 border" />
                  ))}
                </div>
              </div>
            </div>
          </RetroWindow>
        </div>

        <div />
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 text-xs bg-white/70 rounded shadow font-mono">
        Tip: Drag by the top bar. Click × to close; use the left icons to reopen.
      </div>
    </div>
  );
}
