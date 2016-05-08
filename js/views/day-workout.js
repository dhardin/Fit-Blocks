var app = app || {};

app.DayWorkoutView = Backbone.View.extend({
    template: _.template($('#day-workout-template').html()),

    events: {
        'click .add': 'addExercise',
        'click .edit': 'toggleEdit',
        'click .done': 'toggleEdit',
        'click .nextDay': 'nextDay',
        'click .prevDay': 'prevDay',
        'keyup .search': 'search'
    },

    initialize: function(options) {
        this.on('change', this.render, this);
        Backbone.pubSub.on('add-exercise', this.onAddExercise, this);
        this.childViews = [];
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
        this.$exercise = this.$('.exercise');
        this.$exercises = this.$('.exercise-list');
        this.$exercise_modal = this.$('.exercise-modal');
        this.$search = this.$('.search');
        this.$add = this.$('.add');
        this.applyStyling();

        this.selectedExercisesView = new app.ExercisesView({
            collection: exercises,
            el: this.$exercise[0],
            itemView: app.SelectedExerciseListItemView,
            show: true,
            routable: true
        });

        this.exercisesView = new app.ExercisesView({
            collection: app.ExerciseCollection,
            el: this.$exercises[0],
            itemView: app.ExerciseListItemView,
            show: false
        });

        this.childViews.push(this.exercisesView);
        this.childViews.push(this.selectedExercisesView);



        $(document).on('keyup',this.onKeyDown.bind(this));

        this.selectedExercisesView.render();
        this.exercisesView.render();

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

        Backbone.pubSub.off('add-exercise');
        $(document).off('keyup');
    },

    onKeyDown: function(e) {
        e.stopPropagation();
        switch (e.which) {
            case 37: //left arrow
                this.prevDay();
                break;
            case 39: //right arrow
                this.nextDay();
                break;
            default:
                break;
        }
    },

    onAddExercise: function() {
        this.$search.val('');
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
        if (id == 1) {
            this.$prevDay.addClass('disabled');
        } else if (id == 7) {
            this.$nextDay.addClass('disabled');
        }
    },

    nextDay: function(e) {
        var hash = Backbone.history.location.hash;
        if (this.$nextDay.hasClass('disabled')) {
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
        if (this.$prevDay.hasClass('disabled')) {
            return;
        }
        //remove the last 'day' from the hash
        hash = hash.substring(0, hash.length - 1);
        //route to new hash
        app_router.navigate(hash + (this.model.get('id') - 1), {
            trigger: true
        });
    },

    toggleEdit: function(e) {
        var isEditing = this.$editBtn.is(':visible');
        this.$editBtn.toggle(!isEditing);
        this.$addExercise.toggle(isEditing)
        this.$doneBtn.toggleClass('hide', !isEditing);
    },
    search: function(e) {
        var val = $(e.currentTarget).val();

        Backbone.pubSub.trigger('search', {
            collection: app.ExerciseCollection,
            val: val
        });
    }

});
