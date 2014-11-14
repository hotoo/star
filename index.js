
var $ = require("jquery");
var Events = require("evt");

var DEFAULT_OPTIONS = {
  length: 1,
  direction: "_",
  value: 0
}

function StarList(options){
  options = $.extend(DEFAULT_OPTIONS, options);
  this.length = options.length;
  this.direction = options.direction;
  this.value = options.value;
  this._evt = new Events(this);
}

StarList.prototype.hover = function(value){
  var starList = this.element.find('>li');
  for(var i=0,l=starList.length; i<l; i++){
    var itemValue = parseInt($(starList[i]).attr("value"), 10);
    if (itemValue <= value) {
      $(starList[i]).addClass("hover");
    } else {
      $(starList[i]).removeClass("hover");
    }
  }
}
StarList.prototype.val = function(){
  if (arguments.length === 1) { // SET VALUE.
    var value = parseInt(arguments[0], 10);
    if (value > this.length){
      throw new Error("invaild value.");
    }
    this.value = value;
    this.hover(value);
  } else { // GET VALUE.
    return this.value;
  }
};

StarList.prototype.valueOf = function(){

  if (this.element) {
    return this.element;
  }

  var me = this;

  var list = '<ol class="star ' + (this.direction === "|" ? "star-horizontal" : "star-vertical") + '">';
  for(var i=0,l=this.length; i<l; i++){
    list += '<li class="star-item" value="' + (this.direction === "|" ? l-i : i+1) + '"></li>';
  }
  list += '</ol>';

  this.element = $(list);
  var starList = this.element.find(">li");

  starList.mouseover(function(evt){
    var value = parseInt($(evt.target).attr("value"), 10);
    me._evt.emit("hover", value);
    me._evt.emit("mouseover", value);
    evt.stopPropagation();
    return false;
  })
  .mouseout(function(evt){
    me._evt.emit("hover", me.value);
    evt.stopPropagation();
    return false;
  })
  .click(function(evt){
    var value = parseInt($(evt.target).attr("value"), 10);
    me._evt.emit("check", value);
    return false;
  });
  this.element.mouseout(function(evt){
    me._evt.emit("mouseout");
  });

  this.val(this.value);

  return this.element;
};

StarList.prototype.on = function(eventName, handler){
  this._evt.on(eventName, handler);
  return this;
};
StarList.prototype.off = function(eventName, handler){
  this._evt.off(eventName, handler);
  return this;
};


function Star(element, options){
  options = $.extend(DEFAULT_OPTIONS, options);
  var me = this;
  this.element = $(element);
  this.length = options.length;
  this.direction = options.direction;
  this.value = options.value;
  this._evt = new Events(this);

  if (this.direction === "_") {
    this.starlist = new StarList({
      length: options.length,
      value: options.value,
      direction: options.direction
    });
    this.starlist.on("hover", function(value){
      me.starlist.hover(value);
    }).on("check", function(value){
      me.getFloatLayer().hide();
    });

    this.element.append(this.starlist.valueOf());

  } else {

    var fixedElement = new StarList({
      length: 1,
      value: this.value ? 1 : 0,
      direction: this.direction
    });

    this.starlist = new StarList({
      length: this.length,
      value: this.value,
      direction: this.direction
    });
    this.starlist.on("mouseout", function(){
      me.getFloatLayer().hide();
    }).on("hover", function(value){
      me.starlist.hover(value);
    });

    fixedElement.on("hover", function(){

      var offset = $(me.element).offset();
      var starItemWidth = me.starlist.valueOf().find(">li").width();
      var valueOffset;
      if (me.direction === "-") {
        valueOffset = (me.value - 1) * starItemWidth;
      } else {
        valueOffset = (me.value) * starItemWidth;
      }

      me.getFloatLayer().append(me.starlist.valueOf()).css({
        left: me.direction === "-" ? offset.left - valueOffset : offset.left,
        top: me.direction === "|" ? offset.top - (starItemWidth * me.length - valueOffset) : offset.top + 1
      }).show();
    });
    this.element.append(fixedElement.valueOf());
  }
}

Star.prototype = {
  on: function(eventName, handler){
    this.starlist.on(eventName, handler);
    return this;
  },
  off: function(eventName, handler){
    this.starlist.off(eventName, handler);
    return this;
  },
  val: function(){
    // set value.
    if (arguments.length === 1) {
      var value = parseInt(arguments[0], 10);
      if (value > this.length){
        throw new Error("invaild value.");
      }
      this.value = value;
      this.starlist.val(value);
    } else {
      return this.value;
    }
  },
  getFloatLayer: function (){
    return this.FLOAT_LAYER ||
      (this.FLOAT_LAYER = $('<div class="star-float-layer">').appendTo(document.body));
  }
};



module.exports = Star;
