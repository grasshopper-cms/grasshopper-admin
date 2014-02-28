/* jshint loopfunc:true */
define(['underscore', 'jquery'], function (_, $) {
        'use strict';

        return {
            'filter-by-allowed-types' :  function(el, model) {
                var allowedTypes = this.model.view.model.get('allowedTypes'),
                    inSetup = this,
                    thisModelsType = model.get('type');

                if (!_.isEmpty(allowedTypes) && !_.contains(allowedTypes, thisModelsType) || inSetup) {
                    $(el).hide();
                }
            }
        };
    });