/* jshint loopfunc:true */
define(['underscore', 'masseuse', 'plugins', 'jquery'],
    function (_, masseuse, plugins, $) {
        'use strict';

        return {
            fieldtype : {
                bind: function() {},
                unbind : function() {},
                routine : function(el, model) {
                    var rivets = this,
                        ViewModule = rivets.model.model.get('ViewModule'),
                        configModule = rivets.model.model.get('configModule');

                    if (rivets.viewInstance) {
                        rivets.model.view.removeChild(this.viewInstance);
                        rivets.viewInstance.remove();
                    }

                    rivets.viewInstance = new ViewModule($.extend(true, {}, configModule, {
                        modelData : {
                            value : masseuse.ProxyProperty('value', model),
                            options : model.get('options'),
                            fieldId : model.get('fieldId')
                        },
                        appendTo : el
                    }));

                    this.model.view.addChild(rivets.viewInstance);
                },
                publish : true
            },
            'sortable-multi-columns' : function(el, showSortableMulti) {
                var $el = $(el);

                if(showSortableMulti) {
                    $el.removeClass().addClass('small-10 columns');
                } else {
                    $el.removeClass().addClass('small-11 columns');
                }
            }
        };

    });
