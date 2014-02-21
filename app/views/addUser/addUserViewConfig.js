/*global define:false*/
define(['text!views/addUser/addUserView.html', 'addUserViewModel'], function (formTemplate, addUserViewModel) {
    'use strict';

    return {
        name : 'addUserView',
        ModelType : addUserViewModel,
        modelData : {},
        appendTo : '#stage',
        wrapper : false,
        template : formTemplate,
        events : {
            'click #saveUser' : 'saveUser'
        },
        listeners : [],
        rivetConfig : 'auto',
        mastheadButtons : [],
        permissions : ['admin']
    };
});