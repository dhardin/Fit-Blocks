var app = app || {};

app.Week = Backbone.Model.extend({
    defaults: {
        id: 0,
        intensity: 1,
        MAX_INTENSITY: 8,
        days: []
    },
    initialize: function() {
        this.populate();
    },
    populate: function() {
        var MAX_DAYS_IN_WEEK = 7,
            week_intensity = this.get('intensity'),
            block_id = this.get('block_id'),
            days = new app.Collection.Days(this.get('days') || []),
            training_days_arr = [
                ['medium', 'off', 'high', 'off', 'low', 'off', 'off'],
                ['high', 'off', 'high', 'off', 'low', 'off', 'off'],
                ['high', 'medium', 'off', 'high', 'low', 'off', 'off'],
                ['high', 'high', 'off', 'high', 'low', 'off', 'off'],
                ['high', 'medium', 'high', 'off', 'high', 'low', 'off'],
                ['high', 'high', 'high', 'off', 'high', 'low', 'off'],
                ['high', 'high', 'medium', 'high', 'high', 'low', 'off']
            ];

        if (days.length > 0) {
            week.set({
                days: days
            });
            return;
        }

        for (j = 0; j < MAX_DAYS_IN_WEEK; j++) {
            //create new day with current day of the week (number)
            day = new app.Day({
                id: j + 1,
                weekId: i + 1,
                blockId: block_id,
                intensity: training_days_arr[week_intensity - 1][j]
            });
            days.add(day);
        }
        this.set({
            days: days
        });
    }
});
