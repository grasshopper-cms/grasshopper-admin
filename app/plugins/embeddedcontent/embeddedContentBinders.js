/* jshint loopfunc:true */
define(['nodeWorker', 'underscore', 'jquery', 'text!plugins/embeddedcontent/nodeTreeLiTemplate.html'],
    function (nodeWorker, _, $, nodeTreeLiTemplate) {
        'use strict';

        return {
            nodetree : {
                bind: function() {},
                unbind : function() {},
                routine : function(el, model) {
                    var initialModel = {
                        _id : model.get('_id')
                    };

                    this.liTemplate = nodeTreeLiTemplate;
                    this.$tree = $( document.createDocumentFragment());

                    _buildTree.call(this, initialModel)
                        .done(_finishThatTree.bind(this, el, model))
                        .fail();

                },
                publishes : true
            }
        };

        function _buildTree(model, $thisNode) {
            var $deferred = new $.Deferred(),
                self = this,
                templated;

            _getNodesChildren(model._id)
                .done(function(children) {
                    var childDeferredArray =[];

                    if(_.has(model, 'label')) {
                        templated = _.template(self.liTemplate, {
                            model: model,
                            config : '{"icon":"icon-folder-close"}'
                        });
                        $thisNode = $(templated).appendTo($thisNode ? $thisNode : self.$tree);
                    } else {
                        $thisNode = self.$tree;
                    }

                    if(_.isEmpty(children)) {
                        $deferred.resolve();
                    } else {
                        $thisNode = _handleNodeWithChildren
                            .call(self, $thisNode, children, childDeferredArray, $deferred);
                    }
                })
                .fail(function() {});

            return $deferred.promise();
        }

        function _handleNodeWithChildren($thisNode, children, childDeferredArray, $deferred) {
            var self = this;

            $thisNode = $('<ul></ul>').appendTo($thisNode);

            _.each(children, function (child) {
                childDeferredArray.push(_buildTree.call(self, child, $thisNode));
            });

            $.when
                .apply($, childDeferredArray)
                .done($deferred.resolve.bind($deferred));

            return $thisNode;
        }

        function _getNodesChildren(nodeId) {
            return nodeWorker.getNodeForTree(nodeId);
        }

        function _finishThatTree(el, model) {
            this.$tree.appendTo($(el));
            model.trigger('treeCreated');
        }

    });