import { compose, split, uniq, length, equals, map, fromPairs } from "pepka"

const { floor } = Math

const hex = '0123456789abcdefghijklmnopqrstuvwxyz'

const isUniq = (s: string) => compose(equals(length(s)), length, uniq, split(''))(s)
const getc2pos = compose(fromPairs, map((v, i) => [v, i]), split(''))
const isStandard = (abc: string) => hex.startsWith(abc)

export class Zipnum {
  private abc: string
  private abclen: number
  private c2pos: {[char: string]: number}
  private standard: boolean
  /** Sets an alphabet to encode into.
   * @param {string} [newABC] - all symbols must be unique.
  */
  public setABC(newABC: string) {
    if(!isUniq(newABC)) throw new Error('Not all chars are unique!')
    this.abc = newABC
    this.abclen = newABC.length
    this.standard = isStandard(newABC)
    this.c2pos = getc2pos(newABC)
  }
  /** Zips number to a string by encoding into given alphabet.
   * @param {number} [n] - Number to zip.
  */
  public zip(n: number): string {
    const {abc, abclen} = this
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
  public unzip(s: string): number {
    const {standard, abclen, c2pos} = this
    if(standard) return parseInt(s, abclen)
    const len = s.length
    let n = 0
    for(let i=0; i<len; i++)
      n += c2pos[s[i]] * abclen**(len-i-1)
    return n
  }
  constructor(abc?: string) {
    this.setABC(abc || hex+'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  }
}

// Next lines are for v1 compatibility.
const instance = new Zipnum()
/** @deprecated Use basic const zipnum = new Zipnum(); zipnum.setABC() instead. */
export const setABC = instance.setABC.bind(instance) as Zipnum['setABC']
/** @deprecated Use basic const zipnum = new Zipnum(); zipnum.zip() instead. */
export const zipnum = instance.zip.bind(instance) as Zipnum['zip']
/** @deprecated Use basic const zipnum = new Zipnum(); zipnum.unzip() instead. */
export const unzipnum = instance.unzip.bind(instance) as Zipnum['setABC']