define(['grasshopperModel', 'resources', 'constants'],
    function (Model, resources, constants) {
    return Model.extend({
        defaults: {
            resources : resources,
            roles : resources.user.roles,
            firstname : '',
            lastname : '',
            role : 'admin',
            email : '',
            password : ''
        },
        url : constants.api.newUser.url
    });
});





