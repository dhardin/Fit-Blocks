var app = app || {};
app.Collection = app.Collection || {};

app.Collection.Weeks  = Backbone.Collection.extend({
    model: app.Week,
   
    initialize: function () {
    }                                                                          
});