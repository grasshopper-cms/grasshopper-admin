/* jshint loopfunc:true */
define(['underscore', 'plugins/contentreference/nodeTree/view', 'masseuse'],
    function (_, NodeTreeView, masseuse) {

        'use strict';

        var ProxyProperty = masseuse.ProxyProperty;

        return {
            nodetree :  function(el, model) {
                _appendNodeTreeView.call(this, el, model);
            }
        };

        function _appendNodeTreeView(el, model) {
            var nodeTreeView = new NodeTreeView({
                appendTo : el,
                modelData : _.extend({}, model.attributes, {
                    allowedTypes : this.model.model.get('allowedContentTypes'),
                    selectedContent : new ProxyProperty('selectedContent', this.model.model),
                    inSetup : this.model.model.get('inSetup')
                })
            });

            if(this.model.model.get('inSetup')) {
                nodeTreeView.model.set('selectedNode',  new ProxyProperty('options.defaultNode', this.model.model));
            }
            this.model.view.addChild(nodeTreeView);

//            this.model.view.addChild(nodeTreeView, this.model.view.name === 'nodeTreePlugin');
        }

    });