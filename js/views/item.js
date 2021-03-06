	var Item = Backbone.View.extend({
	    saveToSP: function(obj, method, callback) {
	        app.spData.saveData({
	            url: app.config_map.url,
	            guid: app.config_map.guid,
	            data: [obj],
	            method: method,
	            callback: callback
	        });
	    },

	    save: function(options) {
	        options = options || {};
	        var formData = options.formData || {},
	            callback = options.callback || false,
	            method = options.method,
	            data;

	        if (!app.testing) {
	            (function(callback, formData, that) {
	                that.saveToSP(formData, method, function(results) {
	                    if (results.error == '') {
	                        switch (method) {
	                            case 'new':
	                                that.saveToCollection(formData);
	                                that.setStatus({
	                                    status: 'Success',
	                                    text: '!'
	                                });
	                                app.getData();
	                                break;
	                            case 'update':
	                                that.saveToCollection(formData);
	                                that.setStatus({
	                                    status: 'Success',
	                                    text: '!'
	                                });
	                                break;
	                            case 'delete':
	                                // Delete model
	                                var collection = that.model.collection;
	                                collection.remove(that.model);
	                                collection.trigger('change');
	                                break;
	                        };


	                    } else {
	                        that.setStatus({
	                            status: 'Error',
	                            text: ': ' + results.error
	                        });
	                    }
	                    if (callback) {
	                        callback();
	                    }
	                });
	            })(callback, formData, this);
	        } else {
	            if (method != 'delete') {
	                this.saveToCollection(formData);
	            } else {
	                // Delete model
	                this.model.trigger('detroy', this.model, this.model.collection, {});
	                // Delete view
	                this.remove();
	            }

	            if (callback) {
	                callback();
	            }
	        }
	    },
	    setStatus: function(statusOptions) {
	        var status = statusOptions.status || '',
	            text = statusOptions.text || '',
	            $alert = (this.$alert ? this.$alert : false);

	        this.model.set('status', status);
	        this.model.set('statusText', text);
	        
	        if (!$alert) {
	            return;
	        }


	        switch (status) {
	            case '':
	                $alert
	                    .addClass('hidden')
	                    .removeClass('alert')
	                    .removeClass('warning')
	                    .removeClass('success');
	                break;
	            case 'Saving':
	                $alert
	                    .removeClass('success')
	                    .removeClass('hidden')
	                    .removeClass('warning')
	                    .removeClass('alert');
	                break;
	            case 'Deleting':
	                $alert
	                    .addClass('warning')
	                    .removeClass('success')
	                    .removeClass('hidden')
	                    .removeClass('alert');
	                break;
	            case 'Success':
	                $alert
	                    .addClass('success')
	                    .removeClass('hidden')
	                    .removeClass('warning')
	                    .removeClass('alert');

	                break;
	            case 'Error':
	                $alert
	                    .addClass('alert')
	                    .removeClass('hidden')
	                    .removeClass('warning')
	                    .removeClass('success');

	                break;
	            default:
	                $alert
	                    .removeClass('hidden')
	                    .removeClass('alert')
	                    .removeClass('warning')
	                    .removeClass('success');
	                break
	        }

	    }
	});
