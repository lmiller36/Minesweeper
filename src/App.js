/* eslint-disable no-undef */
import React from 'react';
import GameDisplay from './GameDisplay';
import { connect } from 'react-redux';
import { pageLoadedSetup } from './actions'
import './App.css';
import MainMenu from './MainMenu';
import Logo from './Logo';
import { getInMainMenu } from './selectors';
import NewGameMenu from './NewGameMenu';

class App extends React.Component {
    componentDidMount() {
        this.props.pageLoadedSetup();
    }
    render() {

        return <div className="App-Wrapper">
            <div className="App">
                <Logo />
                {/* Page State of App */}
                <MainMenu />
                <NewGameMenu />
                <GameDisplay />
                
            </div>
        </div>
    }
}

const mapStateToProps = (state) => ({
    inMainMenu: getInMainMenu(state),
});

const mapDispatchToProps = (dispatch) => ({
    pageLoadedSetup: () => dispatch(pageLoadedSetup()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);