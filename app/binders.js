/* jshint loopfunc:true */
define(['jquery', 'underscore', 'masseuse',
    'pluginWrapperView', 'pluginWrapperViewConfig', 'backbone'],
    function ($, _, masseuse,
              PluginWrapperView, pluginWrapperViewConfig, Backbone) {
        'use strict';


        return {
            fieldwrapper : function(el, field) {
                var rivets = this,
                    viewInstance;

                viewInstance = new PluginWrapperView(_.extend({}, pluginWrapperViewConfig, {
                    modelData : _.extend({}, field, {
                        value: masseuse.ProxyProperty('fields.' + field._id, rivets.view.models.view.model)
                    }),
                    collection : new (Backbone.Collection.extend({
                        initialize: function () {
//
//                            Backbone.Collection.prototype.initialize.call(this, models, options);
//
//                            this.listenTo(rivets.view.models.view.model, 'change', function () {
//                                // Update the collection here with the new data from the server
//                                this.reset(rivets.view.models.view.model.get('fields.' + field._id), {silent: true});
//                            });
//
                            this.on('add remove reset change', function () {
                                // Update the parent model value
                                var values = this.toJSON();

                                if (values) {
                                    rivets.view.models.view.model.set('fields.' + field._id, values);
                                }
                            });
                        },
                        toJSON: function () {
                            var json = Backbone.Collection.prototype.toJSON.apply(this),
                                value = _.pluck(json, 'value');

                            if (value.length < 2) {
                                return value[0];
                            }
                            return value;
                        }
                    }))([], {}),
                    appendTo : el
                }));
                rivets.view.models.view.addChild(viewInstance);
            },
            fieldtype : function(el, model) {
                var viewInstance,
                    ViewModule = model.get('ViewModule'),
                    configModule = model.get('configModule');

                viewInstance = new ViewModule(_.extend({}, configModule, {
                    modelData : _.extend({}, model.attributes, {
                        value : masseuse.ProxyProperty('value', model)
                    }),
                    appendTo : el
                }));
                viewInstance.start();
            }
        };

    });