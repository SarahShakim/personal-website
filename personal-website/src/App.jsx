import React, { useEffect, useMemo, useRef, useState } from "react";
import profilePic from "./assets/SHA_3678.JPG";
import starIcon from "./assets/ms_paint_icons/ms_paint_star.png";
import dottedRectangleIcon from "./assets/ms_paint_icons/ms_paint_dotted_rectangle.png";
import bluePencilIcon from "./assets/ms_paint_icons/ms_paint_blue_pencil.png";
import eraserIcon from "./assets/ms_paint_icons/ms_paint_eraser.png"
import bucketIcon from "./assets/ms_paint_icons/ms_paint_bucket.png"
import eyeDropperIcon from "./assets/ms_paint_icons/ms_paint_eyedropper.png"
import magnifyingGlassIcon from "./assets/ms_paint_icons/ms_paint_magnifying_glass.png"
import yellowPencilIcon from "./assets/ms_paint_icons/ms_paint_yellow_pencil.png"
import brushIcon from "./assets/ms_paint_icons/ms_paint_brush.png"
import letterIcon from "./assets/ms_paint_icons/ms_paint_letter.png"
import lineIcon from "./assets/ms_paint_icons/ms_paint_line.png"
import curvedLineIcon from "./assets/ms_paint_icons/ms_paint_curved_line.png"
import rectangleIcon from "./assets/ms_paint_icons/ms_paint_rectangle.png"
import polygonIcon from "./assets/ms_paint_icons/ms_paint_polygon.png"
import ovalIcon from "./assets/ms_paint_icons/ms_paint_oval.png"
import roundedRectangleIcon from "./assets/ms_paint_icons/ms_paint_rounded_rectangle.png"
import ApplicationIcon from "./ApplicationIcon";
import RetroWindow from "./RetroWindow";
import TipBar from "./TipBar";
import FileApp from "./assets/application_icons/file_app.png"
import WorldApp from "./assets/application_icons/world_app.png"
import ArcadeApp from "./assets/application_icons/arcade_app.png"
import ProfileApp from "./assets/application_icons/profile_app.png"
import PersonalCards from "./PersonalCards";
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
const ms_paint_icons = [
    starIcon,
    dottedRectangleIcon,
    eraserIcon,
    bucketIcon,
    eyeDropperIcon,
    magnifyingGlassIcon,
    yellowPencilIcon,
    brushIcon,
    bluePencilIcon,
    letterIcon,
    lineIcon,
    curvedLineIcon,
    rectangleIcon,
    polygonIcon,
    ovalIcon,
    roundedRectangleIcon
]

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

    const colors = [
        "#000000ff", "#585858ff", "#5c0101ff", "#535c01ff",
        "#006100ff", "#020079ff", "#53005eff", "#969900ff",
        "#003010ff", "#39a1e6ff", "#007767ff", "#30227eff",
        "#664b00ff", "#9B5DE5", "#ffffffff", "#c5c5c5ff", "#c50000ff", 
        "#fffb28ff", "#00f715ff", "#00f7ebff", "#0019f7ff", "#ce00f7ff", 
        "#fffd96ff", "#96ff9fff", "#7bf6ffff", "#cea3ffff", "#f70090ff", 
        "#f79400ff"
    ];

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
            {/* Sidebar */}
            <div className="flex flex-col justify-between items-center py-6">
            <div className="flex flex-col gap-6">
                <ApplicationIcon label="Projects" onClick={() => reopen("profile")} icon={FileApp}/>
                <ApplicationIcon label="Sarah's Profile" onClick={() => reopen("profile")} icon={WorldApp}/>
            </div>
            <div className="flex flex-col gap-6">
                <ApplicationIcon label="Sudoku" onClick={() => reopen("profile")} icon={ArcadeApp}/>
                <ApplicationIcon label="Profile pic" onClick={() => reopen("paint")} icon={ProfileApp} />
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
                hasToolbar={true}
            >
                <div className="h-full flex flex-col bg-white">
                {/* ORANGE STRIP */}
                <div className="bg-[#f7c2a7]">
                <div className="grid grid-cols-[0.8fr_1.1fr_1fr] gap-6 p-6">

                    {/* CONTACT (left) */}
                    <div className="bg-[#f7c2a7]">
                    <div className="text-3xl font-extrabold leading-none">Sarah<br/>Shakim</div>

                    <div className="mt-4 space-y-3 text-sm text-black">
                        <div className="flex items-center gap-3">
                        <span className="text-lg">📱</span>
                        <span>(647) 772 - 7216</span>
                        </div>
                        <div className="flex items-center gap-3">
                        <span className="text-lg">✉️</span>
                        <span>sarahshakim@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                        <span className="text-lg">📍</span>
                        <span>Toronto, ON</span>
                        </div>
                    </div>
                    </div>

                    {/* ABOUT (middle) */}
                    <div className="bg-[#f7c2a7]">
                    <p className="text-[13px] leading-6 text-black">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor erat et urna
                        rhoncus, sed venenatis lectus gravida. Sed dictum mi ex, id vestibulum orci lacinia eu.
                        Maecenas in est tortor. Pellentesque habitant morbi tristique senectus et netus.
                    </p>
                    </div>

                    {/* EDUCATION (right) */}
                    <div className="bg-[#eafaf1] border-2 border-[#72d79e] rounded-md p-4">
                    <div className="text-2xl font-extrabold text-[#6b21a8] underline decoration-4">
                        EDUCATION
                    </div>

                    <div className="mt-4 grid grid-cols-[72px_1fr] gap-4 items-start">
                        {/* year badge */}
                        <div className="bg-[#f7c2a7] border-2 border-[#f08e39] rounded-md h-28 grid place-items-center">
                        <div className="flex flex-col items-center font-extrabold text-3xl leading-none text-black">
                            <span>20</span><span>24</span>
                        </div>
                        </div>

                        {/* degree + school */}
                        <div>
                        <div className="font-extrabold">Bachelors of<br/>Engineering</div>
                        <div className="mt-3 font-extrabold">University of<br/>Waterloo</div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                {/* Bottom: SKILLS (full width) */}
                <div className="p-6 grow">
                <h3 className="text-3xl font-extrabold text-[#6c5ce7] underline decoration-4 mb-4">
                    SKILLS
                </h3>

                {/* Front end */}
                <div className="grid grid-cols-[110px_1fr] gap-4 mb-6 text-base">
                    <div className="text-[#6c5ce7] font-extrabold">Front-end:</div>
                    <div className="flex flex-wrap gap-x-8 gap-y-5">
                    <div className="flex items-center gap-2"><span>🅰️</span>Angular</div>
                    <div className="flex items-center gap-2"><span>⚛️</span>React</div>
                    <div className="flex items-center gap-2"><span>🔶</span>HTML5</div>
                    <div className="flex items-center gap-2"><span>🎨</span>CSS3</div>
                    <div className="flex items-center gap-2"><span>🟨</span>JavaScript</div>
                    <div className="flex items-center gap-2"><span>🐍</span>Flask</div>
                    <div className="flex items-center gap-2"><span>📄</span>XML</div>
                    <div className="flex items-center gap-2"><span>🟦</span>TypeScript</div>
                    </div>
                </div>

                {/* Back end */}
                <div className="grid grid-cols-[110px_1fr] gap-4 mb-6 text-base">
                    <div className="text-[#6c5ce7] font-extrabold">Backend:</div>
                    <div className="flex flex-wrap gap-x-8 gap-y-5">
                    <div className="flex items-center gap-2"><span>🐍</span>Python</div>
                    <div className="flex items-center gap-2"><span>♯</span>C#</div>
                    <div className="flex items-center gap-2"><span>🦀</span>Rust</div>
                    <div className="flex items-center gap-2"><span>🗃️</span>SQL</div>
                    <div className="flex items-center gap-2"><span>📊</span>MATLAB</div>
                    <div className="flex items-center gap-2"><span>💠</span>Powershell</div>
                    <div className="flex items-center gap-2"><span>🟩</span>NodeJS</div>
                    </div>
                </div>

                {/* Tools */}
                <div className="grid grid-cols-[110px_1fr] gap-4 text-base">
                    <div className="text-[#6c5ce7] font-extrabold">Tools:</div>
                    <div className="flex flex-wrap gap-x-8 gap-y-5">
                    <div className="flex items-center gap-2"><span>🧰</span>VS Code</div>
                    <div className="flex items-center gap-2"><span>🐧</span>Linux</div>
                    <div className="flex items-center gap-2"><span>🔺</span>Git</div>
                    <div className="flex items-center gap-2"><span>📦</span>npm</div>
                    <div className="flex items-center gap-2"><span>🐙</span>GitHub</div>
                    <div className="flex items-center gap-2"><span>📈</span>PowerBI</div>
                    <div className="flex items-center gap-2"><span>🟦</span>ASP.NET</div>
                    </div>
                </div>
                </div>

                <div className="h-full grid grid-cols-[320px_1fr] mt-4">
                <div className="p-5 bg-[#eafaf1] border-r border-t">
                    <PersonalCards title="Hobbies & Interests" listItems={hobbies}/>
                    <PersonalCards title="Relevant Courses" listItems={relevantCourses} additionalCard={true}/>
                </div>

                <div className="p-6 border-t">
                    <h2 className="text-2xl font-extrabold text-[#6c5ce7] underline">WORK EXPERIENCE</h2>
                    <div className="mt-6">
                        <a className="text-lg font-semibold text-[#6c5ce7]" href="#">Software System Designer</a>
                        <div className="text-base text-black/60 font-mono">AMD [June 2024 - Present]</div>
                        <ul className="list-disc ml-5 text-sm text-black/80 mt-2 space-y-1">
                        <li>Built an AI-driven test case validation app in Python leveraging OpenAI, enabling automated detection of amibiguous test steps and reducing delivery cycle time by 25%</li>
                        <li>Designed scalable data pipelines and dashboards using SQL and PowerBI that provided actionable insights across teams, including an AI adoption tracker now used company-wide by leadership</li>
                        <li>Architected and executed the migration from SQL Server to Snowflake, achieving 80% faster query performance and enabling scalable, cloud-native analytics and reporting</li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <a className="text-lg font-semibold text-[#6c5ce7]" href="#">Machine Learning / Data Analytics Specialist</a>
                        <div className="text-base text-black/60 font-mono">AMD [May 2023 - Aug 2023]</div>
                        <ul className="list-disc ml-5 text-sm text-black/80 mt-2 space-y-1">
                        <li>Developed a Python NLP model leveraging semantic embeddings and cosine similarity to identify similar projects from textual descriptions, improving cross-team visibility and knowledge sharing</li>
                        <li>Engineered a dynamic Angular front-end for a company-wide AI Portal, centralizing access to course materials, Q&A, and AI events for improved user engament</li>
                        <li>Unified release data into an interactive PowerBI report, accelerating the executive decision-making process by an average of 25%</li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <a className="text-lg font-semibold text-[#6c5ce7]" href="#">Software Developer Analyst</a>
                        <div className="text-base text-black/60 font-mono">BMO [Jan 2023 - Apr 2023]</div>
                        <ul className="list-disc ml-5 text-sm text-black/80 mt-2 space-y-1">
                        <li>Revamped existing React app using Redux to track overtime hours worked, enabling resource balancing for 3,000+ employees</li>
                        <li>Automated financial trend reporting in PowerBI, boosting efficiency by 40% which improved productivity, user experience, and simplified processes accross the financial department</li>
                        <li>Delivered technical support and business analysis the Business & Clients Analytics team, enabling data driven models and insights that guided critical strategic decisions</li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <a className="text-lg font-semibold text-[#6c5ce7]" href="#">Web Developer</a>
                        <div className="text-base text-black/60 font-mono">AMD [Sept 2021 - Apr 2022]</div>
                        <ul className="list-disc ml-5 text-sm text-black/80 mt-2 space-y-1">
                        <li>Engineered an automated ticketing app with JavaScript, React, and C#, enabling self-sevice defect categorization and reducing manual effort by 98%</li>
                        <li>Built a modular Python library with OOP to automate the ingestion, cleansing and storage of web server logs into a SQL relational database, supporting large-scale trend detection and analytics</li>
                        <li>Developed a Python/Flask validation tool to process CSV inputs, detect errors and render results in an interactive UI, decreasing validation time by 94%</li>
                        </ul>
                    </div>
                </div>
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
                <div className="p-3 bg-[#c0c0c07a] border-r">
                    <div className="grid grid-cols-2 gap-1">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="h-8 bg-white border flex items-center justify-center">
                            <img src={ms_paint_icons[i % ms_paint_icons.length]} alt={`icon-${i}`} className="h-7 w-8 object-contain"></img>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="relative bg-[#c0c0c07a] grid place-items-center">
                    <div className="w-72 h-90 mb-15 bg-gradient-to-b from-[#fff] to-[#f0f0f0] border grid place-items-center">
                    <img src={profilePic} alt="Profile" className="w-72 h-90 object-cover border" />
                    </div>
                    <div className="absolute bottom-2 left-0 right-0 mx-3 h-14 bg-[#c0c0c07a] border grid grid-cols-14 gap-1 px-2 items-center">
                    {Array.from({ length: 14 }).map((_, i) => (
                        <div 
                        key={i} 
                        className="h-5 border" 
                        style={{ backgroundColor: colors[i % colors.length] }}
                        />
                    ))}
                    {Array.from({ length: 14 }).map((_, i) => (
                        <div 
                        key={i} 
                        className="h-5 border" 
                        style={{ backgroundColor: colors[i % colors.length + 14] }}
                        />
                    ))}
                    </div>
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
