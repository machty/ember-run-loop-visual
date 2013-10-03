var slice = [].slice;

var StubbedEmber = Ember.create(Ember);

var FakeRunLoop = Ember.Object.extend({
  currentQueueIndex: 0,
  isPlaying: false,
  queues: Ember.run.queues.map(function(queueName) {
    return { name: queueName, actions: [] };
  }),

  schedule: function(queueName, action, once) {
   var queue = this.queues.findProperty('name', queueName);

   // TODO: once

   queue.actions.pushObject(action);
  },

  nextStep: function() {
    var currentQueueIndex = this.get('currentQueueIndex'),
        queues = this.get('queues'),
        index;

    for (index = 0; index < currentQueueIndex; ++index) {
      if (queues[index].actions.length) {
        // Backtrack.
        this.set('currentQueueIndex', index);
        return;
      }
    }

    var queue = queues[index];
    if (queue.actions.length === 0) {
      currentQueueIndex += 1;
      if (currentQueueIndex === queues.length) {
        this.set('isPlaying', false);
        this.set('currentQueueIndex', 0);
      } else {
        this.set('currentQueueIndex', currentQueueIndex);
      }
      return;
    }

    var action = queue.actions.shiftObject();
    action.fn.apply(action.target, action.args);
  },

  play: function() {
    this.set('isPlaying', true);
    this.nextStep();

    if (this.get('isPlaying')) {
      Ember.run.later(this, 'play', 600);
    }
  }
});

var runLoop = StubbedEmber.fakeRunLoop = FakeRunLoop.create();

function normalize() {
  var args = slice.call(arguments),
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
  StubbedEmber.run.scheduleOnce.apply(null, ['actions'].concat(slice.call(arguments)));
};

StubbedEmber.run.next = function() {
  alert("run.next hasn't been implemented.");
};

StubbedEmber.run.later = function() {
  alert("run.later hasn't been implemented.");
};

export default StubbedEmber;
