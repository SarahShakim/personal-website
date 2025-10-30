import React, { useEffect, useMemo, useRef, useState } from "react";
import ApplicationIcon from "../ApplicationIcon";
import FileApp from "../assets/application_icons/file_app.png"
import WorldApp from "../assets/application_icons/world_app.png"
import ArcadeApp from "../assets/application_icons/arcade_app.png"
import ProfileApp from "../assets/application_icons/profile_app.png"

export default function DesktopApplications() {
    return (
        <div className="flex flex-col justify-between items-center py-6">
            <div className="flex flex-col gap-6">
                <ApplicationIcon label="Projects" onClick={() => reopen("profile")} icon={FileApp}/>
                <ApplicationIcon label="Sarah's Profile" onClick={() => reopen("profile")} icon={WorldApp}/>
            </div>
            <div className="flex flex-col gap-6">
                <ApplicationIcon label="Sudoku" onClick={() => reopen("profile")} icon={ArcadeApp}/>
                <ApplicationIcon label="Profile pic" onClick={() => reopen("paint")} icon={ProfileApp} />
            </div>
        </div>
        );
}