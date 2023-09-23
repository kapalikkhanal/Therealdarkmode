import React, { useState, useEffect } from 'react';

function BlackOverlay() {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const overlayStyle = {
        // Use cursorPosition to set the transparent circle centered at the cursor
        background: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, transparent 0%, transparent 10%, rgba(0, 0, 0, 1) 11%)`,
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-[#000000cc] pointer-events-none" style={overlayStyle}>

            </div>

        </>
    );
}
export default BlackOverlay;
