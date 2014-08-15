/*global define:false*/
define(['grasshopperBaseView', 'clipboardViewConfig', 'jquery', 'constants', 'clipboardWorker'],
    function (GrasshopperBaseView, clipboardViewConfig, $, constants, clipboardWorker) {

        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions: clipboardViewConfig,
            clearClipboard: clearClipboard,
            afterRender: afterRender
        });

        function clearClipboard(e) {
            e.preventDefault();
            clipboardWorker.clear();
        }
        function afterRender(){
            clipboardWorker.subscribe(this.model);
        }


    });
