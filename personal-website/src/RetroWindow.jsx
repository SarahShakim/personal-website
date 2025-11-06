import React, { useEffect, useRef } from "react";

export default function RetroWindow({
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
    hasToolbar
}) {

    const dragRef = useRef({ dragging: false, startX: 0, startY: 0, baseX: 0, baseY: 0, lastDx: 0, lastDy: 0 });
    const windowRef = useRef(null);
    const rafRef = useRef(0);

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
                d.lastDx = (e.clientX - d.startX);
                d.lastDy = (e.clientY - d.startY);
                if (!rafRef.current) {
                    rafRef.current = requestAnimationFrame(() => {
                        rafRef.current = 0;
                        const el = windowRef.current;
                        if (!el) return;
                        el.style.willChange = 'transform';
                        el.style.transform = `translate3d(${d.lastDx}px, ${d.lastDy}px, 0)`;
                    });
                }
                return;
            }

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
            const wasDragging = dragRef.current.dragging;
            dragRef.current.dragging = false;
            resizeRef.current.resizing = false;

            if (wasDragging) {
                const d = dragRef.current;
                const finalX = d.baseX + d.lastDx;
                const finalY = d.baseY + d.lastDy;
                const el = windowRef.current;
                if (el) {
                    el.style.transform = '';
                    el.style.willChange = '';
                }
                if (rafRef.current) {
                    cancelAnimationFrame(rafRef.current);
                    rafRef.current = 0;
                }
                setPos(id, { x: finalX, y: finalY });
            }
        }

        document.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerup", onUp, { passive: true });
        document.addEventListener("pointercancel", onUp, { passive: true });
        return () => {
            document.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerup", onUp);
            document.removeEventListener("pointercancel", onUp);
        };
    }, [id, setPos, setSize, minSize.w, minSize.h]);

    if (!isOpen) return null;

    const startDrag = (e) => {
        if (e.cancelable) e.preventDefault();
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        if (e.isPrimary === false) return;
        onFocus(id);
        if (e.currentTarget?.setPointerCapture && e.pointerId != null) {
            try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
        }
        dragRef.current = {
            dragging: true,
            startX: e.clientX,
            startY: e.clientY,
            baseX: pos.x,
            baseY: pos.y,
            lastDx: 0,
            lastDy: 0,
        };
    };

    return (
        <div
            role="dialog"
            aria-label={title}
            onPointerDown={() => onFocus(id)}
            className="absolute shadow-2xl border border-black/40 bg-[#EDEDED] rounded-sm overflow-hidden select-none font-mono"
            ref={windowRef}
            style={{ zIndex: z, width: size.w, height: size.h, left: pos.x, top: pos.y }}
        >
            {/* Make the window body a column flex container */}
            <div className="flex h-full flex-col">
                {/* Title bar (drag handle) */}
                <div
                    className="flex items-center justify-between px-3 py-1 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] text-white text-sm cursor-move font-bold tracking-wider shrink-0 touch-none select-none"
                    onPointerDown={startDrag}
                >
                    <div className="font-semibold tracking-wide">
                        {title}
                    </div>
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

                {/* Toolbar (optional) */}
                {hasToolbar && (
                    <div className="flex items-center gap-2 px-2 py-1 bg-white/70 border-b border-black/10 text-[12px] shrink-0">
                        <div className="text-[11px] ml-2 text-black/70">Address:</div>
                        <div className="text-[11px] bg-white border border-black/20 rounded px-2 py-0.5 w-80 truncate">
                            www.about-me.com
                        </div>
                    </div>
                )}

                {/* Content & resizers */}
                <div className="relative flex-1 min-h-0 overflow-auto bg-white text-[13px] leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}
