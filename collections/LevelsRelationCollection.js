/**
 * Created by salah on 22/12/15.
 */
define(['BaseCollection','LevelsRelationModel'],
    function (BaseCollection,LevelsRelationModel) {
        var LevelsRelationCollection = BaseCollection.extend({
            model: LevelsRelationModel,
            url: function () {
                var loginData = getAppData('loginData');
                return GV_URL + '/api/'+this.levelid+'/levelsrelations?access_token=' + loginData.token;
            },
            levelid :null
        });
    return LevelsRelationCollection;
});