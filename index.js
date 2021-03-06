#!/usr/bin/env node
const mnemonic = require('./src/mnemonic')
const genWords = require('./src/genWords')
const assert = require('assert')

const program = require('commander')

program
  .version('0.0.5')
  .option('--ascii', 'input/output is ASCII')
  .option('--words <n>', 'generate a new words list, shuffle <n> times', parseInt)
  .parse(process.argv);

function convert(message, from, to) {
  return (Buffer.from(message, from)).toString(to)
}

// generate words list
if (program.words) {

  let ret = genWords(program.words)
  console.log(JSON.stringify(ret))
  process.exit(0)

}
  
// else
assert(program.args.length > 0, "you must input a seed or some mnemonic")

function addr2mn(addr, isASCII) {
  let hexAddr = isASCII
    ? convert(addr, 'ascii', 'hex')
    : addr
  let mn = mnemonic.encode(hexAddr)
  return mn
}

function mn2addr(mn, isASCII) {
  let hexAddr = mnemonic.decode(mn)
  let addr = isASCII
    ? convert(hexAddr, 'hex', 'ascii')
    : hexAddr
  return addr
}

if (program.args.length === 1) {
  // encode address to mnemonic
  let mn = addr2mn(program.args[0], program.ascii)
  let reAddr = mn2addr(mn.slice(0), program.ascii)
  if (program.ascii) {
    assert.strictEqual(reAddr, program.args[0])
  }
  else { // hex number
    assert.strictEqual(parseInt(reAddr, 16), parseInt(program.args[0], 16))
  }
  console.log(mn.join(' '))
}
else {
  // decode mnemonic to address
  let addr = mn2addr(program.args.slice(0), program.ascii)
  let reMN = addr2mn(addr, program.ascii)
  assert.deepEqual(reMN, program.args)
  console.log(addr)
}
