/*global define:false*/
define(['jquery', 'grasshopperBaseView', 'userIndexViewConfig', 'constants'],
    function ($, GrasshopperBaseView, userIndexViewConfig, constants) {

        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : userIndexViewConfig,
            beforeRender : beforeRender,
            addNewUser : addNewUser
        });

        function beforeRender ($deferred) {
            this.model.get('users').fetch()
                .done($deferred.resolve);
        }

        function addNewUser() {
            this.app.router.navigateTrigger(constants.internalRoutes.addUser);
        }

    });