define(['grasshopperModel', 'computedProperty', 'constants', 'resources', 'underscore'], function (Model, ComputedProperty, constants, resources, _) {
    return Model.extend({
        defaults: {
            resources : resources.user,
            roles : new ComputedProperty(['role'], setPossibleRoles)
        },
        urlRoot : constants.api.users.url

    });

    function setPossibleRoles(role) {
        // TODO: Refactor this.
        return _.map(resources.user.roles, function(value, key) {
            var thisRole = {};
            thisRole.text = value;
            thisRole.selected = (role === value);
            return thisRole;
        });
    }
});