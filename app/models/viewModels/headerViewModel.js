define(['masseuse', 'resources', 'constants'], function (masseuse, resources, constants) {
    var Model = masseuse.MasseuseModel;
    return Model.extend({
        defaults : {
            resources : resources,
            constants : constants
        }
    });
});