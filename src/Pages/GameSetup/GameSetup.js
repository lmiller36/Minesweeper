import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { EASY, MEDIUM, HARD, DIFFICULTIES } from '../../Constants';
import { removeCachedBoard, setGameDifficulty } from '../../actions';
import {
    getGameInSetupMode,
} from '../../selectors';

import { capitalize } from '../../utils'

const GameSetup = ({ localRemoveCachedBoard, setGameDifficulty, inSetupMode }) => {

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

        //TODO change to constants
        if (selectedValue === "MEDIUM") {
            gameDifficulty = MEDIUM;
        } else if (selectedValue === 'HARD') {
            gameDifficulty = HARD;
        }

        setGameDifficulty(gameDifficulty);
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
        <button onClick={startNewGame}>Start Game </button>
    </GameSetupContainer>
};

const mapStateToProps = (state) => ({
    inSetupMode: getGameInSetupMode(state),
});


const mapDispatchToProps = (dispatch) => ({
    localRemoveCachedBoard: () => dispatch(removeCachedBoard()),
    setGameDifficulty: (newDifficulty) => dispatch(setGameDifficulty(newDifficulty)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSetup);