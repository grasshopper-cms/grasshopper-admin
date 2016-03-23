/*global define:false*/
define(['grasshopperBaseView', './config', 'jquery', 'api', 'constants'],
    function (GrasshopperBaseView, config, $, api, constants) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions: config,
            beforeRender: beforeRender,
            constants: constants
        });

        function beforeRender($deferred) {
            _getHelp.call(this)
                .done(function() {
                    $deferred.resolve();
                });
        }

        function _getHelp() {
            var $deferred = new $.Deferred(),
                self = this;

            api.authenticatedRequest('/api/admin/_config')
                .done(function (help) {
                    debugger;
                    window.console.log('help', help.results[0]);
                    self.model.set('help', help.results[0]);
                    self.model.set('loaded',  help.results.length ? true : false);
                    $deferred.resolve();
                });

            return $deferred.promise();
        }

    });
