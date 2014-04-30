/*global define:false*/
define(['text!views/contentTypeDetail/contentTypeDetailView.html'], function (template) {
        'use strict';

        return {
            name : 'contentTypeDetail',
            ModelType : '',
            wrapper : false,
            template : template
        };
    });