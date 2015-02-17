var app = app || {};

app.GoalSelectView = Backbone.View.extend({
    template: _.template($('#goal-select-template').html()),

    events: {
        'click .add': 'addBlock'
    },

    initialize: function(options) {

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
        this.training_days_arr = [
            ['medium', 'off', 'high', 'off', 'low', 'off', 'off'],
            ['high', 'off', 'high', 'off', 'low', 'off', 'off'],
            ['high', 'medium', 'off', 'high', 'low', 'off', 'off'],
            ['high', 'high', 'off', 'high', 'low', 'off', 'off'],
            ['high', 'medium', 'high', 'off', 'high', 'low', 'off'],
            ['high', 'high', 'high', 'off', 'high', 'low', 'off'],
            ['high', 'high', 'medium', 'high', 'high', 'low', 'off']
        ];

        //initialize events that occur in m
        (function(that) {
            that.$goal_modal.find('.goal-select-btn').on('click', function(e) {
                that.selectGoal(e, that);
            });
        })(this);

        Backbone.pubSub.on('select-block', this.selectBlock, this);

        this.blocksView = new app.BlocksView({
            el: this.$blocks[0],
            collection: app.BlockCollection,
            itemView: app.BlockView,
            editable: true,
            hideCompleted: true,
            routable: false
        });

        //append views to elements
        this.blocksView.render();
        return this;
    },

    selectNumTrainingDays: function(e) {
        this.numTrainingDays = parseInt($(e.currentTarget).text());
        this.$daySelectBtn.text(this.day_select_btn_text + ': ' + this.numTrainingDays);
        this.renderTrainingDays();
    },

    selectGoal: function(e, that) {
        that.goal = $(e.currentTarget).attr('data-goal');
        that.$goal_modal.foundation('reveal', 'close');
        Backbone.pubSub.trigger('set-goal', this.goal);
    },

    selectBlock: function(e) {
        this.$goal_modal.foundation('reveal', 'open');
    },

    addBlock: function(e) {
        var block = new app.Block({
                editable: true,
                routable: false
            }),
            day, week, week_intensity,
            blockId = app.BlockCollection.length + 1,
            MAX_DAYS_IN_WEEK = 7;


        weeks = new app.Collection.Weeks([]);
        for (i = 0; i < block.get('numWeeks'); i++) {
            week = new app.Week({
                id: i + 1
            });
            //get default intensity
            week_intensity = week.get('intensity');
            //create days for week model
            var days = new app.Collection.Days([]);
            for (j = 0; j < MAX_DAYS_IN_WEEK; j++) {
                //create new day with current day of the week (number)
                day = new app.Day({
                    id: j + 1,
                    weekId: i + 1,
                    blockId: blockId,
                    intensity: this.training_days_arr[week_intensity - 1][j]
                });
                days.add(day);
            }
            week.set({
                days: days
            });
            weeks.add(week);
        }
        block.set({
            weeks: weeks
        });

        app.BlockCollection.add(block);
    }
});
