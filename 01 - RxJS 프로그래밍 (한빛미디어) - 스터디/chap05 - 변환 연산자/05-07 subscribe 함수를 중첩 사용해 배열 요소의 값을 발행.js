const { timer, range } = require("rxjs");
const { map } = require("rxjs/operators");

const requests = [
  timer(Math.floor(Math.random() * 2000)).pipe(map(() => "req1")),
  timer(Math.floor(Math.random() * 1000)).pipe(map(() => "req2")),
  timer(Math.floor(Math.random() * 1500)).pipe(map(() => "req3")),
];

range(0, requests.length).subscribe(i => {
  requests[i] && requests[i].subscribe(request => console.log(`response from ${request}`));
});
