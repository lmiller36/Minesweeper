import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
    isPaused,
    getTimeElapsed,
    isPageSelected,
    gameOver,
} from '../../selectors';

import { IN_GAME, IN_GAME_FIRST_CLICK } from '../../Constants';

import { updateTimer } from "../../actions";

const TimerWrapper = styled.div``;

let firstPause = false;

const Timer = ({ timeElapsed, isPaused, updateTimer, inGame, inGameFirstClick, gameOver }) => {

if (gameOver) return <div>{timeElapsed}</div>;

    let incrementTimer = () => {
        setTimeout(() => {
            if (inGame && !isPaused && !firstPause)
                updateTimer(timeElapsed + 1);
        }, 1000)
    };

    if (inGame && !isPaused)
        incrementTimer();
    else if (inGameFirstClick)
        updateTimer(0);

    if (!isPaused) firstPause = false;
    else if (!firstPause && isPaused) {
        firstPause = true;
    }

    return <TimerWrapper>{timeElapsed}</TimerWrapper>;
};

const mapStateToProps = (state) => ({
    timeElapsed: getTimeElapsed(state),
    isPaused: isPaused(state),
    inGame: isPageSelected(state, IN_GAME),
    inGameFirstClick: isPageSelected(state, IN_GAME_FIRST_CLICK),
    gameOver: gameOver(state),
});

const mapDispatchToProps = (dispatch) => ({
    updateTimer: (timeElapsed) => dispatch(updateTimer(timeElapsed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);