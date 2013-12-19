/*global define:false*/
define(['grasshopperBaseView'], function (GrasshopperBaseView) {
    'use strict';

    return GrasshopperBaseView.extend({
        afterRender : afterRender,
        closeAlertBox : closeAlertBox
    });

    function afterRender () {
        if(this.options.temporary) {
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