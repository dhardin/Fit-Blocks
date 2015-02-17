var app = app || {};

app.DayView = Backbone.View.extend({
    template: _.template($('#day-template').html()),

    events: {
    	'click .select-btn' : 'selectDay'
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

    applyStyling: function(){
    	var intensiy_map = {
    		off: 'secondary',
    		low: 'info',
    		medium: '',
    		high: 'success'
    	}, intensity = this.model.get('intensity');
    	this.$intensity.addClass(intensiy_map[intensity]);
    	if (intensity == 'off'){
    		this.$description.addClass('hidden');
    	}
    }
});
