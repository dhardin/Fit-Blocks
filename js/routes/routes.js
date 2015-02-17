var app = app || {};

var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'routines/goals': 'goalSelect',
        'routines/intensity': 'intensitySelect',
        'routines/*': 'goalSelect',
        'edit/:id': 'editItem',
        'edit/*': 'editItem',
        'metrics/': 'metrics',
        'workout/': 'workout',
        'workout/block': 'workout',
        'workout/block/:id': 'block',
        'workout/block/:id/week:weekId': 'week',
        'workout/block/:id/week/:weekId/day/:dayId': 'day',
        '*404': 'error'
    },

    initialize: function(options) {
        this.AppView = options.AppView;
        this.on('route', this.onRouteChange);
        Backbone.pubSub.on('breadcrumbs', this.onRouteChange, this);
    },

    home: function() {
        var homeView = new app.HomeView();
        this.AppView.showView(homeView);
    },

    workout: function() {
        var routine = new app.RoutineView();
        this.AppView.showView(routine);
    },
    error: function() {
        var errorView = new app.ErrorView();
        this.AppView.showView(errorView);
    },
    block: function(id) {
        var blockDisplayView;

        var item = (id && app.BlockCollection.get({id: id}) ? 
					app.BlockCollection.get({id: id})
					: false);
        if(!item){
        	  app_router.navigate('#404', {
                            trigger: true
                        });
        	  return;
        }
		blockDisplayView = new app.BlockDisplayView({model: item});
		this.AppView.showView(blockDisplayView);
    },

    week: function(id, weekId){
    	var week, day, block;

    	block = (id && app.BlockCollection.get({id: id}) ? 
					app.BlockCollection.get({id: id})
					: false);
    	if(!block){
    		 app_router.navigate('#404', {
                            trigger: true
                        });
    		 return;
    	}

    	week = (weekId && block.get('weeks').get({id: weekId}) ? 
					block.get('weeks').get({id: weekId})
					: false);

    	if(!week){
    		 app_router.navigate('#404', {
                            trigger: true
                        });
    		 return;
    	}

		weekView = new app.WeekView({model: week});
		this.AppView.showView(weekView);

    },

    day: function(id, weekId, dayId){
    	var week, day, block;

    	block = (id && app.BlockCollection.get({id: id}) ? 
					app.BlockCollection.get({id: id})
					: false);
    	if(!block){
    		 app_router.navigate('#404', {
                            trigger: true
                        });
    		 return;
    	}

    	week = (weekId && block.get('weeks').get({id: weekId}) ? 
					block.get('weeks').get({id: weekId})
					: false);

    	if(!week){
    		 app_router.navigate('#404', {
                            trigger: true
                        });
    		 return;
    	}


    	day = (dayId && week.get('days').get({id: dayId}) ? 
					week.get('days').get({id: dayId})
					: false);

    	if(!day){
    		 app_router.navigate('#404', {
                            trigger: true
                        });
    		 return;
    	}

		dayWorkoutView = new app.DayWorkoutView({model: day});
		this.AppView.showView(dayWorkoutView);

    },

    goalSelect: function() {
        var goalSelect = new app.GoalSelectView();
        this.AppView.showView(goalSelect);
    },

    intensitySelect: function() {
        var intensitySelect = new app.IntesitySelectView();
        this.AppView.showView(intensitySelect);
    },

    onRouteChange: function(route, params) {
        //parse out hash
        var hashRoute = window.location.hash.substring(1),
            routePathArr = hashRoute.split('/'),
            breadcrumb,
            i, j, href = '#',
            $breadcrumbs = $('.breadcrumbs');

        $breadcrumbs.children().not('.home').remove();

        if (route == 'error') {
            return;
        }

        for (i = 0; i < routePathArr.length; i++) {
            breadcrumb = routePathArr[i];
            if (breadcrumb == '') {
                continue;
            }
            href += breadcrumb;
            $breadcrumbs.append('<li class="' + (i == routePathArr.length - 1 ? 'current' : '') + '"><a href="' + href + '">' + breadcrumb + '</a></li>');
            href += '/';
        }
    }

});


var app_router = new Router({
    AppView: app.AppView
});

Backbone.history.start();
