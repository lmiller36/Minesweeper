import React from 'react';
import { connect } from 'react-redux';
import InGameMenu from './InGameMenu';
import Game from './Game';
import { isPageSelected, getWin, getLoss, gameOver } from '../../selectors';
import { IN_GAME, IN_GAME_FIRST_CLICK } from '../../Constants';
import styled from 'styled-components';

const GameDisplay = ({
    inGame, win, loss
}) => {

    const Win = styled.div`
        display:${win ? "" : "none"};
    `;

    const Loss = styled.div`
        display:${loss ? "" : "none"};
    `;

    return <div style={{ display: inGame ? "inline-block" : "none" }} >
        <InGameMenu />
        <Win>
            <iframe title="winGIF" src="https://giphy.com/embed/peAFQfg7Ol6IE" width="480" height="455" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            <p style={{ textAlign: "center" }}>You found all the bombs!! (You win)</p>
        </Win>
        <Loss>
            <iframe title="lossGIF" src="https://giphy.com/embed/oe33xf3B50fsc" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            <p style={{ textAlign: "center" }}>You clicked a bomb!</p>
        </Loss>
        <Game />
    </div>;
};

const mapStateToProps = (state) => ({
    inGame: isPageSelected(state, IN_GAME) || isPageSelected(state, IN_GAME_FIRST_CLICK),
    win: getWin(state),
    loss: getLoss(state),
    gameOver: gameOver(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GameDisplay);