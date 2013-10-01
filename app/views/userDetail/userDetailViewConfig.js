/*global define:false*/
define(['text!views/userDetail/userDetailView.html', 'userDetailViewModel'], function (templateHtml, userDetailViewModel) {
    'use strict';

    return {
        name : 'userDetailView',
        // for model attribute errors on self validating models, follow the convention of attribute+"Error". See the rivetView "publish" method
        ModelType : userDetailViewModel,
        modelData: {},
        el : '#stage',
        templateHtml : templateHtml
    };

});