import StubbedEmber from 'appkit/models/stubbed_ember';

var ApplicationRoute = Ember.Route.extend({
  model: function() {
    return Ember.run.queues;
  },
  actions: {
    runCode: function() {
      //alert( this.controller.get('code'));

      var Ember = StubbedEmber;
      eval(this.controller.get('code'));
    }
  }
});

export default ApplicationRoute;
