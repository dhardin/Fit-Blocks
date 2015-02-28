var app = app || {};
app.Collection = app.Collection || {};

app.Collection.Exercises = Backbone.Collection.extend({
    model: app.Exercise,
   
    initialize: function () {
    },
     //searches through a collection on multiple queries
    search: function(options) {
        var query_key, key, attributes,
            start, end, val, formatAttrFunc,
            queries = options,
            results = this;


        for (query_key in queries) {
            switch (query_key) {
                case 'text':
                    val = queries[query_key].val.toLowerCase();
                    if(val.length == 0){
                        continue;
                    }
                    attribute = queries[query_key].attribute;
                    results = results.filter(function(model) {
                        if (attribute && model.get(attribute)) {
                            if(model.get(attribute).indexOf(val) > -1){
                                return true;
                            }
                        } else {
                            //search through all attributes
                            //if one matches, return true
                            //else, return false
                            attributes = model.attributes;
                            for (key in attributes) {
                                if (attributes[key].toString().toLowerCase().indexOf(val) > -1) {
                                    return true;
                                }
                            }
                            return false;
                        }
                    });
                    break;
                default:
                    break;
            }
        }

        return new Backbone.Collection(results.models ? results.models : results);

    }                                                         
});