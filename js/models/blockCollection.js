var app = app || {};
app.Collection = app.Collection || {};

app.Collection.Blocks = Backbone.Collection.extend({
    model: app.Block,
   
    initialize: function () {
    }                                                                          
});