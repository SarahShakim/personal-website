import React, { useEffect, useMemo, useRef, useState } from "react";
import Contact from "./Contact";
import AboutMe from "./AboutMe";
import Education from "./Education";

export default function Bio() {
    return (
        <div className="bg-[#f7c2a7] p-6">
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.1fr_1fr] gap-6">
                <Contact />
                <AboutMe />
                <div className="flex items-center justify-center">
                    <Education />
                </div>
            </div>
        </div>
    );
}