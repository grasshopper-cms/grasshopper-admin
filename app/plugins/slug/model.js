define(['grasshopperModel', 'resources'], function (Model, resources) {
    'use strict';

    return Model.extend({
        defaults : {
            resources : resources,
            possibleFieldsToSlug : [
                {
                    _id : 'duder',
                    label : 'something'
                },
                {
                    _id : 'juder',
                    label : 'galt'
                },
                {
                    _id : 'greg',
                    label : 'GREG'
                },
                {
                    _id : 'aPerson',
                    label : 'A Person'
                },
                {
                    _id : 'Some Other Field',
                    label : 'someOtherField'
                }
            ]
        }
    });

});