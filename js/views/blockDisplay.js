var app = app || {};

app.BlockDisplayView = Backbone.View.extend({
	template: _.template($('#block-display-template').html()),
	events: {},

	initialize: function(){
		 this.model.on('change', this.render, this);
		 Backbone.pubSub.on('unselect', this.unselect, this);
		 Backbone.pubSub.on('set-goal', this.setGoal, this);
	},
	
	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		this.$weeks = this.$('.weeks');
		//add week view 
		this.weeksView = new app.WeeksView({
            el: this.$weeks[0],
            collection: this.model.get('weeks'),
            itemView: app.WeekView,
            editable: true
        });

        //append views to elements
        this.weeksView.render();
		return this;
	}

	
});
