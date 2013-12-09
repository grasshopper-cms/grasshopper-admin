define(['grasshopperModel', 'resources', 'underscore', 'constants'],
    function (Model, resources, _, constants) {
    return Model.extend({
        defaults: {
            resources : resources,
            roles : setPossibleRoles()
        },
        url : constants.api.newUser.url
    });

    function setPossibleRoles() {
        var roles = [];
        _.each(resources.user.roles, function(key, value) {
            roles.push(value);
        });
        return roles;
    }
});





