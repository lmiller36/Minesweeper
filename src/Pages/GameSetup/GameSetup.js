import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { EASY, MEDIUM, HARD, DIFFICULTIES, SETUP_NEW_GAME, IN_GAME_FIRST_CLICK } from '../../Constants';
import { removeCachedBoard, startGame, switchPages } from '../../actions';
import {
    isPageSelected,
} from '../../selectors';

import { capitalize } from '../../utils'

const GameSetup = ({ localRemoveCachedBoard, startGame, inSetupMode, switchToGame }) => {

    const GameSetupContainer = styled.div`
        display: ${inSetupMode ? "inline-grid" : "none"};
    `;

    const startNewGame = () => {
        localRemoveCachedBoard();

        const gameDifficultySelector = document.querySelectorAll('input[name=\'gameDifficulty\']');
        let selectedValue;
        for (const difficultyOption of gameDifficultySelector) {
            if (difficultyOption.checked) {
                selectedValue = difficultyOption.value;
                break;
            }
        }

        let gameDifficulty = EASY;
        if (selectedValue === MEDIUM.key) {
            gameDifficulty = MEDIUM;
        } else if (selectedValue === HARD.key) {
            gameDifficulty = HARD;
        }

        startGame(gameDifficulty);
    }

    return <GameSetupContainer>
        {
            Object.keys(DIFFICULTIES).map((key) => {
                const difficulty = DIFFICULTIES[key];
                const msg = `${capitalize(key)} (${difficulty.rows} x ${difficulty.cols}, ${difficulty.numBombs} mines)`
                return <div>
                    <input type='radio' id={key} name='gameDifficulty' value={key} />
                    <label htmlFor={key}>{msg}</label>
                </div>
            })
        }
        <button onClick={() => {
            startNewGame();
            switchToGame();
        }}>Start Game </button>
    </GameSetupContainer>
};

const mapStateToProps = (state) => ({
    inSetupMode: isPageSelected(state, SETUP_NEW_GAME),
});


const mapDispatchToProps = (dispatch) => ({
    localRemoveCachedBoard: () => dispatch(removeCachedBoard()),
    startGame: (newDifficulty) => dispatch(startGame(newDifficulty)),
    switchToGame: () => dispatch(switchPages(IN_GAME_FIRST_CLICK)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSetup);