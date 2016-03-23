/*global define:false*/
define(['grasshopperBaseView', './config', 'jquery', 'api', 'constants', 'underscore'],
    function (GrasshopperBaseView, config, $, api, constants, _) {
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
                .done(function (config) {
                    config = _.map(config, function(value, key) {
                        return {
                            key : key,
                            value : value
                        }
                    });
                    self.model.set('config', config);
                    $deferred.resolve();
                });

            return $deferred.promise();
        }

    });
