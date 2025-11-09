import React, { useEffect, useMemo, useRef, useState } from "react";
import WorkItem from "./WorkItem";

export default function WorkExperience() {
    const workItems = [
        {
            title: "Software System Designer", 
            company: "AMD",
            timePeriod: "Jun 2024 - Present", 
            points: [
                "Built an AI-driven test case validation app in Python leveraging OpenAI, enabling automated detection of ambiguous test steps and reducing delivery cycle time by 25%", 
                "Designed scalable data pipelines and dashboards using SQL and PowerBI that provided actionable insights across teams, including an AI adoption tracker now used company-wide by leadership", 
                "Architected and executed the migration from SQL Server to Snowflake, achieving 80% faster query performance and enabling scalable, cloud-native analytics and reporting"
            ]
        },
        {
            title: "Machine Learning / Data Analytics Specialist", 
            company: "AMD", 
            timePeriod: "May 2023 - Aug 2023",
            points: [
                "Developed a Python NLP model leveraging semantic embeddings and cosine similarity to identify similar projects from textual descriptions, improving cross-team visibility and knowledge sharing",
                "Engineered a dynamic Angular front-end for a company-wide AI Portal, centralizing access to course materials, Q&A, and AI events for improved user engagement", 
                "Unified release data into an interactive PowerBI report, accelerating the executive decision-making process by an average of 25%"
            ]
        },
        {
            title: "Software Developer Analyst", 
            company: "BMO", 
            timePeriod: "Jan 2023 - Apr 2023", 
            points: [
                "Revamped existing React app using Redux to track overtime hours worked, enabling resource balancing for 3,000+ employees", 
                "Automated financial trend reporting in PowerBI, boosting efficiency by 40% which improved productivity, user experience, and simplified processes across the financial department", 
                "Delivered technical support and business analysis to the Business & Clients Analytics team, enabling data driven models and insights that guided critical strategic decisions"
            ]
        },
        {
            title: "Web Developer", 
            company: "AMD", 
            timePeriod: "Sept 2021 - Apr 2022", 
            points: [
                "Engineered an automated ticketing app with JavaScript, React, and C#, enabling self-service defect categorization and reducing manual effort by 98%",
                "Built a modular Python library with OOP to automate the ingestion, cleansing and storage of web server logs into a SQL relational database, supporting large-scale trend detection and analytics", 
                "Developed a Python/Flask validation tool to process CSV inputs, detect errors and render results in an interactive UI, decreasing validation time by 94%"
            ]
        }
    ]

    return (
        <div className="p-6 border-t">
            <h2 className="text-2xl font-extrabold text-[#6c5ce7] underline">WORK EXPERIENCE</h2>
            <WorkItem workItems={workItems} />
        </div>
    );
}