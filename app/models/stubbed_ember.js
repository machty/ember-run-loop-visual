
var slice = [].slice;

var StubbedEmber = Ember.create(Ember);

var FakeRunLoop = Ember.Object.extend({
  isRunning: false,
  currentQueue: null,
  currentQueueIndex: -1,
  queues: Ember.run.queues.map(function(queueName) {
    return { name: queueName, actions: [] };
  }),
  isFlushing: Ember.computed.bool('currentQueue'),

  schedule: function(queueName, action, once) {
   var queue = this.queues.findProperty('name', queueName);

   // TODO: once

   queue.actions.pushObject(action);
  },

  nextStep: function() {
    if (!this.get('isRunning')) { return; }

    if (!this.get('isFlushing')) {
      // Run block code.
    } else {
      // Find the first non-empty queue.
      var index = 0, queues = this.get('queues');
      for (var len = queues.length; index < len; ++index) {
        if (queues[index].actions.length) {
          break;
        }
      }
      if (index === queues.length) { index = -1; }

      if (this.get('currentQueueIndex') !== index) {
        // Current queue index has changed, consider
        // this a stand-alone step that we can animate.
        this.set('currentQueueIndex', index);
        return;
      }

      var queue = queues[index];
      queue.actions.shiftObject();
    }
  }
});

var runLoop = StubbedEmber.fakeRunLoop = FakeRunLoop.create();

function normalize() {
  var args = [].slice.call(arguments),
      target = args.shift(),
      fn;

  if (typeof target === 'function') {
    fn = target;
    target = null;
  } else {
    args.shift();
    fn = args.shift();
  }

  return {
    target: target,
    fn: fn,
    args: args
  };
}

StubbedEmber.run = function(fn) {
  //runLoop.begin();
  fn();
  //runLoop.end();
};

StubbedEmber.run.schedule = function(queueName) {
  runLoop.schedule(queueName, normalize.apply(null, slice.call(arguments, 1)), false);
};

StubbedEmber.run.scheduleOnce = function(queueName, args) {
  runLoop.schedule(queueName, normalize.apply(null, slice.call(arguments, 1)), true);
};

StubbedEmber.run.once = function(queue, args) {
  StubbedEmber.run.scheduleOnce.apply(null, ['actions'].concat([].slice.call(arguments)));
};

StubbedEmber.run.next = function() {
  alert("run.next hasn't been implemented.");
};

StubbedEmber.run.later = function() {
  alert("run.later hasn't been implemented.");
};

export default StubbedEmber;
