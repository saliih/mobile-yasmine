define(['TypecostModel','BaseCollection'],
    function (TypecostModel, BaseCollection) {
    var TypecostModel = BaseCollection.extend({
        model: TypecostModel,
        url: function () {
            var loginData = getAppData('loginData');
            return GV_URL + '/api/typecosts?access_token=' + loginData.token
        }
    });
    return TypecostModel;
});
