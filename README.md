# mnemonic.js

Implementation of Electrum's mnemonic in JavaScript

`
Options:

    -V, --version  output the version number
    --ascii        input/output is ASCII
    --words        generate a new words list
    -h, --help     output usage information
`

## 

## generate words list to local path or HOME path
mnemonic.js will search the word list, 
- ./.mnemonic > ~/.mnemonic > *buildin words list*

```sh
$ mnemonic --words > .mnemonic.json
$ mnemonic --words > ~/.mnemonic.json
```