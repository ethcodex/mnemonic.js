const assert = require('assert')
const fs = require('fs')
const path = require('path')

/**
 * @type {string[]}
 */
let Words;

const wordsFileName = '.mnemonic.json'
let localWordsPath = path.resolve('./', wordsFileName)
let globalWordsPath = path.resolve(process.env.HOME, wordsFileName)

if (fs.existsSync(localWordsPath)) {
  Words = JSON.parse(
    fs.readFileSync(localWordsPath).toString()
  )
  console.log(localWordsPath)
}
else if (fs.existsSync(globalWordsPath)) {
  Words = JSON.parse(
    fs.readFileSync(globalWordsPath).toString()
  )
  console.log(globalWordsPath)
}
else {
  Words = require('./words.json')
}

// only use the first 1626 words,
// this value is comes from `./words.json` array.length
const N = 1626
assert(Words.length > N, "WordsList.length must be larger than " + N)

function mod(x, y) {
  return x - y * Math.floor(x / y)
}

function formatTo08x(x) {
  // formatted in hexadecimal ("%08x", x)
  return ("0000000" + ((x | 0) + 4294967296).toString(16)).substr(-8)
}

// function formatHexMessage(x) {
//   return x.match(/0x/i) ? x.slice(2) : x
// }
function formatHexMessage(value) {
  let m = value.match(/^(0x)?([0-9A-Fa-f]*)$/)
  assert(m, `value must be hex message: ${value}`)
  return m[2]
}

function getWordIndex(word) {
  let i = Words.indexOf(word)
  assert(i >= 0, `word "${word}" not exist in the list"`)
  return i
}

// Note about US patent no 5892470:
// Here each word does not represent a given digit.
// Instead, the digit represented by a word is variable, it depends on the previous word.

/**
 * encode hex message, generate a shift number in the head
 * 
 * @param {string} message 
 * @returns {string[]}
 */
function encode(message) {
  message = formatHexMessage(message)
  let out = []
  let shift = 0
  for (let i = 0; i < message.length / 8; i ++) {
    let word = message.slice(8 * i, 8 * i + 8)
    if (word.length < 8) {
      shift = 8 - word.length
      word = (word + '0000000').slice(0, 8)
    }
    let x = parseInt(word, 16)
    w1 = Math.floor(x % N)
    w2 = Math.floor((x / N + w1) % N)
    w3 = Math.floor((x / N / N + w2) % N)
    out.push(Words[w1], Words[w2], Words[w3])
  }
  out.unshift(Words[shift])
  return out
}

/**
 * decode word list, parse a shift number in the head
 * 
 * @param {string[]} wlist 
 * @returns {string}
 */
function decode(wlist) {
  let out = ''
  let shift = getWordIndex(wlist.shift())
  assert(shift >= 0 && shift <= 7, 'mnemonic must contains a shift number in the head')
  for (let i = 0; i < wlist.length / 3; i ++) {
    [word1, word2, word3] = wlist.slice(3 * i, 3 * i + 3)
    w1 = getWordIndex(word1)
    w2 = getWordIndex(word2) % N
    w3 = getWordIndex(word3) % N
    x = w1 + N * mod(w2 - w1, N) + N * N * mod(w3 - w2, N)
    out += formatTo08x(x)
  }
  return out.slice(0, out.length - shift)
}

exports.encode = encode
exports.decode = decode
