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

} from '../../selectors';
import { initializeBoard, updateBoard, removeCachedBoard, toggleGameMode, startGame, switchPages, } from '../../actions';

import MinesweeperGame from '../..//Minesweeper/Minesweeper';
import { IN_GAME } from '../../Constants';

let emptyBoard = null;

let first = true;

const Game = ({
    // state
    board, game, isSet, gameMode, gameDifficulty,
    // actions
    performInitialSetup, updateBoard, setStartTime, updateTimer, firstClick, toggleGameMode, localRemoveCachedBoard
}) => {

    console.log(game);

    const GameWrapper = styled.div`
        display: inline-grid;
        grid-template-columns: repeat(${gameDifficulty ? gameDifficulty.cols : 0},1fr);
    `;

    emptyBoard = new MinesweeperGame({
        ...gameDifficulty,
        numBombs: 0,
    }, null);

    if (first && isSet) {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'F' || event.key === 'f') {
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
        alert('LOSS!');
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

    return <div>
        <GameWrapper>
            {
                visibleBoard.map((tile) => {
                    return <Tile
                        key={tile.index}
                        tile={tile}
                        gameMode={gameMode}
                        click={
                            (tile) => {
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
    </div>;
};

const mapStateToProps = (state) => ({
    board: getBoard(state),
    isSet: getIsSet(state),
    game: getGame(state),
    rerender: plsRerender(state),
    gameMode: getGameMode(state),
    gameDifficulty: getGameDifficulty(state),
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