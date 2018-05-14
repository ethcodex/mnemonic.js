const mnemonic = require('./src/mnemonic')
const program = require('commander')

const assert = require('assert')

program
  .version('0.0.1')
  .option('--ascii', 'input/output is ASCII')
  .parse(process.argv);

function convert(message, from, to) {
  return (new Buffer(message, from)).toString(to)
}
  
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
