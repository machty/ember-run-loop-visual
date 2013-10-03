var DEFAULT_CODE = [
  "function foo() {",
  "  Ember.run.once(function() { console.log('FOO!'); });",
  "}",
  "",
  "function bar() {",
  "  Ember.run.schedule('afterRender', function() { console.log('BAR!'); });",
  "}",
  "",
  "Ember.run(function() {",
  "  Ember.run.schedule('render', function() {",
  "    Ember.run.scheduleOnce('sync', foo);",
  "    Ember.run.scheduleOnce('actions', bar);",
  "  });",
  "});"
].join("\n");

var ApplicationController = Ember.ObjectController.extend({
  code: DEFAULT_CODE,
  logs: []
});

export default ApplicationController;
