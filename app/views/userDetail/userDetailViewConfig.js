/*global define:false*/
define(['text!views/userDetail/userDetailView.html', 'text!views/userDetail/_userDetailRow.html', 'userDetailViewModel'], function (formTemplate, rowTemplate, userDetailViewModel) {
    'use strict';

    return {
        name : 'userDetailView',
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
        rivetConfig : 'auto',
        mastheadButtons : [
                                {
                                    text : 'Add new user',
                                    href : '#addUser'
                                }
                          ]
    };
});