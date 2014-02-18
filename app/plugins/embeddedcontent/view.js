/*global define:false*/
define(['grasshopperBaseView', 'jquery'],
    function (GrasshopperBaseView, $) {
        'use strict';

        return GrasshopperBaseView.extend({
            showNodeTree : showNodeTree
        });

        function showNodeTree() {
            var $nodeTree;

            $nodeTree = _addTreeListeners.call(this);
            $nodeTree.jstree();
            this.model.set('showTree', true);
            _addContentRootNodes.call(this);
        }

        function _addTreeListeners() {
            var $nodeTree = $('#nodeTree'),
                self = this;

            $nodeTree.on('activate_node.jstree', function (e, data) {
                $nodeTree.jstree('toggle_node', data.node.id);
            });
            $nodeTree.on('open_node.jstree', function (e, data) {
                _addContentToThisNode.call(self, $nodeTree, data);
                $nodeTree.jstree('set_icon', data.node, 'icon-folder-open');
            });
            $nodeTree.on('close_node.jstree', function (e, data) {
                $nodeTree.jstree('set_icon', data.node, 'icon-folder-close');
            });

            return $nodeTree;
        }

        function _addContentToThisNode($nodeTree, node) {
            // if this node has content in it, queryAPI,
        }

        function _addContentRootNodes() {
            // loop through all of the root nodes, appending child LIs to them.

//            create_node ([obj, node, pos, callback, is_loaded])
//            create a new node (do not confuse with load_node)
//            par - mixed the parent node
//            node - mixed the data for the new node (a valid JSON object, or a simple string with the name)
//            pos - mixed the index at which to insert the node, "first" and "last" are also supported, default is "last"
//            callback - Function a function to be called once the node is created
//            is_loaded - Boolean internal argument indicating if the parent node was succesfully loaded
//            Returns - String the ID of the newly create node
//            Triggers - model.jstree create_node.jstree
        }

    });