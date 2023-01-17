import test from 'ava'
import { setABC } from '../../dist/bundle.mjs'

test('checks', async (t) => {
  try {
    setABC('0123456789abcdefghijklmnopqastuvwxyz')
    t.fail('Does not fail on non-unique alphabets.')
  } catch(e) {
    t.pass()
  }
})