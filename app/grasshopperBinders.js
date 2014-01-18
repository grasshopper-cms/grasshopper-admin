/* jshint loopfunc:true */
define(['jquery', 'underscore', 'plugins', 'require', 'masseuse', 'pluginWrapperView', 'pluginWrapperViewConfig'],
    function ($, _, plugins, require, masseuse, PluginWrapperView, pluginWrapperViewConfig) {
        'use strict';


        return {
            fieldwrapper : function(el, field) {
                var rivets = this,
                    viewInstance;

                viewInstance = new PluginWrapperView(_.extend({}, pluginWrapperViewConfig, {
                    modelData : _.extend({}, field, {
                        value: masseuse.ProxyProperty('fields.' + field._id, rivets.view.models.view.model)
                    }),
                    el : el
                }));
                rivets.view.models.view.addChild(viewInstance);
                viewInstance.start();
            },
            fieldtype : function(el, field) {
                var plugin = _.find(plugins.fields, {type : field.get('type')}),
                    rivets = this;

                require([plugin.view, plugin.config], function(ViewModule, configModule) {

                    var viewInstance = new ViewModule(_.extend({}, configModule, {
                        modelData : {
                            value: masseuse.ProxyProperty('value', rivets.view.models.view.model),
                            label: field.get('label'),
                            _id: field.get('_id'),
                            type: field.get('type')
                        },
                        el : el
                    }));

                    rivets.view.models.view.addChild(viewInstance);
                    viewInstance.start();
                });
            }
        };

    });