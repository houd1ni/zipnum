const abc = '0123456789abcdefghijklmnopqrstuvwxyzABC';
const abclen = abc.length;
const abcln = abclen-1;
const { floor } = Math;
const c2pos = Object.fromEntries(abc.split('').map((v, i) => [v, i]));

var zipnum = (n) => {
  let s = '';
  while(n > 0) {
    s = abc[n%(abcln+1)] + s;
    n = floor(n/(abcln+1));
  }
  return s;
};

var unzipnum = (s) => {
  if(false) return parseInt(s, abclen);
  const len = s.length;
  let n = 0;
  for(let i=0; i<len; i++)
    n += c2pos[s[i]] * Math.pow(abclen, (len-i-1));
  return n;
};


// ---

const getStr1 = () => {
  let s = '';
  for(let i=0; i<5; i++)
    s += abc[Math.floor(Math.random()*abcln)];
 return s;
 };
 var output=unzipnum(getStr1());

// --- 

const getStr2 = () => {
  let s = '';
  for(let i=0; i<10; i++)
    s += abc[Math.floor(Math.random()*abcln)];
 return s;
 };
 getStr2();