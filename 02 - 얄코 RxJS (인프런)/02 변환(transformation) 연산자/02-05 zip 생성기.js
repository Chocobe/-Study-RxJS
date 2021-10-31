const { from, zip } = require("rxjs");

const numbers = [1, 2, 3, 4, 5];
const chars = ["a", "b", "c", "d", "e"];
const something = [true, false, "Z", [31, 32, 33], { name: "zip" }];

const obsNum$ = from(numbers);
const obsChar$ = from(chars);
const obsSomething$ = from(something);

zip(obsNum$, obsChar$, obsSomething$).subscribe(console.log);
