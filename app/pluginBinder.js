/* jshint loopfunc:true */
define(['jquery', 'underscore', 'plugins', 'require', 'masseuse'],
    function ($, _, plugins, require, masseuse) {
        'use strict';


        return {
            fieldtype : function(el, field) {
                var plugin = _.find(plugins.fields, {type : field.type}),
                    rivets = this;

                require([plugin.view, plugin.config], function(ViewModule, configModule) {

                    var viewInstance = new ViewModule(_.extend({}, configModule, {
                        modelData : {
                            value: masseuse.ProxyProperty('fields.' + field._id, rivets.view.models.view.model),
                            label: field.label,
                            _id: field._id,
                            type: field.type
                        },
                        el : el
                    }));

                    viewInstance.start();
                });
            }
        };

    });