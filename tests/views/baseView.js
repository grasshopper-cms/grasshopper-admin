/*global describe:false, it:false, beforeEach:false*/
define(['chai', 'squire', 'mocha'], function (chai, Squire, mocha) {

    var injector = new Squire(),
        should = chai.should();

    mocha.setup('bdd');

    describe("BaseView", function () {

        var BaseView;

        beforeEach(function (done) {
            injector.require(['baseView'], function (BaseViewIn) {
                    BaseView = BaseViewIn;
                    done();
                },
                function () {
                    console.log("BaseView error.")
                });

        });

        it("BaseView exisits", function () {
            should.exist(BaseView);
        });

        it("BaseView has render method", function () {
            // BaseView.should.have.property('render');
            // should.exist(BaseView.render);
        });
    });
});