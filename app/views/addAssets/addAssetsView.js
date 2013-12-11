/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'jquery', 'api'],
    function (GrasshopperBaseView, _, $, Api) {
    'use strict';

    return GrasshopperBaseView.extend({
        afterRender : afterRender,
        navigateBack : navigateBack
    });

    function afterRender() {
        var self = this;

        this.displayModal(
                {
                    msg: 'Upload an Asset!',
                    type: 'upload',
                    data: {}
                })
            .done(function(data) {
                _.each(data.files, function(file) {
                   appendAssetDetailRow.call(self, file);
                });
                self.navigateBack();
            })
            .fail(function() {
                console.log('negator');
                self.navigateBack();
            });
    }

    function navigateBack() {
        this.app.router.navigateNinja(this.app.router.breadcrumb[this.app.router.breadcrumb.length - 2]);
        this.app.router.breadcrumb.pop();
    }

    function appendAssetDetailRow(file) {
        console.log(file);

//        $('#assetDetailRow').append('<tr><td>'+ file.name +'</td><td>BLAH</td><td>BLAH</td><td>BLAH</td></tr>');

        Api.postNewAsset(this.model.get('nodeId'), file);
//            .done(function(data) {
//                console.log(data);
//            })
//            .fail(function(data) {
//                console.log(data);
//            });
    }

});