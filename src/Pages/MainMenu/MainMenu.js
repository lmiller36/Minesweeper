import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
    isPageSelected,
    previousGameExists,
    gameOver,
} from '../../selectors';
import { switchPages } from '../../actions';
import { MAIN_MENU, IN_GAME, SETUP_NEW_GAME, HOW_TO_PLAY } from '../../Constants';
import './Buttons.css'

const MainMenuContainer = styled.div`
    display:${props => !!props.inSetupMode ? "none" : "inline-grid"};
`;

const StyledMainMenuButton = styled.div`
`;


const MainMenu = ({ continuePreviousGame, inSetupMode, setupNewGame, inMainMenu, continueGame, showHowToPlay }) => {

    return <div style={{ display: inMainMenu ? "" : "none", marginTop: "20px" }}>

        <MainMenuContainer inSetupMode={inSetupMode}>
            <StyledMainMenuButton className="button" onClick={continueGame} style={{ display: `${continuePreviousGame ? "" : "none"}` }} ><span>Continue Game </span></StyledMainMenuButton>
            <StyledMainMenuButton className="button" onClick={setupNewGame}><span>New Game </span></StyledMainMenuButton>
            <StyledMainMenuButton className="button" ><span>Settings</span> </StyledMainMenuButton>
            <StyledMainMenuButton className="button" onClick={() => {"showHowToPlay"}}> <span>How To Play </span> </StyledMainMenuButton>
        </MainMenuContainer>
    </div >
};

const mapStateToProps = (state) => ({
    continuePreviousGame: previousGameExists(state) && !gameOver(state),
    inMainMenu: isPageSelected(state, MAIN_MENU),
    inSetupMode: isPageSelected(state, SETUP_NEW_GAME),
});

const mapDispatchToProps = (dispatch) => ({
    setupNewGame: () => dispatch(switchPages(SETUP_NEW_GAME)),
    continueGame: () => dispatch(switchPages(IN_GAME)),
    showHowToPlay: () => dispatch(switchPages(HOW_TO_PLAY)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);