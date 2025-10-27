import React, { useEffect, useMemo, useRef, useState } from "react";
import Contact from "./Contact";
import AboutMe from "./AboutMe";
import Education from "./Education";

export default function BioSection() {
    return (
        <div className="bg-[#f7c2a7]">
            <div className="grid grid-cols-[0.8fr_1.1fr_1fr] gap-6 p-6">
                <Contact />
                <AboutMe />
                <Education />
            </div>
        </div>
    );
}