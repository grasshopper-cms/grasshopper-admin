/* jshint loopfunc:true */
define(['underscore', 'userDetailView'],
    function (_, UserDetailView) {
        'use strict';

        return {
            userrow : {
                bind: function() {},
                unbind : function() {
                    this.viewInstance.remove();
                },
                routine : function(el, model) {

//                    var rivets = this,
//                        plugin = _.find(plugins.fields, {type : model.get('type')}),
//                        ViewModule = plugin.view,
//                        configModule = plugin.config;
//
//                    if (rivets.viewInstance) {
//                        rivets.model.view.removeChild(this.viewInstance);
//                        rivets.viewInstance.remove();
//                    }
//
//                    _.each(configModule.modelData, function(value, key) {
//                        if(!model.has(key)) {
//                            model.set(key, value, {silent: true});
//                        }
//                    });
//
                    rivets.viewInstance = new UserDetailView({
                        modelData : model,
                        template : UserDetailView.defaultOptions.rowTemplate,
                        mastheadButtons : rivets.model.view.mastheadButtons,
                        appendTo : el
                    });
//
//                    rivets.viewInstance.start();
                },
                publishes : true
            }
        };

    });