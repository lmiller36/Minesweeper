import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { faMousePointer, faFlag, faRedo, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    getGame,
    getGameMode,
    getGameDifficulty,
    getRemainingBombs,
} from '../../selectors';
import {
    startGame, removeCachedBoard, toggleGameMode, switchPages
} from '../../actions'
import Timer from './Timer';
import { MAIN_MENU } from '../../Constants';

const InGameMenuWrapper = styled.div`
    display:flex;
    margin:15px;
    justify-content: space-around;
`;

const InGameMenu = ({
    game, gameMode, gameDifficulty, toggleGameMode, localRemoveCachedBoard, startGame, mainMenu, remainingBombs
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

        <FontAwesomeIcon size='2x' icon={faRedo} onClick={() => {
            localRemoveCachedBoard();
            startGame(gameDifficulty);
        }} />

    </InGameMenuWrapper>;
};

const mapStateToProps = (state) => ({
    game: getGame(state),
    gameMode: getGameMode(state),
    gameDifficulty: getGameDifficulty(state),
    remainingBombs: getRemainingBombs(state),
});

const mapDispatchToProps = (dispatch) => ({
    mainMenu: () => dispatch(switchPages(MAIN_MENU)),
    startGame: (gameDifficulty) => dispatch(startGame(gameDifficulty)),
    toggleGameMode: () => dispatch(toggleGameMode()),
    localRemoveCachedBoard: () => dispatch(removeCachedBoard()),
});


export default connect(mapStateToProps, mapDispatchToProps)(InGameMenu);