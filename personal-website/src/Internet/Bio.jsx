import React, { useEffect, useMemo, useRef, useState } from "react";
import Contact from "./Contact";
import AboutMe from "./AboutMe";
import Education from "./Education";

export default function Bio() {
    return (
        <div className="bg-[#f7c2a7] p-6 about-container">
            <div className="grid gap-6 bio-grid">
                <Contact />
                <AboutMe />
                <div className="flex items-center justify-center ml-3">
                    <Education />
                </div>
            </div>
        </div>
    );
}
