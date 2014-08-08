/*global define:false*/
define(['itemSelectModal/view', 'jquery', 'masseuse'], function (ModalView, $, masseuse) {
    'use strict';

    var ProxyProperty = masseuse.ProxyProperty;

    return {
        fireItemSelectModal : fireItemSelectModal
    };

    function fireItemSelectModal() {
        var $deferred = new $.Deferred(),
        modalView = new ModalView({
            modelData : {
                value : new ProxyProperty('value', this.model),
                _id : this.model.get('nodeId')
            },
            $deferred : $deferred
        });

        modalView.start();
        return $deferred.promise();
    }

});