define(['grasshopperModel', 'resources', 'constants', 'grasshopperCollection', 'contentTypeDetailViewModel'],
    function (Model, resources, constants, GrasshopperCollection, contentTypeDetailViewModel) {

    'use strict';

    return Model.extend({
        defaults : {
            resources : resources,
            contentTypes : null
        },
        url : constants.api.contentTypes.url,
        initialize : initialize
    });

    function initialize() {
        this.set('contentTypes', new (GrasshopperCollection.extend({
            model : contentTypeDetailViewModel,
            comparator: function(model) {
                return model.get('label').toLowerCase();
            },
            url : function() {
                return constants.api.contentTypes.url;
            }
        }))());
    }

});
