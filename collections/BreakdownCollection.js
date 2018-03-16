define(['BreakdownModel','BaseCollection']
    , function( BreakdownModel,BaseCollection){
    var BreakdownCollection = BaseCollection.extend({
        model: BreakdownModel,
        url: function () {
            var loginData = getAppData('loginData');
            return GV_URL + '/api/'+this.computableid +'/breakdowns?access_token=' + loginData.token;
        },

        'computableid': 0

    });
    return BreakdownCollection;
});
