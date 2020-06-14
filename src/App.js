import React from 'react';
import { connect } from 'react-redux';
import { pageLoadedSetup } from './actions'
import './App.css';

import Logo from './Logo';
import { getInMainMenu } from './selectors';
import MainMenu from './Pages/MainMenu/MainMenu';
import GameSetup from './Pages/GameSetup/GameSetup';
import GameDisplay from './Pages/InGame/GameDisplay';


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
                <GameSetup />
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