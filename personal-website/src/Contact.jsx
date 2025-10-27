import React from "react";

export default function Contact() {
    const contactInfo = [
        {
            emoji: "📱", 
            value: "(647) 772 - 7216" 
        }, 
        {
            emoji: "✉️", 
            value: "sarahshakim@gmail.com" 
        }, 
        {
            emoji: "📍", 
            value: "Toronto, ON" 
        }
    ]

    return (
        <div className="bg-[#f7c2a7]">
            <div className="text-3xl font-extrabold leading-none">Sarah<br/>Shakim</div>

            <div className="mt-4 space-y-3 text-sm text-black">
                {contactInfo.map((info, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <span className="text-lg">{info.emoji}</span>
                        <span>{info.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}