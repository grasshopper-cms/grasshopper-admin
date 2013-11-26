/*global define:false*/
define(['baseView'],
    function (BaseView) {
    'use strict';

    return BaseView.extend({
        afterRender: afterRender
    });

    function afterRender() {
        var self = this;

        this.displayModal('Please enter the name of the folder:', 'input')
            .done(function(data) {
                console.log(data);
                // make a POST to /node, if successful ask if they want to addContentTypes
                self.displayModal('your Content Type should have been POST /node, but I have not coded that yet', 'addContent');
            });
    }

});