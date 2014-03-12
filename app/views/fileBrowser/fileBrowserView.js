/*global define:false*/
define(['grasshopperBaseView', 'fileBrowserViewConfig', 'urlWorker'],
    function (GrasshopperBaseView, fileBrowserViewConfig, urlWorker) {
    'use strict';

    return GrasshopperBaseView.extend({
        defaultOptions : fileBrowserViewConfig,
        beforeRender : beforeRender
    });

    function beforeRender() {
        _parseAndSetUrlParams.call(this);
    }

    function _parseAndSetUrlParams() {
        this.model.set(urlWorker.parseUrlToJson(this.model.get('params')));
    }

});