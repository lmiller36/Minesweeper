import {
    INITIALIZE_BOARD,
    REMOVE_CACHED_BOARD,
    UPDATE_BOARD,
    INITILIZE_TIMER,
    UPDATE_TIMER,
    TOGGLE_GAME_MODE,
    SET_GAME_DIFFICULTY,
    SETUP_NEW_GAME,
    PAGE_LOADED_SETUP,
    CONTINUE_GAME,
} from './actions';
import { EASY, MAIN_MENU } from './Constants';



const initialState = { difficulty: EASY, game: { board: [], isSet: false } };

export const data = (state = initialState, action) => {
    const { type, payload } = action;

    console.log(type);

    switch (type) {
        case PAGE_LOADED_SETUP: {
            return {
                ...state,
                inSetupMode: false,
                inMainMenu: true,
                inGame: false,
            }
        }

        case INITIALIZE_BOARD: {
            const { game } = payload;
            const board = game.board;

            return {
                ...state,
                game: game,
                board: board,
                isSet: true,
                update: 0,
                shouldRerender: 0,
                now: null,
                startTime: null,
                gameMode: 'clicking',
                timerInterval: null,
            };
        }

        case UPDATE_BOARD: {
            const { game } = payload;

            return {
                ...state,
                shouldRerender: state.shouldRerender + 1,
                board: game,
            };
        }

        case INITILIZE_TIMER: {
            const { startTime, timerInterval } = payload;

            return {
                ...state,
                now: startTime,
                startTime: startTime,
                timerInterval: timerInterval,
            };
        }

        case UPDATE_TIMER: {
            const { now } = payload;

            return {
                ...state,
                now: now,
            };
        }

        case REMOVE_CACHED_BOARD: {

            return {
                ...state,
                timerInterval: null,
                now: null,
                isSet: false,
                startTime: null,
                game: {
                    board: []
                },
                difficulty: EASY,
            };
        }
        case TOGGLE_GAME_MODE: {
            const newMode = state.gameMode === 'clicking' ? 'flagging' : 'clicking';

            return {
                ...state,
                gameMode: newMode,
            };
        }
        case SET_GAME_DIFFICULTY: {
            const { difficulty } = payload;
            return {
                ...state,
                difficulty: difficulty,
                inSetupMode: false,
                inMainMenu: false,
                inGame: true,
            };
        }
        case SETUP_NEW_GAME: {
            return {
                ...state,
                inSetupMode: true,
                inMainMenu: false,
                inGame: false,
            }
        }

        case MAIN_MENU: {
            return {
                ...state,
                inSetupMode: false,
                inMainMenu: true,
                inGame: false,
            }
        }

        case CONTINUE_GAME: {
            return {
                ...state,
                inSetupMode: false,
                inMainMenu: false,
                inGame: true,
            }
        }
        default: {
            return state;
        }
    }
};