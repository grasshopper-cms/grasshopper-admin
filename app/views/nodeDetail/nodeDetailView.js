/*global define:false*/
define(['baseView', 'api', 'constants'], function (BaseView, Api, constants) {

    return BaseView.extend({
        deleteNode: deleteNode,
        afterRender : afterRender
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

    function afterRender() {
        Api.makeQuery(constants.api.contentQuery.url,
            {
                nodes: '526d5179966a883540000006',
                types: [],
                filters: [],
                options: {}
            })
            .done(function(data) {
                console.log('yeahhhhh buddyyyy');
                console.log(data);
            });
    }

});