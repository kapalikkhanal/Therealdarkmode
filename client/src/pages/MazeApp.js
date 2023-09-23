import { useRef } from 'react';
import React, { useEffect } from 'react';
import { changeBrightness, Player, DrawMaze, Maze, toggleVisibility, displayVictoryMess, shuffle, rand } from '../components/script.js';

function MazeApp() {
    const mazeCanvasRef = useRef(null);
    let maze, draw, player;
    let cellSize;
    let difficulty;
    let sprite;
    let finishSprite;
    let ctx; // Declare ctx here

    useEffect(() => {
        const mazeCanvas = mazeCanvasRef.current;
        ctx = mazeCanvas.getContext("2d");
        if (!mazeCanvas) return;

        let viewWidth = window.innerWidth;
        let viewHeight = window.innerHeight;

        if (viewHeight < viewWidth) {
            mazeCanvas.width = viewHeight - viewHeight / 100;
            mazeCanvas.height = viewHeight - viewHeight / 100;
        } else {
            mazeCanvas.width = viewWidth - viewWidth / 100;
            mazeCanvas.height = viewWidth - viewWidth / 100;
        }

        // Load and edit sprites
        var completeOne = false;
        var completeTwo = false;

        var isComplete = () => {
            if (completeOne === true && completeTwo === true) {
                setTimeout(function () {
                    makeMaze();
                }, 500);
            }
        };

        sprite = new Image();
        sprite.src =
            "./key.png" +
            "?" +
            new Date().getTime();
        sprite.setAttribute("crossOrigin", " ");
        sprite.onload = function () {
            sprite = changeBrightness(1.2, sprite);
            completeOne = true;
            isComplete();
        };

        finishSprite = new Image();
        finishSprite.src = "./home.png" +
            "?" +
            new Date().getTime();
        finishSprite.setAttribute("crossOrigin", " ");
        finishSprite.onload = function () {
            finishSprite = changeBrightness(1.1, finishSprite);
            completeTwo = true;
            isComplete();
        };
    }, []);

    function makeMaze() {
        console.log("Here");
        if (player != undefined) {
            player.unbindKeyDown();
            player = null;
        }

        var e = document.getElementById("diffSelect");
        difficulty = e.options[e.selectedIndex].value;
        cellSize = mazeCanvasRef.current.width / difficulty;
        maze = new Maze(difficulty, difficulty);
        draw = new DrawMaze(maze, ctx, cellSize, finishSprite);
        player = new Player(maze, mazeCanvasRef.current, cellSize, displayVictoryMess, sprite);
        if (document.getElementById("mazeContainer").style.opacity < "100") {
            document.getElementById("mazeContainer").style.opacity = "100";
        }
    }

    return (
        <div>
            <div className="MazeApp">
                <div lang="en">
                    <div>
                        <div id="page">
                            <div id="Message-Container">
                                <div id="message">
                                    <h1 className='font-extrabold text-center text-3xl mb-3'>Congratulations</h1>
                                    <p className="text-red-500 text-lg" id="moves"></p>
                                    {/* <input id="okBtn" type="button" onClick={() => toggleVisibility('Message-Container')} className='' value="Cool!" /> */}
                                    <button id="okBtn" className='text-lg text-center text-gray-300 rounded-lg bg-gray-800 h-12 w-36 mt-5' onClick={() => toggleVisibility('Message-Container')}>Exit</button>
                                    <p className="text-gray-500 text-lg mt-4">You can try again with hard levels.</p>
                                </div>
                            </div>
                            <div id="menu" className="flex justify-center space-x-5 items-center mt-3">
                                <div>
                                    <select type="button" className='text-lg text-center text-gray-300 rounded-lg bg-gray-800 h-12 w-36 hover:' id="diffSelect">
                                        <option value="10">Easy</option>
                                        <option value="15">Medium</option>
                                        <option value="25">Hard</option>
                                        <option value="38">Extreme</option>
                                    </select>
                                </div>
                                <button id="startMazeBtn" className='text-lg text-center text-gray-300 rounded-lg bg-gray-800 h-12 w-36' onClick={makeMaze}>Start</button>
                                {/* <input id="startMazeBtn" type="button" className="" onClick={makeMaze} value="Start" /> */}
                            </div>
                            <div id="view" className='flex justify-center space-y-10 bg-red-400'>
                                <div id="mazeContainer">
                                    <canvas ref={mazeCanvasRef} id="mazeCanvas" height="400" width="400"></canvas>
                                </div>
                            </div>
                            <p className='text-md text-[#618045] mt-1'>Use arrow keys to move the key to the house.</p>
                        </div>
                        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" async />
                        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.18/jquery.touchSwipe.min.js" async />
                        <script src="./script.js" async />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MazeApp;