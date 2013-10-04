import StubbedEmber from 'appkit/models/stubbed_ember';

var map = Ember.ArrayPolyfills.map,
    runLater = Ember.run.later;

var ApplicationRoute = Ember.Route.extend({
  model: function() {
    return StubbedEmber.fakeRunLoop;
  },
  actions: {
    runCode: function() {
      var Ember = StubbedEmber,
          console = Ember.create(window.console),
          controller = this.controller;

      console.log = function() {
        map.call(arguments, function(msg) {
          window.console.log(msg);
          controller.logs.pushObject('' + msg);
        });
      };

      eval(this.controller.get('code'));
    },

    play: function() {
      StubbedEmber.fakeRunLoop.set('isPlaying', true);
    },

    pause: function() {
      StubbedEmber.fakeRunLoop.set('isPlaying', false);
    },

    step: function() {
      StubbedEmber.fakeRunLoop.nextStep();
    }
  }
});

export default ApplicationRoute;
