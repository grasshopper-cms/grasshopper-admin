define(['grasshopperModel', 'constants', 'resources'],
    function (Model, constants, resources) {
        return Model.extend({
            defaults: {
                resources : resources.user,
                roles : resources.user.roles
            },
            urlRoot : constants.api.users.url
        });
});