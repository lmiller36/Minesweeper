import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
    isPageSelected,
    previousGameExists,
    gameOver,
} from '../../selectors';
import { switchPages } from '../../actions';
import { MAIN_MENU, IN_GAME, SETUP_NEW_GAME } from '../../Constants';

const MainMenu = ({ continuePreviousGame, inSetupMode, setupNewGame, inMainMenu, continueGame }) => {
    const MainMenuContainer = styled.div`
        display:${!!inSetupMode ? "none" : "inline-grid"};
    `;

    return <div style={{ display: inMainMenu ? "" : "none" }}>

        <MainMenuContainer>

            <button style={{ display: `${continuePreviousGame ? "" : "none"}` }} onClick={() => {
                continueGame();
            }}>Continue Game </button>

            <button onClick={() => {
                setupNewGame();

            }}>New Game</button>

            <button>Settings </button>
            <button>How To Play </button>
        </MainMenuContainer>
    </div>
};

const mapStateToProps = (state) => ({
    continuePreviousGame: previousGameExists(state) && !gameOver(state),
    inMainMenu: isPageSelected(state, MAIN_MENU),
    inSetupMode: isPageSelected(state, SETUP_NEW_GAME),
});

const mapDispatchToProps = (dispatch) => ({
    setupNewGame: () => dispatch(switchPages(SETUP_NEW_GAME)),
    continueGame: () => dispatch(switchPages(IN_GAME)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);