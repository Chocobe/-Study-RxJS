const { from } = require("rxjs");
const { min } = require("rxjs/operators");

const movies = [
  { title: "영화1", avg: 5.12 },
  { title: "영화2", avg: 9.14 },
  { title: "영화3", avg: 5.12 },
];

from(movies).pipe(
  min((lhs, rhs) => lhs.avg - rhs.avg),
).subscribe(result => console.log(`min: ${JSON.stringify(result)}`));
