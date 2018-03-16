define(['InductorUnitModel','BaseCollection']
    , function( InductorUnitModel,BaseCollection){
    var InductorUnitCollection = BaseCollection.extend({
        model: InductorUnitModel,
        url: function () {
            var loginData = getAppData('loginData');
            return GV_URL + '/api/inductorunits?access_token=' + loginData.token;
        }
    });
    return InductorUnitCollection;
});
