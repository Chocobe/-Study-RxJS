const { from } = require("rxjs");
const { max } = require("rxjs/operators");

const movies = [
  { title: "영화1", avg: 5.12 },
  { title: "영화2", avg: 9.14 },
  { title: "영화3", avg: 8.28 },
];

from(movies).pipe(
  max((lhs, rhs) => lhs.avg - rhs.avg),
).subscribe(result => console.log(`max: ${JSON.stringify(result)}`));
