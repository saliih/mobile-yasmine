define(['ModelCtModel','BaseCollection']
    , function( ModelCtModel, BaseCollection) {
        var ModelCtCollection = BaseCollection.extend({
            model: ModelCtModel,
            url: function () {
                var loginData = getAppData('loginData');
                return GV_URL + '/api/'+this.modelid+'/models?access_token=' + loginData.token;
            },
            modelid:null,
            initialize : function (obj) {
                this.modelid = obj.modelid;
            }
        });
        return ModelCtCollection;
    });
