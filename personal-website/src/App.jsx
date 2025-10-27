import React, { useEffect, useMemo, useRef, useState } from "react";
import profilePic from "./assets/SHA_3678.JPG";
import RetroWindow from "./RetroWindow";
import TipBar from "./TipBar";
import PersonalCards from "./PersonalCards";
import WorkExperience from "./WorkExperience";
import PaintIcons from "./PaintIcons";
import PaintColors from "./PaintColors";
import Skills from "./Skills";
import Contact from "./Contact";
import AboutMe from "./AboutMe";
import Education from "./Education";
import DesktopApplications from "./DesktopApplicatons";
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
    profile: { w: 1000, h: 700 },
    paint: { w: 500, h: 520 },
};

const MIN_SIZES = {
    profile: { w: 520, h: 320 },
    paint: { w: 480, h: 320 },
};

const DEFAULT_POSITIONS = {
    profile: { x: 40, y: 120 },
    paint: { x: 540, y: 100 }, // will be moved to the right of profile on mount
};
// --------------------------------------------------------

// Helper to clamp numbers
function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
}

export default function App() {
    const [open, setOpen] = useState({ profile: true, paint: true });

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
    const [order, setOrder] = useState(["profile", "paint"]);
    const zIndexMap = useMemo(() => {
        const base = 10;
        return order.reduce((acc, id, i) => ({ ...acc, [id]: base + i }), {});
    }, [order]);

    const focus = (id) => setOrder((cur) => [...cur.filter((x) => x !== id), id]);
    const close = (id) => setOpen((o) => ({ ...o, [id]: false }));
    const reopen = (id) => { setOpen((o) => ({ ...o, [id]: true })); focus(id); };

    const hobbies = [
        "Avid Gamer", 
        "Hackathons", 
        "Experimenting with new tech", 
        "Baking"
    ]

    const relevantCourses = [
        "Data structures & algorithms",
        "Programming for performance",
        "Linear algebra",
        "Electronic circuits",
        "Numerical Methods",
        "Linear Circuits"
    ]
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
                <DesktopApplications />

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
                        hasToolbar={true}
                    >
                        <div className="h-full flex flex-col bg-white">
                            {/* ORANGE STRIP */}
                            <div className="bg-[#f7c2a7]">
                                <div className="grid grid-cols-[0.8fr_1.1fr_1fr] gap-6 p-6">
                                    <Contact />
                                    <AboutMe />
                                    <Education />
                                </div>
                            </div>

                            <Skills />

                            <div className="h-full grid grid-cols-[320px_1fr] mt-4">
                                <div className="p-5 bg-[#eafaf1] border-r border-t">
                                    <PersonalCards title="Hobbies & Interests" listItems={hobbies}/>
                                    <PersonalCards title="Relevant Courses" listItems={relevantCourses} additionalCard={true}/>
                                </div>

                                <WorkExperience />
                        
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
                    hasToolbar={false}
                >
                    <div className="h-full grid grid-cols-[100px_1fr]">
                        <PaintIcons />
                        <div className="relative bg-[#c0c0c07a] grid place-items-center">
                            <div className="w-72 h-90 mb-15 bg-gradient-to-b from-[#fff] to-[#f0f0f0] border grid place-items-center">
                                <img src={profilePic} alt="Profile" className="w-72 h-90 object-cover border" />
                            </div>
                            <PaintColors />
                        </div>
                    </div>
                </RetroWindow>
                </div>

                <div />
            </div>

            <TipBar />
        </div>
    );
}