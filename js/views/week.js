var app = app || {};

app.WeekView = Backbone.View.extend({
    template: _.template($('#week-template').html()),
    className: 'row panel',

    events: {
        'click .change-intensity-btn': 'showIntensity',
        'click .done-intensity-btn': 'hideIntensity',
        'click .intensity-tools .increase': 'increaseIntensity',
        'click .intensity-tools .decrease': 'decreaseIntensity'
    },

    initialize: function(options) {
        this.model.on('change', function() {
            var intensity_tools_displayed = this.$intensity.is(':visible');
            this.render({
                showIntensity: intensity_tools_displayed
            });
        }, this);
    },

    render: function(options) {
        options = options || {};
        var days = this.model.get('days');

        this.$el.html(this.template(this.model.toJSON()));
        this.$change_intensity_btn = this.$('.change-intensity-btn');
        this.$intensity = this.$('.intensity-tools');
        this.$done_intensity_btn = this.$('.done-intensity-btn');
        this.$intensity_slider = this.$('.slider');
        this.$data_slider = this.$('[data-slider]');
        this.$days = this.$('.days');
        this.training_days_arr = [
            ['medium', 'off', 'high', 'off', 'low', 'off', 'off'],
            ['high', 'off', 'high', 'off', 'low', 'off', 'off'],
            ['high', 'medium', 'off', 'high', 'low', 'off', 'off'],
            ['high', 'high', 'off', 'high', 'low', 'off', 'off'],
            ['high', 'medium', 'high', 'off', 'high', 'low', 'off'],
            ['high', 'high', 'high', 'off', 'high', 'low', 'off'],
            ['high', 'high', 'medium', 'high', 'high', 'low', 'off'],
            ['high', 'high', 'high', 'high', 'high', 'low', 'off']
        ];

        days.each(function(item) {
            this.renderItem(item);
        }, this);

        if (options.showIntensity) {
            this.showIntensity();
        }

        return this;
    },
    renderItem: function(item) {
        var dayView = new app.DayView({
            model: item
        });
        this.$days.append(dayView.render().el);
    },

    showIntensity: function(e) {
        this.$change_intensity_btn.hide();
        this.$done_intensity_btn.show();
        this.$intensity.show();
    },
    hideIntensity: function(e) {
        this.$change_intensity_btn.show();
        this.$done_intensity_btn.hide();
        this.$intensity.hide();
    },

    increaseIntensity: function(e) {
        var currentIntensity = this.model.get('intensity'),
            MAX_INTENSITY = this.model.get('MAX_INTENSITY'),
            days;

        if (currentIntensity < MAX_INTENSITY) {
            this.setIntensity(currentIntensity);
            this.model.set({
                intensity: currentIntensity + 1
            });
        }
    },

    decreaseIntensity: function(e) {
        var currentIntensity = this.model.get('intensity');

        if (currentIntensity > 1) {
            this.setIntensity(currentIntensity - 2);
            this.model.set({
                intensity: currentIntensity - 1
            });
        }
    },

    setIntensity: function(intensity) {
    	var i = 0,
        days = this.model.get('days');
        (function(that) {
            days.each(function(model) {
                model.set({
                    intensity: that.training_days_arr[intensity][i]
                });
                i++;
            });
        })(this);
    }
});
