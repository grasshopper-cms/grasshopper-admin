define(['masseuseModel', 'resources', 'constants'], function (Model, resources, constants) {
    return Model.extend({
        defaults : {
            resources : resources,
            constants : constants
        }
    });
});