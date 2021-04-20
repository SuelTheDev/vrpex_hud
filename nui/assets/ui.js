$(() => {
    setInterval(() => {
        let n = getRandomInt(0, 64)
        $('.item-display').css("width", `${n}px`)
        $('.item-display').css("height", `${n}px`)
    }, 2000);
});


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }