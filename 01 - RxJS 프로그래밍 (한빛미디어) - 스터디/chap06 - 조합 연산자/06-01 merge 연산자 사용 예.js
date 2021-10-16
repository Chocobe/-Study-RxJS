const { timer, merge } = require("rxjs");
const { map } = require("rxjs/operators");

const req01 = timer(Math.floor(Math.random() * 2000)).pipe(map(() => "req01"));
const req02 = timer(Math.floor(Math.random() * 1000)).pipe(map(() => "req02"));
const req03 = timer(Math.floor(Math.random() * 1500)).pipe(map(() => "req03"));

merge(req01, req02, req03).subscribe(req => console.log(`req: ${req}`));
