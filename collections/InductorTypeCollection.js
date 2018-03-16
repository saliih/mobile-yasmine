define(['InductorTypeModel','BaseCollection']
    , function( InductorTypeModel,BaseCollection){
    var InductorTypeCollection = BaseCollection.extend({
        model: InductorTypeModel,
        url: function () {
            var loginData = getAppData('loginData');
            return GV_URL + '/api/inductortypes?access_token=' + loginData.token;
        }
    });
    return InductorTypeCollection;
});
