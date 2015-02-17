var app = app || {};
app.fetchingData = app.fetchingData || false;
app.dataLoadCallback = app.dataLoadCallback || [];
app.testing = true;
app.Collection = app.Collection || {};

//populate test data
app.getData = function() {
    app.BlockCollection = app.BlockCollection || new app.Collection.Blocks([]);
}

//fetch data from server
app.getData();
