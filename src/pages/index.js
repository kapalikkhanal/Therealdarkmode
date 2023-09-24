import React, { useEffect, useState } from 'react';
import BlackOverlay from '@/components/Overlay';
import NavBar from '@/components/Navbar';
import MazeApp from './MazeApp';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the screen width is below a certain threshold (e.g., 768 pixels for common mobile devices)
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the threshold as needed
    };

    // Initial check when the component mounts
    checkIsMobile();

    // Add a resize event listener to update the isMobile state if the screen size changes
    window.addEventListener('resize', checkIsMobile);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  useEffect(() => {
    // Add an event listener to disable the context menu on the entire document
    const disableContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', disableContextMenu);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <BlackOverlay />
      <NavBar />
      {isMobile ? (
        <div className='text-2xl text-center flex justify-center text-red-800'>
          <Alert status='error'>
            <AlertIcon />
            <div className='w-full flex flex-col justify-center items-center'>
                <AlertTitle>Phone browsing is not supported!</AlertTitle>
                <AlertDescription>Use laptop/tablet to open this site.</AlertDescription>
            </div>
          </Alert>
        </div>
      ) : (
        <MazeApp />
      )}
    </div>
  );
}

export default Home;
