/* eslint-disable complexity */
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { faMousePointer, faFlag, faRedo, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    getBoard,
    getGame,
    getGameMode,

} from './selectors';
import Timer from './Timer';
import { EASY, MEDIUM, HARD } from './Constants';

const ModeWrapper = styled.div`
`;

const RemainingBombs = styled.div`
`;

const StatusBarWrapper = styled.div`
    display:flex;
    margin:15px;
    justify-content: space-around;
`;

const StatusBar = (
    props,
) => {

    return <StatusBarWrapper>
        <FontAwesomeIcon size='2x' icon={faHome} onClick={() => { }} />
        <Timer />
        <RemainingBombs>{props.game.remaining}</RemainingBombs>

        <ModeWrapper >
            <FontAwesomeIcon
                size='2x'
                icon={props.gameMode === 'flagging' ? faFlag : faMousePointer}
                onClick={
                    () => {
                        props.toggleGameMode();
                    }
                }
            />
        </ModeWrapper>

        <FontAwesomeIcon size='2x' icon={faRedo} onClick={() => {
            console.log(props);
            props.localRemoveCachedBoard();

            const gameDifficultySelector = document.querySelectorAll('input[name=\'gameDifficulty\']');
            let selectedValue;
            for (const difficultyOption of gameDifficultySelector) {
                if (difficultyOption.checked) {
                    selectedValue = difficultyOption.value;
                    break;
                }
            }

            let gameDifficulty = EASY;

            if (selectedValue === 'medium') {
                gameDifficulty = MEDIUM;
            } else if (selectedValue === 'hard') {
                gameDifficulty = HARD;
            }

            props.setGameDifficulty(gameDifficulty);

        }} />

    </StatusBarWrapper>;
};

const mapStateToProps = (state) => ({
    board: getBoard(state),
    // isSet: getIsSet(state),
    game: getGame(state),
    // rerender: plsRerender(state),
    gameMode: getGameMode(state),
});

export default connect(mapStateToProps)(StatusBar);