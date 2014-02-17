/*global define:false*/
define(['grasshopperBaseView'],
    function (GrasshopperBaseView) {
        'use strict';

        return GrasshopperBaseView.extend({
            showNodeTree : showNodeTree
        });

        function showNodeTree() {
            this.model.set('showTree', true);
        }

    });