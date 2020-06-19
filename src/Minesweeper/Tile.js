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
    }
    setStatus(status) {
        this.status = status;
    }
    setIndex(index) {
        this.index = index;
    }
    incStatus() {
        this.status++;
        let min = this.status;
        this.status = min + 1;
    }
    setProps(oldTile) {
        let keys = Object.keys(oldTile);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            this[key] = oldTile[key];
        }
    }
}

export default Tile;