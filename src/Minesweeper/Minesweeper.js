/* eslint-disable complexity */
import { shuffle } from '../utils';

const bombTile = {
    type: 'bomb',
};

// const safeTile = {
//     type: 'safe',
// };

function isBomb(tile) {
    return tile.type === 'bomb';
}

class MinesweeperGame {
    constructor(gameDifficulty, initialClick, RANDOM_SEED, game) {

        if (game != null) {

            let keys = Object.keys(game);

            for (let index in keys) {
                let key = keys[index];
                this[key] = game[key];
            }

            this.opened = new Set();
            game.board.forEach(tile => { if (tile.isOpened) this.opened.add(tile.index) })
            return;
        }

        const { rows, cols, numBombs } = gameDifficulty;
        this.rows = rows;
        this.cols = cols;
        this.bombs = numBombs;
        this.nonBombs = (rows * cols) - numBombs;
        this.remaining = (rows * cols) - numBombs;
        this.opened = new Set();
        this.gameOver = false;
        this.didWin = false;
        this.difficulty = gameDifficulty;

        if (this.bombs === 0) {
            this.board = genNonBombs(rows * cols);
        } else {
            this.board = this.createBoard(gameDifficulty, initialClick, RANDOM_SEED);
            this.clickTile(this.board[initialClick]);
        }
    }

    createBoard(gameDifficulty, initialClick, RANDOM_SEED) {
        const { rows, cols, numBombs } = gameDifficulty;

        const pos = this.indexToPos(initialClick, cols);
        const totalTiles = rows * cols;
        const bombs = genBombs(numBombs);

        let numSafe = 9;

        if (isCorner(pos, this.difficulty)) {
            numSafe = 4;
        } else if (isOnAnEdge(pos, this.difficulty)) {
            numSafe = 6;
        }

        const randomSafe = genNonBombs(totalTiles - numSafe - numBombs);
        const randomizeBoard = shuffle(bombs.concat(randomSafe), RANDOM_SEED);

        const finishedBoard = [...Array(rows)].map(() => Array(cols).fill(0));

        iterateOverNeighbors(pos, this.difficulty, (coords) => {
            finishedBoard[coords.y][coords.x] = {};
        });

        let index = 0;
        iterateOverRowsCols(this.difficulty,(row, col) => {
            if (!finishedBoard[row][col]) {
                finishedBoard[row][col] = randomizeBoard[index];
                index++;
            }

            finishedBoard[row][col] = {
                ...finishedBoard[row][col],
                status: 0,
                index: this.posToArrIndex({ x: col, y: row }, cols),
                numBombs: 0,
            };
        });


        this.calculateBombNumberForEachTile(finishedBoard, rows, cols);

        return [].concat(...finishedBoard);
    }

    calculateBombNumberForEachTile(finishedBoard, rows, cols) {
        iterateOverRowsCols(this.difficulty,(row, col) => {
            if (!isBomb(finishedBoard[row][col])) {
                return;
            }
            const pos = { x: col, y: row };

            iterateOverNeighbors(pos, this.difficulty, (coords) => {
                finishedBoard[coords.y][coords.x].numBombs += 1;
            });

        });
    }


    posToArrIndex(pos, cols) {
        return pos.y * cols + pos.x;
    }


    indexToPos(index, cols) {
        const y = Math.trunc(index / cols);
        const x = index - y * cols;

        return { x: x, y: y };
    }

    clickTile(tile) {
        this.updateTileStatus(tile.index);
        this.openNonBombNeighbors(tile);
    }

    flagTile(tileIndex) {
        const curr = this.board[tileIndex];
        const flaggedState = curr.isFlagged;
        curr.isFlagged = !flaggedState;
        this.updateTileStatus(tileIndex);
    }

    indexWithinBounds(index) {
        return index >= 0 && index < this.rows * this.cols;
    }

    isFlagged(index) {
        return this.board[index].isFlagged;
    }

    neighborsWithFlags(tile) {
        let numFlagged = 0;
        iterateOverNeighbors(this.indexToPos(tile.index, this.cols), this.difficulty, (coords) => {
            const index = this.posToArrIndex(coords, this.cols);
            if (this.isFlagged(index)) {
                numFlagged++;
            }
        });

        return numFlagged;
    }

    openNeighbors(tileToOpen) {
        const numFlagged = this.neighborsWithFlags(tileToOpen);
        const pos = this.indexToPos(tileToOpen.index, this.cols);

        if (numFlagged === tileToOpen.numBombs) {

            iterateOverNeighbors(pos,this.difficulty, (coords) => {
                const index = this.posToArrIndex(coords, this.cols);

                if (this.indexWithinBounds(index)) {
                    const tile = this.board[index];
                    if (this.isFlagged(index)) {
                        return;
                    }
                    if (tile.isOpened) {
                        return;
                    }
                    this.clickTile(tile);
                }
            });
        }
    }

    decrementUsed(index) {
        if (!this.opened.has(index)) {
            this.remaining--;
        }
        this.opened.add(index);
        if (this.opened.size === this.nonBombs) {
            this.win();
            return;
        }
    }

    gameOver() {
        return this.gameOver;
    }

    win() {
        this.gameOver = true;
        this.didWin = true;
    }

    lose() {
        this.gameOver = true;
    }

    updateTileStatus(index) {
        var min = 1;
        if (this.board[index].status) min = this.board[index].status;
        this.board[index].status = min + 1;
    }

    openNonBombNeighbors(tileToOpen) {
        this.updateTileStatus(tileToOpen.index);

        if (tileToOpen.type === 'bomb') {
            this.lose();
            return;
        }
        const pos = this.indexToPos(tileToOpen.index, this.cols);
        if (tileToOpen.isOpened) {
            return;
        }
        this.board[tileToOpen.index].isOpened = true;


        this.decrementUsed(tileToOpen.index);

        if (tileToOpen.numBombs && tileToOpen.numBombs > 0) {
            return;
        }

        iterateOverNeighbors(pos,this.difficulty, (coords) => {
            const tileToOpen = this.board[this.posToArrIndex(coords, this.cols)];
            if (isBomb(tileToOpen)) {
                return;
            }

            this.openNonBombNeighbors(tileToOpen);
        });
    }
}


function iterateOverRowsCols(gameDifficulty,callback) {
    for (let row = 0; row < gameDifficulty.rows; row++) {
        for (let col = 0; col < gameDifficulty.cols; col++) {
            callback(row, col);
        }
    }
}

function genNonBombs(numTiles, includeIndex, toInsert) {
    const tiles = [];


    for (let count = 0; count < numTiles; count++) {
        tiles.push({
            ...toInsert,
            index: count,
        });
    }

    return tiles;
}

function iterateOverNeighbors(pos, difficulty, callback) {
    for (let xDelta = -1; xDelta <= 1; xDelta++) {
        for (let yDelta = -1; yDelta <= 1; yDelta++) {
            const coords = { x: pos.x + xDelta, y: pos.y + yDelta };
            if (coords.x < 0 || coords.x >= difficulty.cols) {
                continue;
            }
            if (coords.y < 0 || coords.y >= difficulty.rows) {
                continue;
            }
            callback(coords);
        }
    }
}

function isCorner(pos, gameDifficulty) {
    return numEdgesOfPos(pos, gameDifficulty) === 2;
}

function numEdgesOfPos(pos, gameDifficulty) {
    const left = pos.y === 0;
    const right = pos.y === gameDifficulty.cols - 1;
    const top = pos.x === 0;
    const bottom = pos.x === gameDifficulty.rows - 1;

    let total = 0;
    if (left || right) total++;
    if (top || bottom) total++;

    return total;
}

function isOnAnEdge(pos, gameDifficulty) {
    return numEdgesOfPos(pos, gameDifficulty) > 0;
}

function genBombs(numBombs) {
    const bombs = [];

    for (let count = 0; count < numBombs; count++) {
        bombs.push(bombTile);
    }

    return bombs;
}

export default MinesweeperGame;