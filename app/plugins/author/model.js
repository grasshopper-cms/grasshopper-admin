define(['grasshopperModel', 'resources', 'grasshopperCollection', 'constants', 'userDetail/model'],
    function (GrasshopperModel, resources, GrasshopperCollection, constants, userDetailViewModel) {
        'use strict';

        return GrasshopperModel.extend({
            initialize: initialize,
            defaults: {
                resources: resources,
                no_permissions : false
            }
        });

        function initialize() {
            var UsersCollection = GrasshopperCollection.extend({
                model: userDetailViewModel,
                url: function () {
                    return constants.api.users.url;
                }
            });

            GrasshopperModel.prototype.initialize.apply(this, arguments);

            this.set('users', new UsersCollection());
        }

    });