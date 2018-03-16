'use strict';

//Require configuration
require.config({
    //path mappings for module names not found directly under baseUrl
    paths: {
        //require plugins
        text:                           '../vendor/require/js/text',
        i18n:                           '../vendor/require/js/i18n',
        //jquery related
        jquery:                         '../public/assets/js/jquery-1.12.2.min',
        //backbone
        underscore:                     "../vendor/underscore/js/underscore-min",
        backbone:                       '../vendor/backbone/js/backbone-min',
        dualstorage:                    "../vendor/backbone/js/backbone.dualstorage",
        AssociatedModel:                    "../vendor/backbone/js/backbone-associations",
        //others libs
        jqueryui:                       '../vendor/jqueryui/js/jquery-ui.min',
        fastclick:                      '../vendor/fastclick/js/fastclick',
       // Bootstrap
        bootstrap:                      '../public/assets/js/bootstrap.min',
        // form generator
        backform:                       "../vendor/backbone/js/backform",
        dragsort:                       "../vendor/dragsort/jquery.dragsort-0.5.2.min",
        jquerymixitup:                  "../vendor/mixitup/jquery.mixitup",
        jqueryform:                  "../vendor/jquery-form/jquery-form",
        draggablebackground:                  "../vendor/draggable-background/draggable_background",
        propeller:                  "../public/assets/js/propeller.min",
        colorpicker:                  "../vendor/colorpicker/js/colorpicker",
        // form
        //BaseForm:                       '../form/BaseForm',
        //FinancialyearForm:              '../form/FinancialyearForm',


        // model
        BaseModel:                      '../models/BaseModel',
        PuzzleSingleModel:             '../models/PuzzleSingleModel',
        //ModelCtModel:                   '../models/ModelCtModel',
        //TechnologicalCenterModel:       '../models/TechnologicalCenterModel',


        // collection
        //BaseCollection:                 '../collections/baseCollection',
        //TechnologicalCenterCollection:  '../collections/TechnologicalCenterCollection',

        // fileupload
        fileupload:                     '../vendor/blueimp/js/jquery.fileupload',
        'jquery.ui.widget':             '../vendor/blueimp/js/vendor/jqueryuiwidget',
        iframetransport:                '../vendor/blueimp/js/jquery.iframe-transport',


        //module
        modules: '../modules'
    },
    shim: {
        'bootstrap':                    { deps: ['jquery']},
        'jquerymixitup':                { deps: ['jquery']},
        'jqueryform':                { deps: ['jquery']},
        'draggablebackground':                { deps: ['jquery']},
        'jqueryui':                { deps: ['jquery']},
        'colorpicker':                { deps: ['jquery']},
        'propeller':                { deps: ['jquery', 'bootstrap']},
        'BootstrapDialog':              { deps: ['jquery', 'bootstrap']},
        'bootstrapselect':              { deps: ['jquery', 'bootstrap']},
        'bootstrapcolorpicker':         { deps: ['jquery', 'bootstrap']},

        'dualstorage':                  { deps: ['backbone']},


    },
    waitSeconds: 0
});

//1. load app.js,
//2. configure jquery mobile to prevent default JQM ajax navigation
//3. bootstrapping application
require(['utils', 'jquery', 'fastclick', 'defines'], function (u, $, FastClick) {
    require(['underscore', 'backbone', 'router', 'bootstrap','backform', 'propeller','jqueryform', 'jqueryui'], function (_, Backbone, Router, bootstrap) {//, 'dualstorage'
        //attach elements/timers to he document
        $(function () {
            //Fast click
            FastClick.attach(document.body);
        });

        //create backbone router
        var router = new Router();
        Backbone.history.start();
    });
});
