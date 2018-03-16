define(['BaseModel']
    , function( BaseModel) {
        var PuzzleSingleModel = BaseModel.extend({
            //urlRoot: GV_URL + '/api/activities/',

            defaults: {
                id : "",
                color : "",
                text : "",
                size : "",
                police : "",

            },
            calculatePercentBg: function () {
                this.set('percentBg', (this.get("widthbg") * 100 / this.get("width")).toFixed(0));
            },
            validate: function() {

            },
           /* form: function () {
                return new ActivityForm({model: this});

            },
            extraParametersTemplate: function () {
                return new inductorCrud({model: this, moduleactive:'activity'});
            }*/

        });
        return PuzzleSingleModel;
    });