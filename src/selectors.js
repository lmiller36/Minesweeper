export const getBoard = (state) => {
    return state.data.board;
};

export const plsRerender = (state) => {
    return state.data.shouldRerender;
};

export const getGame = (state) => {
    return state.data.game;
};

export const getIsSet = (state) => {
    return state.data.isSet;
};

export const getStartTime = (state) => {
    return state.data.startTime;
};

export const getCurrentTime = (state) => {
    return state.data.now;
};

export const getGameMode = (state) => {
    return state.data.gameMode;
};

export const getGameDifficulty = (state) => {
    return state.data.difficulty;
};

export const getGameInSetupMode = (state) => {
    return state.data.inSetupMode;
}

export const getInGame = (state) => {
    return state.data.inGame;
}

export const getInMainMenu = (state) => {
    // console.log(state.data.inMainMenu)
    return state.data.inMainMenu;
}

