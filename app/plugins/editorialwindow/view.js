/*global define:false*/
define(['grasshopperBaseView', 'moment'],
    function (GrasshopperBaseView, moment) {
        'use strict';

        return GrasshopperBaseView.extend({
            setValidFromToNow : setValidFromToNow,
            setValidToToNow : setValidToToNow,
            setValidToNeverExpire : setValidToNeverExpire
        });

        function setValidFromToNow() {
            this.model.set('value.validFrom', moment());
        }

        function setValidToToNow() {
            this.model.set('value.validTo', moment());
        }

        function setValidToNeverExpire() {
            this.model.set('value.validTo', moment('December 31 3000'));
        }

    });