var app = app || {};

app.SelectedExerciseListItemView = Backbone.View.extend({
    template: _.template($('#exercise-list-item-template').html()),
    className: 'panel exercise-list-item text-center',
    events: {
    	'click' : 'select'
    },

    initialize: function(options) {
    	this.on('change', this.render, this);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    },

    select: function(e){
        this.$el.toggleClass('callout');
    }
});
