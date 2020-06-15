import React from 'react';
import { connect } from 'react-redux';
import { pageLoadedSetup } from './actions'
import './App.css';
import styled from 'styled-components';
import Logo from './Logo';
import MainMenu from './Pages/MainMenu/MainMenu';
import GameSetup from './Pages/GameSetup/GameSetup';
import GameDisplay from './Pages/InGame/GameDisplay';

const Pages = styled.div`
    text-align: center;
`;

class App extends React.Component {
    componentDidMount() {
        this.props.pageLoadedSetup();
    }
    render() {

        return <div className="App-Wrapper unselectable">
            <div className="App">
                <Logo />
                <Pages>
                    <MainMenu />
                    <GameSetup />
                    <GameDisplay />
                </Pages>


            </div>
        </div>
    }
}

const mapDispatchToProps = (dispatch) => ({
    pageLoadedSetup: () => dispatch(pageLoadedSetup()),
});


export default connect(null, mapDispatchToProps)(App);