const { Observable } = require("rxjs");

const observableCreated$ = Observable.create(observer => {
  try {
    observer.next(1);
    observer.next(2);
    throw("throw error test");
  } catch(error) {
    observer.error(error);
  } finally {
    observer.complete();
  }
});

observableCreated$.subscribe({
  next: item => console.log(item),
  error: error => console.log(`error: ${error}`),
  complete: () => console.log("complete"),
});