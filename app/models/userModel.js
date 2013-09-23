define(['underscore', 'backbone', 'resources'], function(_, Backbone, resources) {

    "use strict";
    return Backbone.Model.extend({
        // Does this really belong in the user model?
        urlRoot: resources.api.user.url,
        login : null,
        role : null,
        // Why is this needed?
        password : null,
        name : null,
        enabled : null,
        email : null
    });

});
