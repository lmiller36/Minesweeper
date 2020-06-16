/* eslint-disable func-style */
/* eslint-disable no-magic-numbers */
/* eslint-disable complexity */
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import TileImage from './TileImageFactory';
import { connect } from 'react-redux';
import { getTile, changed } from '../selectors';


const TileWrapper = styled.div`
    position:relative;
    width: 50px;
    height: 50px;
`;

// let tileIndex = -1;

const Tile = ({ tile, gameMode, click, index, changed }) => {

    return <TileWrapper
        onClick={() => {
            click(tile);
        }}>

        <TileImage style={{ position: 'absolute' }} tile={tile} />
        <FontAwesomeIcon size='2x' style={{
            display: `${gameMode === 'flagging' && !tile.isOpened && !tile.isFlagged ? '' : 'none'}`,
            zIndex: '20',
            position: 'absolute',
            left: '10',
            top: '10',
            opacity: '.3'
        }} icon={faFlag} />
    </TileWrapper>;
};


const mapStateToProps = (state, ownProps) => ({
    tile: getTile(state, ownProps),
    changed: changed(state, ownProps),
});


export default connect(mapStateToProps)(Tile);

// export default Tile;