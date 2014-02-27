/* jshint loopfunc:true */
define(['underscore', 'jquery'], function (_, $) {
        'use strict';

        return {
            'filter-by-allowed-types' :  function(el, model) {
                var allowedTypes = this.model.view.model.get('allowedTypes'),
                    thisModelsType = model.get('type');

                if (!_.contains(allowedTypes, thisModelsType)) {
                    $(el).hide();
                }
            }
        };
    });