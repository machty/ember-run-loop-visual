
var StubbedEmber = Ember.create(Ember);

StubbedEmber.run = function(fn) {
  alert('doin it');
  fn();
};

StubbedEmber.run.schedule = function(queue, args) {

  //[].slice(arguments, 1)
};

StubbedEmber.run.scheduleOnce = function(queue, args) {
};

StubbedEmber.run.once = function(queue, args) {
};

function notImplemented() {
  alert("This method hasn't been implemented.");
}

StubbedEmber.run.next = notImplemented;

export default StubbedEmber;
