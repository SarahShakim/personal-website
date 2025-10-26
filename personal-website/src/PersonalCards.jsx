import React, { useEffect, useMemo, useRef, useState } from "react";

export default function PersonalCards ({title, listItems, additionalCard = false}) {
    return (
        <div className={`bg-white/70 p-4 rounded-lg border ${additionalCard ? "mt-6" : ""}`}>
            <h3 className="text-xl font-extrabold">{title}</h3>
            <ul className="list-disc ml-5 mt-3 space-y-1">
                {listItems.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        </div>
    );
}