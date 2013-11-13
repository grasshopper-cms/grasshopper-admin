define(['masseuseModel', 'computedProperty', 'constants', 'resources'], function (Model, ComputedProperty, constants, resources) {
    return Model.extend({
        defaults: {
            resources : resources.user,
            fullName : new ComputedProperty(['firstname', 'lastname'], function(first, last) {
                return first + ' ' + last;
            }),
            roles : new ComputedProperty(['role'], setPossibleRoles),
            statusOptions : new ComputedProperty(['attribute'], setStatusOptions),
            isAdmin : new ComputedProperty(['role'], function(role) {
                return (role === 'admin');
            })
        },
        urlRoot : constants.api.users.url

    });

    function setPossibleRoles(role) {
        return _.map(resources.user.roles, function(value, key) {
            var thisRole = {};
            thisRole.text = value;
            thisRole.selected = (role === value);
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

});