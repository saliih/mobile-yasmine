define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    'use strict';
    var Router = Backbone.Router.extend({

        register: function (route, path) {
            var self = this;
            this.route(route, path, function () {
                var viewArguments = arguments;
                require([path], function (PageView) {
                    var view = new PageView(viewArguments);
                    if (typeof(view.init) != 'undefined') {
                        view.init();
                    }
                    var delayShowPage = false;
                    if (typeof(view.initData) != 'undefined') {
                        if (view.initData()) {
                            delayShowPage = true;
                            $(document).one("ajaxStop", function () {
                                self.showPage(view);
                            });
                        }
                    }
                    if (!delayShowPage) {
                        self.showPage(view);
                    }
                });
            });
        },

        showPage: function (page, actions) {

            // will render home view and navigate to homeView
            page.render();
            this.changePage(page);
        },

        //1. changePage will insert view into DOM and then call changePage to enhance and transition
        //2. for the first page, jQuery mobile will present and enhance automatically
        //3. for the other page, we will call $.mobile.changePage() to enhance page and make transition
        //4. argument 'view' is passed from event trigger
        changePage: function (view) {
            var self = this;
            window.loadingCount = 0;
            //Remove previous hidden page
            if (window.previousView != null) {
                window.previousView.destroyView();
            }
            //append to dom
            $('body').html(view.$el);

            //call viewAppended of the page
            view.viewAppended();
            //Hide the loader
            //hideLoader();
            //save previous view
            window.previousView = view;
        },

        //init pages / view
        initialize: function () {
            this.register('', 'modules/splashscreen/splashscreen');
            this.register('*actions', 'modules/splashscreen/splashscreen');
            if (window.menu == null) {

            }

            // menu Accueil
            this.register('home', 'modules/home/home');
            this.register('puzzleSingle', 'modules/puzzleSingle/puzzleSingle');
            var thisRouter = this;



        }
    });

    return Router;
});
