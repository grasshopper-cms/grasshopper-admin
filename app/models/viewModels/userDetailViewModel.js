define(['masseuseModel', 'computedProperty', 'constants', 'resources'], function (Model, ComputedProperty, constants, resources) {
    return Model.extend({
        defaults: {
            resources : resources.user,
            roles : new ComputedProperty(['role'], setPossibleRoles),
            statusOptions : new ComputedProperty(['attribute'], setStatusOptions),
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

    function setStatusOptions(attribute) {
        return _.map(resources.user.statusOptions, function(value, key) {
           var thisOption = {};
            thisOption.text = value;
            return thisOption;
        });
    }

    function url() {
        return this.urlRoot;
    }
});