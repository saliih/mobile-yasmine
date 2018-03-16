define(['UserModel','BaseCollection']
    , function( UserModel,BaseCollection){
    var UserCollection = BaseCollection.extend({
        model: UserModel,
        url: function () {
            var loginData = getAppData('loginData');
            return GV_URL + '/api/users?access_token=' + loginData.token;
        }

    });
    return UserCollection;
});
