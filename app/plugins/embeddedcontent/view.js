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
            _addJsTreeEventListeners.call(this);
            $('#nodeTree').jstree();
        }

        function redrawJsTree() {
            $('#nodeTree').jstree('redraw', 'true');
        }

        function _addJsTreeEventListeners() {
            var $nodeTree = $('#nodeTree');

            $nodeTree.on('activate_node.jstree', function (e, data) {
                $nodeTree.jstree('toggle_node', data.node.id);
            });
            $nodeTree.on('open_node.jstree', function (e, data) {

                $nodeTree.jstree('set_icon', data.node, 'icon-folder-open');
            });
            $nodeTree.on('close_node.jstree', function (e, data) {
                $nodeTree.jstree('set_icon', data.node, 'icon-folder-close');
            });
        }

    });