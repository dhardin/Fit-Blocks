var app = app || {};

app.Block = Backbone.Model.extend({
    defaults: {
       id: 0,
       goal: 'N/A',
       selected: false,
       completed: false,
       editable: false,
       routable: true,
       numWeeks: 4,
       weeks: []
    }
});
