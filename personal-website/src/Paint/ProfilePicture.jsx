import React, { useEffect, useMemo, useRef, useState } from "react";
import profilePic from "../assets/SHA_3678.JPG";

export default function ProfilePicture() {
    return (
        <div className="flex items-center justify-center p-2 rounded-sm">
            <img
                src={profilePic}
                alt="Profile"
                className="w-full h-auto object-contain border max-w-[220px] md:max-w-[270px] border-2"
            />
        </div>
    );
}