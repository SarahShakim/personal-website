import React, { useEffect, useMemo, useRef, useState } from "react";

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
    const RESIZABLE = false;
    
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
          {hasToolbar ?
            <div className="flex items-center gap-2 px-2 py-1 bg-white/70 border-b border-black/10 text-[12px]">
              <div className="text-[11px] ml-2 text-black/70">Address:</div>
              <div className="text-[11px] bg-white border border-black/20 rounded px-2 py-0.5 w-80 truncate">www.about-me.com</div>
            </div> : <div></div>
          }
    
          {/* Content & resizers */}
          <div className="relative w-full h-[calc(100%-28px)] overflow-auto bg-white text-[13px] leading-relaxed">
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