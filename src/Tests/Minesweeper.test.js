/* eslint-disable no-undef */
/* eslint-disable max-depth */
/* eslint-disable complexity */
import '@testing-library/jest-dom/extend-expect';
import MinesweeperGame from '../Minesweeper/Minesweeper';
import { DIFFICULTIES } from '../Constants';

// assert that I do no accidentally break the underlying logic in the Minesweeper game
const NUMBER_OF_TEST_ITERATIONS = 5;

it('always provides a safe tile for the first click', () => {
    const difficultyKeys = Object.keys(DIFFICULTIES);
    difficultyKeys.forEach((difficultyName) => {
        const difficulty = DIFFICULTIES[difficultyName];

        for (let clickIndex = 0; clickIndex < difficulty.cols * difficulty.rows; clickIndex++) {
            let iterations = 0;
            do {
                const testEasyGame = new MinesweeperGame(null, {
                    gameDifficulty: difficulty,
                    initialClickIndex: clickIndex,
                });
                const col = (clickIndex % difficulty.cols);
                const row = Math.trunc((clickIndex - col) / difficulty.rows);

                const click = { row: row, col: col };

                for (let rowIncrement = -1; rowIncrement <= 1; rowIncrement++) {
                    for (let colIncrement = -1; colIncrement <= 1; colIncrement++) {
                        const newCoords = { row: click.row + rowIncrement, col: click.col + colIncrement };

                        if (newCoords.row < 0 || newCoords.row >= difficulty.rows) {
                            continue;
                        }
                        if (newCoords.col < 0 || newCoords.col >= difficulty.cols) {
                            continue;
                        }

                        const index = (newCoords.row * difficulty.cols) + newCoords.col;

                        expect(!testEasyGame.board[index].type);
                    }
                }
                iterations++;
            } while (iterations < NUMBER_OF_TEST_ITERATIONS);
        }
    });
});