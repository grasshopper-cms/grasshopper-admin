/* jshint loopfunc:true */
define(['plugins/richtext/nodeTree/view', 'underscore', 'masseuse'],
    function (NodeTreeView, _, masseuse) {

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
                modelData : _.extend(model.toJSON(),
                    {
                        selectedFile : new ProxyProperty('selectedFile', this.model.model)
                    })
                });

            this.model.view.addChild(nodeTreeView);
        }

    });