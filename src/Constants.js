
export const EASY = {
    rows: 9,
    cols: 9,
    numBombs: 10,
    key: "EASY"
};

export const MEDIUM = {
    rows: 16,
    cols: 16,
    numBombs: 40,
    key: "MEDIUM"
};

export const HARD = {
    rows: 30,
    cols: 16,
    numBombs: 99,
    key: "HARD"
};

export const DIFFICULTIES = {
    "EASY": EASY,
    "MEDIUM": MEDIUM,
    "HARD": HARD,
}

// Page States
export const MAIN_MENU = "MAIN_MENU";
export const SETUP_NEW_GAME = "SETUP_NEW_GAME";
export const IN_GAME_FIRST_CLICK = "IN_GAME_FIRST_CLICK";
export const IN_GAME = "IN_GAME";
export const HOW_TO_PLAY = "HOW_TO_PLAY"

export const ALL_PAGES = [MAIN_MENU, SETUP_NEW_GAME, IN_GAME_FIRST_CLICK, IN_GAME, HOW_TO_PLAY];