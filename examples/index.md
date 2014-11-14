# Demo

- order: 0

---

<link rel="stylesheet" type="text/css" href="../theme/default/star.css" media="all" />

## Static Star Demo

<div id="static-demo"></div>

````javascript
seajs.use('index', function(Star) {
  var stared = false;
  var star = new Star("#static-demo");
  star.on("check", function(value){
    if (stared) {
      stared = 0;
    } else {
      stared = 1;
    }
    star.val(stared);
  });
});
````

<div id="static-demo-2"></div>

````javascript
seajs.use('index', function(Star) {
  var star = new Star("#static-demo-2", {length: 5, value: 3});
  star.on("check", function(value){
    star.val(value);
  });
});
````

<div id="static-demo-3"></div>

````javascript
seajs.use('index', function(Star) {
  var star = new Star("#static-demo-3", {length: 5});
  star.val(4);
  star.on("check", function(value){
    star.val(value);
  });
});
````

## Float and Horizontal Star Demo

<div id="float-demo-1"></div>

````javascript
seajs.use('index', function(Star) {
  var star = new Star("#float-demo-1", {
    direction: "-",
    length: 5
  });
  star.on("check", function(value){
    star.val(value);
  });
});
````

## Float and Vertical Star Demo

<div id="float-demo-2"></div>

````javascript
seajs.use('index', function(Star) {
  var star = new Star("#float-demo-2", {
    direction: "|",
    length: 5,
    value: 2
  });
  star.on("check", function(value){
    star.val(value);
  });
});
````
