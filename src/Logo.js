import React from 'react';
import styled from 'styled-components';
import './Shared.css';

const LogoContainer = styled.div`
    width:100%;
    background:lightgray;
    text-align:center;
    font-style: italic;
`;

const LogoText = styled.p`
`;

const Logo = () => (
    <LogoContainer>
        <LogoText className={"titleFont"} style={{ fontFamily: 'Pacifico', fontSize: 'xxx-large',margin:'0px 0px 10px' }}>Lorne's Minesweeper</LogoText>
    </LogoContainer>
);

export default Logo;