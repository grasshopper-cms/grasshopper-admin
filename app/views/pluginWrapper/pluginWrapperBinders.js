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
            },
            handle_addition_button :  function(el) {
//                show if the length of the collection is less than the maximum & never show if the type is readonly
                if(this.view.models.collection.length < this.view.models.model.get('max')&&
                    this.view.models.model.get('type') !== 'readonly') {
                    $(el).show();
                } else {
                    $(el).hide();
                }
            },
            handle_subtraction_button : function(el) {
//                show if the length of the collection is greater than the minimum & never show if the type is readonly
                if(this.view.models.collection.length > this.view.models.model.get('min') &&
                    this.view.models.model.get('type') !== 'readonly') {
                    $(el).show();
                } else {
                    $(el).hide();
                }
            }
        };

    });