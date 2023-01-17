import { compose, split, uniq, length, equals, map, fromPairs } from "pepka"

const { floor } = Math

let abc: string,
    abclen: number,
    c2pos: {[char: string]: number},
    standard: boolean,
    hex = '0123456789abcdefghijklmnopqrstuvwxyz'

const isUniq = (s: string) => compose(equals(length(s)), length, uniq, split(''))(s)
const getc2pos = compose(fromPairs, map((v, i) => [v, i]), split(''))
const isStandard = (abc: string) => hex.startsWith(abc)

/** Sets an alphabet to encode into.
 * @param {string} [newABC] - all symbols must be unique.
*/
export const setABC = (newABC: string) => {
  if(!isUniq(newABC)) throw new Error('Not all chars are unique!')
  abc = newABC
  abclen = abc.length
  standard = isStandard(abc)
  c2pos = getc2pos(abc)
}
setABC(hex+'ABCDEFGHIJKLMNOPQRSTUVWXYZ')

/** Zips number to a string by encoding into given alphabet.
 * @param {number} [n] - Number to zip.
*/
export const zipnum = (n: number): string => {
  let s: string = ''
  while(n > 0) {
    s = abc[n%abclen]+s
    n = floor(n/abclen)
  }
  return s || '0'
}

/** Unzips previously packed string back to a number.
 * @param {string} [s] - String to unzip.
*/
export const unzipnum = (s: string): number => {
  if(standard) return parseInt(s, abclen)
  const len = s.length
  let n = 0
  for(let i=0; i<len; i++)
    n += c2pos[s[i]] * abclen**(len-i-1)
  return n
}