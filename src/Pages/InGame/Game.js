/* eslint-disable react/prop-types */

import React from 'react';
import Tile from '../../Minesweeper/Tile';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
    getBoard,
    getIsSet,
    getGame,
    plsRerender,
    getGameMode,
    getGameDifficulty,
    isPaused,
    gameOver,
} from '../../selectors';
import { initializeBoard, updateBoard, removeCachedBoard, toggleGameMode, startGame, switchPages, } from '../../actions';

import MinesweeperGame from '../..//Minesweeper/Minesweeper';
import { IN_GAME } from '../../Constants';

let emptyBoard = null;

let first = true;

const GameWrapper = styled.div`
    display: inline-grid;
    visibility: ${props => props.isPaused ? "hidden" : ""};
    grid-template-columns: repeat(${props => props.gameDifficulty ? props.gameDifficulty.cols : 0},1fr);
`;

const Game = ({
    // state
    board, game, isSet, gameMode, gameDifficulty, isPaused, gameOver,
    // actions
    performInitialSetup, updateBoard, firstClick, toggleGameMode,
}) => {



    emptyBoard = new MinesweeperGame({
        ...gameDifficulty,
        numBombs: 0,
    }, null);

    if (first && isSet) {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'F' || event.key === 'f') {
                if (gameOver) return;
                toggleGameMode();
            }
        }, false);
        first = false;
    }
    const visibleBoard = isSet ? board : emptyBoard.board;

    const initialTileClick = (tile) => {
        const newGame = new MinesweeperGame(gameDifficulty, tile.index);
        performInitialSetup(newGame);
        firstClick();
    };

    const bombClick = () => {
        game.lose();
    };

    const unopenedTileClick = (tile) => {
        game.clickTile(tile);
        updateBoard();
    }

    const flagClick = (tile) => {
        game.flagTile(tile);
        updateBoard();
    };

    const openNeighbors = (tile) => {
        game.openNeighbors(tile);
        updateBoard();
    };

    function isClicked(tile) {
        if (tile && tile.isOpened) {
            return true;
        }

        return false;
    }

    return <GameWrapper isPaused={isPaused} gameDifficulty={gameDifficulty}>
        {
            visibleBoard.map((tile) => {
                return <Tile
                    key={tile.index}
                    tile={tile}
                    gameMode={gameMode}
                    click={
                        (tile) => {
                            if (gameOver) return;

                            if (!isSet) {
                                initialTileClick(tile);
                                return;
                            }

                            if (isClicked(tile)) {
                                openNeighbors(tile);
                                return;
                            }

                            if (gameMode === 'flagging') {
                                flagClick(tile);
                                return;
                            }

                            if (tile.isFlagged) {
                                return;
                            }
                            if (tile.type === 'bomb') {
                                bombClick(tile);
                                return;
                            }

                            unopenedTileClick(tile);
                        }
                    }
                />;
            })
        }
    </GameWrapper>
};

const mapStateToProps = (state) => ({
    board: getBoard(state),
    isSet: getIsSet(state),
    game: getGame(state),
    rerender: plsRerender(state),
    gameMode: getGameMode(state),
    gameDifficulty: getGameDifficulty(state),
    isPaused: isPaused(state),
    gameOver: gameOver(state),
});

const mapDispatchToProps = (dispatch) => ({
    performInitialSetup: (newGame) => dispatch(initializeBoard(newGame)),
    firstClick: () => dispatch(switchPages(IN_GAME)),
    updateBoard: () => dispatch(updateBoard()),
    removeCachedBoard: () => dispatch(removeCachedBoard()),
    toggleGameMode: () => dispatch(toggleGameMode()),
    localRemoveCachedBoard: () => dispatch(removeCachedBoard()),
    setDifficulty: (newDifficulty) => dispatch(startGame(newDifficulty)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Game);