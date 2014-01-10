/* jshint loopfunc:true */
define(['vendor/jquery', 'underscore', 'plugins', 'require'], function ($, _, plugins, require) {
    'use strict';


    return {
        fieldtype : function(el, field) {
            var plugin = _.find(plugins.fields, {type : field.type});

//            console.log(el);
//            console.log(field);
//            console.log(this);
            console.log(this.view.models.view.model.attributes);

            require([plugin.view, plugin.config], function(ViewModule, configModule) {

                var viewInstance = new ViewModule(_.extend({}, configModule, {
                    modelData : _.extend({}, field, {}),
                    el : el
                }));

                viewInstance.start();
            });
        }
    };

});