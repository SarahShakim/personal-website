import React, { useEffect, useMemo, useRef, useState } from "react";
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

export default function PaintIcons() {
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

    return (
        <div className="p-3 bg-[#c0c0c07a] border-r">
            <div className="grid grid-cols-2 gap-1">
                {ms_paint_icons.map((icon, i) => (
                    <div key={i} className="h-8 bg-white border flex items-center justify-center">
                        <img src={icon} alt={`icon-${icon}`} className="h-7 w-8 object-contain"></img>
                    </div>
                ))}
            </div>
        </div>
    );
}