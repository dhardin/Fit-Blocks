var app = app || {};

app.GoalSelectView = Backbone.View.extend({
    template: _.template($('#goal-select-template').html()),

    events: {
        'click #daySelect a': 'selectNumTrainingDays',
        'click #intensitySelect a': 'selectIntensity',
        'click .goal-select .goal-select-btn': 'selectGoal'
    },

    initialize: function(options) {

    },

    render: function() {
        this.$el.html(this.template());
        this.$training_days = this.$('.training-days');
        this.$goal_days = this.$('.goal-days');
        this.$daySelectBtn = this.$('.num-training-days');
        this.$intensitySelectBtn = this.$('.training-intensity');
        this.intensity_select_btn_text = this.$intensitySelectBtn.text();
        this.day_select_btn_text = this.$daySelectBtn.text();
        this.goal = '';
        this.intensity = 1;
        this.numTrainingDays = 3;
        this.training_days = [];
        this.training_days_options = {
            three_1: ['medium', 'off', 'high', 'off', 'low', 'off', 'off'],
            three_2: ['high', 'off', 'high', 'off', 'low', 'off', 'off'],
            four_1: ['high', 'medium', 'off', 'high', 'low', 'off', 'off'],
            four_2: ['high', 'high', 'off', 'high', 'low', 'off', 'off'],
            five_1: ['high', 'medium', 'high', 'off', 'high', 'low', 'off'],
            five_2: ['high', 'high', 'high', 'off', 'high', 'low', 'off'],
            six_1: ['high', 'high', 'medium', 'high', 'high', 'low', 'off']
        };

        return this;
    },

    selectNumTrainingDays: function(e) {
        this.numTrainingDays = parseInt($(e.currentTarget).text());
        this.$daySelectBtn.text( this.day_select_btn_text + ': ' + this.numTrainingDays);
        this.renderTrainingDays();
    },

    selectIntensity: function(e) {
        this.intensity = parseInt($(e.currentTarget).text());
        this.$intensitySelectBtn.text( this.intensity_select_btn_text + ': ' + this.intensity);
        this.renderTrainingDays();
    },

    selectGoal: function(e) {
        this.goal = $(e.currentTarget).attr('data-goal');
        this.renderTrainingDays();
    },

    renderTrainingDays: function() {
        var i = 0, training_day = '', $goal_temp, $off_temp,
            goal_selector = '.' + (this.goal.length > 0 ? this.goal : 'off'),
            $goal = this.$goal_days.find(goal_selector),
            $off = this.$goal_days.find('.off').clone(),
            numDaysWord = '',
            intensity_label_class_map = {
            	low: 'warning',
            	medium: 'info',
            	high: 'alert'
            };

         if(this.goal == ''){
         	return;
         }

        switch (this.numTrainingDays) {
        	 case 3:
                numDaysWord = 'three';
                break;
            case 4:
                numDaysWord = 'four';
                break;
            case 5:
                numDaysWord = 'five';
                break;
            case 6:
                numDaysWord = 'six';
                this.intensity = 1;
                break;
            default:
                break;
        }

        this.training_days =  this.training_days_options[numDaysWord + '_' + this.intensity];

        this.$training_days.html('');

        for (i = 0; i < 7; i++) {
        	training_day = this.training_days[i];
        	if (training_day != 'off'){
        		$goal_temp = $goal.clone();
        		 $goal_temp.find('.intensity').text(training_day + ' intensity').addClass(intensity_label_class_map[training_day]);
        		 $goal_temp.find('.day-num').text('Day ' + (i + 1));
        		 this.$training_days.append($goal_temp[0].outerHTML);
        	} else {
        		$off_temp = $off.clone();
        		$off_temp.find('.day-num').text('Day ' + (i + 1));
        		 this.$training_days.append($off_temp[0].outerHTML);
        	}

           
        }
    },

    delete: function(e) {
        e.preventDefault();
        this.setStatus({
            status: 'Deleting',
            text: ''
        });
        (function(that) {
            that.$deleteBtn.addClass('disabled');
            that.$editBtn.addClass('disabled');
            setTimeout(function() {
                that.save({
                    method: 'delete',
                    callback: function() {
                        app_router.navigate('', {
                            trigger: true
                        });
                    },
                    trigger: false,
                    formData: {
                        ID: that.model.get('id')
                    }
                });
            }, 10);
        })(this);
    },

    onSortChange: function(e, index) {
        this.$el.trigger('update-sort', [this.model, index]);
    },

    toggleCollapse: function(e) {
        if (this.$description.hasClass('collapse')) {
            this.$description.removeClass('collapse').addClass('expand');
            this.$showMore.text('Show Less');
            this.$showMoreTop.show();

        } else {
            this.$description.removeClass('expand').addClass('collapse');
            this.$showMore.text('Show More');
            this.$showMoreTop.hide();
        }

    }


});
