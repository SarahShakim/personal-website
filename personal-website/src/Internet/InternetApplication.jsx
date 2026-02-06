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
        "Baking",
        "Crocheting"
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
            <div className="h-full grid grid-cols-1 xl:grid-cols-[320px_1fr] mt-4">
                <div className="order-2 xl:order-1 p-5 bg-[#eafaf1] xl:border-r border-t">
                    <PersonalCards title="Hobbies & Interests" listItems={hobbies} />
                    <PersonalCards title="Relevant Courses" listItems={relevantCourses} additionalCard={true} />
                </div>
                <div className="order-1 xl:order-2">
                    <WorkExperience />
                </div>
            </div>
        </div>
    );
}