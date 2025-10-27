import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Education() {
    return (
        <div className="bg-[#eafaf1] border-2 border-[#72d79e] rounded-md p-4">
                <div className="text-2xl font-extrabold text-[#6b21a8] underline decoration-4">
                    EDUCATION
                </div>

            <div className="mt-4 grid grid-cols-[72px_1fr] gap-4 items-start">
                {/* year badge */}
                <div className="bg-[#f7c2a7] border-2 border-[#f08e39] rounded-md h-28 grid place-items-center">
                    <div className="flex flex-col items-center font-extrabold text-3xl leading-none text-black">
                        <span>20</span><span>24</span>
                    </div>
                </div>

                {/* degree + school */}
                <div>
                    <div className="font-extrabold">Bachelors of<br/>Engineering</div>
                    <div className="mt-3 font-extrabold">University of<br/>Waterloo</div>
                </div>
            </div>
        </div>
    );
}