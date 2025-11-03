import React, { useEffect, useMemo, useRef, useState } from "react";
import pythonLogo from "../assets/skills/python.png"

export default function ProjectItem() {
    const projects = [
        {
            name: "ThirdEye",
            url: "https://github.com/SarahShakim/ThirdEye", 
            icon: pythonLogo
        }, 
        {
            name: "Hands-Free-Keyboard", 
            url: "https://github.com/SarahShakim/Hands-Free-Keyboard", 
            icon: pythonLogo
        },
        {
            name: "KnocKnock", 
            url: "https://github.com/SarahShakim/KnocKnock", 
            icon: pythonLogo
        }
    ]

    return (
        <div className="p-4">
            {projects.map((project, i) => (
                <a
                    key={i}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-col items-center gap-2"
                >
                    <div className="w-20 h-20 rounded-full bg-black grid place-items-center">
                    <img
                        src={project.icon}
                        alt="Python"
                        className="w-10 h-10"
                    />
                    </div>
                    <span className="text-[11px] text-black/70">{project.name}</span>
                </a>
            ))}
        </div>
    );
}