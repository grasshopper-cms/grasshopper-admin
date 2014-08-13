/*global define:false*/
define(['itemSelectModal/view', 'jquery'], function (ModalView, $) {
    'use strict';

    return {
        fireContentSelectModal : fireContentSelectModal,
        fireFileSelectModal : fireFileSelectModal
    };

    function fireContentSelectModal(value, nodeId) {
        var options = {
            type : 'content',
            header : 'Select Content',
            value : value,
            nodeId : nodeId
        };

        return _startItemSelectView.call(this, options);
    }

    function fireFileSelectModal(value, nodeId) {
        var options = {
            type : 'file',
            header : 'Select File',
            value : value,
            nodeId : nodeId
        };

        return _startItemSelectView.call(this, options);
    }

    function _startItemSelectView(options) {
        var $deferred = new $.Deferred(),
            modalView = new ModalView({
                type : options.type,
                modelData : {
                    header : options.header,
                    value : options.value,
                    _id : options.nodeId
                },
                $deferred : $deferred
            });

        modalView.start();
        return $deferred.promise();
    }

});