const { Observable } = require("rxjs");

const observable1to10$ = Observable.create(observer => {
  try {
    console.log("[observable1to10] BEGIN subscribe function");
    
    for(let value = 1; value <= 10; value++) {
      observer.next(value);

      // 오타 에러 발생 지점
      consloe.log(`observer.next(${value})`);
    }
  } catch(error) {
    observer.error(error);
  }

  // observer.complete();
  console.log("[observable1to10] END subscribe function");

  return () => {
    console.log("observable1to10 unsubscribed");
  }
});

observable1to10$.subscribe(
  value => console.log(`next value: ${value}`),
  error => console.log(`error: ${error.message}`),
  () => console.log("complete!"),
);