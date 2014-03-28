/* jshint loopfunc:true */
define(['underscore', 'masseuse', 'plugins', 'fieldAccordionView'],
    function (_, masseuse, plugins, FieldAccordionView) {
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
                        configModule = plugin.config;

                    if (rivets.viewInstance) {
                        rivets.model.view.removeChild(this.viewInstance);
                        rivets.viewInstance.remove();
                    }

                    _.each(configModule.modelData, function(value, key) {
                        if(!model.has(key)) {
                            model.set(key, value, {silent: true});
                        }
                    });

                    rivets.viewInstance = new ViewModule(configModule, {
                        modelData : {
                            options : masseuse.ProxyProperty('options', model),
                            inSetup : true
                        },
                        template : configModule.setupTemplate,
                        mastheadButtons : rivets.model.view.mastheadButtons,
                        appendTo : el
                    });

                    rivets.model.view.addChild(rivets.viewInstance);
                },
                publishes : true
            },
            fieldaccordion : {
                bind : function() {},
                unbind : function() {
                    this.viewInstance.remove();
                },
                routine : function(el, model) {

                    this.viewInstance = new FieldAccordionView({
                        appendTo : el,
                        model : model
                    });

                    this.model.view.addChild(this.viewInstance);
                }
            }
        };

    });