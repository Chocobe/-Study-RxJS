const { interval, Subject } = require("rxjs");
const { take, multicast } = require("rxjs/operators");

const sourceObservable$ = interval(500).pipe(
  take(5),
);

const mySubject = new Subject();

const multi = sourceObservable$.pipe(
  multicast(mySubject),
);

multi.subscribe(value => console.log(`one: ${value}`));
multi.subscribe(value => console.log(`two: ${value}`));

mySubject.next(1);
