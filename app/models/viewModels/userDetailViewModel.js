define(['masseuseModel', 'computedProperty', 'constants', 'resources'], function (Model, ComputedProperty, constants, resources) {
    return Model.extend({
        defaults: {
            resources : resources.user,
            roles : new ComputedProperty(['role'], setPossibleRoles),
            id : ''
        },
        urlRoot : constants.api.users.url,
        url : url
    });

    function setPossibleRoles(role) {
        return _.map(resources.user.roles, function(value, key) {
            var thisRole = {};
            thisRole.text = value;
            return thisRole;
        });
    }

    function url() {
        return this.urlRoot;
    }
});