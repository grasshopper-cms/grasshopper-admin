/* jshint loopfunc:true */
define(['jquery', 'underscore', 'masseuse',
    'pluginWrapperView', 'backbone', 'nodeTreeView'],
    function ($, _, masseuse,
              PluginWrapperView, Backbone, NodeTreeView) {

        'use strict';

        var ProxyProperty = masseuse.ProxyProperty;

        return {
            fieldwrapper : {
                bind : function() {},
                unbind : function() {
                    this.viewInstance.remove();
                },
                routine : function(el) {
                    var rivets = this,
                        parentView = this.model.view,
                        thisField = this.model.field;

                    rivets.viewInstance = new PluginWrapperView({
                        modelData : _.extend({}, thisField, {
                            value: masseuse.ProxyProperty('fields.' + thisField._id, parentView.model)
                        }),
                        collection : new (Backbone.Collection.extend({
                            initialize: function () {
                                this.on('all', function (eventName) {
                                    this.setValuesOnParentFieldsObject(eventName);
                                });
                            },
                            setValuesOnParentFieldsObject : function() {
                                var values = this.toJSON(),
                                    max = thisField.max;

                                if(max === 1) {
                                    values = values[0];
                                }

                                parentView.model.set('fields.' + thisField._id, values);
                            },
                            toJSON: function () {
                                var json = Backbone.Collection.prototype.toJSON.apply(this);

                                return _.pluck(json, 'value');
                            }
                        }))([], {}),
                        appendTo : el
                    });
                    rivets.viewInstance.start();
                },
                publish : true
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
            },
            nodetree :  function(el, model) {
                _appendNodeTreeView.call(this, el, model);
            },
            'move-to' : function(el, selector) {
                $(selector).append($(el).contents());
                $(selector).foundation();
            }
        };

        function _appendNodeTreeView(el, model) {
            var nodeTreeView = new NodeTreeView({
                appendTo : el,
                modelData : _.extend({}, model.attributes, {
                    allowedTypes : this.model.model.get('allowedContentTypes'),
                    selectedContent : new ProxyProperty('selectedContent', this.model.model),
                    inSetup : this.model.model.get('inSetup'),
                    nodeTreeType : this.model.model.get('nodeTreeType'),
                    availableTypes : this.model.model.get('availableTypes')
                })
            });

            if(this.model.model.get('inSetup')) {
                nodeTreeView.model.set('selectedNode',  new ProxyProperty('options.defaultNode', this.model.model));
            }
            this.model.view.addChild(nodeTreeView);
        }

        function _callback(el, evt) {
            // listen for the enter key or Blur to save to the model.
            if(evt.keyCode === 13 || evt.type === 'blur') {
                this.view.adapters[':'].publish(
                    this.model,this.keypath.substring(this.keypath.indexOf(':')+1), el.textContent);
            }
        }
    });