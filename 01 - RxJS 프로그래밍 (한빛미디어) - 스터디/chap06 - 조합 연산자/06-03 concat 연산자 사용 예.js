const { timer, concat } = require("rxjs");
const { map } = require("rxjs/operators");

const req1 = timer(Math.floor(Math.random() * 2000)).pipe(map(() => "req1"));
const req2 = timer(Math.floor(Math.random() * 1000)).pipe(map(() => "req2"));
const req3 = timer(Math.floor(Math.random() * 1500)).pipe(map(() => "req3"));

concat(req1, req2, req3).subscribe(result => console.log(`result: ${result}`));
