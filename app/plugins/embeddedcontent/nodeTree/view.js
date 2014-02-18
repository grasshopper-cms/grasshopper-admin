/*global define:false*/
define(['grasshopperBaseView', 'plugins/embeddedcontent/nodeTree/config'],
    function (GrasshopperBaseView, NodeTreeConfig) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : NodeTreeConfig,
            afterRender : afterRender
        });

        function afterRender() {
            console.log(this);
        }

    });