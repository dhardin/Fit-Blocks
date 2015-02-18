var app = app || {};

app.ExerciseView = Backbone.View.extend({
    template: _.template($('#exercise-template').html()),

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
        this.applyStyling();

        return this;
    },

   
    } applyStyling: function(){

    }
});
