define(['masseuseModel', 'resources'], function (Model, resources) {
    return Model.extend({
        defaults : {
            resources : resources
        }
    });
});