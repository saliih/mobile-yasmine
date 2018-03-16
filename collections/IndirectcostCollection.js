define(['IndirectcostModel','BaseCollection']
    , function( IndirectcostModel,BaseCollection){
    var IndirectcostCollection = BaseCollection.extend({
        model: IndirectcostModel,
        url: function () {
            var loginData = getAppData('loginData');
            return GV_URL + '/api/indirectcosts?access_token=' + loginData.token;
        }


    });
    return IndirectcostCollection;
});
