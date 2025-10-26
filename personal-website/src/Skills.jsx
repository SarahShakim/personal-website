import React, { useEffect, useMemo, useRef, useState } from "react";
import AngularIcon from "./assets/skills/angular.png"

export default function Skills() {
    return (
        <div className="p-6 grow">
            <h3 className="text-3xl font-extrabold text-[#6c5ce7] underline decoration-4 mb-4">
                SKILLS
            </h3>

            {/* Front end */}
            <div className="grid grid-cols-[110px_1fr] gap-4 mb-6 text-base">
                <div className="text-[#6c5ce7] font-extrabold">Front-end:</div>
                <div className="flex flex-wrap gap-x-8 gap-y-5">
                <div className="flex items-center gap-2">
                    <img src={AngularIcon} className="w-4 h-4"/>
                    <span>Angular</span>
                </div>
                <div className="flex items-center gap-2"><span>⚛️</span>React</div>
                <div className="flex items-center gap-2"><span>🔶</span>HTML5</div>
                <div className="flex items-center gap-2"><span>🎨</span>CSS3</div>
                <div className="flex items-center gap-2"><span>🟨</span>JavaScript</div>
                <div className="flex items-center gap-2"><span>🐍</span>Flask</div>
                <div className="flex items-center gap-2"><span>📄</span>XML</div>
                <div className="flex items-center gap-2"><span>🟦</span>TypeScript</div>
                </div>
            </div>

            {/* Back end */}
            <div className="grid grid-cols-[110px_1fr] gap-4 mb-6 text-base">
                <div className="text-[#6c5ce7] font-extrabold">Backend:</div>
                <div className="flex flex-wrap gap-x-8 gap-y-5">
                <div className="flex items-center gap-2"><span>🐍</span>Python</div>
                <div className="flex items-center gap-2"><span>♯</span>C#</div>
                <div className="flex items-center gap-2"><span>🦀</span>Rust</div>
                <div className="flex items-center gap-2"><span>🗃️</span>SQL</div>
                <div className="flex items-center gap-2"><span>📊</span>MATLAB</div>
                <div className="flex items-center gap-2"><span>💠</span>Powershell</div>
                <div className="flex items-center gap-2"><span>🟩</span>NodeJS</div>
                </div>
            </div>

            {/* Tools */}
            <div className="grid grid-cols-[110px_1fr] gap-4 text-base">
                <div className="text-[#6c5ce7] font-extrabold">Tools:</div>
                <div className="flex flex-wrap gap-x-8 gap-y-5">
                <div className="flex items-center gap-2"><span>🧰</span>VS Code</div>
                <div className="flex items-center gap-2"><span>🐧</span>Linux</div>
                <div className="flex items-center gap-2"><span>🔺</span>Git</div>
                <div className="flex items-center gap-2"><span>📦</span>npm</div>
                <div className="flex items-center gap-2"><span>🐙</span>GitHub</div>
                <div className="flex items-center gap-2"><span>📈</span>PowerBI</div>
                <div className="flex items-center gap-2"><span>🟦</span>ASP.NET</div>
                </div>
            </div>
        </div>
    );
}