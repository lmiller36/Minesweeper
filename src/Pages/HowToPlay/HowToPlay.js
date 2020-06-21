/* eslint-disable react/prop-types */
/* eslint-disable brace-style */
/* eslint-disable no-magic-numbers */
/* eslint-disable complexity */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { DIFFICULTIES, EASY, HOW_TO_PLAY } from '../../Constants';
import { capitalize } from '../../utils';
import './HowToPlay.css';
import MinesweeperGame from '../../Minesweeper/Minesweeper';
import DemoTile from '../../Minesweeper/DemoTile';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import {
    isPageSelected,
    getTutorialGameIndex,
} from '../../selectors';

import {
    setTutorialGameIndex
} from '../../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DemoBoard = styled.div`
    display: inline-grid;
    grid-template-columns: repeat(${EASY.cols},1fr);
`;

const emptyBoard = new MinesweeperGame(null, {
    gameDifficulty: {
        ...EASY,
        numBombs: 0,
    }
}, null).board;

const moves = [
    (game) => { game.board[5].flagTile(); },
    (game) => { game.board[41].flagTile(); },
    (game) => { game.clickTile(game.board[50]); },
    (game) => { game.openNeighbors(game.board[50]); },
    (game) => { game.board[22].flagTile(); },
    (game) => { game.board[31].flagTile(); },
    (game) => { game.board[61].flagTile(); },
    (game) => { game.openNeighbors(game.board[14]); },
    (game) => { game.openNeighbors(game.board[23]); },
    (game) => { game.openNeighbors(game.board[53]); },
    (game) => { game.openNeighbors(game.board[62]); },
    (game) => { game.openNeighbors(game.board[70]); },
    (game) => { game.board[68].flagTile(); },
    (game) => { game.openNeighbors(game.board[59]); },
    (game) => { game.openNeighbors(game.board[77]); },
    (game) => { game.clickTile(game.board[21]); },
    (game) => { game.clickTile(game.board[57]); },
    (game) => { game.clickTile(game.board[30]); },
    (game) => { game.openNeighbors(game.board[30]); },
    (game) => { game.board[12].flagTile(); },
    (game) => { game.board[48].flagTile(); },
    (game) => { game.openNeighbors(game.board[11]); },
    (game) => { game.openNeighbors(game.board[47]); },
    (game) => { game.openNeighbors(game.board[57]); },
    (game) => { game.openNeighbors(game.board[56]); },
    (game) => { game.board[54].flagTile(); },
    (game) => { game.board[75].flagTile(); },
    (game) => { game.openNeighbors(game.board[64]); },
    (game) => { game.openNeighbors(game.board[65]); },
];


const movesForEachDemoBoard = [
    { moves: 0 },
    { moves: 2, tilesToHighlight: [{ index: 5, color: 'blue' }, { index: 41, color: 'blue' }] },
    { moves: 2, tilesToHighlight: [{ index: 42, color: 'blue' }] },
    { moves: 3, tilesToHighlight: [{ index: 50, color: 'blue' }] },
    { moves: 4 },
    { moves: 7, tilesToHighlight: [{ index: 22, color: 'blue' }, { index: 31, color: 'blue' }, { index: 61, color: 'blue' }] },
    { moves: 12 },
    { moves: 13, tilesToHighlight: [{ index: 68, color: 'blue' }] },
    { moves: 15, tilesToHighlight: [{ index: 59, color: 'blue' }, { index: 69, color: 'blue' }, { index: 77, color: 'blue' }] },
    { moves: 15, tilesToHighlight: [{ index: 4, color: 'blue' }] },
    { moves: 15, tilesToHighlight: [{ index: 4, color: 'blue' }, { index: 3, color: 'red' }, { index: 12, color: 'red' }] },
    { moves: 15, tilesToHighlight: [{ index: 21, color: 'blue' }] },
    { moves: 16 },
    { moves: 16, tilesToHighlight: [{ index: 76, color: 'blue' }] },
    { moves: 16, tilesToHighlight: [{ index: 66, color: 'red' }, { index: 75, color: 'red' }] },
    { moves: 16, tilesToHighlight: [{ index: 66, color: 'red' }, { index: 67, color: 'blue' }, { index: 75, color: 'red' }] },
    { moves: 16, tilesToHighlight: [{ index: 57, color: 'black' }, { index: 66, color: 'red' }, { index: 67, color: 'blue' }, { index: 75, color: 'red' }] },
    { moves: 17 },
    { moves: 17, tilesToHighlight: [{ index: 39, color: 'red' }, { index: 48, color: 'red' }, { index: 49, color: 'blue' }] },
    { moves: 17, tilesToHighlight: [{ index: 39, color: 'red' }, { index: 40, color: 'green' }, { index: 48, color: 'red' }, { index: 49, color: 'blue' }] },
    { moves: 17, tilesToHighlight: [{ index: 30, color: 'black' }, { index: 39, color: 'red' }, { index: 40, color: 'green' }, { index: 48, color: 'red' }, { index: 49, color: 'blue' }] },
    { moves: 18 },
    { moves: 18, tilesToHighlight: [{ index: 30, color: 'blue' }] },
    { moves: 19 },
    { moves: 21 },
    { moves: 21, tilesToHighlight: [{ index: 12, color: 'red' }, { index: 48, color: 'red' }] },
    { moves: 25 },
    { moves: 27 },
    { moves: 29 }
];

const SEED = 123123;
emptyBoard[25].color = 'blue';
const boards = [emptyBoard];

movesForEachDemoBoard.map((boardInfo) => {
    const game = new MinesweeperGame(null, {
        gameDifficulty: EASY,
        initialClickIndex: 25,
        RANDOM_SEED: SEED
    });
    const moveCount = boardInfo.moves;
    const tilesToHighlight = boardInfo.tilesToHighlight;

    for (let moveIndex = 0; moveIndex < moveCount; moveIndex++) {
        moves[moveIndex](game);
    }


    const board = game.board;

    if (tilesToHighlight) {
        tilesToHighlight.forEach((tileToHighlight) => {
            board[tileToHighlight.index].color = tileToHighlight.color;
        });
    }

    boards.push(board);
});


const demoBoardMessages = [
    'The first click on the board is always safe, so you can click any of the empty tiles to start. To get a maximum amount of open tiles, a non-edge tile is recommended. We chose to click the highlighted tile',
    'After the first click, a board may look like this, Certain tiles on this board can already be determined to be bombs. Can you see which?',
    'Since the tiles with a one inside are next to only 1 non-opened tiles, the unopened tile MUST be a bomb. As such they are flagged',
    'When all of a tile\'s bomb count is met, the remaining tiles must be safe. These can be opened by pressing the unopened tile or by clicking the hint tile. WARNING: If you click a bomb tile or a hint tile with incorrectly flagged tiles, you will detonate a bomb and lose!',
    'The one tile adjacent to our previous click also has its conditions met, so it can be clicked to open additional tiles.',
    'Now, we have removed all the tiles known to not be bombs. In doing so, we have revealed additional tiles known to be bombs.',
    'Three new flags (aka bombs) have been added. This is because the red three and the green two were adjacent to 3 and 2 unopened tiles respectively. As such, we know that those tiles must be bombs. With these flags we can opened some safe tiles.',
    'All safe tiles have been opened. Go back if it is unclear which were opened. We can now flag an additional tile. Can you see which?',
    'The green two here, after opening safe tiles, became adjacent to only two unopened tiles, as such both of these tiles must be bombs. We can now open some additional tiles',
    'These tiles were clicked to open safe tiles.',
    'After opening the safe tiles, we may appear to be stuck, however, there is a strategy that may be of use. Look at the highlighted tile. The top two has one known bomb and two unopened tiles adjacent to it. We do not know which of these two unopened tiles is the bomb, yet one of them must be. ',
    'While the specific tile is not known, the red three below is adjacent to both of these candidate bomb tiles(highlighted in red). This red three is already next to two known bombs, so while two of its neighbors may be a bomb, the last remaining tile CANNOT be a bomb. Therefore, the last tile must be safe.',
    'With the same logic in mind, we know another tile that is safe to click. ',
    'We will follow a similar thought process to find the next tile to open',
    'Look at the highlighted green two tile. It is adjacent to one known bomb. So there must be another bomb nearby.',
    'It can be either of the red highlighted candidate tiles.',
    'Now look at the highlighted green two. This tile is next to the known bomb(the adjacent flag tile). Furthermore, it is also next to the the two red candidate tiles, of which only one can be the bomb. Luckily, we do not care which is the bomb, only that it is one of the two.',
    'The black highlighted tile MUST be safe to click since it cannot be a bomb. If it were a bomb, the highlighted green two would be a red three',
    'We can also open another tile this way',
    'Highlighted tile with its candidate tiles',
    'The green highlighted tile is touching two known bombs and the red highlighted candidate tiles, of which one is a bomb.',
    'The black tile is free to click.',
    '',
    'The newly opened green two\'s neighbors can be explored since its conditions are satisfed.',
    'a',
    'After clicking the tile, we get a fairly open board. From here, two flags can be placed',
    'The two flagged tiles are highlighted in red. Several tiles have now met their bomb',
    'd',
    'e',
    'f'
];

const showBoard = (board) => {
    return (
        <DemoBoard>
            {
                !board ? <div></div> :
                    board.map((tile) => {
                        return <DemoTile
                            key={`${tile.index}_empty`}
                            index={tile.index}
                            tile={tile}
                        />;
                    })
            }
        </DemoBoard>
    );
};

const HowToPlay = ({ inHowToPlay, tutorialGameIndex, setTutorialGameIndex }) => {
    const TypesOfTiles = [];
    TypesOfTiles.push({ tile: <DemoTile tile={{ isOpened: false }} />, msg: 'Unopened' });
    const maxBombs = 8;
    for (let hintTileIndex = 0; hintTileIndex <= maxBombs; hintTileIndex++) {
        TypesOfTiles.push({ tile: <DemoTile tile={{ isOpened: true, numBombs: hintTileIndex }} />, msg: `${hintTileIndex} bombs` });
    }

    TypesOfTiles.push({ tile: <DemoTile tile={{ isOpened: true, isBomb: true }} />, msg: 'Bomb tile' });

    TypesOfTiles.push({ tile: <DemoTile tile={{ isOpened: false, isFlagged: true }} />, msg: 'Flagged tile' });


    return <div style={{ display: inHowToPlay ? 'inline-block' : 'none', width: '1000px' }}>
        <h1>How To Play Minesweeper(IN PROGRESS OF BEING BUILT)</h1>
        <span>The objective of Minesweeper is to clear all tiles on the game board that do not contain a bomb (hence the name Minesweeper).</span>
        <p>There are 3 classic difficulting settings:</p>
        <ul>
            {
                Object.keys(DIFFICULTIES).map((key) => {
                    const difficulty = DIFFICULTIES[key];
                    const msg = `${capitalize(key)} (${difficulty.rows} x ${difficulty.cols}, ${difficulty.numBombs} mines)`;
                    return <li key={key} className='container'>{msg} </li>;
                })
            }
        </ul>
        <div>Show 9 tiles to portray adjacent</div>
        <h2>1. Types of tiles</h2>
        <p>The game board will consists of the following types</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {
                TypesOfTiles.map((child) => {
                    return <div key={child.msg}>
                        {child.tile}
                        <p>{child.msg} </p>
                    </div>;
                })
            }
        </div>
        <p>The number tiles reflect the number of bombs in an adjacent tile (including diagonals)</p>

        <br /> <br /> <br /> <br />
        <h2>2. How to find bombs</h2>
        {
            showBoard(boards[tutorialGameIndex])
        }
        <p>{demoBoardMessages[tutorialGameIndex]}</p>

        <div>
            <FontAwesomeIcon
                icon={faArrowCircleLeft}
                size='2x'
                onClick={() => {
                    setTutorialGameIndex(tutorialGameIndex - 1);
                }}
                style={{ display: `${!tutorialGameIndex ? 'none' : ''}` }}
            />
            <FontAwesomeIcon
                icon={faArrowCircleRight}
                size='2x'
                onClick={() => {
                    setTutorialGameIndex(tutorialGameIndex + 1);
                }}
                style={{
                    display: `${tutorialGameIndex === boards.length - 1 ? 'none' : ''}`
                }}

            />
        </div>

        <br /><br />
        <p>TODO: Highlight certain tiles to showcase point, put same game for practice</p>

    </div>;
};

const mapStateToProps = (state) => ({
    inHowToPlay: isPageSelected(state, HOW_TO_PLAY),
    tutorialGameIndex: getTutorialGameIndex(state),
});

const mapDispatchToProps = (dispatch) => ({
    setTutorialGameIndex: (index) => dispatch(setTutorialGameIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HowToPlay);