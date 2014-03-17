/* jshint loopfunc:true */
define(['jquery', 'underscore', 'masseuse',
    'pluginWrapperView', 'backbone'],
    function ($, _, masseuse,
              PluginWrapperView, Backbone) {
        'use strict';

        return {
            fieldwrapper : {
                bind : function() {},
                unbind : function() {
                    this.viewInstance.remove();
                },
                routine : function(el) {
                    var rivets = this;

                    rivets.viewInstance = new PluginWrapperView({
                        modelData : _.extend({}, rivets.model.field, {
                            value: masseuse.ProxyProperty('fields.' + rivets.model.field._id, rivets.model.view.model)
                        }),
                        collection : new (Backbone.Collection.extend({
                            initialize: function () {
                                this.on('add remove reset change', function () {
                                    var values = this.toJSON();

                                    if (values) {
                                        rivets.model.view.model.set('fields.' + rivets.model.field._id, values);
                                    }
                                });
                            },
                            toJSON: function () {
                                var json = Backbone.Collection.prototype.toJSON.apply(this),
                                    max = rivets.model.field.max,
                                    value = _.pluck(json, 'value');

                                value = _.compact(value); // Remove All falsy values.

                                if(_.isUndefined(value[0])) { // If it is an array of nothing, return false.
                                    return false;
                                }

                                if(max > 1) { // if its max is greater than 1 allow it to be represented as an array.
                                    return value;
                                } else {
                                    return value[0];
                                }

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