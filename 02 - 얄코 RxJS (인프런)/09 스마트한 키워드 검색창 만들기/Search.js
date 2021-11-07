const { fromEvent, from, EMPTY } = rxjs;
const { 
  map,
  pluck,
  filter,
  switchMap,
  scan,
  distinctUntilChanged,
  debounceTime,
  onErrorResumeNext,
  catchError,
} = rxjs.operators;

const url ="http://localhost:3000/people/quarter-error";
const $searchInput = document.querySelector(".searchInput");
const $result = document.querySelector(".result");

(function init() {
  fromEvent($searchInput, "keyup").pipe(
    filter(e => e.code !== "Backspace"),
    filter(e => e.code !== "Delete"),
    pluck("target", "value"),
    filter(value => value.length > 1),
    debounceTime(500),
    map(value => ({ name: value })),
    switchMap(params => from(axios.get(url, { params })).pipe(
      // onErrorResumeNext(EMPTY),
      catchError(() => EMPTY),
    )),
    pluck("data"),
  ).subscribe(showResult);
})();

function showResult(data) {
  from(data).pipe(
    map(person => `${person.first_name} ${person.last_name}`),
    map(name => `<div>${name}</div>`),
    scan((acc, name) => acc + name, ''),
  ).subscribe(people => $result.innerHTML = people);
}
