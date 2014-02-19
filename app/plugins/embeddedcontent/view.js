/*global define:false*/
define(['grasshopperBaseView', 'jquery', 'underscore'],
    function (GrasshopperBaseView, $, _) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender: beforeRender,
            afterRender : afterRender,
            redrawJsTree : _.debounce(redrawJsTree, 200)
        });

        function beforeRender($deferred) {
            this.model.get('children').fetch()
                .done($deferred.resolve);
        }

        function afterRender() {
            this.model.set('showTree', true);

            $('#nodeTree').jstree();
        }

        function redrawJsTree() {
            $('#nodeTree').jstree('redraw', 'true');
        }

        function consoleLogIt() {
            console.log(arguments);
        }

    });