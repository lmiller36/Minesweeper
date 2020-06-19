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

let emptyBoard = new MinesweeperGame({
    ...EASY,
    numBombs: 0,
}, null).board;

const moves = [
    (game) => { game.flagTile(5) },
    (game) => { game.flagTile(41) },
    (game) => { game.clickTile(game.board[50]) },
    (game) => { game.openNeighbors(game.board[50]) },
    (game) => { game.flagTile(22) },
    (game) => { game.flagTile(31) },
    (game) => { game.flagTile(61) },
    (game) => { game.openNeighbors(game.board[14]) },
    (game) => { game.openNeighbors(game.board[23]) },
    (game) => { game.openNeighbors(game.board[53]) },
    (game) => { game.openNeighbors(game.board[62]) },
    (game) => { game.openNeighbors(game.board[70]) },
    (game) => { game.flagTile(68) },
    (game) => { game.openNeighbors(game.board[59]) },
    (game) => { game.openNeighbors(game.board[77]) },
    (game) => { game.clickTile(game.board[21]) },
    (game) => { game.clickTile(game.board[57]) },
    (game) => { game.clickTile(game.board[30]) },
    (game) => { game.openNeighbors(game.board[30]) },
    (game) => { game.flagTile(12) },
    (game) => { game.flagTile(48) },
    (game) => { game.openNeighbors(game.board[11]) },
    (game) => { game.openNeighbors(game.board[47]) },
    (game) => { game.openNeighbors(game.board[57]) },
    (game) => { game.openNeighbors(game.board[56]) },
    (game) => { game.flagTile(54) },
    (game) => { game.flagTile(75) },
    (game) => { game.openNeighbors(game.board[64]) },
    (game) => { game.openNeighbors(game.board[65]) },
];


let movesForEachDemoBoard = [
    { moves: 0, tilesToHighlight: [{ index: 25, color: "blue" }] },
    { moves: 2 },
    { moves: 3 },
    { moves: 4 },
    { moves: 7 },
    { moves: 12 },
    { moves: 13 },
    { moves: 15 },
    { moves: 16 },
    { moves: 17 },
    { moves: 18 },
    { moves: 19 },
    { moves: 21 },
    { moves: 25 },
    { moves: 27 },
    { moves: 29 }
];

const SEED = 123123;
emptyBoard[25].color = "blue";
let boards = [emptyBoard];

movesForEachDemoBoard.map((moveCount) => {
    let game = new MinesweeperGame(EASY, 25, SEED);
    for (let i = 0; i < moveCount; i++) {
        moves[i](game);
    }


    let board = game.board;

    if (moveCount.tilesToHighlight) {
        moveCount.tilesToHighlight.forEach(tileToHighlight => {
            board[tileToHighlight.index].color = tileToHighlight.color;
        })
    }

    boards.push(board)
})

let demoBoardMessages = [
    "The first click on the board is always safe, so you can click any of the empty tiles to start. To get a maximum amount of open tiles, a non-edge tile is recommended. We chose to click the highlighted tile",
    "After the first click, a board may look like this, Certain tiles on this board can already be determined to be bombs. Can you see which?",
    "Since the tiles with a one inside are next to only 1 non-opened tiles, the unopened tile MUST be a bomb. As such they are flagged",
    "When all of a tile's bomb count is met, the remaining tiles must be safe. These can be opened by pressing the unopened tile or by clicking the hint tile. WARNING: If you click a bomb tile or a hint tile with incorrectly flagged tiles, you will detonate a bomb and lose!",
    "Now, we have removed all the tiles known to not be bombs. In doing so, we have revealed additional tiles known to be bombs.",
    "Three new flags (aka bombs) have been added. This is because the red three and the green two were adjacent to 3 and 2 unopened tiles respectively. As such, we know that those tiles must be bombs. With these flags we can opened some safe tiles.",
    "All safe tiles have been opened. Go back if it is unclear which were opened. We can now flag an additionbothal time. Can you see which?",
    "The green two here, after opening safe tiles, became adjacent to only two unopened tiles, as such both of these tiles must be bombs. We can now open some additional tiles",
    "After opening the safe tiles, we may appear to be stuck, however, there is a strategy that may be of use. Look at the highlighted tiles. The top two has one known bomb and two unopened tiles adjacent to it. We do not know which of these two unopened tiles is the bomb, yet one of them must be. While the specific tile is not known, the red three below is adjacent to both of these candidate bomb tiles. This red three is already next to two known bombs, so while two of its neighbors may be a bomb, the last remaining tile CANNOT be a bomb. Therefore, the last tile must be safe.",
    "With the same logic in mind, we know another tile that is safe to click. ",
    "1",
    "2",
    "1",
    "2",
    "1",
    "2",
    "3",
]

const showBoard = (board) => {
    return (
        <DemoBoard>
            {

                board.map((tile) => {
                    return <DemoTile
                        key={tile.index + "_empty"}
                        index={tile.index}
                        tile={tile}
                    />;
                })
            }
        </DemoBoard>
    );
}

const HowToPlay = ({ inHowToPlay, tutorialGameIndex, setTutorialGameIndex }) => {
    const TypesOfTiles = [];    
    TypesOfTiles.push({ tile: <DemoTile tile={{ isOpened: false }} />, msg: "Unopened" });
    for (let i = 0; i <= 8; i++) {
        TypesOfTiles.push({ tile: <DemoTile tile={{ isOpened: true, numBombs: i }} />, msg: `${i} bombs` });
    }

    TypesOfTiles.push({ tile: <DemoTile tile={{ isOpened: true, type: "bomb" }} />, msg: `Bomb tile` });

    return <div style={{ display: inHowToPlay ? "inline-block" : "none", width: "1000px" }}>
        <h1>How To Play Minesweeper(IN PROGRESS OF BEING BUILT)</h1>
        <span>The objective of Minesweeper is to clear all tiles on the game board that do not contain a bomb (hence the name Minesweeper).</span>
        <p>There are 3 classic difficulting settings:</p>
        <ul>
            {
                Object.keys(DIFFICULTIES).map((key) => {
                    const difficulty = DIFFICULTIES[key];
                    const msg = `${capitalize(key)} (${difficulty.rows} x ${difficulty.cols}, ${difficulty.numBombs} mines)`
                    return <li key={key} className="container">{msg} </li>
                })
            }
        </ul>
        <h2>1. Types of tiles</h2>
        <p>The game board will consists of the following types</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            {
                TypesOfTiles.map(child => {
                    return <div>
                        {child.tile}
                        <p>{child.msg} </p>
                    </div>
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
        {/* {
            // return         <p>hi</p>

            demoBoardMessages[tutorialGameIndex]
        } */}

        <div>
            <FontAwesomeIcon
                icon={faArrowCircleLeft}
                size='2x'
                onClick={() => { setTutorialGameIndex(tutorialGameIndex - 1) }}
                style={{ display: `${!!!tutorialGameIndex ? "none" : ""}` }}
            />
            <FontAwesomeIcon
                icon={faArrowCircleRight}
                size='2x'
                onClick={() => { setTutorialGameIndex(tutorialGameIndex + 1) }}
                style={{ display: `${tutorialGameIndex === boards.length - 1 ? "none" : ""}` }}

            />
        </div>

        <br /><br />
        <p>TODO: Highlight certain tiles to showcase point, put same game for practice</p>

    </div>
};

const mapStateToProps = (state) => ({
    inHowToPlay: isPageSelected(state, HOW_TO_PLAY),
    tutorialGameIndex: getTutorialGameIndex(state),
});

const mapDispatchToProps = (dispatch) => ({
    setTutorialGameIndex: (index) => dispatch(setTutorialGameIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HowToPlay);