/*global define:false*/
define(['grasshopperBaseView'],
    function (GrasshopperBaseView) {
        'use strict';

        return GrasshopperBaseView.extend({
            afterRender : afterRender,
            addField : addField,
            removeField : removeField
        });

        function afterRender() {
            console.log(this);
        }

        function addField() {
            console.log('ADDDD FIELD');
            return false;
        }

        function removeField() {
            console.log('REMOVE FIELD');
            return false;
        }
    });