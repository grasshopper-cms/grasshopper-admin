/*global define:false*/
define(['text!views/assetDetail/assetDetailView.html', 'text!views/assetDetail/_assetDetailRow.html', 'assetDetailViewModel'],
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
            'click #deleteAsset' : 'deleteAsset'
        },
        appendView : true,
        bindings : [],
        rivetConfig : 'auto',
        mastheadButtons : []
    };
});