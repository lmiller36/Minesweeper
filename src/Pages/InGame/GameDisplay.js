import React from 'react';
import { connect } from 'react-redux';
import InGameMenu from './InGameMenu';
import Game from './Game';
import { isPageSelected, getWin, getLoss, gameOver } from '../../selectors';
import { IN_GAME, IN_GAME_FIRST_CLICK } from '../../Constants';
import styled from 'styled-components';


const Win = styled.div`
    display:${props => props.win ? "" : "none"};
`;

const Loss = styled.div`
    display:${props => props.loss ? "" : "none"};
`;

const GameDisplay = ({
    inGame, win, loss
}) => {



    return <div style={{ display: inGame ? "inline-block" : "none" }} >
        <InGameMenu />
        <Win win={win}>
            <iframe title="winGIF" src="https://giphy.com/embed/peAFQfg7Ol6IE" width="480" height="455" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
            <p style={{ textAlign: "center" }}>You found all the bombs!! (You win)</p>
        </Win>
        <Loss loss={loss}>
            <iframe title="lossGIF" src="https://giphy.com/embed/oe33xf3B50fsc" width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
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