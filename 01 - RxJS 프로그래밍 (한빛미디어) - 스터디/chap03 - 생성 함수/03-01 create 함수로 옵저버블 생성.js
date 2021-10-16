const { Observable } = require("rxjs");

const observableCreated$ = Observable.create(observer => {
  console.log("[observable 1 to 10] BEGIN subscribe function");

  for(let value = 1; value <= 10; value++) {
    observer.next(value);
  }

  observer.complete();

  // 여기 3개는 실행되지 않음
  observer.next(11);
  observer.error(new Error("에러"));
  observer.complete();

  // 여기는 실행 됨
  console.log("[observable 1 to 10] END subscribe function");

  return () => {
    console.log("[observable 1 to 10] unsubscribed");
  };
});

observableCreated$.subscribe({
  next: value => {
    console.log(`next value: ${value}`);
  },

  error: error => {
    console.log(`error: ${error.message}`);
  },

  complete: () => {
    console.log("complete!");
  },
});
