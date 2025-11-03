import React, { useEffect, useMemo, useRef, useState } from "react";
import RetroWindow from "./RetroWindow";
import TipBar from "./TipBar";
import InternetApplication from "./Internet/InternetApplication";
import PaintApplication from "./Paint/PaintApplication";
import FileApp from "./assets/application_icons/file_app.png"
import WorldApp from "./assets/application_icons/world_app.png"
import ArcadeApp from "./assets/application_icons/arcade_app.png"
import ProfileApp from "./assets/application_icons/profile_app.png"
import ApplicationIcon from "./ApplicationIcon";
import Sudoku from "./Sudoku/Sudoku";
import PersonalProjects from "./PersonalProjects/PersonalProjects";

const DEFAULT_SIZES = {
    profile: { w: 1000, h: 700 },
    paint: { w: 500, h: 520 },
    projects: { w: 700, h: 500 },
    sudoku: { w: 1347, h: 787 },
};

const MIN_SIZES = {
    profile: { w: 520, h: 320 },
    paint: { w: 480, h: 320 },
    projects: { w: 520, h: 320 },
    sudoku: { w: 560, h: 560 },
};

const DEFAULT_POSITIONS = {
    profile: { x: 40, y: 120 },
    paint: { x: 540, y: 100 }, // will be moved to the right of profile on mount
    projects: { x: 100, y: 120 }, 
    sudoku: { x: 205, y: 45 }
};

// Helper to clamp numbers
function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
}

export default function App() {
    const [open, setOpen] = useState({ profile: true, paint: true, projects: false, sudoku: false });

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
    const [order, setOrder] = useState(["profile", "paint", "projects", "sudoku"]);
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
            <div className="absolute inset-0 bg-gradient-to-b from-[#bde0fe] via-[#cdb4db] to-[#ffc8dd]" />
            <div className="absolute inset-0 p-6 grid grid-cols-[120px_1fr_120px] gap-4">
                <div className="flex flex-col justify-between items-center py-6">
                    <div className="flex flex-col gap-6">
                        <ApplicationIcon label="Projects" onClick={() => reopen("projects")} icon={FileApp}/>
                        <ApplicationIcon label="Sarah's Profile" onClick={() => reopen("profile")} icon={WorldApp}/>
                    </div>
                    <div className="flex flex-col gap-6">
                        <ApplicationIcon label="Sudoku" onClick={() => reopen("sudoku")} icon={ArcadeApp}/>
                        <ApplicationIcon label="Profile pic" onClick={() => reopen("paint")} icon={ProfileApp} />
                    </div>
                </div>
                <div className="relative">
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
                        <InternetApplication />
                    </RetroWindow>

                    <RetroWindow
                        id="paint"
                        title="Profile pic • Paint"
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
                        <PaintApplication />
                    </RetroWindow>

                    <RetroWindow
                        id="projects"
                        title="C:\Projects"
                        isOpen={open.projects}
                        onClose={() => close("projects")}
                        onFocus={focus}
                        z={zIndexMap.projects || 10}
                        pos={positions.projects}
                        setPos={setPos}
                        size={sizes.projects}
                        setSize={setSize}
                        minSize={MIN_SIZES.projects}
                        hasToolbar={false}
                    >   
                        <PersonalProjects />
                    </RetroWindow>

                    <RetroWindow
                        id="sudoku"
                        title="Sudoku • Arcade"
                        isOpen={open.sudoku}
                        onClose={() => close("sudoku")}
                        onFocus={focus}
                        z={zIndexMap.sudoku || 10}
                        pos={positions.sudoku}
                        setPos={setPos}
                        size={sizes.sudoku}
                        setSize={setSize}
                        minSize={MIN_SIZES.sudoku}
                        hasToolbar={false}
                    >
                        <Sudoku />
                    </RetroWindow>
                </div>
                <div />
            </div>
            <TipBar />
        </div>
    );
}