/*global define:false*/
define(['grasshopperBaseView', 'alertBoxViewConfig'], function (GrasshopperBaseView, alertBoxViewConfig) {
    'use strict';

    return GrasshopperBaseView.extend({
        defaultOptions : alertBoxViewConfig,
        afterRender : afterRender,
        closeAlertBox : closeAlertBox
    });

    function afterRender () {
        if(this.temporary) {
            _handleTemporaryAlertBox.call(this);
        }
    }

    function _handleTemporaryAlertBox() {
        var self = this;
        setTimeout(function() {
            self.closeAlertBox();
        }, 5000);
    }

    function closeAlertBox () {
        this.remove();
        return false;
    }

});