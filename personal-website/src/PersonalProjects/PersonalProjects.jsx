import React, { useEffect, useMemo, useRef, useState } from "react";
import ProjectItem from "./ProjectItem";

export default function PersonalProjects() {
    return (
        <div className="h-full flex flex-col bg-white">
            <ProjectItem />
        </div>
    );
}