/* jshint loopfunc:true */
define(['nodeWorker', 'underscore', 'jquery'], function (nodeWorker, _, $) {
        'use strict';

        var liTemplate = '<li>[[= model.label ]]</li>',
            $tree = $( document.createDocumentFragment() );


        return {
            nodetree : {
                bind: function() {},
                unbind : function() {},
                routine : function(el, model) {
                    var initialModel = {
                        _id : model.get('_id')
                    };

                    _buildTree.call(null, initialModel, null, null)
                        .done(function() {
                            $tree.appendTo($(el));
                            model.trigger('treeCreated');
                        })
                        .fail(function() {});


                },
                publishes : true
            }
        };


        function _buildTree(model, $deferred, $thisNode) {
            $deferred = ($deferred) ? $deferred : new $.Deferred();

            nodeWorker.getNodeForTree(model._id)
                .done(function(children) {

                    if(_.has(model, 'label')) {
                        $thisNode = $(_.template(liTemplate, { model: model })).appendTo($thisNode ? $thisNode : $tree);
                    } else {
                        $thisNode = $tree;
                    }

                    if(!_.isEmpty(children)) {
                        $thisNode = $('<ul></ul>').appendTo($thisNode);
                        _.each(children, function(child) {
                            _buildTree(child, $deferred, $thisNode);
                        });
                        $deferred.resolve();
                    }
                })
                .fail(function() {});

            return $deferred.promise();
        }

    });