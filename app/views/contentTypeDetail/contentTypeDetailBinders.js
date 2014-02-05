/* jshint loopfunc:true */
define(['underscore', 'masseuse',
    'plugins', 'jquery'],
    function (_, masseuse,
              plugins, $) {
        'use strict';

        return {
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
                            rivets.model.field.set(property, false, {silent:true});
                        }

                        modelData[property] = masseuse.ProxyProperty(property, model);
                    });

                    rivets.viewInstance = new ViewModule($.extend(true, {}, configModule, {
                        modelData : modelData,
                        template : configModule.setupTemplate,
                        mastheadButtons : rivets.model.view.mastheadButtons,
                        appendTo : el
                    }));

                    rivets.viewInstance.start();
                },
                publishes : true
            }
        };

    });