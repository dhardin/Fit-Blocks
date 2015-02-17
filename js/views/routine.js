var app = app || {};

app.RoutineView = Backbone.View.extend({
    template: _.template($('#routine-template').html()),

    events: {},

    initialize: function(options) {

    },

    render: function() {
        this.$el.html(this.template());

        this.$blocks = this.$('.blocks');
       
   		this.blocksView = new app.BlocksView({
            el: this.$blocks[0],
            collection: app.BlockCollection,
            itemView: app.BlockView,
            editable: false,
            routable: true
        });

        //append views to elements
        this.blocksView.render();
        return this;
    }

});
