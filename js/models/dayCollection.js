var app = app || {};
app.Collection = app.Collection || {};

app.Collection.Days  = Backbone.Collection.extend({
    model: app.Day,
   
    initialize: function () {
    }                                                                          
});