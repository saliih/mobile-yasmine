define(['backbone'],
    function (Backbone) {
        var BaseCollection = Backbone.Collection.extend({
            clone: function () {
                return new this.constructor(this.models);
            },
            initialize: function () {
                this.bind('request', this.ajaxStart, this);
                this.bind('sync', this.ajaxComplete, this);
                this.bind('error', this.ajaxComplete, this);
                this.bind('destroy', this.ajaxComplete, this);
            },
            ajaxStart: function(arg1,arg2,arg3){
                showLoader();
            },
            ajaxComplete: function() {
                hideLoader();
            },
            sortByField: function (field, direction) {
                sorted = _.sortBy(this.models, function (model) {
                    return model.get(field);
                });
                if (direction === 'descending') {
                    sorted = sorted.reverse()
                }
                this.models = sorted;
            }
        });
        return BaseCollection;
    });
