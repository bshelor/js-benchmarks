const benchmark = require('benchmark');

const suite = new benchmark.Suite;

const originalArray = [];
const ARRAY_SIZE = 500;
const OBJECT_SIZE = 1000;
for (let i = 0; i < ARRAY_SIZE; i++) {
  const objectToPush = {};
  for (let o = 0; o < OBJECT_SIZE; o++) {
    objectToPush[`property${o}`] = `value${o}`;
  }
  originalArray.push(objectToPush);
}

suite.add('push copy of array', () => {
  const newArray = [];
  newArray.push(...originalArray);
  return newArray;
})
.add('loop original array and push', () => {
  const newArray = [];
  for (let i = 0; i < originalArray.length; i++) {
    newArray.push(originalArray[i]);
  }
  return newArray;
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
