var DEFAULT_CODE = "Ember.run(function() { alert('omg') });";

var ApplicationController = Ember.ArrayController.extend({
  code: DEFAULT_CODE,

  currentQueueName: null,

  currentQueueIndex: function() {
    return this.get('model').indexOf(this.get('currentQueueName'));
  }.property('currentQueueName')
});

export default ApplicationController;
