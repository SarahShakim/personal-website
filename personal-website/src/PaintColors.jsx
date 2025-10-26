import React from "react";

export default function PaintColors() {
    const colors = [
        "#000000ff", "#585858ff", "#5c0101ff", "#535c01ff",
        "#006100ff", "#020079ff", "#53005eff", "#969900ff",
        "#003010ff", "#39a1e6ff", "#007767ff", "#30227eff",
        "#664b00ff", "#9B5DE5", "#ffffffff", "#c5c5c5ff", "#c50000ff", 
        "#fffb28ff", "#00f715ff", "#00f7ebff", "#0019f7ff", "#ce00f7ff", 
        "#fffd96ff", "#96ff9fff", "#7bf6ffff", "#cea3ffff", "#f70090ff", 
        "#f79400ff"
    ];

    const rows = [colors.slice(0, 14), colors.slice(14)];

    return (
        <div className="absolute bottom-2 left-0 right-0 mx-3 h-14 bg-[#c0c0c07a] border grid grid-rows-2 grid-cols-14 gap-1 px-2 py-1 items-center">
            {rows.flat().map((color, i) => (
                <div
                    key={i}
                    className="h-5 border"
                    style={{ backgroundColor: color }}
                />
            ))}
        </div>
    );
}