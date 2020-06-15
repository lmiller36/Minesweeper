export const getTimeElapsed = (state) => {
    return state.data.gameProps.timeElapsed;
}

export const isPaused = (state) => {
    return state.data.gameProps.isPaused;
}

export const getBoard = (state) => {
    return state.data.gameProps.game.board;
};

export const plsRerender = (state) => {
    return state.data.gameProps.shouldRerender;
};

export const getGame = (state) => {
    return state.data.gameProps.game;
};

export const getIsSet = (state) => {
    return state.data.gameProps.isSet;
};

export const getStartTime = (state) => {
    return state.data.gameProps.startTime;
};

export const getCurrentTime = (state) => {
    return state.data.gameProps.now;
};

export const getGameMode = (state) => {
    return state.data.gameProps.gameMode;
};

export const getGameDifficulty = (state) => {
    return state.data.gameProps.difficulty;
};

export const isPageSelected = (state, page) => {
    return state.data.pages[page];
}

export const previousGameExists = (state) => {
    return state.data.gameProps.game.board.length > 0;
}

export const getRemainingBombs = (state) => {
    return 0;
}
export const getWin = (state) => {
    return state.data.gameProps.game.didWin && state.data.gameProps.game.gameOver;
}
export const getLoss = (state) => {
    return !state.data.gameProps.game.didWin && state.data.gameProps.game.gameOver;
}
export const gameOver = (state) => {
    return state.data.gameProps.game.gameOver;
}
