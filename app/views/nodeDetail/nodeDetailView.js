/*global define:false*/
define(['baseView'], function (BaseView) {

    return BaseView.extend({
        deleteNode: deleteNode
    });

    function deleteNode() {
        var self = this;

        this.displayModal('Are you sure you want to delete this node?')
            .done(function() {
                //TODO: This does not actually delete from the server yet... need to look into those EndPoints.
                self.displayTemporaryAlertBox('Node Successfully Deleted', true);
                self.remove();
            });
    }

});