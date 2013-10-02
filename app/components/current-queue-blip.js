var QUEUE_WIDTH = 150;

var CurrentQueueBlip = Ember.Component.extend({
  attributeBindings: ['style'],

  queueIndex: null,

  style: function() {
    var leftOffset = this.get('queueIndex') * QUEUE_WIDTH;
    debugger;
    return "left: " + leftOffset + "px";
  }.property('queueIndex')
});

export default CurrentQueueBlip;
