define(['grasshopperModel', 'computedProperty'], function (Model, ComputedProperty) {
    return Model.extend({
        defaults: {
            nodesCountText: new ComputedProperty(['nodesCount'], function(nodesCount) {
                return (nodesCount) ? nodesCount + ' folders.' : '';
            }),
            filesCountText: new ComputedProperty(['filesCount'], function(filesCount) {
                return (filesCount) ? filesCount + ' files.' : '';
            }),
            itemsCountText: new ComputedProperty(['itemsCount'], function(itemsCount) {
                return (itemsCount) ? itemsCount + ' items.' : '';
            })
        }
    });
});