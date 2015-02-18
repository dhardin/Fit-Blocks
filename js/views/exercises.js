var app = app || {};

app.ExercisesView = Backbone.View.extend({
    template: _.template($('#exercise-selection-template').html()),

    events: {},

    initialize: function(options) {
        options = options || {};
        this.collection = options.collection || new app.Collection.Exercises([]);
        this.$exercises = this.$('.exercises');

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
        var exerciseView = new app.ExerciseListItemView({
            model: item
        });
        this.$('.exercises').append(exerciseView.render().el);
    }
});
