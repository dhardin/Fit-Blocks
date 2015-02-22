var app = app || {};
app.fetchingData = app.fetchingData || false;
app.dataLoadCallback = app.dataLoadCallback || [];
app.testing = true;
app.Collection = app.Collection || {};

exercises = [
	{
		name: 'squat',
		muscles: 'legs'
	},
	{
		name: 'bench',
		muscles: 'chest'
	},
	{
		name: 'deadlift',
		muscles: 'back, legs'
	},
	{
		name: 'bent row',
		muscles: 'back'
	},
	{
		name: 'press',
		muscles: 'shoulders, chest'
	},
	{
		name: 'power press',
		muscles: 'shoulders, chest'
	}, 
	{
		name: 'pull-up',
		muscles: 'lats'
	},
	{
		name: 'dips',
		muscles: 'triceps, chest'
	},
	{
		name: 'clean',
		muscles: 'back'
	}
];

//populate test data
app.getData = function() {
    app.BlockCollection = app.BlockCollection || new app.Collection.Blocks([]);
    

    app.ExerciseCollection = app.ExerciseCollection || new app.Collection.Exercises(exercises);
    var block = new app.Block({id: app.BlockCollection.length + 1});
    app.BlockCollection.add(block);
}	

//fetch data from server
app.getData();
