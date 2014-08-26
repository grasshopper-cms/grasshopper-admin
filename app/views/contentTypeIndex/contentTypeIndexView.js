/*global define:false*/
define(['grasshopperBaseView', 'contentTypeIndexViewConfig', 'constants'],
    function (GrasshopperBaseView, contentTypeIndexViewConfig, constants) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : contentTypeIndexViewConfig,
            beforeRender : beforeRender,
            newContentType : newContentType
        });

        function beforeRender ($deferred) {
            this.model.get('contentTypes').fetch()
                .done($deferred.resolve);
        }

        function newContentType() {
            this.app.router.navigateTrigger(constants.internalRoutes.newContentType);
        }

    });
