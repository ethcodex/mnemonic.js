const Words = require('./words.json')

/**
 * Fisher-Yates Shuffle 
 *
 * @param {string[]} array
 * @returns {string[]}
 */
function shuffle(array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

module.exports = (n) => {
    if (n < 1) n = 1
    for (; n > 0; n--) {
        shuffle(Words)
    }
    return Words
}