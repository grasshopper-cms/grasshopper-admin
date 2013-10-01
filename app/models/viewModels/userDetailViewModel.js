define(['masseuseModel'], function (Model) {
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
        initialize : function() {}
    });

});