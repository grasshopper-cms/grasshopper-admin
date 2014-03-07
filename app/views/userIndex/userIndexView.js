/*global define:false*/
define(['jquery', 'grasshopperBaseView', 'userIndexViewConfig'],
    function ($, GrasshopperBaseView, userIndexViewConfig) {

        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : userIndexViewConfig,
            beforeRender : beforeRender
        });

        function beforeRender ($deferred) {
            this.model.get('users').fetch()
                .done($deferred.resolve);
        }

    });