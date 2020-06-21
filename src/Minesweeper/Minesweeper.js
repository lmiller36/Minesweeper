/* eslint-disable no-use-before-define */
/* eslint-disable complexity */
import { shuffle } from '../utils';
import Tile from './Tile';

const SAFE_TILES_CORNER = 4;
const SAFE_TILES_EDGE = 6;
const TWO_EDGES = 2;


class MinesweeperGame {
    constructor(oldGameProps, newGameProps) {
        if (oldGameProps) {

            const keys = Object.keys(oldGameProps);

            for (const index in keys) {
                const key = keys[index];
                this[key] = oldGameProps[key];
            }

            this.opened = new Set();
            oldGameProps.board.forEach((tile) => {
                if (tile.isOpened) {
                    this.opened.add(tile.index);
                }
            });

            this.board = oldGameProps.board.map((tileDict) => {
                return new Tile(tileDict);
            });

            return;
        }

        const { gameDifficulty, initialClickIndex, RANDOM_SEED } = newGameProps;
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
            this.board = this.createBoard(gameDifficulty, initialClickIndex, RANDOM_SEED);
            this.clickTile(this.board[initialClickIndex]);
        }
    }

    createBoard(gameDifficulty, initialClick, RANDOM_SEED) {
        const { rows, cols, numBombs } = gameDifficulty;
        const pos = indexToPos(initialClick, this.difficulty);
        const totalTiles = rows * cols;
        const bombs = genBombs(numBombs);

        let numSafe = 9;

        if (isCorner(pos, this.difficulty)) {
            numSafe = SAFE_TILES_CORNER;
        } else if (isOnAnEdge(pos, this.difficulty)) {
            numSafe = SAFE_TILES_EDGE;
        }

        const randomSafe = genNonBombs(totalTiles - numSafe - numBombs);
        const randomizeBoard = shuffle(bombs.concat(randomSafe), RANDOM_SEED);

        const finishedBoard = [...Array(rows)].map(() => Array(cols).fill(0));

        iterateOverNeighbors(pos, this.difficulty, (coords) => {
            finishedBoard[coords.row][coords.col] = new Tile(null, false);
        });

        let index = 0;
        let index2 = 0;
        iterateOverRowsCols(this.difficulty, (row, col) => {
            if (!finishedBoard[row][col]) {
                finishedBoard[row][col] = randomizeBoard[index];
                index++;
            }

            finishedBoard[row][col].setStatus(0);
            finishedBoard[row][col].setIndex(index2++);
            finishedBoard[row][col].setCoords({ col: col, row: row });

        });


        this.calculateBombNumberForEachTile(finishedBoard, rows, cols);

        return [].concat(...finishedBoard);
    }

    calculateBombNumberForEachTile(finishedBoard) {
        iterateOverRowsCols(this.difficulty, (row, col) => {
            if (!finishedBoard[row][col].isBomb) {
                return;
            }

            const pos = { col: col, row: row };

            iterateOverNeighbors(pos, this.difficulty, (coords) => {
                finishedBoard[coords.row][coords.col].numBombs += 1;
            });

        });
    }

    clickTile(tile) {
        this.updateTileStatus(tile.index);
        this.openNonBombNeighbors(tile);
    }

    // flagTile(tileIndex) {
    //     const curr = this.board[tileIndex];
    //     const flaggedState = curr.isFlagged;
    //     curr.isFlagged = !flaggedState;
    //     this.updateTileStatus(tileIndex);
    // }

    indexWithinBounds(index) {
        return index >= 0 && index < this.rows * this.cols;
    }

    isFlagged(index) {
        return this.board[index].isFlagged;
    }

    neighborsWithFlags(tile) {
        let numFlagged = 0;
        iterateOverNeighbors(tile.coords, this.difficulty, (coords, index) => {
            if (this.board[index].isFlagged) {
                numFlagged++;
            }
        });

        return numFlagged;
    }

    openNeighbors(tileToOpen) {
        const numFlagged = this.neighborsWithFlags(tileToOpen);
        const pos = tileToOpen.coords;
        if (numFlagged === tileToOpen.numBombs) {
            iterateOverNeighbors(pos, this.difficulty, (coords, index) => {
                // let index = posToArrIndex(coords, this.difficulty);
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
        this.board[index].incStatus();
    }

    openNonBombNeighbors(tileToOpen) {
        this.updateTileStatus(tileToOpen.index);

        if (tileToOpen.isBomb) {
            this.lose();
            return;
        }
        const pos = tileToOpen.coords;
        if (tileToOpen.isOpened) {
            return;
        }
        this.board[tileToOpen.index].isOpened = true;


        this.decrementUsed(tileToOpen.index);

        if (tileToOpen.numBombs && tileToOpen.numBombs > 0) {
            return;
        }

        iterateOverNeighbors(pos, this.difficulty, (coords, index) => {
            const tileToOpen = this.board[index];
            if (tileToOpen.isBomb) {
                return;
            }

            this.openNonBombNeighbors(tileToOpen);
        });
    }
}


function iterateOverRowsCols(gameDifficulty, callback) {
    for (let row = 0; row < gameDifficulty.rows; row++) {
        for (let col = 0; col < gameDifficulty.cols; col++) {
            callback(row, col);
        }
    }
}

function genNonBombs(numTiles) {
    const tiles = [];


    for (let count = 0; count < numTiles; count++) {
        tiles.push(new Tile(null, false, count));
    }

    return tiles;
}

function iterateOverNeighbors(pos, difficulty, callback) {
    for (let xDelta = -1; xDelta <= 1; xDelta++) {
        for (let yDelta = -1; yDelta <= 1; yDelta++) {
            const coords = { col: pos.col + xDelta, row: pos.row + yDelta };
            if (coords.col < 0 || coords.col >= difficulty.cols) {
                continue;
            }
            if (coords.row < 0 || coords.row >= difficulty.rows) {
                continue;
            }

            callback(coords, posToArrIndex(coords, difficulty));
        }
    }
}

function posToArrIndex(pos, difficulty) {
    return (pos.row * difficulty.cols) + pos.col;
}


function indexToPos(index, difficulty) {
    const row = Math.trunc(index / difficulty.cols);
    const col = index - (row * difficulty.cols);

    return { col: col, row: row };
}


function isCorner(pos, gameDifficulty) {
    return numEdgesOfPos(pos, gameDifficulty) === TWO_EDGES;
}

function numEdgesOfPos(pos, gameDifficulty) {
    const left = pos.row === 0;
    const right = pos.row === gameDifficulty.rows - 1;
    const top = pos.col === 0;
    const bottom = pos.col === gameDifficulty.cols - 1;

    let total = 0;
    if (left || right) {
        total++;
    }
    if (top || bottom) {
        total++;
    }

    return total;
}

function isOnAnEdge(pos, gameDifficulty) {
    return numEdgesOfPos(pos, gameDifficulty) > 0;
}

function genBombs(numBombs) {
    const bombs = [];

    for (let count = 0; count < numBombs; count++) {
        bombs.push(new Tile(null, true));
    }

    return bombs;
}

export default MinesweeperGame;