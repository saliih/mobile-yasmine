define(['InductorModel','BaseCollection']
    , function( InductorModel,BaseCollection){
        var InductorCollection = BaseCollection.extend({
            model: InductorModel,
            url: function () {
                var loginData = getAppData('loginData');
                return GV_URL + '/api/'+this.fid+'/inductors'+'/'+this.moduleactive+'?access_token=' + loginData.token;
            },
            fid : null,
            moduleactive : ''

        });
        return InductorCollection;
    });
