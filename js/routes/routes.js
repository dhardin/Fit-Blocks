var app = app || {};

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'routines/': 'goalSelect',
		'routines/*': 'goalSelect',
		'edit/:id': 'editItem',
		'edit/*': 'editItem',
		'metrics': 'metrics',
		'workout': 'workout'
	},

	 initialize: function(options){
	    this.AppView = options.AppView;
	      this.on('route', this.onRouteChange);
        Backbone.pubSub.on('breadcrumbs', this.onRouteChange, this);
	  },
	
	home: function  () {
		var homeView =  new app.HomeView();
		   this.AppView.showView(homeView);
	},

	goalSelect: function(id){
		var goalSelect =  new app.GoalSelectView();
		   this.AppView.showView(goalSelect);
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
            href += breadcrumb + '/';
            $breadcrumbs.append('<li class="' + (i == routePathArr.length - 1 ? 'current' : '') + '"><a href="' + href + '">' + breadcrumb + '</a></li>');
        }
    }

});


var app_router = new Router({AppView: app.AppView});

Backbone.history.start();
