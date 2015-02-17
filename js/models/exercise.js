var app = app || {};

app.Exercise = Backbone.Model.extend({
    defaults: {
          name: '',
          weight: 0,
          reps: 0,
          sets: 0,
          rest: 0
    }
});
