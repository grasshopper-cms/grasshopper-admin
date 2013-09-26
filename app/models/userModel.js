define(['masseuseModel', 'validation', 'ComputedProperty', 'resources'], function (Model, validation, ComputedProperty, resources) {

    "use strict";
    return Model.extend({
        urlRoot : resources.api.user.url,
        login : null,
        role : null,
        name : null,
        enabled : null,
        email : null,
        loggedIn :  false,
        isAdmin : new ComputedProperty(['role'], function(attribute){ return resources.user.roles.admin == attribute; }, true),
        isReader : new ComputedProperty(['role'], function(attribute){ return resources.user.roles.reader == attribute; }, true)
    });

});
