import React, { useEffect, useMemo, useRef, useState } from "react";
import profilePic from "./assets/SHA_3678.JPG";

export default function ProfilePicture() {
    return (
        <div className="w-72 h-90 mb-15 bg-gradient-to-b from-[#fff] to-[#f0f0f0] border grid place-items-center">
            <img src={profilePic} alt="Profile" className="w-72 h-90 object-cover border" />
        </div>
    );
}