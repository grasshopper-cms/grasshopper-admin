/*global define:false*/
define(['addContentViewModel'], function (addContentModel) {
    'use strict';

    return {
        name : 'addContent',
        ModelType : addContentModel,
        modelData : {},
        permissions : ['admin', 'editor']
    };
});