import React, { useEffect, useMemo, useRef, useState } from "react";

export default function ApplicationIcon({ label, onClick, icon }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 font-mono"
        >
            <div className="w-20 h-20 flex items-center justify-center">
                {icon && (
                <img
                    src={icon}
                    alt={label}
                    className="w-20 h-20 object-contain"
                    style={{ background: "transparent" }}
                />
                )}
            </div>
            <div className="text-white/90 text-sm">{label}</div>
        </button>
    );
}