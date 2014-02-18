/* jshint loopfunc:true */
define(['underscore', 'jquery', 'plugins/embeddedcontent/nodeTree/view'],
    function (_, $, NodeTreeView) {
        'use strict';

        return {
            nodetree :  function(el, model) {
                _appendNodeTreeView.call(this, el, model);
            }
        };

        function _appendNodeTreeView(el, model) {
            var nodeTreeView = new NodeTreeView({
                appendTo : el,
                modelData : model.attributes
            });
            nodeTreeView.start();
        }


    });