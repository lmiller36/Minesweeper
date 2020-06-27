/* eslint-disable complexity */

import {
    INITIALIZE_BOARD,
    REMOVE_CACHED_BOARD,
    UPDATE_BOARD,
    UPDATE_TIMER,
    TOGGLE_GAME_MODE,
    START_GAME,
    PAGE_LOADED_SETUP,
    SWITCH_PAGES,
    TOGGLE_PAUSE_GAME,
    END_GAME,
    SET_TUTORIAL_GAME_INDEX,
    CONTINUE_GAME,
    SIGN_IN,
    SIGN_OUT
} from './actions';
import { EASY, MAIN_MENU, ALL_PAGES, HOW_TO_PLAY } from './Constants';
import MinesweeperGame from './Minesweeper/Minesweeper';

const initialState = {
    gameProps: {
        difficulty: EASY,
        isPaused: false,
        game: {
            board: []
        },
        timeElapsed: 0,
        isSet: false,
        gameMode: { clicking: true, flagging: false },
    },
    tutorialPage: {
        gameIndex: 0,
    },
    pages: {},
    serverProps: {
        profile: null
    },
};

export const data = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case PAGE_LOADED_SETUP: {
            ALL_PAGES.forEach((page) => {
                state.pages[page] = false;
            });
            state.pages[MAIN_MENU] = true;

            return {
                ...state,
                gameProps: {
                    ...state.gameProps,
                    gameMode: { clicking: true, flagging: false },
                    isPaused: false,
                },
            };
        }

        case INITIALIZE_BOARD: {
            const { game } = payload;

            return {
                ...state,
                gameProps: {
                    ...state.gameProps,
                    game: game,
                    isSet: true,
                    update: 0,
                    shouldRerender: 0,
                    gameMode: { clicking: true, flagging: false },
                    isPaused: false,
                },
            };
        }

        case UPDATE_BOARD: {
            return {
                ...state,
                gameProps: {
                    ...state.gameProps,
                }
            };
        }

        case UPDATE_TIMER: {
            const { timeElapsed } = payload;

            return {
                ...state,
                gameProps: {
                    ...state.gameProps,
                    timeElapsed: timeElapsed,
                }
            };
        }

        case TOGGLE_PAUSE_GAME: {

            return {
                ...state,
                gameProps: {
                    ...state.gameProps,
                    isPaused: !state.gameProps.isPaused,
                }
            };
        }

        case REMOVE_CACHED_BOARD: {

            return {
                ...state,
                gameProps: {
                    isSet: false,
                    game: {
                        board: [],
                    },
                    isPaused: false,
                    timeElapsed: 0,
                },
            };
        }

        case TOGGLE_GAME_MODE: {
            const newMode = {
                clicking: !state.gameProps.gameMode.clicking,
                flagging: !state.gameProps.gameMode.flagging
            };

            return {
                ...state,
                gameProps: {
                    ...state.gameProps,
                    gameMode: newMode,
                }
            };
        }

        case START_GAME: {
            const { difficulty } = payload;

            const game = new MinesweeperGame(null, {
                gameDifficulty: {
                    ...difficulty,
                    numBombs: 0,
                },
            });

            console.log(game);

            return {
                ...state,
                gameProps: {
                    ...state.gameProps,
                    difficulty: difficulty,
                    game: game,
                    isPaused: false,
                    timeElapsed: 0,
                    shouldRerender: 0,
                    gameMode: { clicking: true, flagging: false }
                }
            };
        }

        case SWITCH_PAGES: {
            const { PAGE } = payload;

            ALL_PAGES.forEach((page) => {
                state['pages'][page] = page === PAGE;
            });

            return {
                ...state,
            };
        }

        case END_GAME: {
            const { didWin } = payload;
            return {
                ...state,
                gameProps: {
                    ...state.gameProps,
                    win: didWin,
                    loss: !didWin,
                }
            };
        }

        case SET_TUTORIAL_GAME_INDEX: {
            const { index } = payload;
            return {
                ...state,
                tutorialPage: {
                    gameIndex: index,
                }
            };
        }

        case CONTINUE_GAME: {

            const game = new MinesweeperGame(state.gameProps.game);
            return {
                ...state,
                gameProps: {
                    ...state.gameProps,
                    game: game,
                }
            };
        }

        case SIGN_IN: {
            const { profile } = payload;
            console.log(profile);
            return {
                ...state,
                serverProps: {
                    ...state.serverProps,
                    profile: profile,
                }
            };
        }

        case SIGN_OUT: {
            return {
                ...state,
                serverProps: {
                    ...state.serverProps,
                    profile: null,
                }
            };
        }

        default: {
            return state;
        }
    }
};