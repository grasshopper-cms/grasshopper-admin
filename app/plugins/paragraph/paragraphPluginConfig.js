/*global define:false*/
define(['text!plugins/paragraph/paragraphPlugin.html', 'plugins/paragraph/paragraphPluginModel'],
    function (paragraphPluginTemplate, paragraphPluginModel) {
        'use strict';

        return {
            name : 'paragraphPlugin',
            ModelType : paragraphPluginModel,
            modelData : {},
            el : '',
            templateHtml : paragraphPluginTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            appendView : true,
            mastheadButtons : []
        };
    });