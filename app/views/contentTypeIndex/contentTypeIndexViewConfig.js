/*global define:false*/
define(['text!views/contentTypeIndex/contentTypeIndexView.html', 'contentTypeIndexViewModel', 'resources', 'constants'],
    function (template, contentTypeIndexViewModel, resources, constants) {
        'use strict';

        return {
            name : 'contentTypeIndexView',
            ModelType : contentTypeIndexViewModel,
            el : '#stage',
            template : template,
            rivetConfig : 'auto',
            bindings : [
            ],
            appendView : true,
            events : {

            },
            mastheadButtons : [
                {
                    text : resources.mastheadButtons.addContentType,
                    href : constants.internalRoutes.newContentType
                }
            ],
            breadcrumbs : [
                {
                    text : resources.contentTypes,
                    href : constants.internalRoutes.contentTypes
                }
            ],
            permissions : ['admin', 'editor']
        };
    });