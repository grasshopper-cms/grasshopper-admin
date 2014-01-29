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
            inlineedit : {
                bind: function(el) {
                    var self = this,
                        keypath = this.keypath,
                        property = keypath.substring(keypath.indexOf(':') + 1).replace('->','.'),
                        value = this.model.get(property),
                        inlineEditableTemplate = '<input value="[[= value ]]" style="display: none; ' +
                            'width: 100%;"><i class="icon-edit" style="display: none;"></i>',
                        template = _.template(inlineEditableTemplate, { value : value }),
                        $el = $(el),
                        $input;

                    $input = $(template).insertAfter($el);

                    $input.on('focusout', function() {
                        $el.show();
                        $input.hide();
                        self.model.set(property, $input.val());
                    });

                    $el.on('click', function() {
                        $el.hide();
                        $input.show().focus();
                    });

                    $el.on('mouseover mouseout', function() {
                        $('i.icon-edit').toggle();
                    });

                },
                unbind : function() {},
                routine : function() {}
            },
            fieldform : {
                bind: function(el) {
                    var rivets = this,
                        plugin = _.find(plugins.fields, {type : rivets.model.field.get('type')}),
                        ViewModule = plugin.view,
                        configModule = plugin.config;

                    rivets.viewInstance = new ViewModule($.extend(true, {}, configModule, {
                        template : configModule.setupTemplate,
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
            }
        };
    });