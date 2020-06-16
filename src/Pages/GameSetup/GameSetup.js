import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { EASY, MEDIUM, HARD, DIFFICULTIES, SETUP_NEW_GAME, IN_GAME_FIRST_CLICK } from '../../Constants';
import { removeCachedBoard, startGame, switchPages } from '../../actions';
import {
    isPageSelected,
} from '../../selectors';

import './GameSetup.css'

import { capitalize } from '../../utils'

const GameSetupContainer = styled.div`
    display: ${props => props.inSetupMode ? "inline-grid" : "none"};
`;


const GameSetup = ({ localRemoveCachedBoard, startGame, inSetupMode, switchToGame }) => {


    const startNewGame = () => {

        const gameDifficultySelector = document.querySelectorAll('input[name=\'gameDifficulty\']');
        let selectedValue;
        for (const difficultyOption of gameDifficultySelector) {
            if (difficultyOption.checked) {
                selectedValue = difficultyOption.value;
                break;
            }
        }

        let gameDifficulty = null;

        if (selectedValue === EASY.key) {
            gameDifficulty = EASY;
        }
        else if (selectedValue === MEDIUM.key) {
            gameDifficulty = MEDIUM;
        } else if (selectedValue === HARD.key) {
            gameDifficulty = HARD;
        }

        console.log(gameDifficulty)

        if (gameDifficulty) {
            localRemoveCachedBoard();
            startGame(gameDifficulty);
            switchToGame();
        }
    }

    return <GameSetupContainer inSetupMode={inSetupMode} style={{ marginTop: 20 }}>
        {
            Object.keys(DIFFICULTIES).map((key) => {
                const difficulty = DIFFICULTIES[key];
                const msg = `${capitalize(key)} (${difficulty.rows} x ${difficulty.cols}, ${difficulty.numBombs} mines)`
                return <label key={key} className="container">{msg}
                    <input type="radio" id={key} name="gameDifficulty" value={key} />
                    <span className="checkmark"></span>
                </label>
            })
        }

        <div id="testbutton" onClick={() => {
            startNewGame();
        }}></div>

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