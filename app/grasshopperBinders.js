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

//                console.log(el);
//                console.log(field);
//                console.log(currentValue);

                viewInstance = new PluginWrapperView(_.extend({}, pluginWrapperViewConfig, {
                    modelData : _.extend({}, field, {
                        value: masseuse.ProxyProperty('fields.' + field._id, rivets.view.models.view.model)
                    }),
                    collection : new (Backbone.Collection.extend({
                        initialize: function (models, options) {

                            Backbone.Collection.prototype.initialize.call(this, models, options);

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
                var rivets = this,
                    viewInstance,
                    ViewModule = model.get('ViewModule'),
                    configModule = model.get('configModule');

                console.log(model);

                viewInstance = ViewModule(_.extend({}, configModule, {
                    modelData : _.extend({}, {}, {
//                        value: masseuse.ProxyProperty('value', rivets.view.models.view.model)
                    }),
                    appendTo : el
                }));
                console.log(viewInstance);
//                viewInstance.start();
            }
        };

    });