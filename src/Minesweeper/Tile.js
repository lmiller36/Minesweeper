/* eslint-disable complexity */
class Tile {
    constructor(oldTile, isBomb, index) {
        if (oldTile) {
            this.setProps(oldTile);
            return;
        }
        this.isBomb = isBomb;
        this.status = 0;
        this.index = index;
        this.isOpened = false;
        this.numBombs = 0;
        this.isFlagged = false;
    }

    /** Setters **/

    setStatus(status) {
        this.status = status;
    }

    setIndex(index) {
        this.index = index;
    }

    setCoords(coords) {
        this.coords = coords;
    }

    click(game, gameMode) {
        if (this.isOpened) {
            game.openNeighbors(this);
            return;
        }

        if (gameMode.flagging) {
            this.flagTile();
            return;
        }

        if (this.isFlagged) {
            return;
        }

        if (this.isBomb) {
            game.lose();
            return;
        }

        game.clickTile(this);
    }

    setProps(oldTile) {
        const keys = Object.keys(oldTile);
        for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
            const key = keys[keyIndex];
            this[key] = oldTile[key];
        }
    }

    incStatus() {
        this.status++;
    }

    flagTile() {
        this.isFlagged = !this.isFlagged;
        this.incStatus();
    }


}

export default Tile;