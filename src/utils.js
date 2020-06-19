function random(seed) {
    if(!seed) seed = Math.random();
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

export function shuffle(arr, RANDOM_SEED) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(random(RANDOM_SEED) * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}