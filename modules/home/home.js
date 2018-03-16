define(['jquery', 'underscore', 'backbone',
        'modules/baseview/baseview',
        'text!modules/home/homeTemplate.html',

    ],
    function ($, _, Backbone, BaseView, template) {

        var View = BaseView.extend({
            hasHeader: true,
            title: window.appTitle,
            secondaryevent: {
                "click #puzzle-icon": "selectPuzzleModule"
            },
            template: _.template(template),
            appended: function () {
                var thisView = this;

            },
            selectPuzzleModule:function () {
                var thisView = this;
                $('#bs-dialog').modal();
            },
            render: function () {
                this.el.innerHTML = this.contentTemplate();
                return this;
            }
        });
        return View;
    });


