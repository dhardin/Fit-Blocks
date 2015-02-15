var app = app || {};

app.HomeView = Backbone.View.extend({
	template: _.template($('#home-template').html()),
	
	render: function () {
		this.$el.html(this.template());
		
		return this;
	}
});
