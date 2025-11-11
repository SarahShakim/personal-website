import { useState } from "react";

export default function Sudoku({ className = "" }) {
    const [loaded, setLoaded] = useState(false);
    const base = import.meta.env.BASE_URL;

    return (
        <div className={`relative w-full h-full ${className}`}>
        {!loaded && (
            <div className="absolute inset-0 grid place-items-center text-xs text-black/70 bg-white/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
                <div className="h-3 w-3 animate-pulse rounded-full bg-black/70" />
                <span>Loading Sudoku…</span>
            </div>
            </div>
        )}

        <iframe
            title="Sudoku"
            src={`${base}web/index.html`}
            className="w-full h-full border-0"
            allow="gamepad *; fullscreen"
            onLoad={() => setLoaded(true)}
        />
        <div className="flex">
            <span className="absolute left-2 top-2 text-[13px] px-2 py-1 font-bold">Note: This will only work on a PC</span>
            <a
                href={`https://github.com/SarahShakim/sudoku`}
                target="_blank"
                rel="noreferrer"
                className="absolute right-2 bottom-10 text-[11px] px-2 py-1 rounded border bg-white/80 hover:bg-white"
            >
                GitHub Repo
            </a>
            <a
                href={`${base}web/index.html`}
                target="_blank"
                rel="noreferrer"
                className="absolute right-2 bottom-2 text-[11px] px-2 py-1 rounded border bg-white/80 hover:bg-white"
            >
                Open in new tab
            </a>
        </div>
        </div>
    );
}
