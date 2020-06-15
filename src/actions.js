export const PAGE_LOADED_SETUP = 'PAGE_LOADED_SETUP';
export const pageLoadedSetup = () => ({
    type: PAGE_LOADED_SETUP,
    payload: {},
});


export const INITIALIZE_BOARD = 'INITIALIZE_BOARD';
export const initializeBoard = (game) => ({
    type: INITIALIZE_BOARD,
    payload: { game },
});

export const UPDATE_BOARD = 'UPDATE_BOARD';
export const updateBoard = () => ({
    type: UPDATE_BOARD,
    payload: {},
});


export const REMOVE_CACHED_BOARD = 'REMOVE_CACHED_BOARD';
export const removeCachedBoard = () => ({
    type: REMOVE_CACHED_BOARD,
    payload: {},
});

export const START_TIMER = 'START_TIMER';
export const startTimer = (startTime) => ({
    type: START_TIMER,
    payload: { startTime },
});

export const UPDATE_TIMER = 'UPDATE_TIMER';
export const updateTimer = (timeElapsed) => ({
    type: UPDATE_TIMER,
    payload: { timeElapsed },
});

export const TOGGLE_GAME_MODE = 'TOGGLE_GAME_MODE';
export const toggleGameMode = (now) => ({
    type: TOGGLE_GAME_MODE,
    payload: { now },
});

export const START_GAME = 'START_GAME';
export const startGame = (difficulty) => ({
    type: START_GAME,
    payload: { difficulty },
});

export const SWITCH_PAGES = 'SWITCH_PAGES';
export const switchPages = (PAGE) => ({
    type: SWITCH_PAGES,
    payload: { PAGE },
});

