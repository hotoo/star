
var $ = require("jquery");
var Events = require("evt");

var DEFAULT_OPTIONS = {
  length: 1,
  direction: "_",
  value: 0
}

function Star(element, options){
  options = $.extend(DEFAULT_OPTIONS, options);
  this.element = $(element);
  this.length = options.length;
  this.direction = options.direction;
  this.value = options.value;
  this._evt = new Events();

  var html = '';
  if (this.direction === "_") {
    html = makeStarList.call(this, this.length, this.value);
  } else {
    html = this.length;
  }
  this.element.html(html);
  this.val(this.value);
}

Star.prototype = {
  on: function(eventName, handler){
    this._evt.on(eventName, handler);
  },
  off: function(eventName, handler){
    this._evt.off(eventName, handler);
  },
  val: function(){
    // set value.
    if (arguments.length === 1) {
      var value = parseInt(arguments[0], 10);
      if (value > this.length){
        throw new Error("invaild value.");
      }
      this.value = value;

      var starList = $('>ol>li', this.element);
      for(var i=0,l=starList.length; i<l; i++){
        if (i <= value - 1) {
          $(starList[i]).addClass("hover");
        } else {
          $(starList[i]).removeClass("hover");
        }
      }
    } else {
      return this.value;
    }
  }
};

function makeStarList(length){
  var me = this;
  var list = '<ol class="star">';
  for(var i=0,l=length; i<l; i++){
    list += '<li class="star-item"></li>';
  }
  list += '</ol>';
  var list_element = $(list);
  var me = this;

  list_element.find(">li").mouseenter(function(evt){
    var activeItem = evt.target;

    var p = activeItem.parentNode;
    var starList = $('>li', p);
    var ishover = true;
    for(var i=0,l=starList.length; i<l; i++){
      if (ishover) {
        $(starList[i]).addClass("hover");
      } else {
        $(starList[i]).removeClass("hover");
      }
      if (starList[i] === activeItem) {
        ishover = false;
      }
    }

    evt.stopPropagation();
  })
  .mouseout(function(evt){
    var activeItem = evt.target;

    var starList = $('>li', activeItem.parentNode);
    for(var i=0,l=starList.length; i<l; i++){
      if (i <= me.value-1) {
        $(starList[i]).addClass("hover");
      } else {
        $(starList[i]).removeClass("hover");
      }
    }
    evt.stopPropagation();
  })
  .click(function(evt){
    var activeItem = evt.target;
    var starList = $('>li', activeItem.parentNode);
    var activeIndex;
    for(var i=0,l=starList.length; i<l; i++){
      if (starList[i] === activeItem) {
        me._evt.emit("check", i+1);
      }
    }
  });
  return list_element;
}

var FLOAT_LAYER;
function getFloatLayer(){
  return FLOAT_LAYER ||
    (FLOAT_LAYER = $('<div class="star-float-layer">').appendTo(document.body));
}

module.exports = Star;
