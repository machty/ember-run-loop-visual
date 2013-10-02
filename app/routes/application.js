import StubbedEmber from 'appkit/models/stubbed_ember';

var ApplicationRoute = Ember.Route.extend({
  model: function() {
    return Ember.run.queues;
  },
  setupController: function(controller, queues) {
    controller.setProperties({
      currentQueueName: queues[0],
      model: queues
    });

    Ember.run.later(controller, 'set', 'currentQueueName', 'actions', 1000);
  },
  actions: {
    runCode: function() {
      var Ember = StubbedEmber;
      eval(this.controller.get('code'));
    }
  }
});

export default ApplicationRoute;
