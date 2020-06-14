import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { faMousePointer, faFlag, faRedo, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    getBoard,
    getGame,
    getGameMode,
    getGameDifficulty,

} from '../../selectors';
import {
    mainMenu
} from '../../actions'
import Timer from './Timer';

const InGameMenuWrapper = styled.div`
    display:flex;
    margin:15px;
    justify-content: space-around;
`;

const InGameMenu = ({
    game, gameMode, gameDifficulty, toggleGameMode, localRemoveCachedBoard, setGameDifficulty, mainMenu
}) => {

    return <InGameMenuWrapper>
        <FontAwesomeIcon size='2x' icon={faHome} onClick={() => { mainMenu() }} />
        <Timer />
        <div>{game.remaining}</div>

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
            setGameDifficulty(gameDifficulty);
        }} />

    </InGameMenuWrapper>;
};

const mapStateToProps = (state) => ({
    board: getBoard(state),
    game: getGame(state),
    gameMode: getGameMode(state),
    gameDifficulty: getGameDifficulty(state),
});

const mapDispatchToProps = (dispatch) => ({
    mainMenu: () => dispatch(mainMenu()),
});


export default connect(mapStateToProps, mapDispatchToProps)(InGameMenu);