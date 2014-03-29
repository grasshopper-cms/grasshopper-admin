/*global define:false*/
define(['text!views/contentTypeDetail/fieldAccordion/template.html', 'fieldAccordionBinders'],
    function (template, fieldAccordionBinders) {
        'use strict';

        return {
            name : 'fieldAccordion',
            modelData : {},
            wrapper : false,
            template : template,
            events : {},
            listeners : [],
            rivetsConfig : {
                binders : [fieldAccordionBinders]
            }
        };

    });