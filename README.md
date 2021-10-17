##### top
# RxJS 스터디

# 목록

* [01. Observable](#01)



<br/><hr/><br/>



##### 01
# 01. Observable

## 01-01. ``of`` 생성기

``of`` 는 인자로 넘겨준 값을 그대로 발행하는 Observable 입니다.

> [예제](02%20-%20얄코%20RxJS%20(인프런)/01%20-%20반응형%20프로그래밍과%20ReactiveX/01-01%20of%20생성기.js)

```javascript
const { of } = require("rxjs");

const obs$ = of(1, 2, 3, 4, 5);
obs$.subscribe(value => console.log(`of로 받은 값: ${value}`));
```



<br/><br/>



## 01-02. ``from`` 생성기

``from`` 은 인자로 배열을 받으며, 요소 각각을 발행 합니다.

```javascript
const { from } = require("rxjs");

const obs$ = from([1, 2, 3, 4, 5]);
obs$.subscribe(value => console.log(`from 에서 받은 값: ${value}`));
```



<br/><br/>



## 01-03 ``range`` 생성기

``range`` 는 시작 정수값 부터 1씩 증가하는 값을 특정 개수만큼 순서대로 발행 합니다.

```javascript
// range(시작정수, 발행개수): number

const { range } = require("rxjs");

const obs$ = range(11, 5);
obs$.subscribe(value => console.log(`range 에서 받은 값: ${value}`));
```



<br/><br/>



## 01-04 ``generate`` 생성기

``for 문`` 과 유사한 반복 루프를 생성할 수 있습니다.

``range 생성기`` 는 시작값과 개수만 정할 수 있었기 때문에, 1씩 증가하는 값만 생성 할 수 있었던 반면, ``generate`` 는 증감값도 정할 수 있습니다.

```javascript
const { generate } = require("rxjs");

const obs$ = generate({
  initialState: 0,
  condition: i => i < 10,
  iterate: i => ++i,
});

obs$.subscribe(i => console.log(`i: ${i}`));
```



<br/><br/>



## 01-05. ``interval`` 생성기

인자로 넘겨준 ms값만큼 간격을 두고, 0부턴 정수값을 발행 합니다.

```javascript
const { interval } = require("rxjs");

const obs$ = interval(1000);
obs$.subscribe(result => console.log(`interval 값: ${result}`));
```



<br/><br/>



## 01-06. ``timer`` 생성기

``interval`` 과 유사하지만, 첫 값을 발행할 때 대기 ms도 설정할 수 있습니다.

```javascript
const { timer } = require("rxjs");

const obs$ = timer(500, 1000);
obs$.subscribe(result => console.log(`timer 값: ${result}`));
```



<br/><br/>



## 01-07. ``fromEvent`` 생성기

DOM 요소에 Event Handler를 다를 수 있습니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RxJS - fromEvent</title>

    <script src="https://unpkg.com/@reactivex/rxjs/dist/global/rxjs.umd.js"></script>
  </head>

  <body>
    <h1>RxJS - fromEvent()</h1>

    <input type="text" class="myInput">

    <script>
      const myInput = document.querySelector(".myInput");

      const clickObs$ = rxjs.fromEvent(document, "click")
        .subscribe(() => console.log("🐫 클릭!!"));

      const inputObs$ = rxjs.fromEvent(myInput, "input")
        .subscribe(value => console.log(`입력값: ${value.target.value}`));
    </script>
  </body>
</html>
```



<br/>

[🔺 Top](#top)

<hr/><br/>
