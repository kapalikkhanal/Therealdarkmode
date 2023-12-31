
export function rand(max) {
    return Math.floor(Math.random() * max);
}

export function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function changeBrightness(factor, sprite) {
    var virtCanvas = document.createElement("canvas");
    virtCanvas.width = 500;
    virtCanvas.height = 500;
    var context = virtCanvas.getContext("2d");
    context.drawImage(sprite, 0, 0, 500, 500);

    var imgData = context.getImageData(0, 0, 500, 500);

    for (let i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = imgData.data[i] * factor;
        imgData.data[i + 1] = imgData.data[i + 1] * factor;
        imgData.data[i + 2] = imgData.data[i + 2] * factor;
    }
    context.putImageData(imgData, 0, 0);

    var spriteOutput = new Image();
    spriteOutput.src = virtCanvas.toDataURL();
    virtCanvas.remove();
    return spriteOutput;
}

export function displayVictoryMess(moves) {
    document.getElementById("moves").innerHTML = "You Moved " + moves + " Steps.";
    toggleVisibility("Message-Container");
}

export function toggleVisibility(id) {
    var element = document.getElementById(id);
    if (element.style.visibility === "visible") {
        element.style.visibility = "hidden";
    } else {
        element.style.visibility = "visible";
    }
}

export function Maze(Width, Height) {
    var mazeMap;
    var width = Width;
    var height = Height;
    var startCoord, endCoord;
    var dirs = ["n", "s", "e", "w"];
    var modDir = {
        n: { y: -1, x: 0, o: "s" },
        s: { y: 1, x: 0, o: "n" },
        e: { y: 0, x: 1, o: "w" },
        w: { y: 0, x: -1, o: "e" }
    };

    this.map = function () {
        return mazeMap;
    };
    this.startCoord = function () {
        return startCoord;
    };
    this.endCoord = function () {
        return endCoord;
    };

    function genMap() {
        mazeMap = new Array(height);
        for (let y = 0; y < height; y++) {
            mazeMap[y] = new Array(width);
            for (let x = 0; x < width; ++x) {
                mazeMap[y][x] = {
                    n: false,
                    s: false,
                    e: false,
                    w: false,
                    visited: false,
                    priorPos: null
                };
            }
        }
    }

    function defineMaze() {
        var isComp = false;
        var move = false;
        var cellsVisited = 1;
        var numLoops = 0;
        var maxLoops = 0;
        var pos = { x: 0, y: 0 };
        var numCells = width * height;
        while (!isComp) {
            move = false;
            mazeMap[pos.x][pos.y].visited = true;

            if (numLoops >= maxLoops) {
                shuffle(dirs);
                maxLoops = Math.round(rand(height / 8));
                numLoops = 0;
            }
            numLoops++;
            for (let index = 0; index < dirs.length; index++) {
                var direction = dirs[index];
                var nx = pos.x + modDir[direction].x;
                var ny = pos.y + modDir[direction].y;

                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    if (!mazeMap[nx][ny].visited) {
                        mazeMap[pos.x][pos.y][direction] = true;
                        mazeMap[nx][ny][modDir[direction].o] = true;
                        mazeMap[nx][ny].priorPos = pos;
                        pos = { x: nx, y: ny };
                        cellsVisited++;
                        move = true;
                        break;
                    }
                }
            }

            if (!move) {
                pos = mazeMap[pos.x][pos.y].priorPos;
            }
            if (numCells === cellsVisited) {
                isComp = true;
            }
        }
    }

    function defineStartEnd() {
        switch (rand(4)) {
            case 0:
                startCoord = { x: 0, y: 0 };
                endCoord = { x: height - 1, y: width - 1 };
                break;
            case 1:
                startCoord = { x: 0, y: width - 1 };
                endCoord = { x: height - 1, y: 0 };
                break;
            case 2:
                startCoord = { x: height - 1, y: 0 };
                endCoord = { x: 0, y: width - 1 };
                break;
            case 3:
                startCoord = { x: height - 1, y: width - 1 };
                endCoord = { x: 0, y: 0 };
                break;
        }
    }

    genMap();
    defineStartEnd();
    defineMaze();
}

export function DrawMaze(Maze, ctx, cellsize, endSprite = null) {
    var map = Maze.map();
    var cellSize = cellsize;
    var drawEndMethod;
    if (ctx) { // Check if ctx is defined
        ctx.lineWidth = cellSize / 40;
    }

    this.redrawMaze = function (size) {
        cellSize = size;
        ctx.lineWidth = cellSize / 50;
        drawMap();
        drawEndMethod();
    };

    function drawCell(xCord, yCord, cell) {
        var x = xCord * cellSize;
        var y = yCord * cellSize;

        if (cell.n === false) {
            if (ctx) { // Check if ctx is defined
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + cellSize, y);
                ctx.stroke();
            }

        }
        if (cell.s === false) {
            if (ctx) { // Check if ctx is defined
                ctx.beginPath();
                ctx.moveTo(x, y + cellSize);
                ctx.lineTo(x + cellSize, y + cellSize);
                ctx.stroke();
            }

        }
        if (cell.e === false) {
            if (ctx) { // Check if ctx is defined
                ctx.beginPath();
                ctx.moveTo(x + cellSize, y);
                ctx.lineTo(x + cellSize, y + cellSize);
                ctx.stroke();
            }
        }
        if (cell.w === false) {
            if (ctx) { // Check if ctx is defined
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + cellSize);
                ctx.stroke();
            }

        }
    }

    function drawMap() {
        for (let x = 0; x < map.length; x++) {
            for (let y = 0; y < map[x].length; y++) {
                drawCell(x, y, map[x][y]);
            }
        }
    }

    function drawEndFlag() {
        var coord = Maze.endCoord();
        var gridSize = 4;
        var fraction = cellSize / gridSize - 2;
        var colorSwap = true;
        for (let y = 0; y < gridSize; y++) {
            if (gridSize % 2 === 0) {
                colorSwap = !colorSwap;
            }
            for (let x = 0; x < gridSize; x++) {
                ctx.beginPath();
                ctx.rect(
                    coord.x * cellSize + x * fraction + 4.5,
                    coord.y * cellSize + y * fraction + 4.5,
                    fraction,
                    fraction
                );
                if (colorSwap) {
                    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                } else {
                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                }
                ctx.fill();
                colorSwap = !colorSwap;
            }
        }
    }

    function drawEndSprite() {
        var offsetLeft = cellSize / 50;
        var offsetRight = cellSize / 25;
        var coord = Maze.endCoord();
        if (ctx) { // Check if ctx is defined
            ctx.drawImage(
                endSprite,
                2,
                2,
                endSprite.width,
                endSprite.height,
                coord.x * cellSize + offsetLeft,
                coord.y * cellSize + offsetLeft,
                cellSize - offsetRight,
                cellSize - offsetRight
            );
        }

    }

    function clear() {
        var canvasSize = cellSize * map.length;
        if (ctx) { // Check if ctx is defined
            ctx.clearRect(0, 0, canvasSize, canvasSize);
        }

    }

    if (endSprite !== null) {
        drawEndMethod = drawEndSprite;
    } else {
        drawEndMethod = drawEndFlag;
    }
    clear();
    drawMap();
    drawEndMethod();
}

export function Player(maze, c, _cellsize, onComplete, sprite = null) {
    var ctx = c.getContext("2d");
    var drawSprite;
    var moves = 0;
    drawSprite = drawSpriteCircle;
    if (sprite !== null) {
        drawSprite = drawSpriteImg;
    }
    var player = this;
    var map = maze.map();
    var cellCoords = {
        x: maze.startCoord().x,
        y: maze.startCoord().y
    };
    var cellSize = _cellsize;
    var halfCellSize = cellSize / 2;

    this.redrawPlayer = function (_cellsize) {
        cellSize = _cellsize;
        drawSpriteImg(cellCoords);
    };

    function drawSpriteCircle(coord) {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(
            (coord.x + 1) * cellSize - halfCellSize,
            (coord.y + 1) * cellSize - halfCellSize,
            halfCellSize - 2,
            0,
            2 * Math.PI
        );
        ctx.fill();
        if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
            onComplete(moves);
            player.unbindKeyDown();
        }
    }

    function drawSpriteImg(coord) {
        var offsetLeft = cellSize / 50;
        var offsetRight = cellSize / 25;
        ctx.drawImage(
            sprite,
            0,
            0,
            sprite.width,
            sprite.height,
            coord.x * cellSize + offsetLeft,
            coord.y * cellSize + offsetLeft,
            cellSize - offsetRight,
            cellSize - offsetRight
        );
        if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
            onComplete(moves);
            player.unbindKeyDown();
        }
    }

    function removeSprite(coord) {
        var offsetLeft = cellSize / 50;
        var offsetRight = cellSize / 25;
        ctx.clearRect(
            coord.x * cellSize + offsetLeft,
            coord.y * cellSize + offsetLeft,
            cellSize - offsetRight,
            cellSize - offsetRight
        );
    }

    function check(e) {
        var cell = map[cellCoords.x][cellCoords.y];
        moves++;
        switch (e.keyCode) {
            case 65:
            case 37: // west
                if (cell.w === true) {
                    removeSprite(cellCoords);
                    cellCoords = { x: cellCoords.x - 1, y: cellCoords.y };
                    drawSprite(cellCoords);
                }
                break;
            case 87:
            case 38: // north
                if (cell.n === true) {
                    removeSprite(cellCoords);
                    cellCoords = { x: cellCoords.x, y: cellCoords.y - 1 };
                    drawSprite(cellCoords);
                }
                break;
            case 68:
            case 39: // east
                if (cell.e === true) {
                    removeSprite(cellCoords);
                    cellCoords = { x: cellCoords.x + 1, y: cellCoords.y };
                    drawSprite(cellCoords);
                }
                break;
            case 83:
            case 40: // south
                if (cell.s === true) {
                    removeSprite(cellCoords);
                    cellCoords = { x: cellCoords.x, y: cellCoords.y + 1 };
                    drawSprite(cellCoords);
                }
                break;
        }
    }

    this.bindKeyDown = function () {
        window.addEventListener("keydown", check, false);
    };

    this.unbindKeyDown = function () {
        window.removeEventListener("keydown", check, false);
    };

    drawSprite(maze.startCoord());

    this.bindKeyDown();
}
