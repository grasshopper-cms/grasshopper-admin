/* jshint loopfunc:true */
define(['underscore', 'masseuse',
    'plugins', 'jquery'],
    function (_, masseuse,
              plugins, $) {
        'use strict';

        return {
            fieldtype : {
                bind: function() {

                },
                unbind : function() {
                    this.viewInstance.remove();
                },
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
                            options : model.get('options')
                        },
                        appendTo : el
                    }));

                    rivets.viewInstance.start();
                },
                publish : true
            }
        };

    });