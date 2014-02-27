/* jshint loopfunc:true */
define(['underscore', 'plugins/contentreference/nodeTree/view'],
    function (_, NodeTreeView) {
        'use strict';

        return {
            nodetree :  function(el, model) {
                _appendNodeTreeView.call(this, el, model);
            }
        };

        function _appendNodeTreeView(el, model) {
            var nodeTreeView = new NodeTreeView({
                appendTo : el,
                modelData : _.extend({}, model.attributes, {
                    allowedTypes : this.model.model.get('allowedContentTypes')
                })
            });
            nodeTreeView.start();
        }

    });