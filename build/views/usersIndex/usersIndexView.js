/*global define:false*/
define(['jquery', 'grasshopperBaseView', 'usersIndexViewConfig'],
    function ($, GrasshopperBaseView, usersIndexViewConfig) {

        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : usersIndexViewConfig,
            beforeRender : beforeRender
        });

        function beforeRender ($deferred) {
            this.model.get('users').fetch()
                .done($deferred.resolve);
        }

    });