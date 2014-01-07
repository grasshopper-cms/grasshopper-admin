/*global define:false*/
define(['text!plugins/paragraph/paragraphPlugin.html', 'paragraphPluginModel'],
    function (paragraphPluginTemplate, paragraphPluginModel) {
        'use strict';

        return {
            name : 'paragraphPlugin',
            ModelType : paragraphPluginModel,
            modelData : {},
            el : '#stage',
            templateHtml : paragraphPluginTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            appendView : true,
            mastheadButtons : []
        };
    });