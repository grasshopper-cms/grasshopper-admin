define(['backbone'], function (Backbone) {

    var BaseView = Backbone.View.extend({
        render : function () {
            this.$el.html(this.template(this.templateData))
        }
    });

    return BaseView;

});
