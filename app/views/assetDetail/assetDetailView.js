/*global define:false*/
define(['baseView'], function (BaseView) {

    return BaseView.extend({
        handleRowClick : handleRowClick,
        deleteAsset : deleteAsset
    });

    function handleRowClick(e) {
        e.stopPropagation();
        this.displayModal('downloading / viewing of assets in Grasshopper has not been implemented.');
    }

    function deleteAsset() {
        this.displayModal('deleting assets has not been enabled.');
    }

});