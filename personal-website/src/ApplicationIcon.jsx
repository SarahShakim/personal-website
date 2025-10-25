import React, { useEffect, useMemo, useRef, useState } from "react";

export default function ApplicationIcon({ label, onClick }) {
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