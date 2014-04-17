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
            console.log(this.model.get('constants.version'));
        }

        function _getApiVersion() {
            var $deferred = new $.Deferred(),
                self = this;

            api.getVersion()
                .done(function(versionDetails) {
                    self.model.set('apiVersions', versionDetails);
                    console.log(versionDetails);
                    $deferred.resolve();
                });

            return $deferred.promise();
        }

    });
