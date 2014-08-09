/* jshint loopfunc:true */
define(['jquery', 'underscore', 'masseuse',
    'pluginWrapperView', 'backbone', 'nodeTreeView', 'pluginWrapperViewCollection'],
    function ($, _, masseuse,
              PluginWrapperView, Backbone, NodeTreeView, PluginWrapperViewCollection) {

        'use strict';

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
                        collection : PluginWrapperViewCollection.createFromParentView(parentView, thisField),
                        appendTo : el
                    });

                    parentView.addChild(rivets.viewInstance);
                    //rivets.viewInstance.start();
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
            'move-to' : function(el, selector) {
                var $selector = $(selector);
                $selector.append($(el).contents());
                $selector.foundation();
            },
            'stop-propagation' : function(el) {
                $(el).on('click', function(e) {
                    e.stopPropagation();
                });
            },
            'swap-text-while' : function(el, revert) {
                var $el = $(el);

                if(revert) {
                    if(!$el.attr('oldText')) { // Should Only Do this once.
                        $el.attr('oldText', $el.text());
                        $el.width($el.width()); // Forces the buttons to maintain width.
                    }
                    $el.html($el.attr('data-swap-html') || 'Saving...');
                } else {
                    $el.html($el.attr('oldText'));
                }
            },
            'recurse-nodes-radios' : function(el, collection) {
                var $el = $(el),
                    $div = $('<div/>');


//                recurseChildNodes(collection, $el);

//                collection.fetch()
//                    .done(function() {
//                        $el.empty();
//
//                        if(collection.length) {
//                            collection.each(function(model) {
//                                $div.append('<div style="padding-left: 5px;" data-rv-recurse-nodes-radios="model:childNodes">NODE</div>');
//                            });
//
//                            $el.append($div);
//                        }
//                    });

//                <!--<div data-rv-each-node="model:childNodes:" data-rv-on-click="view.navigateToFolder" data-rv-nodeid="node:_id">-->
//                <!--<i data-rv-nodeid="node:_id" class="fa fa-folder"></i>-->
//                    <!--<a data-rv-nodeid="node:_id">{{node:label | spaceBefore}}</a>-->
//                    <!--</div>-->
            }
        };

//        function recurseChildNodes(collection, $element) {
//            collection.fetch()
//                .done(function() {
//                    if(collection.length) {
//
//                        $element.append('<div style="padding-left: 5px;">NODE</div>');
//
//                        collection.each(function(model) {
////                            $element.append('<div style="padding-left: 5px;">NODE</div>');
//                            recurseChildNodes(model.get('childNodes'), $element);
//                        });
//                    } else {
//                        $element.append('<div style="padding-left: 5px;">NODE</div>');
//                    }
//                });
//        }

        function _callback(el, evt) {
            // listen for the enter key or Blur to save to the model.
            if(evt.keyCode === 13 || evt.type === 'blur') {
                this.view.adapters[':'].publish(
                    this.model,this.keypath.substring(this.keypath.indexOf(':')+1), el.textContent);
            }
        }
    });