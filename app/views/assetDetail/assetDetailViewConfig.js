/*global define:false*/
define(['text!views/assetDetail/assetDetailView.html', 'assetDetailViewModel'],
    function (formTemplate, assetDetailViewModel) {
        'use strict';

        return {
            name : 'assetDetailView',
            ModelType : assetDetailViewModel,
            modelData : {},
            appendTo : '#stage',
            wrapper : false,
            template : formTemplate,
            events : {
                'click .clickableCell' : 'handleRowClick',
                'click #deleteAsset' : 'prepareToDeleteAsset',
                'click #editAsset' : 'editAsset',
                'click #retryUpload' : 'postNewAsset',
                'click #cancelUpload' : 'cancelUpload'
            },
            listeners : [],
            mastheadButtons : []
        };
    });