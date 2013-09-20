define(['underscore', 'backbone'], function(_, Backbone) {

    "use strict";
    return Backbone.Model.extend({
        // Does this really belong in the user model?
        urlRoot: 'localhost:8080/users',
        login : null,
        role : null,
        // Why is this needed?
        password : null,
        name : null,
        enabled : null,
        email : null
    });

});
