/* jshint loopfunc:true */
define(['jquery', 'underscore', 'masseuse', 'pluginWrapperView', 'pluginWrapperViewConfig'],
    function ($, _, masseuse, PluginWrapperView, pluginWrapperViewConfig) {
        'use strict';


        return {
            fieldwrapper : function(el, field) {
                var rivets = this,
                    viewInstance;

                viewInstance = new PluginWrapperView(_.extend({}, pluginWrapperViewConfig, {
                    modelData : _.extend({}, field, {
                        value: masseuse.ProxyProperty('fields.' + field._id, rivets.view.models.view.model)
                    }),
                    appendTo : el
                }));
                rivets.view.models.view.addChild(viewInstance);
                viewInstance.start();
            }
        };

    });