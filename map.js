export let TILE_SIZE = 15;

export let tiles = {
    0: {color: '#ff0000'},
    1: {color: '#0000ff'},
    2: {color: '#00ff00'}
};

export let map = {

    columns: 45,
    rows: 23,
    height: 23 * TILE_SIZE,
    width: 45 * TILE_SIZE,
    widthHeightRatio: 45 / 23,

    tiles: new Array(45 * 23).fill(0) // 1d tile map

};