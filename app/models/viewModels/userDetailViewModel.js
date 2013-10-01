define(['masseuseModel', 'userWorker', 'jquery', 'baseView', 'resources', 'userDetailView'], function (Model, userWorker, $, BaseView, resources, userDetailView) {
    return Model.extend({
        defaults: {
            name : null,
            role : null,
            enabled : null,
            email : null,
            id : null,
            login : null,
            password : null
        },
        initialize : function() {
            this.on('change', function(model) {
                userWorker.updateModel(model);
            });
        }
    });

});