const {
  fromEvent,
  merge,
  interval,
  iif,
  EMPTY,
  BehaviorSubject,
} = rxjs;

const {
  pluck,
  tap,
  startWith,
  scan,
  mergeMap,
  take,
  switchMap,
  auditTime,
} = rxjs.operators;

const $myCanvas = document.querySelector("#myCanvas");
const context = $myCanvas.getContext("2d");

context.lineWidth = 10;
context.strokeStyle = "#ff1493";
context.font = "30px sans-serif";

const mapTypeSubject = new BehaviorSubject("mergeMap");

merge(
  fromEvent(document.querySelector("#mergeMap"), "click"),
  fromEvent(document.querySelector("#concatMap"), "click"),
  fromEvent(document.querySelector("#switchMap"), "click"),
).pipe(
  pluck("target", "value"),
).subscribe(mapTypeSubject);

mapTypeSubject.pipe(
  switchMap(mapType => fromEvent($myCanvas, "click").pipe(
    startWith({ x1: null, y1: null, x2: null, y2: null }),
    scan((acc, cur) => ({
      x1: acc.x2,
      y1: acc.y2,
      x2: cur.x,
      y2: cur.y,
    })),
    rxjs.operators[mapType](demensions => iif(
      () => demensions.x1 === null,
      EMPTY,
      interval(10).pipe(
        startWith({
          x1: demensions.x1,
          y1: demensions.y1,
          x2: demensions.x1,
          y2: demensions.y1,
        }),
        scan(acc => ({
          x1: acc.x1,
          y1: acc.y1,
          x2: acc.x2 + (demensions.x2 - demensions.x1) / 100,
          y2: acc.y2 + (demensions.y2 - demensions.y1) / 100,
        })),
        take(100),
      ),
    )),
  )),
).subscribe(drawLine);

mapTypeSubject.subscribe(mapType => {
  context.clearRect(0, 0, 600, 360);
  context.fillText(mapType, 20, 40);
});

function drawLine({ x1, y1, x2, y2 }) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

fromEvent($myCanvas, "mousemove").pipe(
  auditTime(1000 / 60),
).subscribe(drawIndicator);

function drawIndicator({ x, y }) {
  const originLineWidth = context.lineWidth;
  const originStrokeStyle = context.strokeStyle;
  
  context.fillStyle = "#383841";
  context.fillRect(590, 0, 10, 360);
  context.fillRect(0, 350, 600, 10);

  context.lineWidth = 5;
  context.strokeStyle = "#03a9f4";
  
  context.beginPath();
  context.moveTo(590, y);
  context.lineTo(600, y);
  context.stroke();

  context.beginPath();
  context.moveTo(x, 350);
  context.lineTo(x, 360);
  context.stroke();

  context.lineWidth = originLineWidth;
  context.strokeStyle = originStrokeStyle;
}