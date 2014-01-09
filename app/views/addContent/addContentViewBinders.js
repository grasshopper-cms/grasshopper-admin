/* jshint loopfunc:true */
define(['jquery', 'underscore', 'plugins', 'require'], function ($, _, plugins, require) {
    'use strict';



    return {
        fieldtype : function(el, value) {
            var plugin = _.find(plugins.fields, {type : value.type}),
                View,
                Config;


            require([plugin.view], function(view) {
                View = view;

                require([plugin.config], function(config) {
                    Config = config;

                    var view = new View(_.extend({}, Config, {
                        modelData : {

                        },
                        el : $(el).attr('id')
                    }));
//
                    console.log(view);
                });
            });



        }
    };

});