import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import './Shared.css';
import { switchPages } from './actions';
import { MAIN_MENU } from './Constants';

const LogoContainer = styled.div`
    width:100%;
    background:lightgray;
    text-align:center;
    font-style: italic;
`;

const LogoText = styled.p`
`;

const Logo = ({ openMainMenu }) => (
    <LogoContainer >
        <LogoText onClick={openMainMenu} style={{ fontFamily: 'Pacifico', fontSize: 'xxx-large', margin: '0px 0px 10px', cursor: 'pointer' }}>Lorne's Minesweeper</LogoText>
    </LogoContainer>
);

const mapDispatchToProps = (dispatch) => ({
    openMainMenu: () => dispatch(switchPages(MAIN_MENU)),
});

export default connect(null, mapDispatchToProps)(Logo);