
var DEFAULT_CODE = "Ember.run(function() { alert('omg') });";

var ApplicationController = Ember.ArrayController.extend({
  code: DEFAULT_CODE
});

export default ApplicationController;
