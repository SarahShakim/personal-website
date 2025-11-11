import React, { useEffect, useMemo, useRef, useState } from "react";
import AngularIcon from "../assets/skills/angular.png" 
import ReactIcon from "../assets/skills/react.png"
import Html5Icon from "../assets/skills/html5.png"
import CssIcon from "../assets/skills/css.png"
import JavaScriptIcon from "../assets/skills/javascript.png"
import PythonIcon from "../assets/skills/python.png"
import XmlIcon from "../assets/skills/xml.png"
import TypeScriptIcon from "../assets/skills/typescript.png"
import CSharpIcon from "../assets/skills/c-sharp.png"
import RustIcon from "../assets/skills/rust.png"
import SqlIcon from "../assets/skills/sql.svg"
import MatLabIcon from "../assets/skills/matlab.gif"
import PowershellIcon from "../assets/skills/powershell.png"
import NodeIcon from "../assets/skills/nodejs.png"
import VSCodeIcon from "../assets/skills/vscode.png"
import VisualStudioIcon from "../assets/skills/visual_studio.png"
import LinuxIcon from "../assets/skills/linux.png"
import GitIcon from "../assets/skills/git.png"
import NpmIcon from "../assets/skills/npm.png"
import GitHubIcon from "../assets/skills/github.png"
import PowerBIIcon from "../assets/skills/powerbi.png"
import NetIcon from "../assets/skills/net.png"
import FlaskIcon from "../assets/skills/flask.png"
import Snowflake from "../assets/skills/snowflake.png"
import JavaIcon from "../assets/skills/java.png"
import JiraIcon from "../assets/skills/jira.svg"
import SSMSIcon from "../assets/skills/ssms.jpg"
import AlationIcon from "../assets/skills/alation.png"

export default function Skills() {
    const allSkills = [
        {
            name: "Front-end", 
            skills: [
                {
                    icon: AngularIcon, 
                    name: "Angular"
                }, 
                {
                    icon: ReactIcon, 
                    name: "React"
                }, 
                {
                    icon: Html5Icon, 
                    name: "HTML5"
                }, 
                {
                    icon: CssIcon,
                    name: "CSS3"
                }, 
                {
                    icon: JavaScriptIcon,
                    name: "JavaScript"
                },
                {
                    icon: FlaskIcon, 
                    name: "Flask"
                }, 
                {
                    icon: XmlIcon, 
                    name: "XML"
                }, 
                {
                    icon: TypeScriptIcon, 
                    name: "TypeScript"
                }
            ]
            
        }, 
        {
            name: "Backend", 
            skills: [
                {
                    icon: PythonIcon, 
                    name: "Python"
                }, 
                {
                    icon: CSharpIcon, 
                    name: "C#"
                }, 
                {
                    icon: RustIcon, 
                    name: "Rust"
                }, 
                {
                    icon: SqlIcon, 
                    name: "SQL"
                }, 
                {
                    icon: MatLabIcon, 
                    name: "MATLAB"
                }, 
                {
                    icon: PowershellIcon, 
                    name: "PowerShell"
                }, 
                {
                    icon: NodeIcon, 
                    name: "Node.js"
                }, 
                {
                    icon: JavaIcon, 
                    name: "Java"
                },
                {
                    icon: NetIcon, 
                    name: ".Net"
                }
            ]
        }, 
        {
            name: "Tools", 
            skills: [
                {
                    icon: VSCodeIcon, 
                    name: "Visual Studio Code"
                }, 
                {
                    icon: VisualStudioIcon, 
                    name: "Visual Studio"
                }, 
                {
                    icon: LinuxIcon, 
                    name: "Linux"
                }, 
                {
                    icon: GitIcon, 
                    name: "Git"
                }, 
                {
                    icon: NpmIcon, 
                    name: "npm"
                }, 
                {
                    icon: GitHubIcon, 
                    name: "GitHub"
                }, 
                {
                    icon: PowerBIIcon, 
                    name: "Power BI"
                }, 
                {
                    icon: Snowflake,
                    name: "Snowflake"
                }, 
                {
                    icon: JiraIcon, 
                    name: "Jira"
                },
                {
                    icon: SSMSIcon, 
                    name: "SSMS"
                },
                {
                    icon: AlationIcon, 
                    name: "Alation"
                }
            ]
        }
    ]

    return (
        <div className="p-6 grow mb-0 pb-1 ">
            <h3 className="text-3xl font-extrabold text-[#6c5ce7] underline decoration-4 mb-4">
                SKILLS
            </h3>

            {allSkills.map((skillType, item) => (
                <div key={item} className="grid grid-cols-[110px_1fr] gap-4 mb-6 text-[16px]">
                    <div className="text-[#6c5ce7] font-extrabold">{skillType.name}:</div>
                    <div className="flex flex-wrap gap-x-8 gap-y-5">
                        {skillType.skills.map((skill, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <img src={skill.icon} className="w-4 h-4"/>
                                <span>{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}