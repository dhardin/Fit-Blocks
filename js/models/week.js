var app = app || {};

app.Week = Backbone.Model.extend({
    defaults: {
    	id: 0,
        intensity: 1,
        MAX_INTENSITY: 8,
        days: []
    }
});
