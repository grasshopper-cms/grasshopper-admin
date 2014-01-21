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
                    modelData : _.extend({}, field),
                    collection : new (Backbone.Collection.extend({
                        initialize: function (models, options) {
                            var inModels = models;

                            // Ensure that we are dealing with an array
                            if (!inModels instanceof Array) {
                                inModels = [models];
                            }

                            Backbone.Collection.prototype.initialize.call(this, inModels, options);

                            this.listenTo(rivets.view.models.view.model, 'change', function () {
                                // Update the collection here with the new data from the server
                                this.reset(rivets.view.models.view.model.get('fields.' + field._id), {silent: true});
                            });

                            this.on('add remove reset change', function () {
                                // Update the parent model value
                                rivets.view.models.view.model.set('fields.' + field._id, this.toJSON());
                            });
                        },
                        toJSON: function () {
                            // If this is a collection with only one model, return the object not wrapped in an array
                            var json = Backbone.Collection.prototype.toJSON.apply(this);

                            return _.pluck(json, 'value');
                        }
                    }))([], {}),
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