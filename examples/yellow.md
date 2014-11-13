# Theme Demo: Yellow

- order: 3

---


````html
<link rel="stylesheet" type="text/css" href="../theme/yellow/star.css" media="all" />

<div id="static-demo"></div>

<script>
seajs.use('index', function(Star) {
  var star = new Star("#static-demo", {length: 5});
  star.val(4);
  star.on("check", function(value){
    star.val(value);
  });
});
</script>
````
