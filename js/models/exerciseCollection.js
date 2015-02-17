var app = app || {};
app.Collection = app.Collection || {};

app.Collection.Exercises = Backbone.Collection.extend({
    model: app.Exercise,
   
    initialize: function () {
    }                                                                          
});