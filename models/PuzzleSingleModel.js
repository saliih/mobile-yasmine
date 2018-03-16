define(['BaseModel']
    , function( BaseModel) {
        var PuzzleSingleModel = BaseModel.extend({
            //urlRoot: GV_URL + '/api/activities/',

            defaults: {
                ratio : 1,
                width : 0,
                height : 0,
                widthbg : null,
                heightbg : null,
                bg: '',
                percentBg : null,
                maxPrcent : null,

            },
            calculatePercentBg: function () {
                this.set('percentBg', (this.get("widthbg") * 100 / this.get("width")).toFixed(0));
            },
            validate: function() {
                this.errorModel.clear();

                if (this.get("label")==""){
                    this.errorModel.set({label: "L'intitulé ne doit pas être vide"});
                }
                if (this.get("typecostid")==""){
                    this.errorModel.set({typecostid: "Vous devez spécifier un type"});
                }
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