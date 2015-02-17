var app = app || {};

app.WeeksView = Backbone.View.extend({
    template: _.template($('#week-collection-template').html()),

    events: {},

    initialize: function(options) {
        options = options || {};
        this.collection = options.collection || new app.Collection.Weeks([]);

 		this.collection.on('reset add remove', function(){
 			this.render();
 		}, this);
    },

    render: function(options) {
        var collection = (options && options.collection ? options.collection : this.collection);
        
        this.$el.html(this.template());

        collection.each(function(item) {
            this.renderItem(item);
        }, this);

        return this;

    },
    renderItem: function(item) {
        var weekView = new app.WeekView({
            model: item
        });
        this.$el.append(weekView.render().el);
    }
});
