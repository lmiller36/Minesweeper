import '@testing-library/jest-dom/extend-expect';
import React from 'react';
// import { shallow } from 'enzyme';
import MinesweeperGame from '../Minesweeper/Minesweeper';
import { DIFFICULTIES } from '../Constants';

// assert that I do no accidentally break the underlying logic in the Minesweeper game
const NUMBER_OF_TEST_ITERATIONS = 5;

it('always provides a safe tile for the first click', () => {
    let difficultyKeys = Object.keys(DIFFICULTIES);
    difficultyKeys.forEach(difficultyName => {
        let difficulty = DIFFICULTIES[difficultyName];

        let corners = [
            0,                                          // TOP LEFT CORNER
            (difficulty.cols - 1),                      // TOP RIGHT CORNER
            ((difficulty.rows - 1) * difficulty.cols),  // BOTTOM LEFT CORNER
            (difficulty.rows * difficulty.cols - 1)     // BOTTOM RIGHT CORNER
        ]

        // corners.forEach(corner => {
        for (let clickIndex = 0; clickIndex < difficulty.cols * difficulty.rows; clickIndex++) {
            let iterations = 0;
            do {
                const testEasyGame = new MinesweeperGame(difficulty, clickIndex);

                let col = (clickIndex % difficulty.cols);
                let row = Math.trunc((clickIndex - col) / difficulty.rows);

                let click = { row: row, col: col};
                // console.log(click);
                // console.log(difficulty)
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        let newCoords = { row: click.row + i, col: click.col + j }

                        if (newCoords.row < 0 || newCoords.row >= difficulty.rows) continue;
                        if (newCoords.col < 0 || newCoords.col >= difficulty.cols) continue;

                        let index = newCoords.row * difficulty.cols + newCoords.col;

                        expect(!!!testEasyGame.board[index].type);
                    }
                }
                iterations++;
            } while (iterations < NUMBER_OF_TEST_ITERATIONS)
            // });

        }

    })

});