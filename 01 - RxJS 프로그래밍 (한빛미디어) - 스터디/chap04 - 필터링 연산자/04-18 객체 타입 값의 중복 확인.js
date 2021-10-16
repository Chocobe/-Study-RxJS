const { of } = require("rxjs");
const { distinct, map } = require("rxjs/operators");

const obj = [
  { id: 1, value: 20 },
  { id: 2, value: 40 },
  { id: 3, value: 70 },
  { id: 1, value: 20 },
  { id: 2, value: 40 },
  { id: 3, value: 70 },  
];

of(...obj).pipe(
  distinct(),
  map(obj => obj.value),
).subscribe(value => console.log(`result: ${value}`));
