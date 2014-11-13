# Static Demo

- order: 0

---

<link rel="stylesheet" type="text/css" href="../theme/default/star.css" media="all" />

## Static Star Demo

<div id="static-demo"></div>

````javascript
seajs.use('index', function(Star) {
  var star = new Star("#static-demo");
  star.on("check", function(value){
    star.val(value);
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
