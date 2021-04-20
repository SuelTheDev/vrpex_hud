$(() => {
    setInterval(() => {
        let n = getRandomInt(0, 64)
        $('.item-display').css("width", `${n}px`)
        $('.item-display').css("height", `${n}px`)
    }, 2000);

    redraw()
});

let speed = 0;
let tacho = 0;
let gas = 0;
let mileage = 0;

let turnSignalsStates = {
    'left':  true,
    'right': true
}

let iconsStates = {
    // main circle
    'dippedBeam': 1,
    'brake':      1,
    'drift':      1,
    'highBeam':   1,
    'lock':       1,
    'seatBelt':   1,
    'engineTemp': 2,
    'stab':       1,
    'abs':        1,
    // right circle
    'gas':        2,
    'trunk':      1,
    'bonnet':     1,
    'doors':      1,
    // left circle
    'battery':    2,
    'oil':        2,
    'engineFail': 2
}

function redraw() {
    draw(speed, tacho, gas, mileage, turnSignalsStates, iconsStates);
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}