/*global define:false*/
define(['text!views/userDetail/userDetailView.html', 'text!views/userDetail/_userDetailRow.html', 'userDetailViewModel'], function (formTemplate, rowTemplate, userDetailViewModel) {
    'use strict';

    return {
        name : 'userDetailView',
        // for model attribute errors on self validating models, follow the convention of attribute+"Error". See the rivetView "publish" method
        ModelType : userDetailViewModel,
        modelData: {},
        el : '#stage',
        templateHtml : formTemplate,
        events : {
            'click #saveUser' : 'updateModel',
            'click .toggleEnabled' : 'toggleEnabled'
        },
        appendView : true,
        bindings : [],
        rivetConfig : 'auto'
    };
});