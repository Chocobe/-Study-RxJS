const { EMPTY } = require("rxjs");

const obs$ = EMPTY;

obs$.subscribe({
  next: console.log,
  error: console.log,
  complete: () => console.log("컴플릿 !!"),
});
