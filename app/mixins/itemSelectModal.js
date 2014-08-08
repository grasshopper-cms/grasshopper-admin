/*global define:false*/
define(['itemSelectModal/view', 'jquery'], function (ModalView, $) {
    'use strict';

    return {
        fireItemSelectModal : fireItemSelectModal
    };

    function fireItemSelectModal() {
        var $deferred = new $.Deferred(),
        modalView = new ModalView({
            modelData : {
                value : this.model.get('value'),
                _id : this.model.get('nodeId')
            },
            $deferred : $deferred
        });

        modalView.start();
        return $deferred.promise();
    }

});