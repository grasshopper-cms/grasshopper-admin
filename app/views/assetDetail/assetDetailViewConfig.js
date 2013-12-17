/*global define:false*/
define(['text!views/assetDetail/assetDetailView.html', 'text!views/assetDetail/_assetDetailRow.html',
    'assetDetailViewModel'],
    function (formTemplate, rowTemplate, assetDetailViewModel) {
    'use strict';

    return {
        name : 'assetDetailView',
        ModelType : assetDetailViewModel,
        modelData: {},
        el : '#stage',
        templateHtml : formTemplate,
        events : {
            'click .clickableCell' : 'handleRowClick',
            'click #deleteAsset' : 'deleteAsset',
            'click #editAsset' : 'editAsset',
            'click #retryUpload' : 'postNewAsset',
            'click #cancelUpload' : 'cancelUpload'
        },
        appendView : true,
        bindings : [],
        rivetConfig : 'auto',
        mastheadButtons : []
    };
});