/* jshint loopfunc:true */
define(['jquery', 'underscore', 'masseuse',
    'pluginWrapperView', 'pluginWrapperViewConfig', 'plugins', 'require', 'backbone'],
    function ($, _, masseuse,
              PluginWrapperView, pluginWrapperViewConfig, plugins, require, Backbone) {
        'use strict';


        return {
            fieldwrapper : function(el, field) {
                var rivets = this,
                    viewInstance;

                viewInstance = new PluginWrapperView(_.extend({}, pluginWrapperViewConfig, {
                    modelData : _.extend({}, field, {
                        value: masseuse.ProxyProperty('fields.' + field._id, rivets.view.models.view.model),
                        multiCollection : new Backbone.Collection([], {})
                    }),
                    appendTo : el
                }));
                rivets.view.models.view.addChild(viewInstance);
                viewInstance.start();
            },
            fieldtype : function(el, model) {
                var plugin = _.find(plugins.fields, {type : model.get('type')}),
                    rivets = this;

                require([plugin.view, plugin.config], function(ViewModule, configModule) {

                    var viewInstance = new ViewModule(_.extend({}, configModule, {
                        modelData : _.extend({}, model.attributes, {
                            value: masseuse.ProxyProperty('value', rivets.view.models.view.model)
                        }),
                        appendTo : el
                    }));

                    rivets.view.models.view.addChild(viewInstance);
                    viewInstance.start();
                });
            }
        };

    });