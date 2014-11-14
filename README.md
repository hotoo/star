# star [![spm version](http://spmjs.io/badge/star)](http://spmjs.io/package/star)

---

Web Star.

## INSTALL

```
$ spm install star --save
```

## USAGE

```js
var Star = require('star');

var star = new Star("#demo", {
  length: 5
});
star.val(3);

star.on("check", function(value){
  $.ajax("/save/star", {star: value}, function(result){
    if (result === "OK") {
      star.val(value);
    }
  });
});
```

## API

### Star(Object element, Object options)

* element: HTML Element, Selector String.
* options: Object
  * length: Number
  * value: Number

### star.val(Number value)

Set star value.

### star.on(String eventName, Function handler)

Binding events.

### star.off(String eventName [, Function handler])

Unbinding events.


## EVENTS

### check

User check star button.
