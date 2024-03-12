import React from 'react';
import { useState } from 'react';

// Define an object containing employee details
const employeeDetails = {
    "Email": "agarwaljay642@gmail.com",
    "Designation": "Software Engineer",
    "Level": "Senior",
    "Phone Number": "123-456-7890",
    "Tenure": "5 years",
};

// Reusable UI component to display each employee detail
const EmployeeDetailItem = ({ label, value }) => {
    const [copied, setCopied] = useState(false);
    const paddingSize = (employeeDetails["Email"].length) * 12; // Adjust this factor to fit the content

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000); // Reset copied state after 1 second
    };

    return (
        <div className="mb-2 rounded-lg border p-1 border-black  inline-block relative" onClick={handleCopy} style={{ minWidth: `${paddingSize}px`, textDecoration: 'none' }}>
            <div className="text-neutral-700 text-sm font-semibold">{label}</div>
            <div className="text-base">{value}</div>
            {!copied ? (
                <button className="absolute top-0 right-0 text-white p-1 rounded hover:bg-gray-700" onClick={handleCopy}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                    </svg>
                </button>
            ) : (
                <span className="absolute top-0 right-0 text-xs text-white mt-1">Copied!</span>
            )}
        </div>
    );
};

export default function EmployeeDetails() {
    return (
        <main className="mt-4" style={{ paddingLeft: '3vh' , marginTop: "4vh" }}>
            {/* Map over the object of employee details and render each detail using the EmployeeDetailItem component */}
            {Object.entries(employeeDetails).map(([label, value], index) => (
                <EmployeeDetailItem key={index} label={label} value={value} />
            ))}
        </main>
    );
}
