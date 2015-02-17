var app = app || {};

app.BlocksView = Backbone.View.extend({
    template: _.template($('#block-collection-template').html()),
    className: 'row',

    events: {},

    initialize: function(options) {
        options = options || {};
        this.collection = options.collection || app.BlockCollection;
        this.hideCompleted = options.hideCompleted || false;
        this.collection.each(function(item){
            item.set({editable: options.editable || false, routable: options.routable || false});
        });

 		this.collection.on('reset add remove', function(){
 			this.renumber();
 			this.render()
 		}, this);
    },
    renumber:function() {
    	var i = 1;
    	this.collection.each(function(item){
    		item.set({id: i});
    		i++;
    	});
    },

    render: function(options) {
        var collection = (options && options.collection ? options.collection : this.collection);
        
        this.$el.html(this.template());

        collection.each(function(item) {
            if(this.hideCompleted && !item.get('completed')){
                 this.renderItem(item);
            } else if(!this.hideCompleted){
                this.renderItem(item);
            }
        }, this);

    },
    renderItem: function(item) {
        var blockView = new app.BlockView({
            model: item
        });
        this.$el.append(blockView.render().el);
    }
});
