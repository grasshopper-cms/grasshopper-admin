define(['grasshopperModel', 'computedProperty', 'constants', 'resources', 'underscore'], function (Model, ComputedProperty, constants, resources, _) {
    return Model.extend({
        defaults: {
            resources : resources.user,
            roles : new ComputedProperty(['role'], setPossibleRoles),
            statusOptions : new ComputedProperty(['enabled'], setStatusOptions),
            // TODO: this should be done inline with Rivets. A decorator. {{ data.firstname | concat data.lastname | spaceAfter }}
            fullName : new ComputedProperty(['firstname', 'lastname'], function(first, last) {
                return first + ' ' + last;
            })
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

    function setStatusOptions(enabled) {
        // TODO: Refactor This
        return _.map(resources.user.statusOptions, function(value, key) {
           var thisOption = {};
            thisOption.text = value;
            return thisOption;
        });
    }

});