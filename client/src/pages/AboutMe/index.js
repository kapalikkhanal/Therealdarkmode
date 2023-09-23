import React from 'react';
import { HStack, Link, IconButton } from '@chakra-ui/react';
import { BsLinkedin, BsFacebook, BsInstagram, BsGithub } from 'react-icons/bs';


const AboutMe = () => {
    return (
        <>
            <div
                className="min-h-screen min-w-screen bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: `url(/cover_bg_2.JPG)`,
                }}
            >
                <div>
                    <div className='flex flex-col justify-start items-start space-y-3'>
                        <Link href="https://www.linkedin.com/in/kapalikkhanal/" isExternal>
                            <IconButton
                                aria-label="Twitter"
                                icon={<BsLinkedin />}
                                size="md"
                                colorScheme="linkedin"
                            />
                        </Link>

                        <Link href="https://instagram.com/kapalik_k" isExternal>
                            <IconButton
                                aria-label="Instagram"
                                icon={<BsInstagram />}
                                size="md"
                                bgGradient="linear(to-r, #feda75, #fa7e1e,#d62976,#962fbf,#4f5bd5)"
                            />
                        </Link>

                        <Link href="https://facebook.com/kapalik.khanal" isExternal>
                            <IconButton
                                aria-label="Facebook"
                                icon={<BsFacebook />}
                                size="md"
                                colorScheme="facebook"
                            />
                        </Link>

                        <Link href="https://github.com/kapalikkhanal" isExternal>
                            <IconButton
                                aria-label="Facebook"
                                icon={<BsGithub />}
                                size="md"
                                colorScheme="gray"
                            />
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center flex-col mt-auto mb-9 bg-white bg-opacity-20 p-8 rounded-lg">
                    <h1 className="text-4xl font-bold font-mono text-black mb-4">Kapalik Khanal</h1>
                    <p className="text-gray-900 font-extrabold text-center">
                        MERN Stack Devloper
                    </p>
                </div>
            </div>
        </>
    );
};

export default AboutMe;
