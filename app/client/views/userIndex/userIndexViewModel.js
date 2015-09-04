define(['grasshopperModel', 'resources', 'constants', 'grasshopperCollection',
    'userDetail/model', 'paginatedCollection', 'api'],
    function (GrasshopperModel, resources, constants, grasshopperCollection,
              userDetailViewModel, PaginatedCollection, api) {

    'use strict';

    return GrasshopperModel.extend({
        initialize : initialize,
        defaults : {
            resources : resources,
            users : null
        }

    });

    function initialize() {
        GrasshopperModel.prototype.initialize.apply(this, arguments);
        this.set('users', new (PaginatedCollection.extend({
            model : userDetailViewModel,
            url : function() {
                return constants.api.users.url;
            },
            limit : parseInt( this.get('limit') || constants.pagination.defaultLimit, 10 ),
            skip : parseInt( this.get('skip') || constants.pagination.defaultSkip, 10 ),
            filtersKey : ['firstname', 'lastname', 'email', 'displayname'],
            queryRequest : api.makeUsersQuery
        }))());
    }

});
