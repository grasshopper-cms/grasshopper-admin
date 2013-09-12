define(['backbone'], function (Backbone) {

    var BaseView = Backbone.View.extend({
        render : function () {
            this.$el.html(this.template(this.dataToJSON()))
        },
        dataToJSON : function() {
            return this.model ? this.model.toJSON() : {};
        },
        initialize : function() {
            this.template = _.template(this.templateHtml);
        }
    });

    return BaseView;

});
