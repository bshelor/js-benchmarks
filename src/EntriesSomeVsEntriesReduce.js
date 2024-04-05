const benchmark = require('benchmark');

const suite = new benchmark.Suite;

const record = {
  filters: 'value',
  fields: 'field1,field2',
  sortable: 'sort',
  id: 'id'
};

suite.add('Object.Entries + .some()', () => {
  const entries = Object.entries(record);
  const result = entries.some(([k, v]) => false);
})
.add('Object.Entries + .reduce()', () => {
  const result = Object.entries(record).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
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
