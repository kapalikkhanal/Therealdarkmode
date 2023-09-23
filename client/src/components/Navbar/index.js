import React from 'react'
import { useColorMode, Button } from '@chakra-ui/react';
import Link from 'next/link';


function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (

        <nav className="bg-white dark:bg-gray-900  w-full top-0 left-0 border-gray-200 dark:border-gray-600">
            <div className="w-auto mx-11 flex justify-between p-4 items-center">
                <div>
                    <a href="/" className="flex items-center">
                        <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white">TRDM</span>
                    </a>
                </div>

                {/* Color Mode  */}
                <Button onClick={toggleColorMode}>
                    Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                </Button>

                <div>
                    <div className="flex md:order-2">
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <Link href="/AboutMe" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About Me</Link>
                    </div>
                    
                </div>
            </div>
        </nav>

    )
}

export default NavBar