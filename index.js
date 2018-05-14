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

if (program.args.length === 1) {
  // encode address to mnemonic
  let addr = program.ascii
    ? convert(program.args[0], 'ascii', 'hex')
    : program.args[0]
  let mn = mnemonic.encode(addr)
  console.log(mn.join(' '))
}
else {
  // decode mnemonic to address
  let hexAddr = mnemonic.decode(program.args)
  let addr = program.ascii
    ? convert(hexAddr, 'hex', 'ascii')
    : hexAddr
  console.log(addr)
}
