import React, { useEffect, useMemo, useRef, useState } from "react";
import PersonalCards from "./PersonalCards";
import Bio from "./Bio";
import Skills from "./Skills";
import WorkExperience from "./WorkExperience";

export default function InternetApplication() {
    const hobbies = [
        "Avid Gamer", 
        "Hackathons", 
        "Experimenting with new tech", 
        "Baking"
    ]

    const relevantCourses = [
        "Data structures & algorithms",
        "Programming for performance",
        "Linear algebra",
        "Electronic circuits",
        "Numerical Methods",
        "Linear Circuits"
    ]
    
    return (
        <div className="h-full flex flex-col bg-white">
            <Bio />
            <Skills />
            <div className="h-full grid grid-cols-[320px_1fr] mt-4">
                <div className="p-5 bg-[#eafaf1] border-r border-t">
                    <PersonalCards title="Hobbies & Interests" listItems={hobbies}/>
                    <PersonalCards title="Relevant Courses" listItems={relevantCourses} additionalCard={true}/>
                </div>
                <WorkExperience />
            </div>
        </div>
    );
}