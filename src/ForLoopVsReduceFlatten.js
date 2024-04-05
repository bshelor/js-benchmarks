const benchmark = require('benchmark');

const suite = new benchmark.Suite;

const record = {
  filters: 'value',
  fields: 'field1,field2',
  sortable: 'sort',
  id: 'id',
  Supplier_Invoice_Lines_group: [
    { supplier_invoice_id: 1, supplier_invoice_line_id: 1 },
    { supplier_invoice_id: 1, supplier_invoice_line_id: 2 },
    { supplier_invoice_id: 2, supplier_invoice_line_id: 3 },
    { supplier_invoice_id: 2, supplier_invoice_line_id: 4 },
  ],
};

suite.add('for loop flatten', () => {
  const entries = Object.entries(record);

  let flattened = {};
  for (let i = 0; i < entries.length; i++) {
    const [k, v] = entries[i];
    if (k.endsWith('_group') && Array.isArray(v)) {
      const flattenedMap = new Map();

      v.forEach(group => {
        Object.entries(group).forEach(([groupKey, groupValue]) => {
          if (flattenedMap.get(groupKey)) {
            const existingValueArray = flattenedMap.get(groupKey);
            if (!existingValueArray.includes(groupValue)) {
              existingValueArray.push(groupValue);
            }
          } else {
            flattenedMap.set(groupKey, [groupValue]);
          }
        });
      });

      flattened = {
        ...flattened,
        ...Object.fromEntries(flattenedMap),
      };
    } else {
      flattened[k] = v;
    }
  }

  return flattened;
})
.add('Reduce flatten', () => {
  return Object.entries(record).reduce((acc, [key, value]) => {
    if (key.endsWith('_group') && Array.isArray(value)) {
      const flattenedMap = new Map();

      value.forEach(group => {
        Object.entries(group).forEach(([groupKey, groupValue]) => {
          if (flattenedMap.get(groupKey)) {
            const existingValueArray = flattenedMap.get(groupKey);
            if (!existingValueArray.includes(groupValue)) {
              existingValueArray.push(groupValue);
            }
          } else {
            flattenedMap.set(groupKey, [groupValue]);
          }
        });
      });

      return {
        ...acc,
        ...Object.fromEntries(flattenedMap),
      };
    }

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
