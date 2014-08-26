/*global define:false*/
define(['jquery', 'underscore', 'grasshopperBaseView', 'userIndexViewConfig', 'constants', 'searchWorker'],
    function ($, _, GrasshopperBaseView, userIndexViewConfig, constants, searchWorker) {

        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : userIndexViewConfig,
            beforeRender : beforeRender,
            addNewUser : addNewUser,
            searchContent : searchContent
        });

        function beforeRender ($deferred) {
            $.when(this.searchContent(undefined, undefined, true))
                .done($deferred.resolve);
        }

        function addNewUser() {
            this.app.router.navigateTrigger(constants.internalRoutes.addUser);
        }

        function searchContent(e, context, isFirstQuery) {
            return searchWorker.searchContent.call(this, e, context, 'users', true, isFirstQuery);
        }
    });
