const benchmark = require('benchmark');

const suite = new benchmark.Suite;

const event = {
  filters: 'value',
  fields: 'field1,field2',
  key1: 'value 1',
  key2: 'value2',
  key3: 'value3',
  key4: 'value4',
  key5: 'value5',
  key6: 'value6',
  key7: 'value7',
  key8: 'value8',
  key9: 'value9',
  key10: 'value10',
  key11: 'value11',
  key12: 'value12',
  key13: 'value13',
  key14: 'value14',
  key15: 'value15',
  key16: 'value16',
  key17: 'value17',
  key18: 'value18',
  key19: 'value19',
  key20: 'value20',
};
console.log('Number of keys in object - ', Object.keys(event).length);

suite.add('Object copying by destructuring', () => {
  const newObj = {
    ...event,
    ...{ properties: 'value' }
  };
})
.add('Object.assign', () => {
  Object.assign({}, event, { properties: 'value' });
})
.add('Individually setting all keys of existing object on new object', () => {
  const newObj = {};
  Object.keys(event).forEach(key => {
    newObj[key] = event[key];
  });
  newObj.properties = 'value';
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
