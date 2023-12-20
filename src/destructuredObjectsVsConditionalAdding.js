const benchmark = require('benchmark');

const suite = new benchmark.Suite;

const event = {
  filters: 'value',
  fields: 'field1,field2'
};

suite.add('Conditional deconstruction', () => {
  const obj = {
    ...(event.filters && { filters: event.filters }),
    ...(event.fields && { fields: event.fields }),
    ...(event.sortable && { sort: event.sortable }),
    ...(event.id && { zapId: event.id })
  };
})
.add('Conditional object append', () => {
  const obj = {};
  if (event.filters) { obj.filters = event.filters; }
  if (event.fields) { obj.fields = event.fields; }
  if (event.sortable) { obj.sortable = event.sortable; }
  if (event.id) { obj.id = event.id; }
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
