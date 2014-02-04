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
                        plugin = _.find(plugins.fields, {type : model.get('type')}),
                        ViewModule = rivets.model.field.get('ViewModule'),
                        configModule = rivets.model.field.get('configModule'),
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
                        appendTo : el
                    }));

                    rivets.viewInstance.start();
                },
                publish : true
            }
        };

    });