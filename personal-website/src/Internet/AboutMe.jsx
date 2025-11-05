import React, { useEffect, useMemo, useRef, useState } from "react";

export default function AboutMe() {
    return (
        <div className="bg-[#f7c2a7]">
            <p className="text-[13px] leading-6 text-black font-bold">
                I'm a Nanotechnology Engineer turned Software Engineer based in Toronto, passionate about building data-driven, future-proof applications that make a real impact.
                <br />
                <br />
                Currently, I work as a Software System Designer at AMD, where I design and develop applications, architect databases, and create AI-powered solutions that help senior leadership make informed decisions.
                <br />
                <br />
                Outside of work, you'll often find me gaming, hitting the gym, or exploring new adventures with friends and family.
            </p>
        </div>
    );
}