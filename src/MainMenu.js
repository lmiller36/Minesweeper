import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
    getGame,
    getGameInSetupMode,
    getInMainMenu,
} from './selectors';
import { setupNewGame, continueGame } from './actions';

const MainMenu = ({ game, inSetupMode, setupNewGame, inMainMenu, continueGame }) => {
    const MainMenuContainer = styled.div`
        display:${!!inSetupMode ? "none" : "inline-grid"};
    `;

    const continuePreviousGame = (game.board.length !== 0);

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
    game: getGame(state),
    inMainMenu: getInMainMenu(state),
    inSetupMode: getGameInSetupMode(state),
});

const mapDispatchToProps = (dispatch) => ({
    setupNewGame: () => dispatch(setupNewGame()),
    continueGame: () => dispatch(continueGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);