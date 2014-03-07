define(['grasshopperModel', 'resources', 'constants', 'grasshopperCollection', 'userDetailViewModel'],
    function (GrasshopperModel, resources, constants, grasshopperCollection, userDetailViewModel) {

    'use strict';

    return GrasshopperModel.extend({
        initialize : initialize,
        defaults : {
            resources : resources
        }

    });

    function initialize() {
        GrasshopperModel.prototype.initialize.apply(this, arguments);
        this.set('users', new (grasshopperCollection.extend({
            model : userDetailViewModel,
            url : function() {
                return constants.api.users.url;
            }
        }))());
    }


});