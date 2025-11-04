import React, { useEffect, useMemo, useRef, useState } from "react";

export default function WorkItem({ workItems }) {
    return (
        <>
            {workItems.map((job, index) => (
                <div key={index} className="mt-6">
                    <a className="text-lg font-semibold text-[#6c5ce7]">{job.title}</a>
                    <div className="text-base text-black/60 font-mono">{job.company} [{job.timePeriod}]</div>
                    <ul className="list-disc ml-5 text-sm text-black/80 mt-2 space-y-4">
                        {job.points.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
}