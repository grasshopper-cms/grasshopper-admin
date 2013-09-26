define(['masseuseModel', 'userWorker'], function (Model, userWorker) {
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
        syncModel : function() {
            userWorker.saveUser();
        }
    });

});