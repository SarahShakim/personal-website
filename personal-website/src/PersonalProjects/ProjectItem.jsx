import React, { useEffect, useMemo, useRef, useState } from "react";
import KnocKnockImg from "../assets/projects/knock.png"
import KeyboardImg from "../assets/projects/hands-free-keyboard.png"
import ThirdEyeImg from "../assets/projects/thirdeye.png"

export default function ProjectItem() {
    const projects = [
        {
            name: "ThirdEye",
            url: "https://github.com/SarahShakim/ThirdEye", 
            icon: ThirdEyeImg
        }, 
        {
            name: "Hands-Free-Keyboard", 
            url: "https://github.com/SarahShakim/Hands-Free-Keyboard", 
            icon: KeyboardImg
        },
        {
            name: "KnocKnock", 
            url: "https://github.com/SarahShakim/KnocKnock", 
            icon: KnocKnockImg
        }
    ]

    return (
        <div className="p-4 flex flex-wrap gap-4">
            {projects.map((project, i) => (
                <a
                    key={i}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-20 flex-col items-center gap-2"
                >
                    <div className="w-20 h-20 bg-black grid place-items-center">
                    <img
                        src={project.icon}
                        alt="Python"
                        className="w-20 h-20"
                    />
                    </div>
                    <span className="text-center break-words text-[13px] text-black/70">{project.name}</span>
                </a>
            ))}
        </div>
    );
}