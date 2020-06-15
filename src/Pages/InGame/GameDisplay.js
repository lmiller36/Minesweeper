import React from 'react';
import { connect } from 'react-redux';
import { removeCachedBoard, toggleGameMode, startGame } from '../../actions';
import InGameMenu from './InGameMenu';


import Game from './Game';
import { isPageSelected } from '../../selectors';
import { IN_GAME, IN_GAME_FIRST_CLICK } from '../../Constants';

const GameDisplay = ({
    localRemoveCachedBoard, setDifficulty, toggleGameMode, inGame
}) => {

    return <div style={{ display: inGame ? "" : "none" }} >
        <InGameMenu />
        <Game />
    </div>;
};

const mapStateToProps = (state) => ({
    inGame: isPageSelected(state, IN_GAME) || isPageSelected(state, IN_GAME_FIRST_CLICK),
});

const mapDispatchToProps = (dispatch) => ({
    toggleGameMode: () => dispatch(toggleGameMode()),
    localRemoveCachedBoard: () => dispatch(removeCachedBoard()),
    setDifficulty: (newDifficulty) => dispatch(startGame(newDifficulty)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameDisplay);