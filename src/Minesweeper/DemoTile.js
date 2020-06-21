/* eslint-disable react/prop-types */
/* eslint-disable func-style */
/* eslint-disable no-magic-numbers */
/* eslint-disable complexity */
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import TileImage from './TileImageFactory';


const TileWrapper = styled.div`
    position:relative;
    width: 50px;
    height: 50px;
`;

const DemoTile = ({ tile, showFlag }) => {

    const hasColor = { outline: `${tile.color} 3px solid`, zIndex: 2 };
    const noColor = {};
    return <TileWrapper
        style={tile.color ? hasColor : noColor}
    >
        <TileImage style={{ position: 'absolute' }} tile={tile} />
        <FontAwesomeIcon size='2x' style={{
            display: `${showFlag ? '' : 'none'}`,
            zIndex: '20',
            position: 'absolute',
            left: '10',
            top: '10',
            opacity: '.3'
        }} icon={faFlag} />
    </TileWrapper>;
};

export default DemoTile;