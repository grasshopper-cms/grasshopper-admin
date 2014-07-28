/* jshint loopfunc:true */
define(['underscore', 'jquery'], function (_, $) {
        'use strict';

        return {
            'filter-by-allowed-types' :  function(el, model) {
                var allowedTypes = model.get('allowedTypes'),
                    thisModelsType = model.get('type');

                if (!_.isEmpty(allowedTypes) && !_.contains(allowedTypes, thisModelsType)) {
                    $(el).hide();
                }
            }
        };
    });