import React, { useEffect, useMemo, useRef, useState } from "react";

export default function TipBar({}) {
    return (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 text-xs bg-white/70 rounded shadow font-mono">
            Tip: Drag by the top bar. Click × to close; use the left icons to reopen.
        </div>
    );
}