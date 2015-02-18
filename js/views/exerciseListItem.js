var app = app || {};

app.ExerciseListItemView = Backbone.View.extend({
    template: _.template($('#exercise-list-item-template').html()),

    events: {
    	'click .remove' : 'remove',
        'click .edit' : 'edit'
    },

    initialize: function(options) {
    	this.on('change', this.render, this);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$intensity = this.$('.intensity');
        this.$description = this.$('.description');

        return this;
    }
});
