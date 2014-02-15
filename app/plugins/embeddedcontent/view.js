/*global define:false*/
define(['grasshopperBaseView'],
    function (GrasshopperBaseView) {
        'use strict';

        return GrasshopperBaseView.extend({
            makeJsTree : makeJsTree
        });

        function makeJsTree() {
            var self = this;
            setTimeout(function() {
                self.$('#nodeTree').jstree();
            }, 1000);
        }

    });