/**
 * Created by salah on 22/12/15.
 */
define(['BaseCollection', 'ComputableModel'],
    function (BaseCollection, ComputableModel) {
        var ComputableCollection = BaseCollection.extend({
            model: ComputableModel,
            url: function () {
                var loginData = getAppData('loginData');
                if (this.levelid != null)
                    return GV_URL + '/api/' + this.levelid + '/computables?access_token=' + loginData.token;
                else
                    return GV_URL + '/api/computables?access_token=' + loginData.token;
            },

            levelid: null
        });
        return ComputableCollection;
    });