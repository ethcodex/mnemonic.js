const mnemonic = require('./src/mnemonic')
const program = require('commander')

const assert = require('assert')

program
  .version('0.0.1')
  // .option('-s --size <size>', 'Pizza size', /^(large|medium|small)$/i, 'medium')
  // .option('-d --drink [drink]', 'Drink', /^(coke|pepsi|izze)$/i, 'coke')
  .option('--ascii', 'input/output is ASCII')
  .parse(process.argv);

function convert(message, from, to) {
  return (new Buffer(message, from)).toString(to)
}
  
assert(program.args.length > 0, "you must input a seed or some mnemonic")

if (program.args.length === 1) {
  // encode address to mnemonic
  // let addr = ''
  // if (program.ascii) addr = convert(program.args[0], 'ascii', 'hex')
  let mn = mnemonic.encode(program.args[0])
  console.log(mn.join(' '))
}
else {
  // decode mnemonic to address
  let addr = mnemonic.decode(program.args)
  // if (program.ascii) addr = convert(addr, 'hex', 'ascii')
  console.log(addr)
}
