var app = app || {};

app.Day = Backbone.Model.extend({
    defaults: {
        id: 0,
        exercises: [],
        complete: false,
        goal: '',
        intensity: '',
        one_rep_max: '',
        reps: '',
        sets: '',
        rest: '',
        offDay: false,
        description: '',
        weekId: 0,
        dayId: 0
    },
    initialize: function() {
        _.bindAll(this, "update");
        this.on('change:goal', this.update);
         this.on('change:intensity', this.update);
    },

    update: function() {
        var goal = this.get('goal'),
            intensity = this.get('intensity'),
            rm_map = {
                strength: {
                    low: '65% 1 RM',
                    medium: '70-75% 1 RM',
                    high: '85% 1 RM'
                },
                power: {
                    low: '50-60% 1 RM',
                    medium: '60-70% 1 RM',
                    high: '75% 1 RM'
                },
                hypertrophy: {
                    low: '70% 1 RM',
                    medium: '75% 1 RM',
                    high: '80% 1 RM'
                },
                endurance: {
                    low: '50-55% 1 RM',
                    medium: '60-65% 1 RM',
                    high: '70% 1 RM'
                },
            },
            rep_map = {
                strength: '5',
                power: '3-6',
                hypertrophy: '8-12',
                endurance: '10-15+'
            },
            set_map = {
                strength: '5',
                power: '5-10',
                hypertrophy: '3-5',
                endurance: '5-10'
            },
            rest_map = {
                strength: '2 min',
                power: '1-2 min',
                hypertrophy: '45 sec',
                endurance: '>15 reps: 1-2 min; 10-15 reps: < 1 min'
            };

        this.set({
            one_rep_max: rm_map[goal][intensity],
            reps: rep_map[goal],
            sets: set_map[goal],
            rest: rest_map[goal]
        });
    }
});
