var app = app || {};

app.ExercisesView = Backbone.View.extend({
    template: _.template($('#exercise-selection-template').html()),

    events: {
        'keyup .search' : 'search'
    },

    initialize: function(options) {
        options = options || {};
        this.collection = options.collection || new app.Collection.Exercises([]);

 		this.collection.on('reset add remove', function(){
 			this.render();
 		}, this);
    },

    render: function(options) {
        this.$el.html(this.template());
        options = options || {};
        var collection = options.collection || this.collection;
        this.$exercises = this.$('.exercises');
        this.$search = this.$('.search');

        if(options.filtered && options.searchVal){
            this.$search.val(options.searchVal);
            this.$search.focus();
        }

       

        collection.each(function(item) {
            this.renderItem(item);
        }, this);

        return this;

    },

    renderItem: function(item) {
        var exerciseView = new app.ExerciseListItemView({
            model: item
        });
         this.$exercises.append(exerciseView.render().el);
    },

    search: function(e){
        var val = $(e.currentTarget).val();
        this.render({collection: this.collection.search({text: {val: val}}), filtered: true, searchVal: val});
    }
});
