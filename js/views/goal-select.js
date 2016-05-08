var app = app || {};

app.GoalSelectView = Backbone.View.extend({
    template: _.template($('#goal-select-template').html()),

    events: {
        'click .add': 'addBlock'
    },

    initialize: function(options) {
        Backbone.pubSub.on('select-block', this.selectBlock, this);
        this.childViews = [];
    },

    render: function() {
        this.$el.html(this.template());
        this.$training_days = this.$('.training-days');
        this.$goal_days = this.$('.goal-days');
        this.$daySelectBtn = this.$('.num-training-days');
        this.$intensitySelectBtn = this.$('.training-intensity');
        this.$goal_modal = this.$('#goal-modal');
        this.$blocks = this.$('.blocks');
        this.$next_btn = this.$('.button.next');
        this.intensity_select_btn_text = this.$intensitySelectBtn.text();
        this.day_select_btn_text = this.$daySelectBtn.text();
        this.goal = '';
        this.numTrainingDays = 3;
        this.training_days = [];
        this.monthly_goals = {};

        //initialize events that occur in modal
        (function(that) {
            that.$goal_modal.find('.goal-select-btn').on('click', function(e) {
                that.selectGoal(e);
            });
        })(this);


        this.blocksView = new app.BlocksView({
            el: this.$blocks[0],
            collection: app.BlockCollection,
            itemView: app.BlockView,
            editable: true,
            hideCompleted: true,
            routable: false
        });

        this.childViews.push(this.blocksView);

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

        Backbone.pubSub.off('select-block');
        this.$goal_modal.find('.goal-select-btn').off('click');
    },

    selectNumTrainingDays: function(e) {
        this.numTrainingDays = parseInt($(e.currentTarget).text());
        this.$daySelectBtn.text(this.day_select_btn_text + ': ' + this.numTrainingDays);
        this.renderTrainingDays();
    },

    selectGoal: function(e) {
        this.goal = $(e.currentTarget).attr('data-goal');
        this.$goal_modal.foundation('reveal', 'close');
        Backbone.pubSub.trigger('set-goal', this.goal);
    },

    selectBlock: function(e) {
        this.$goal_modal.foundation('reveal', 'open');
    },

    addBlock: function(e) {
        e.stopPropagation();
        var block = new app.Block({
            editable: true,
            routable: false,
            id: app.BlockCollection.length + 1
        });
        app.BlockCollection.add(block);
    }
});
