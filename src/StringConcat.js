const benchmark = require('benchmark');

const suite = new benchmark.Suite;

let string = 'testing strings';

suite.add('template literals', () => {
  const result = `${string}; more tests on strings`;
})
.add('+', () => {
  const result = string + '; more tests on strings';
})
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
