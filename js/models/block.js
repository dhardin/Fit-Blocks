var app = app || {};

app.Block = Backbone.Model.extend({
    defaults: {
        id: 0,
        goal: 'N/A',
        selected: false,
        completed: false,
        editable: false,
        routable: true,
        numWeeks: 4,
        weeks: []
    },
    initialize: function() {
        this.populate();
    },
    populate: function() {
        var block_id = this.get('id'), week, numWeeks = 0;


        weeks = new app.Collection.Weeks(this.get('weeks') || []);

        //set weeks and return if weeks contains data
        if(weeks.length > 0){
          this.set({weeks: weeks});
          return;
        }

        numWeeks = this.get('numWeeks');

        for (i = 0; i < numWeeks; i++) {
            week = new app.Week({
                id: i + 1,
                block_id: block_id
            });
            weeks.add(week);
        }
        this.set({
            weeks: weeks
        });
    }
});
