define(['FinancialyearModel','BaseCollection']
    , function( FinancialyearModel,BaseCollection){
    var FinancialyearCollection = BaseCollection.extend({
        model: FinancialyearModel,
        url: function () {
            var loginData = getAppData('loginData');
            return GV_URL + '/api/financialyears?access_token=' + loginData.token;
        }
    });
    return FinancialyearCollection;
});
