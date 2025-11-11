import React from "react";

export default function Contact() {
    const linkedinUrl = 'https://www.linkedin.com/in/sarah-shakim/'
    const githubUrl = 'https://github.com/sarahshakim'
    const resumeHref = '/Sarah-Shakim-resume.pdf'
    return (
        <div className="bg-[#f7c2a7]">
            <div className="text-3xl font-extrabold leading-none">Sarah<br/>Shakim</div>

            <div className="mt-4 space-y-3 text-sm text-black">
                <div className="flex items-center gap-3">
                    <span className="text-lg">📍</span>
                    <span>Toronto, ON</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-lg">📱</span>
                    <span>(647) 772 - 7216</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-lg">✉️</span>
                    <span><a href="mailto:sarahshakim@gmail.com">sarahshakim@gmail.com</a></span>
                </div>
                <div className="flex items-center gap-3 ml-1">
                    <span className="w-5 h-5 rounded-sm bg-[#0A66C2] text-white font-bold text-xs grid place-items-center">in</span>
                    <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        sarah-shakim
                    </a>
                </div>
                <div className="flex items-center gap-3 ml-1">
                    <span className="w-5 h-5 rounded-sm bg-black grid place-items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-3.5 h-3.5 text-white"
                            aria-hidden="true"
                        >
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.806 1.305 3.49.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.335-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.005-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.804 5.624-5.476 5.92.43.372.823 1.104.823 2.226 0 1.606-.015 2.9-.015 3.293 0 .319.217.694.825.576C20.565 21.796 24 17.296 24 12c0-6.63-5.373-12-12-12z" />
                        </svg>
                    </span>
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {githubUrl.replace(/^https?:\/\//, '')}
                    </a>
                </div>
                <div className="flex items-center gap-3 ml-1">
                    <span className="w-5.5 h-5 rounded-sm bg-[#ffffff] grid place-items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-3.5 h-3.5 text-white"
                            aria-hidden="true"
                            fill="none"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="5" y="3" width="15" height="18" rx="2" ry="2" />
                            <line x1="8" y1="8" x2="16" y2="8" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                            <line x1="8" y1="16" x2="13.5" y2="16" />
                        </svg>
                    </span>
                    <a
                        href={resumeHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View resume as PDF"
                    >
                        Resume
                    </a>
                </div>
            </div>
        </div>
    );
}
