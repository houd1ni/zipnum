import test from 'ava'
import { setABC, zipnum, unzipnum } from '../../dist/bundle.mjs'

test('zip-unzip', async (t) => {
  try {
    for(let n=0; n<1e4; n++)
      if(n !== unzipnum(zipnum(n))) return t.fail('Bad unzip with ' + n)
    for(let n = 1e20; n<1e20+1e3; n++)
      if(n !== unzipnum(zipnum(n))) return t.fail('Bad unzip with ' + n)
    setABC('0123456789abcdefghijklmnopqrstuvwxyz', true)
    for(let n=0; n<1e4; n++)
      if(n !== unzipnum(zipnum(n))) return t.fail('Bad unzip with ' + n)
    for(let n = 1e20; n<1e20+1e3; n++)
      if(n !== unzipnum(zipnum(n))) return t.fail('Bad unzip with ' + n)
    t.pass()
  } catch(e) {
    t.fail(e.message)
  }
})