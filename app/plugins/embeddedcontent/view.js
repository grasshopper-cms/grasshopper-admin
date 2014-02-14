/*global define:false*/
define(['grasshopperBaseView', 'nodeWorker'],
    function (GrasshopperBaseView, nodeWorker) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender : beforeRender,
            afterRender : afterRender
        });

        function beforeRender($deferred) {
            _setRootNodesOnCollection.call(this, $deferred);
        }

        function afterRender() {
            this.$('#nodeTree').jstree();
        }

        function _setRootNodesOnCollection($deferred) {
            var self = this;

            nodeWorker.getNodeForTree(0)
                .done(function(nodes) {
                    self.collection.reset(nodes);
                    $deferred.resolve();
                })
                .fail(function() {
                    console.log('COULD NOT RETRIEVE THAT NODES CHILDREN');
                    $deferred.resolve();
                });
        }

    });