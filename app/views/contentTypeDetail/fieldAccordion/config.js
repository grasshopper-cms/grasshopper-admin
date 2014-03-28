/*global define:false*/
define(['text!views/contentTypeDetail/fieldAccordion/template.html'],
    function (template) {
        'use strict';

        return {
            name : 'fieldAccordion',
            modelData : {},
            wrapper : false,
            template : template,
            events : {},
            listeners : []
        };

    });