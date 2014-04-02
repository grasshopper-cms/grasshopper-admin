/* jshint loopfunc:true */
define(['underscore', 'masseuse', 'plugins', 'require'],
    function (_, masseuse, plugins, require) {
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
            validationform : {
                bind : function() {},
                unbind : function() {
                    this.viewInstance.remove();
                },
                routine : function(el, model) {
                    var rivets = this;

                    if (this.viewInstance) {
                        this.model.view.removeChild(this.viewInstance);
                        this.viewInstance.remove();
                    }

                    if(model.get('type')) {
                        require(['validation' + capitaliseFirstLetter(model.get('type'))], function(ValidationView) {
                            rivets.viewInstance = new ValidationView({
                                model : model,
                                appendTo : el
                            });
                            rivets.model.view.addChild(rivets.viewInstance);
                        });
                    }
                }
            }
        };

        function capitaliseFirstLetter(string) {
            if(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        }

    });