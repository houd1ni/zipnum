# zipnum

This is a quick number to string packer that works like 'number to hex' convertions but with arbitrary base/radix and alphabets, that defaults to 0...z...Z with base 62 that allows to safely pack large numbers to small strings.
Originally written for [WebsocketPromisify lib](https://github.com/houd1ni/WebsocketPromisify)

This is needed when you want to put numbers into strings to use all encoding bits instead of leaving most of them as copies:
'564654987' vs 'MnoIF' for example. With large quantities of them being sent via network or saved into storage, it has difference.

The library is written in Typescript and has js-doc annotations.

## Performance
According to jsben.ch tests on intel 12100 / DDR4-3200-16 @ firefox107:
  - zipping of (each time) randomly generated numbers from 0 to 1e20 is around 6.5Mops/sec (850Kops with random generation).
  - unzipping numbers of 5(big) and 10(extremely large) chars (that each loop regenerated) to numbers is like 34 Mops/sec (930kops with string generation)

## API with examples

```typescript
// Using class constructor instead of direct imports are new to ver2 to avoid settings interference.

// zipnum.ts, utils.ts or whatever:
import { Zipnum } from 'zipnum'

const zipnum = new Zipnum() // or new Zipnum(abc)

// importing and calling setABC is fully optional,
//   because it is already called with 62-length alphabet under the hood and ready.
// But you can call it with large utf-8 sequences to compress stronger.
// Argument is a new alphabet. Shortcut is to call constructor with this: new Zipnum(abc).
zipnum.setABC('0123456789abcdefghijklmnopqrstuvwxyz')
export {zipnum}

// anythingelse.ts:
import {zipnum} from './zipnum' // that zipnum.ts, utils.ts or whatever (see above).

const packedString0 = zipnum.zip(0) // -> '0'
const packedString1 = zipnum.zip(10) // -> 'a'
const packedString2 = zipnum.zip(564654987) // -> 'aq9rtm'

zipnum.setABC('abcdefghijklmnopqrstuvwxyz!@#$%^&*()_')
const packedString3 = zipnum.zip(564654987) // -> 'jmgsu@'
const unpackedNumber = zipnum.unzip(packedString3) // -> 564654987

```