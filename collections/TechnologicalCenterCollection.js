define(['TechnologicalCenterModel'],
    function (TechnologicalCenter) {
    var TechnologicalCenterCollection = Backbone.Collection.extend({
        model: TechnologicalCenter,
        url: function () {
            var loginData = getAppData('loginData');
            return GV_URL + '/api/technologicalcenters?access_token=' + loginData.token
        },

    });
    return TechnologicalCenterCollection;
});
