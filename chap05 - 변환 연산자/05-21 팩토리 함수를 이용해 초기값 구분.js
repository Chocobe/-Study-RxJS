const { interval } = require("rxjs");
const { scan, take, pluck } = require("rxjs/operators");

const n = 7;

const source$ = interval(500).pipe(
  take(n),
  scan((accumulation, _currentValue) => {
    let localAccumulation = accumulation;

    if(typeof localAccumulation === "function") {
      localAccumulation = localAccumulation();
    }

    const tempA = localAccumulation.a;
    localAccumulation.a = localAccumulation.b;
    localAccumulation.b = localAccumulation.b + tempA;

    return localAccumulation;
  }, () => ({ a: 1, b: 0 })),
  pluck("a"),
);

source$.subscribe(result01 => console.log(`result01: ${result01}`));

setTimeout(() => {
  source$.subscribe(result02 => console.log(`result02: ${result02}`));
}, 3100);
