/* jshint loopfunc:true */
define(['underscore', 'jquery', 'plugins/embeddedcontent/nodeTree/view'],
    function (_, $, NodeTreeView) {
        'use strict';

        return {
            nodetree : {
                bind: function() {},
                unbind : function() {},
                routine : function(el, model) {

                    if(_.isArray(model)) {
                        _.each(model, _appendNodeTreeView.bind(this, el));
                    }

                },
                publishes : true
            }
        };

        function _appendNodeTreeView(el, model) {
            var nodeTreeView = new NodeTreeView({
                appendTo : el,
                modelData : model.toJSON()
            });
            nodeTreeView.start();
        }


    });