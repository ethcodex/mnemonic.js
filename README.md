# mnemonic.js

Implementation of Electrum's mnemonic in JavaScript

```
Options:

    -V, --version  output the version number
    --ascii        input/output is ASCII
    --words        generate a new words list
    -h, --help     output usage information
```

## usage
* encode hex number to mn
```sh
$ mnemonic 0x123a
# never simply revenge help
$ mnemonic 123a
# never simply revenge help
```

* decode mn to hex number
```sh
$ mnemonic never simply revenge help
# 123a
```

* encode and decode with ascii code
```sh
$ mnemonic --ascii abcde
# time became sigh stole tired pass swallow
$ mnemonic --ascii time became sigh stole tired pass swallow
# abcde
```


## generate words list to local path or HOME path
mnemonic.js will search the word list in local path or HOME path 
- ./.mnemonic.json > ~/.mnemonic.json > *buildin words list*

```sh
$ mnemonic --words > .mnemonic.json
$ mnemonic --words > ~/.mnemonic.json
```