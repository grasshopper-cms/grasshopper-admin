define(['masseuseModel'], function (Model) {
    return Model.extend({
        defaults: {
            name : '',
            role : '',
            enabled : '',
            email : '',
            _id : '',
            login : '',
            password : ''
        }
    });

});