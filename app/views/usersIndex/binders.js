/* jshint loopfunc:true */
define(['userDetailView', 'userDetailViewConfig'],
    function (UserDetailView, userDetailViewConfig) {
        'use strict';

        return {
            userrow : {
                bind: function() {},
                unbind : function() {
                    this.viewInstance.remove();
                },
                routine : function(el, model) {
                    var rivets = this;

                    if (rivets.viewInstance) {
                        rivets.model.view.removeChild(this.viewInstance);
                        rivets.viewInstance.remove();
                    }

                    rivets.viewInstance = new UserDetailView({
                        modelData : model.attributes,
                        template : userDetailViewConfig.rowTemplate,
                        mastheadButtons : rivets.model.view.mastheadButtons,
                        appendTo : el
                    });

//                    rivets.viewInstance.start();
                    rivets.model.view.addChild(rivets.viewInstance);
                },
                publishes : true
            }
        };

    });