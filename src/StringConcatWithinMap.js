const benchmark = require('benchmark');

const suite = new benchmark.Suite;

const map = new Map();

const options = {
  onCycle: () => {
    map.clear();
    map.set('key1', 'testing strings');
  },
  onComplete: () => {
    map.clear();
  },
  onStart: () => {
    map.set('key1', 'testing strings');
  },
};

suite.add('+= in a .set()', () => {
  const string = map.get('key1');
  // const newStr = string + '; more tests on strings';
  map.set('key1', string + '; more tests on strings');
}, options)
.add('template literal in a .set()', () => {
  const string = map.get('key1');
  map.set('key1', `${string}; more tests on strings`);
}, options)
.on('complete', (results) => {
  const suiteResults = results.currentTarget;
  const fastest = suiteResults.filter('fastest').map('name');
  console.log('fastest -- ', fastest);
})
.on('cycle', event => {
  const benchmark = event.target;
  console.log(benchmark.toString());
})
.run();
