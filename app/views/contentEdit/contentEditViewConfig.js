/*global define:false*/
define(['text!views/contentEdit/contentEditView.html'], function (templateHtml) {
    'use strict';

    return {
        name : 'contentEditView',
        // for model attribute errors on self validating models, follow the convention of attribute+"Error". See the rivetView "publish" method
        modelData: {},
        el : '#stage',
        templateHtml : templateHtml,
        events : {
            'click #saveContent' : 'updateModel'
        },
        rivetConfig : {
            scope : '#contentEdit',
            prefix : 'contentEdit'
        }
    };

});