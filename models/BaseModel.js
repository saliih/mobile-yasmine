define(['backbone','AssociatedModel']
    , function( Backbone,AssociatedModel) {
        var BaseModel = Backbone.AssociatedModel.extend({
            url: function () {
                var loginData = getAppData('loginData');
                var base = this.urlRoot || this.collection.url || urlError();
                if (this.isNew()) return base;
                return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + encodeURIComponent(this.id) + '?access_token=' + loginData.token;
            },
            initialize: function (data,callback) {
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
            reset: function () {
                this.clear().set(this.defaults);
            },
            extraParametersTemplate: function () {
                return false;
            },
            ItemComputable: function () {
                return null;
            }
        });
        return BaseModel;
    });
//Backbone.DualStorage.offlineStatusCodes = [404, 408];