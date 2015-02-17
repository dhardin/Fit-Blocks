 var app = app || {};

 app.BlockView = Backbone.View.extend({
     template: _.template($('#block-template').html()),
     events: {
         'click': 'select',
         'click .close': 'remove'
     },

     initialize: function() {
         this.model.on('change', this.render, this);
         Backbone.pubSub.on('unselect', this.unselect, this);
         Backbone.pubSub.on('set-goal', this.setGoal, this);
     },

     render: function() {
         this.$el.html(this.template(this.model.toJSON()));
         this.$panel = this.$('.panel');
         this.$goal = this.$('.goal');
         this.$complete_label = this.$('.complete');
         this.$close = this.$('.close');
         this.$route = this.$('.route');

         this.goal_label_class_map = {
             strength: 'alert',
             power: 'warning',
             hypertrophy: 'success',
             endurance: 'info'
         };
         //set styling based on model properties
         this.setStyling();
         return this;
     },

     setStyling: function() {
         if (this.model.get('goal') != 'N/A') {
             this.$goal.addClass(this.goal_label_class_map[this.model.get('goal')]);
         }
         if (!this.model.get('editable')) {
             this.$close.remove();
         }

         this.$panel.toggleClass('callout', this.model.get('selected'));
         this.$complete_label.toggleClass('hidden', !this.model.get('completed'));
     },

     select: function(e) {
         var hash = Backbone.history.location.hash;
         this.model.set({
             selected: true
         });
         Backbone.pubSub.trigger('unselect', this.model);
         if (this.model.get('editable')) {
             Backbone.pubSub.trigger('select-block');
         }

         if (this.model.get('routable')) {
             hash = hash.replace('block', '');
             app_router.navigate(hash + 'block/' + this.model.get('id'), {
                 trigger: true
             });
         }
     },

     unselect: function(model) {
         if (model != this.model) {
             this.model.set({
                 selected: false
             });
             this.$panel.removeClass('callout');
         }
     },

     setGoal: function(goal) {
         var weeks, days, weekId = 0;
          

         if (this.model.get('selected')) {
             this.model.set({
                 goal: goal
             });

             //now set all week and day goals
             weeks = this.model.get('weeks');
             weeks.each(function(model) {
                 weekId = model.get('id');
                 model.set({
                     goal: goal
                 });
                 days = model.get('days');
                 days.each(function(model) {
                     model.set({
                         goal: goal
                     });
                 });
             });
         }
     },

     remove: function(e) {
         this.model.collection.remove(this.model);
         e.stopPropagation();
     }
 });
