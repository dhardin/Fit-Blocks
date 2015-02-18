var app = app || {};

app.Exercise = Backbone.Model.extend({
    defaults: {
          name: '',
          weight: [],
          reps: [],
          sets: [],
          rest: 0,
          muscles: ''
    }
});
