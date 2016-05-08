var app = app || {};

app.RoutineView = Backbone.View.extend({
    template: _.template($('#routine-template').html()),

    events: {},

    initialize: function(options) {
        this.childViews = [];
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

        this.childViews.push(this.blocksView);
        //append views to elements
        this.blocksView.render();
        return this;
    },
     onClose: function() {
        _.each(this.childViews, function(childView) {
            childView.remove();
            childView.unbind();
            if (childView.onClose) {
                childView.onClose();
            }
        });
    }

});
