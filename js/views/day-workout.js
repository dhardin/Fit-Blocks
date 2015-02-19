var app = app || {};

app.DayWorkoutView = Backbone.View.extend({
    template: _.template($('#day-workout-template').html()),

    events: {
        'click .add': 'addExercise',
        'click .edit': 'toggleEdit',
        'click .done' : 'toggleEdit',
        'click .nextDay': 'nextDay',
        'click .prevDay': 'prevDay'
    },

    initialize: function(options) {
        this.on('change', this.render, this);
    },

    render: function() {
        var exercises = this.model.get('exercises');

        this.$el.html(this.template(this.model.toJSON()));
        this.$intensity = this.$('.intensity');
        this.$exercise = this.$('.exercise');
        this.$exercise_list = this.$exercise.parent();
        this.$nextDay = this.$('.nextDay');
        this.$prevDay = this.$('.prevDay');
        this.$editBtn = this.$('.edit');
        this.$doneBtn = this.$('.done');
        this.$exercises = this.$('.exercise-list');
        this.$exercise_modal = this.$('.exercise-modal');
        this.$addExercise = this.$('.add-exercise');
        this.$add = this.$('.add');
        this.applyStyling();

        //render day's exercises
        exercises.each(function(item) {
            this.renderItem(item);
        }, this);

        this.exercisesView = new app.ExercisesView({
            collection: app.ExerciseCollection,
            el: this.$exercises[0],
            itemView: app.ExerciseListItemView
        });

        this.$add.on('click', this.addExercise);



        this.exercisesView.render();

        return this;
    },

    renderItem: function(item) {
        var exerciseView = new app.ExerciseView({
            model: item
        });
        this.$el.append(exerciseView.render().el);
    },

    addExercise: function() {
    
    },

    removeExercise: function(){

    },

    applyStyling: function() {
        var id = this.model.get('id'),
            intensiy_map = {
            off: 'secondary',
            low: 'info',
            medium: '',
            high: 'success'
        };
        this.$intensity.addClass(intensiy_map[this.model.get('intensity')]);

        //apply styling to prev and next day buttons
        if(id == 1){
            this.$prevDay.addClass('disabled');
        } else if (id == 7){
            this.$nextDay.addClass('disabled');
        }
    },

    nextDay: function(e){
        var hash = Backbone.history.location.hash;
        if(this.$nextDay.hasClass('disabled')){
            return;
        }
        //remove the last 'day' from the hash
        hash = hash.substring(0, hash.length - 1);
        //route to new hash
        app_router.navigate(hash + (this.model.get('id') + 1), {
                trigger: true
            });
    },

    prevDay: function(e) {
       var hash = Backbone.history.location.hash;
       if(this.$prevDay.hasClass('disabled')){
            return;
        }
        //remove the last 'day' from the hash
        hash = hash.substring(0, hash.length - 1);
        //route to new hash
          app_router.navigate(hash + (this.model.get('id') - 1), {
                trigger: true
            });
    },

    toggleEdit: function(e){
        var isEditing = this.$editBtn.is(':visible');
        this.$editBtn.toggle(!isEditing);
        this.$addExercise.toggle(isEditing)
        this.$doneBtn.toggleClass('hide', !isEditing);
    },


});
