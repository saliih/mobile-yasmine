define(['IndirectcosTypeModel','BaseCollection']
    , function( IndirectcosTypeModel,BaseCollection){
    var IndirectcosTypeCollection = BaseCollection.extend({
        model: IndirectcosTypeModel,
        url: function () {
            var loginData = getAppData('loginData');
            return GV_URL + '/api/indirectcosttypes?access_token=' + loginData.token;
        },


    });
    return IndirectcosTypeCollection;
});
