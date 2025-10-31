import React from "react";

export default function Contact() {
    return (
        <div className="bg-[#f7c2a7]">
            <div className="text-3xl font-extrabold leading-none">Sarah<br/>Shakim</div>

            <div className="mt-4 space-y-3 text-sm text-black">
                <div className="flex items-center gap-3">
                    <span className="text-lg">📱</span>
                    <span>(647) 772 - 7216</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-lg">✉️</span>
                    <span><a href="mailto:sarahshakim@gmail.com">sarahshakim@gmail.com</a></span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-lg">📍</span>
                    <span>Toronto, ON</span>
                </div>
            </div>
        </div>
    );
}