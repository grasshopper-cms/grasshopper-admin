/* jshint loopfunc:true */
define(['jquery', 'underscore', 'masseuse',
    'pluginWrapperView', 'pluginWrapperViewConfig', 'backbone', 'plugins'],
    function ($, _, masseuse,
              PluginWrapperView, pluginWrapperViewConfig, Backbone, plugins) {
        'use strict';

        return {
            fieldwrapper : {
                bind : function(el) {
                    var rivets = this,
                        viewInstance;

                    viewInstance = new PluginWrapperView(_.extend({}, pluginWrapperViewConfig, {
                        modelData : _.extend({}, rivets.model.field, {
                            value: masseuse.ProxyProperty('fields.' + rivets.model.field._id, rivets.model.view.model)
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
                                        // TODO: Could probably use viewInstance.model.set() here.
                                        rivets.model.view.model.set('fields.' + rivets.model.field._id, values);
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
                    rivets.model.view.addChild(viewInstance);
                },
                unbind : function() {},
                routine : function() {},
                publish : true
            },
            fieldtype : {
                bind: function(el) {
                    var rivets = this,
                        ViewModule = rivets.model.field.get('ViewModule'),
                        configModule = rivets.model.field.get('configModule');

                    rivets.viewInstance = new ViewModule($.extend(true, {}, configModule, {
                        modelData : {
                            value : masseuse.ProxyProperty('value', rivets.model.field)
                        },
                        appendTo : el
                    }));
                },
                unbind : function() {
                    this.viewInstance.remove();
                },
                routine : function(el, model) {
                    if (this.viewInstance) {
                        this.viewInstance.$el.empty();
                        this.viewInstance.$el.remove();
                        this.viewInstance.model.set(model.attributes);
                    }

                    if (!this.viewInstance.hasStarted) {
                        this.viewInstance.start();
                    } else {
                        this.viewInstance.render();
                    }
                },
                publish : true
            },
            fieldform : {
                bind: function() {},
                unbind : function() {
                    this.viewInstance.remove();
                },
                routine : function(el, model) {
                    var rivets = this,
                        plugin = _.find(plugins.fields, {type : model.get('type')}),
                        ViewModule = plugin.view,
                        configModule = plugin.config,
                        modelData = {};

                    if (rivets.viewInstance) {
                        rivets.model.view.removeChild(this.viewInstance);
                        rivets.viewInstance.remove();
                    }

                    _.each(plugin.availableProperties, function(property) {
                        if(!rivets.model.field.has(property)) {
                            rivets.model.field.set(property, '', {silent:true});
                        }

                        modelData[property] = masseuse.ProxyProperty(property, model);
                    });

                    rivets.viewInstance = new ViewModule($.extend(true, {}, configModule, {
                        modelData : modelData,
                        template : configModule.setupTemplate,
                        appendTo : el
                    }));

                    rivets.viewInstance.start();
                },
                publishes : true
            },
            editable : {
                routine: function(el, model) {
                    this.view.binders.text.call(this, el, model);
                },
                bind : function(el) {
                    var $el = $(el);
                    if(!$el.attr('contenteditable')) {
                        $el.attr('contenteditable', true);
                    }

                    el.addEventListener('keypress', _callback.bind(this, el), false);
                    el.addEventListener('blur', _callback.bind(this, el), false);
                },
                unbind: function(el) {
                    el.removeEventListener('keypress', _callback.bind(this, el), false);
                    el.removeEventListener('blur', _callback.bind(this, el), false);
                }
            }
        };

        function _callback(el, evt) {
            // listen for the enter key or Blur to save to the model.
            if(evt.keyCode === 13 || evt.type === 'blur') {
                this.view.adapters[':'].publish(
                    this.model,this.keypath.substring(this.keypath.indexOf(':')+1), el.textContent);
            }

        }
    });