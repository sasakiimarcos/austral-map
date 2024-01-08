import React, { useState } from 'react';

export default function Navbar() {
    const [showNav, setShowNav] = useState(true);

    return (
        <>
            {!showNav && (
                <button
                    className="bg-primary w-32 h-12 rounded-lg text-white"
                    onClick={() => setShowNav(true)}
                >
                    Open Navbar
                </button>
            )}
            {showNav && (
                <div className="w-48 bg-gray-200 h-screen py-10">
                    <button
                        className="bg-primary w-32 h-12 rounded-lg text-white"
                        onClick={() => setShowNav(false)}
                    >
                        Close Navbar
                    </button>
                    <h1>Dashboard</h1>
                    <h2>Menu item</h2>
                    <h2>Menu item</h2>
                    <h2>Menu item</h2>
                </div>
            )}
        </>
    );
}