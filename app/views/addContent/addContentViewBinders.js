/* jshint loopfunc:true */
define(['jquery', 'underscore', 'plugins', 'require'], function ($, _, plugins, require) {
    'use strict';

    return {
        fieldtype : function(el, value) {
            var plugin = _.find(plugins.fields, {type : value.type});

//            console.log(el);
            console.log(value);
//            console.log(this);
//            console.log(this.view.models.view);

            require([plugin.view, plugin.config], function(ViewModule, configModule) {

                var viewInstance = new ViewModule(_.extend({}, configModule, {
                    modelData : value,
                    el : el
                }));

                viewInstance.start();
            });
        }
    };

});