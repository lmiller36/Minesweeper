import React from 'react';
import { connect } from 'react-redux';
import { removeCachedBoard, toggleGameMode, setGameDifficulty } from '../../actions';
import InGameMenu from './InGameMenu';


import Game from './Game';
import { getInGame } from '../../selectors';

const GameDisplay = ({
    localRemoveCachedBoard, setDifficulty, toggleGameMode, inGame
}) => {

    return <div style={{ display: inGame ? "": "none"}} >
        <InGameMenu toggleGameMode={toggleGameMode} localRemoveCachedBoard={localRemoveCachedBoard} setGameDifficulty={setDifficulty} />
        <Game />
    </div>;
};

const mapStateToProps = (state) => ({
    inGame: getInGame(state),
});

const mapDispatchToProps = (dispatch) => ({
    toggleGameMode: () => dispatch(toggleGameMode()),
    localRemoveCachedBoard: () => dispatch(removeCachedBoard()),
    setDifficulty: (newDifficulty) => dispatch(setGameDifficulty(newDifficulty)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameDisplay);