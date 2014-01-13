/* jshint loopfunc:true */
define(['jquery', 'underscore', 'plugins', 'require', 'proxyProperty'],
    function ($, _, plugins, require, ProxyProperty) {
        'use strict';


        return {
            fieldtype : function(el, field) {
                var plugin = _.find(plugins.fields, {type : field.type}),
                    rivets = this;

//            console.log(el);
//            console.log(field);
//            console.log(this);
                console.log(this.view.models.view.model);

                require([plugin.view, plugin.config], function(ViewModule, configModule) {

                    var viewInstance = new ViewModule(_.extend({}, configModule, {
                        modelData : {
                            value: ProxyProperty('fields.' + field._id, rivets.view.models.view.model)
                        },
                        el : el
                    }));

                    viewInstance.start();
                });
            }
        };

    });