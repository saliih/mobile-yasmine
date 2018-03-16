define(["backbone"], function (backbone) {
    var BaseForm = Backform.Form.extend({
        el: ".formulaire",
        destroyForm: function () {
            this.remove();
            $("#mainform").html('<div class="formulaire"></div>');
        },
        AfterShow: function () {
            return true;
        },
        editList: function (event) {
            var thisView = this;
            var field = $(event.currentTarget).attr('data-value');
            var element;
            $.each(thisView.fields.models, function (index, value) {
                if (value.get('name') == field) {
                    element = value;
                }
            });
            $(".modal-title").html(element.get('editList').title);
            $('#myModal>.modal-dialog').css('width', '50%');
            var view = element.get('editList').view();
            view.render();
            $("#modal-body").append(view.$el);
            $('#myModal').one('shown.bs.modal', function (e) {
                $('#modal-body .tab-content').css("padding-top", "0");
                $('#modal-body .tab-content .breadcrumb').css("display", "none");
                $('#modal-body .tab-content h1').css("display", "none");
                $('#modal-body .tab-content .acc-title').css("display", "none");
                $('#modal-body').css("min-height", "500px");
            }).one('hidden.bs.modal', function (e) {
                thisView.returndata(field);
                $('#modal-body').html("");
            }).modal("show");
        }
    });
    return BaseForm;
});