var app = app || {};

app.Week = Backbone.Model.extend({
    defaults: {
        id: 0,
        intensity: 1,
        MAX_INTENSITY: 8,
        days: [],
        goal: ''
    },
    initialize: function() {
        this.training_days_arr = [
            ['medium', 'off', 'high', 'off', 'low', 'off', 'off'],
            ['high', 'off', 'high', 'off', 'low', 'off', 'off'],
            ['high', 'medium', 'off', 'high', 'low', 'off', 'off'],
            ['high', 'high', 'off', 'high', 'low', 'off', 'off'],
            ['high', 'medium', 'high', 'off', 'high', 'low', 'off'],
            ['high', 'high', 'high', 'off', 'high', 'low', 'off'],
            ['high', 'high', 'medium', 'high', 'high', 'low', 'off']
        ];
        this.MAX_DAYS_IN_WEEK = 7;
        this.populate();
        this.update();
        this.on('change:intensity', this.update);
    },
    populate: function() {
        var intensity = this.get('intensity'),
            block_id = this.get('block_id'),
            days = new app.Collection.Days(this.get('days') || []);

        if (days.length > 0) {
            week.set({
                days: days
            });
            return;
        }

        for (j = 0; j < this.MAX_DAYS_IN_WEEK; j++) {
            //create new day with current day of the week (number)
            day = new app.Day({
                id: j + 1,
                weekId: i + 1,
                blockId: block_id,
                intensity: this.training_days_arr[intensity - 1][j]
            });
            days.add(day);
        }
        this.set({
            days: days
        });
    },
    update: function() {
        var changed = this.changed,
            intensity = changed.intensity || this.get('intensity'),
            goal = changed.goal || this.get('goal'),
            updates = {},
            training_days_arr = this.training_days_arr;

        this.get('days').each(function(day) {
            day.set({
                intensity: training_days_arr[intensity - 1][day.get('id')],
                goal: goal
            });
        });

    }
});
