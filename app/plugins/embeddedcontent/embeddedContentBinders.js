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
                    _buildTree(initialModel)
                        .done(function() {
                            $tree.appendTo($(el));
                            model.trigger('treeCreated');
                        })
                        .fail(function() {
                            console.log('fail');
                        });


                },
                publishes : true
            }
        };


        function _buildTree(model, $thisNode) {

            var $deferred = new $.Deferred();

            nodeWorker.getNodeForTree(model._id)
                .done(function(children) {
                    var childDeferredArray =[];
                    if(_.has(model, 'label')) {
                        $thisNode = $(_.template(liTemplate, { model: model })).appendTo($thisNode ? $thisNode : $tree);
                    } else {
                        $thisNode = $tree;
                    }

                    if(_.isEmpty(children)) {
                        $deferred.resolve();
                    } else {
                        $thisNode = $('<ul></ul>').appendTo($thisNode);
                        _.each(children, function(child) {
                            childDeferredArray.push(_buildTree(child, $thisNode));
                        });
                        $.when
                            .apply($, childDeferredArray)
                            .done($deferred.resolve.bind($deferred));
                    }
                })
                .fail(function() {});


            return $deferred.promise();
        }

    });