
export const EASY = {
    rows: 9,
    cols: 9,
    numBombs: 10,
};

export const MEDIUM = {
    rows: 16,
    cols: 16,
    numBombs: 40,
};

export const HARD = {
    rows: 30,
    cols: 16,
    numBombs: 99,
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