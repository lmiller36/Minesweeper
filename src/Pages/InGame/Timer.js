import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
    isPaused,
    getTimeElapsed,
    isPageSelected,
} from '../../selectors';

import { IN_GAME, IN_GAME_FIRST_CLICK } from '../../Constants';

import { updateTimer } from "../../actions";

const TimerWrapper = styled.div``;

let firstPause = false;

const Timer = ({ timeElapsed, isPaused, updateTimer, inGame, inGameFirstClick }) => {
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

});

const mapDispatchToProps = (dispatch) => ({
    updateTimer: (timeElapsed) => dispatch(updateTimer(timeElapsed)),
    // removeCachedBoard: () => dispatch(removeCachedBoard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);