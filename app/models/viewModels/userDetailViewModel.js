define(['masseuseModel', 'computedProperty', 'constants', 'resources'], function (Model, ComputedProperty, constants, resources) {
    return Model.extend({
        defaults: {
            statusText : new ComputedProperty(['enabled'], setStatusText),
            resources : resources.user,
            roles : new ComputedProperty(['role'], setPossibleRoles),
            possibleStatus : new ComputedProperty(['status'], setPossibleStatus),
            id : ''
        },
        urlRoot : constants.api.users.url,
        url : url
    });

    function setStatusText(enabled) {
        // TODO This is firing too late. It is triggering a change on the model. An thus an animation.
        return enabled === 'true' ? resources.user.statusTitles.enabled : resources.user.statusTitles.disabled;
    }

    function setPossibleRoles(role) {
        return _.map(resources.user.roles, function(value, key) {
            var thisRole = {};
            thisRole.text = value;
            return thisRole;
        });
    }

    function setPossibleStatus(status) {
        return _.map(resources.user.statusTitles,  function(value, key) {
            var thisStatus = {};
            thisStatus.text = value;
            return thisStatus;
        });
    }

    function url() {
        return this.urlRoot;
    }
});