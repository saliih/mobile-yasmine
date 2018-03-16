/**
 * Created by salah on 22/12/15.
 */
define(['BaseCollection','LevelModel'],
    function (BaseCollection,LevelModel) {
        var LevelCollection = BaseCollection.extend({
            model: LevelModel,
            url: function () {
                var loginData = getAppData('loginData');
                return GV_URL + '/api/levels?access_token=' + loginData.token;
            }
        });
    return LevelCollection;
});