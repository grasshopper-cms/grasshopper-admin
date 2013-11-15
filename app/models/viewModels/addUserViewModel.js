define(['grasshopperModel', 'resources', 'computedProperty', 'underscore'], function (Model, resources, computedProperty, _) {
    return Model.extend({
        defaults: {
            resources : resources,
            roles : setPossibleRoles()
        }

    });

    function setPossibleRoles() {
        var roles = [];
        _.each(resources.user.roles, function(key, value) {
            roles.push(value);
        });
        return roles;
    }
});





