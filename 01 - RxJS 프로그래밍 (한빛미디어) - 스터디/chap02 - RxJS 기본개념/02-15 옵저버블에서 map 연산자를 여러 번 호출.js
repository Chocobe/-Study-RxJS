const { Observable } = require("rxjs");
const { map, toArray } = require("rxjs/operators");

const observableCreated$ = Observable.create(observer => {
  console.log("Observable BEGIN");

  const arr = [1, 2];
  arr.forEach((value, index) => {
    console.log(`current array: arr[${index}]`);
    observer.next(value);
  });

  console.log("BEFORE complete");
  observer.complete();
  console.log("Observable END");
});

const logAndGet = (originValue, curValue) => {
  console.log(`originValue: ${originValue}, curValue: ${curValue}`);
  return curValue;
};

observableCreated$.pipe(
  map(value => {
    return logAndGet(value, value * 2);
  }),
  
  map(value => {
    return logAndGet(value, value + 1);
  }),

  map(value => {
    return logAndGet(value, value * 3);
  }),

  toArray(),
).subscribe({
  next: arr => console.log(arr),
});