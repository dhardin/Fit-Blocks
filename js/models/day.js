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
         this.rm_map = {
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
            }
            this.rep_map = {
                strength: '5',
                power: '3-6',
                hypertrophy: '8-12',
                endurance: '10-15+'
            }
            this.set_map = {
                strength: '5',
                power: '5-10',
                hypertrophy: '3-5',
                endurance: '5-10'
            }
            this.rest_map = {
                strength: '2 min',
                power: '1-2 min',
                hypertrophy: '45 sec',
                endurance: '>15 reps: 1-2 min; 10-15 reps: < 1 min'
            };
            this.goal_map={
                strength: true,
                power: true,
                hypertrophy: true,
                endurance: true
            };
        _.bindAll(this, "update");
        this.on('change:goal', this.update);
         this.on('change:intensity', this.update);
         Backbone.pubSub.on('add-exercise', this.addExercise, this);
         this.populate();
         this.update();
    },

    update: function() {
        var goal = this.get('goal'),
            intensity = this.get('intensity');
           
        if(!this.goal_map[goal]){
            return;
        }

        this.set({
            one_rep_max: this.rm_map[goal][intensity],
            reps: this.rep_map[goal],
            sets: this.set_map[goal],
            rest: this.rest_map[goal]
        });
    },
    populate: function(){
        var exercises = new app.Collection.Exercises(this.get('exercises') || []);
        this.set({exercises: exercises});
    },
    addExercise: function(exercise){
        var exercises = this.get('exercises'),
        model = new app.Exercise(exercise);

        exercises.add(model);
    }
});
