import React, { useEffect, useMemo, useRef, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import PaintColors from "./PaintColors";
import PaintIcons from "./PaintIcons";

export default function PaintApplication() {
    return (
        <div className="h-full grid grid-cols-[100px_1fr]">
            <PaintIcons />
            <div className="relative bg-[#c0c0c07a] grid place-items-center pb-[72px]">
                <ProfilePicture />
                <PaintColors />
            </div>
        </div>
    );
}