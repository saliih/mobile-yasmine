define(['jquery', 'underscore', 'backbone',
        'text!modules/baseview/baseviewTemplate.html',
        ],
    function ($, _, Backbone, baseTemplate) {

        var View = Backbone.View.extend({

            //render the content into div of view
            originalEvents: {
                //'click .close_btn': 'closeCollapse',

            },
            contentTemplate: _.template(baseTemplate),
            templateParams: {},
            hasHeader: false,
            events: function () {
                return _.extend({}, this.originalEvents, this.additionalEvents, this.secondaryevent);
            },



            initialize: function (options) {
                this.options = options;
                window.loadingCount=0;
            },
            render: function () {
                //this.el is the root element of Backbone.View. By default, it is a div.
                //$el is cached jQuery object for the view's element.
                //append the compiled template into view div container

                this.el.innerHTML = this.contentTemplate();

                //return to enable chained calls
                return this;
            },
            /* Destroys the view and eny related elements */
            destroyView: function () {
                $(".container").remove();
                if (typeof(this.destroy) == "function") {
                    this.destroy();
                }
            },

            /* called after page is appended to DOM */
            viewAppended: function () {
                var thisView = this;
                var sPath=window.location.pathname;
                var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
                $(".pmd-sidebar-nav").each(function(){
                    $(this).find("a[href='"+sPage+"']").parents(".dropdown").addClass("open");
                    $(this).find("a[href='"+sPage+"']").parents(".dropdown").find('.dropdown-menu').css("display", "block");
                    $(this).find("a[href='"+sPage+"']").parents(".dropdown").find('a.dropdown-toggle').addClass("active");
                    $(this).find("a[href='"+sPage+"']").addClass("active");
                });
                var toggles = document.querySelectorAll(".c-hamburger");
                for (var i = toggles.length - 1; i >= 0; i--) {
                    var toggle = toggles[i];
                    thisView.toggleHandler(toggle);
                };

            },
            toggleHandler: function (toggle) {
                var thisView = this;
                if (thisView.hasHeader) {
                    toggle.addEventListener( "click", function(e) {
                        e.preventDefault();
                        (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
                    });

                }
            },
            refreshFinancialyears: function () {
                var thisView = this;
                if (thisView.hasHeader) {


                }
            },
            generateForm: function (object) {
                var thisView = this;
                if (window.currentform) {
                    window.currentform.destroyForm();
                    window.currentform = null;
                }
                //$("#mainform").html('<div class="formulaire"></div>');
                var form = object.form();
                form.on("refresh_financial_years", this.refreshFinancialyears, this);
                form.render();

                window.currentform = form;
                if (thisView.supplementdata != null) {
                    thisView.supplementdata.remove();
                }
                if (object.extraParametersTemplate()) {
                    if ($('.suplementData').length == 0) {
                        $(".sidebar_right > .col-md-12").append("<div class='suplementData'></div>");
                    }
                    thisView.supplementdata = object.extraParametersTemplate();
                    thisView.supplementdata.render();
                } else {
                    InitSidebar(1);
                }
                form.AfterShow();
            }
        });

        return View;
    }
);
