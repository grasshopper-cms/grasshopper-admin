define(['grasshopperModel', 'resources', 'constants'],
    function (Model, resources, constants) {
    return Model.extend({
        defaults: {
            resources : resources,
            roles : resources.user.roles
        },
        url : constants.api.newUser.url
    });
});





