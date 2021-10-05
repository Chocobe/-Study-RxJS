const { timer, range } = require("rxjs");
const { map, take, mergeMap } = require("rxjs/operators");

const requests = [
  timer(Math.floor(Math.random() * 2000)).pipe(map(() => "req1")),
  timer(Math.floor(Math.random() * 1000)).pipe(map(() => "req2")),
  timer(Math.floor(Math.random() * 1500)).pipe(map(() => "req3")),
];

// range(0, requests.length).pipe(
//   mergeMap(i => requests[i])
// ).subscribe(req => console.log(`response from ${req}`));

const observables = [
  timer(
    Math.floor(Math.random() * 500),
    Math.floor(Math.random() * 1000 + 1000),
  ).pipe(
    map(i => ({ id: "옵저버블 01", value: i })),
    take(Math.floor(Math.random() * 5 + 1)),
  ),

  timer(
    Math.floor(Math.random() * 1000),
    Math.floor(Math.random() * 2000 + 1000),
  ).pipe(
    map(i => ({ id: "옵저버블 02", value: i })),
    take(Math.floor(Math.random() * 3 + 1)),
  ),

  timer(
    Math.floor(Math.random() * 700),
    Math.floor(Math.random() * 1500 + 500),
  ).pipe(
    map(i => ({ id: "옵저버블 03", value: i })),
    take(Math.floor(Math.random() * 4 + 1)),
  ),
];

range(0, observables.length).pipe(
  mergeMap(i => observables[i]),
).subscribe(obj => console.log(`id: ${obj.id} // value: ${obj.value}`));
