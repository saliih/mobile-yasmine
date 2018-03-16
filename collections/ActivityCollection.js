define(['ActivityModel','BaseCollection']
    , function( ActivityModel,BaseCollection){
    var ActivityCollection = BaseCollection.extend({
        model: ActivityModel,
        url: function () {
            var loginData = getAppData('loginData');
            return GV_URL + '/api/'+this.ctid +'/activities?access_token=' + loginData.token;
        },
        initialize: function (ctid) {
            this.ctid = ctid;
        },
        'ctid': 0

    });
    return ActivityCollection;
});
