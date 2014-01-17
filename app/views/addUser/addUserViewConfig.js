/*global define:false*/
define(['text!views/addUser/addUserView.html', 'addUserViewModel'], function (formTemplate, addUserViewModel) {
    'use strict';

    return {
        name : 'addUserView',
        ModelType : addUserViewModel,
        modelData : {},
        el : '#stage',
        template : formTemplate,
        events : {
            'click #saveUser' : 'saveUser'
        },
        appendView : true,
        bindings : [],
        rivetConfig : 'auto',
        mastheadButtons : [],
        permissions : ['admin']
    };
});