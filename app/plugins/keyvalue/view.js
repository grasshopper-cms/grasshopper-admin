/*global define:false*/
define(['grasshopperBaseView'],
    function (GrasshopperBaseView) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender : beforeRender,
            buildObj : buildObj
        });

        function beforeRender() {
            var JSONvalue = this.model.get('value'),
                parsedValue,
                key;

            if(JSONvalue) {
                parsedValue = JSON.parse(JSONvalue);

                for(key in parsedValue) {
                    this.model.set('objKey', key);
                    this.model.set('objValue', parsedValue[key]);
                }
            }


        }

        function buildObj() {
            var key = this.model.get('objKey'),
                value = this.model.get('objValue'),
                newObj = {};

            newObj[key] = value;

            this.model.set('value', JSON.stringify(newObj));


        }

    });