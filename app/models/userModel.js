define(['underscore', 'backbone'], function(_, Backbone) {

    "use strict";
    return Backbone.Model.extend({
        urlRoot: 'localhost:8080/users',
        login : null,
        role : null,
        password : null,
        name : null,
        enabled : null,
        email : null
    });

});
