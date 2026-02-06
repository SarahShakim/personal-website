import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Education() {
    return (
        <div className="bg-[#91EEC9] p-4 flex flex-col justify-center w-[300px] h-[205px]">
                <div className="text-3xl font-extrabold text-[#6c5ce7] underline decoration-4">
                    EDUCATION
                </div>

            <div className="mt-4 grid grid-cols-[72px_1fr] gap-5 items-start">
                {/* year badge */}
                <div className="bg-[#f7c2a7] h-28 grid place-items-center">
                    <div className="flex flex-col items-center font-extrabold text-3xl leading-none text-black">
                        <span>20</span><span>24</span>
                    </div>
                </div>

                {/* degree + school */}
                <div>
                    <div className="mt-1 font-extrabold text-sm sm:text-base leading-tight">University of<br/>Waterloo</div>
                    <div className="mt-5 font-extrabold text-sm sm:text-base leading-tight">Bachelor's of<br/>Applied Science</div>
                </div>
            </div>
        </div>
    );
}