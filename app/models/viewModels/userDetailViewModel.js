define(['grasshopperModel', 'masseuse', 'constants', 'resources', 'underscore'],
    function (Model, masseuse, constants, resources, _) {
        var ComputedProperty = masseuse.ComputedProperty;
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