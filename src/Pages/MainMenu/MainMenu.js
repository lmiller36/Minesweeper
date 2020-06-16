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
import './Buttons.css'

const MainMenuContainer = styled.div`
    display:${props => !!props.inSetupMode ? "none" : "inline-grid"};
`;

const StyledMainMenuButton = styled.div`
`;


const MainMenu = ({ continuePreviousGame, inSetupMode, setupNewGame, inMainMenu, continueGame }) => {

    return <div style={{ display: inMainMenu ? "" : "none", marginTop: "20px" }}>

        <MainMenuContainer inSetupMode={inSetupMode}>
            <StyledMainMenuButton className="button" style={{ display: `${continuePreviousGame ? "" : "none"}` }} onClick={() => {
                continueGame();
            }}><span>Continue Game </span></StyledMainMenuButton>

            <StyledMainMenuButton className="button" onClick={() => {
                setupNewGame();

            }}><span>New Game </span></StyledMainMenuButton>

            <StyledMainMenuButton className="button" ><span>Settings</span> </StyledMainMenuButton>
            <StyledMainMenuButton className="button" ><span>How To Play </span> </StyledMainMenuButton>
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