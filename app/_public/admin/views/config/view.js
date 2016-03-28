/*global define:false*/
define(['grasshopperBaseView', './config', 'jquery', 'api', 'constants', 'underscore', 'resources'],
    function (GrasshopperBaseView, config, $, api, constants, _, resources) {
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
                    self.model.set('resources', resources);
                    self.model.set('addedRow', {
                        key : '',
                        value : ''
                    });
                    $deferred.resolve();
                });

            return $deferred.promise();
        }

    });
