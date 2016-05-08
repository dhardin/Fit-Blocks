var app = app || {};

app.ExercisesView = Backbone.View.extend({
    template: _.template($('#exercise-selection-template').html()),

    events: {
        'keyup .search': 'search'
    },

    initialize: function(options) {
        options = options || {};
        this.collection = options.collection || new app.Collection.Exercises([]);
        Backbone.pubSub.on('search', this.search, this);
        Backbone.pubSub.on('add-exercise', this.onAddExercise, this);
        this.itemView = options.itemView || false;
        this.show = options.show || false;
        this.routable = options.routable || false;

        this.collection.on('reset add remove', function() {
            this.render();
        }, this);
    },

    render: function(options) {
        this.$el.html(this.template());
        options = options || {};
        var collection = options.collection || this.collection;
        this.$exercises = this.$('.exercises');

        if (options.filtered && options.searchVal || options.render || this.show) {
            collection.each(function(item) {
                this.renderItem(item);
            }, this);
        }

        return this;
    },

    renderItem: function(item) {
        var exerciseView = (this.itemView ? new this.itemView({
            model: item
        }) : new app.ExerciseListItemView({
            model: item
        }));
        this.$exercises.append(exerciseView.render().el);
    },

    onAddExercise: function () {
        if (!this.show){
            this.render();
        }
    },

    search: function(options) {
        var val = '';
        options = options || options;

        val = options.val || '';
        collection = options.collection || false;

        if (collection != this.collection) {
            return;
        }

        this.render({
            collection: this.collection.search({
                text: {
                    val: val,
                    attribute: 'name'
                }
            }),
            filtered: true,
            searchVal: val
        });
    }
});
