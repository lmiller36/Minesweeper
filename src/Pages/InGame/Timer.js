import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
    isPaused,
    getTimeElapsed,
    isPageSelected,
} from '../../selectors';

import { IN_GAME } from '../../Constants';

import { updateTimer } from "../../actions";

const TimerWrapper = styled.div``;

const Timer = ({ timeElapsed, isPaused, updateTimer, inGame }) => {
    let incrementTimer = () => {
        setTimeout(() => {
            if (inGame && !isPaused) updateTimer(timeElapsed + 1);
        }, 1000)
    };

    incrementTimer();

    return <TimerWrapper>{timeElapsed}</TimerWrapper>;
};

const mapStateToProps = (state) => ({
    timeElapsed: getTimeElapsed(state),
    isPaused: isPaused(state),
    inGame: isPageSelected(state, IN_GAME),
});

const mapDispatchToProps = (dispatch) => ({
    updateTimer: (timeElapsed) => dispatch(updateTimer(timeElapsed)),
    // removeCachedBoard: () => dispatch(removeCachedBoard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);