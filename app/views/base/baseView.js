define(['backbone'], function (Backbone) {

    var BaseView = Backbone.View.extend({
        render : function () {
            this.$el.html(this.template(this.templateData))
        }
    });

    // function renderToStage() {
    //     $('#stage').html(_.template(this.template, data));
    // };

    return BaseView;

});
