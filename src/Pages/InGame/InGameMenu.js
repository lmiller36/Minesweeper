import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { faMousePointer, faFlag, faRedo, faHome, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    getGame,
    getGameMode,
    getGameDifficulty,
    getRemainingBombs,
    isPaused,
    isPageSelected,
} from '../../selectors';
import {
    startGame,
    removeCachedBoard,
    toggleGameMode,
    switchPages,
    togglePauseGame,

} from '../../actions'
import Timer from './Timer';
import { MAIN_MENU, IN_GAME, IN_GAME_FIRST_CLICK } from '../../Constants';

const InGameMenuWrapper = styled.div`
    display:flex;
    margin:15px;
    justify-content: space-around;
`;

const InGameMenu = ({
    gameMode, isPaused, gameDifficulty, toggleGameMode, inGameFirstClick, localRemoveCachedBoard, startGame, mainMenu, remainingBombs, toggledPause, inGame
}) => {

    return <InGameMenuWrapper>
        <FontAwesomeIcon size='2x' icon={faHome} onClick={() => { mainMenu() }} />
        <Timer />
        <div>{remainingBombs}</div>

        <div >
            <FontAwesomeIcon
                size='2x'
                icon={gameMode === 'flagging' ? faFlag : faMousePointer}
                onClick={
                    () => {
                        toggleGameMode();
                    }
                }
            />
        </div>

        <FontAwesomeIcon style={{ display: `${inGame ? "" : "none"}` }} size='2x' icon={isPaused ? faPlay : faPause} onClick={toggledPause} />

        <FontAwesomeIcon size='2x' icon={faRedo} onClick={() => {
            localRemoveCachedBoard();
            inGameFirstClick();
            startGame(gameDifficulty);
        }} />

    </InGameMenuWrapper>;
};

const mapStateToProps = (state) => ({
    game: getGame(state),
    gameMode: getGameMode(state),
    gameDifficulty: getGameDifficulty(state),
    remainingBombs: getRemainingBombs(state),
    isPaused: isPaused(state),
    inGame: isPageSelected(state, IN_GAME)
});

const mapDispatchToProps = (dispatch) => ({
    mainMenu: () => dispatch(switchPages(MAIN_MENU)),
    startGame: (gameDifficulty) => dispatch(startGame(gameDifficulty)),
    inGameFirstClick: () => dispatch(switchPages(IN_GAME_FIRST_CLICK)),
    toggleGameMode: () => dispatch(toggleGameMode()),
    localRemoveCachedBoard: () => dispatch(removeCachedBoard()),
    toggledPause: () => dispatch(togglePauseGame()),
});


export default connect(mapStateToProps, mapDispatchToProps)(InGameMenu);