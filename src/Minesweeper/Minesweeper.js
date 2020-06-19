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
            game.board.forEach(tile=>{if(tile.isOpened) this.opened.add(tile.index)})
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

        if (this.isCorner(pos, rows, cols)) {
            numSafe = 4;
        } else if (this.isOnAnEdge(pos, rows, cols)) {
            numSafe = 6;
        }

        const randomSafe = genNonBombs(totalTiles - numSafe - numBombs);
        const randomizeBoard = shuffle(bombs.concat(randomSafe), RANDOM_SEED);

        const finishedBoard = [...Array(rows)].map(() => Array(cols).fill(0));

        this.iterateOverNeighbors(pos, (coords) => {
            finishedBoard[coords.y][coords.x] = {};
        });

        let index = 0;
        this.iterateOverRowsCols((row, col) => {
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

    iterateOverNeighbors(pos, callback) {
        for (let xDelta = -1; xDelta <= 1; xDelta++) {
            for (let yDelta = -1; yDelta <= 1; yDelta++) {
                const coords = { x: pos.x + xDelta, y: pos.y + yDelta };
                if (coords.x < 0 || coords.x >= this.cols) {
                    continue;
                }
                if (coords.y < 0 || coords.y >= this.rows) {
                    continue;
                }
                callback(coords);
            }
        }
    }

    iterateOverRowsCols(callback) {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                callback(row, col);
            }
        }
    }

    calculateBombNumberForEachTile(finishedBoard, rows, cols) {
        this.iterateOverRowsCols((row, col) => {
            if (!isBomb(finishedBoard[row][col])) {
                return;
            }
            const pos = { x: col, y: row };

            this.iterateOverNeighbors(pos, (coords) => {
                finishedBoard[coords.y][coords.x].numBombs += 1;
            });

        });
    }


    posToArrIndex(pos, cols) {
        return pos.y * cols + pos.x;
    }

    isCorner(pos, rows, cols) {
        return this.numEdgesOfPos(pos, rows, cols) === 2;
    }

    numEdgesOfPos(pos, rows, cols) {
        const left = pos.y === 0;
        const right = pos.y === cols - 1;
        const top = pos.x === 0;
        const bottom = pos.x === rows - 1;

        let total = 0;
        if (left || right) total++;
        if (top || bottom) total++;

        return total;
    }

    isOnAnEdge(pos, rows, cols) {
        return this.numEdgesOfPos(pos, rows, cols) > 0;
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
        this.iterateOverNeighbors(this.indexToPos(tile.index, this.cols), (coords) => {
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

            this.iterateOverNeighbors(pos, (coords) => {
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

        this.iterateOverNeighbors(pos, (coords) => {
            const tileToOpen = this.board[this.posToArrIndex(coords, this.cols)];
            if (isBomb(tileToOpen)) {
                return;
            }

            this.openNonBombNeighbors(tileToOpen);
        });
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



function genBombs(numBombs) {
    const bombs = [];

    for (let count = 0; count < numBombs; count++) {
        bombs.push(bombTile);
    }

    return bombs;
}

export default MinesweeperGame;