define(["BaseForm"], function (BaseForm) {
    var BgForm = BaseForm.extend({
        fields: [
            {
                name: "label",
                label: "Intitulé",
                title: "l'intitulé de l'activité",
                control: "input",
                required: "required"
            },



        ],

        events: {
            "click .extrafieldparam": "editList",
            "change": function () {
                //e.preventDefault();
                this.model.validate();
                if (this.model.errorModel.isEmpty()) {
                    this.model.save().done(function (result) {
                        if ($("#titleActivity-" + result.id).length > 0) {
                            $("#titleActivity-" + result.id).html(result.label + '<div vlass="clear"></div><span class="activ_caption pull-left">' + result.typecost.label + '</span>');
                        }
                    });
                }
                return false;
            }
        },
        recursiveOption: function (collection, field, text,parent_id) {
            var thisView = this;
            text = text || "";
            $.each(collection, function (index, value) {
                if(text!="")
                    var str = text + " > " + value.text;
                else
                    var str = value.text;
                var opt =  new Option( str,value.id);
                if(parent_id == value.id)
                    opt.selected = true;
                $("select[name="+field+"]").append(opt);
                if(value.children){
                    thisView.recursiveOption(value.children, field, str ,parent_id);
                }

            });
        },
        returndata: function (field) {
            var thisView = this;
            var ref = $('#jstree_demo').jstree(true),
                sel = ref.get_selected();
            var parent_id = sel[0] || 0 ;
            var data = ref.get_json('#', {flat:false});
            var html = "";
            $("select[name="+field+"]").html("");
            var opt =  new Option("Choisissez","");
            $("select[name="+field+"]").append(opt);
            thisView.recursiveOption(data[0].children,field,"",parent_id);


        }
    });
    return ActivityForm;
});