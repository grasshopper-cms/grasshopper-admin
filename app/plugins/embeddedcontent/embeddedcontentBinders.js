/* jshint loopfunc:true */
define(['underscore', 'plugins/embeddedcontent/nodeTree/view', 'masseuse'],
    function (_, NodeTreeView, masseuse) {
        'use strict';

        var channels = new masseuse.utilities.channels();

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
            this.model.view.addChild(nodeTreeView);
            channels.views.trigger('childNodeAdded');
        }


    });