/*global define:false*/
define(['grasshopperBaseView', 'footerViewConfig', 'jquery', 'api'],
    function (GrasshopperBaseView, footerViewConfig, $, api) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : footerViewConfig,
            beforeRender : beforeRender
        });

        function beforeRender($deferred) {
            _getApiVersion.call(this)
                .done($deferred.resolve);
        }

        function _getApiVersion() {
            var $deferred = new $.Deferred(),
                self = this;

            api.getVersion()
                .done(function(versionDetails) {
                    self.model.set('apiVersions', versionDetails);
                    $deferred.resolve();
                });

            return $deferred.promise();
        }

    });
