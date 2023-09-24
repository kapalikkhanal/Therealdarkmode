import React, { useState, useEffect } from 'react';

function BlackOverlay() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Update the text position based on the cursor position
    const updateTextPosition = () => {
      const newX = cursorPosition.x + 30; // Adjust the horizontal offset as needed
      const newY = cursorPosition.y - 10; // Adjust the vertical offset as needed
      setTextPosition({ x: newX, y: newY });
    };

    // Call the updateTextPosition function on initial load and every 50ms
    updateTextPosition();
    const intervalId = setInterval(updateTextPosition, 50);

    return () => {
      clearInterval(intervalId);
    };
  }, [cursorPosition]);

  const overlayStyle = {
    // Use cursorPosition to set the transparent circle centered at the cursor
    background: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, transparent 0%, transparent 10%, rgba(0, 0, 0, 1) 11%)`,
  };

  const textOverlayStyle = {
    // Position the text using textPosition
    position: 'fixed',
    top: `${textPosition.y}px`,
    left: `${textPosition.x}px`,
    color: 'white',
    fontSize: '24px', // Adjust the font size as needed
    transition: 'top 0.5s ease-out, left 0.5s ease-out', // Add a smooth transition
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-[#000000cc] pointer-events-none" style={overlayStyle}></div>
      
      {/* Add a div for the "TRDM" text with a mask */}
      <div className="fixed" style={textOverlayStyle}>
        <div style={{ maskImage: overlayStyle.background }}>
          The Real Dark Mode
        </div>
      </div>
    </>
  );
}

export default BlackOverlay;
