/*global describe:false, it:false, beforeEach:false*/
define(['chai', 'squire', 'mocha'], function (chai, Squire, mocha) {

    var injector = new Squire(),
        should = chai.should();

    mocha.setup('bdd');

    describe("The BaseView", function () {

        var BaseView, viewInstace;

        beforeEach(function (done) {
            injector.require(['baseView'], function (BaseViewIn) {
                    BaseView = BaseViewIn;
                    viewInstance = new BaseView({

                    });
                    done();
                },
                function () {
                    console.log('BaseView error.')
                });
        });

        it("should exist", function () {
            should.exist(BaseView);
        });

        describe("start method", function() {
            it("should exist", function() {
                should.exist(viewInstance.start);
            });
            it('should be a function', function() {
                viewInstance.start.should.be.a('function');
            });
            it('should return a promise', function() {
                var promise = viewInstance.start();
                promise.should.have.property('done');
                promise.should.not.have.property('resolve');
            });
        });
        describe("render method", function() {
            it("should exist", function() {
                should.exist(viewInstance.render);
            });
            it('should be a function', function() {
                viewInstance.render.should.be.a('function');
            });
        });
        describe("beforeRender method", function() {
            it("should trigger the beforeRender event on the view's channel", function(done) {
                viewInstance.channels.views.on("BaseView:beforeRender", function() {
                    true.should.be.true;
                    done();
                });
                viewInstance.start();
            });
        });
    });

});

// Each life cycle method
//    calls some methods
//    returns a promise that is resolved when the method completes
//    triggers events on channels.views using its name as
//      the namespace and the promise as an argument
//
//        channels.views.trigger("loginView:beforeRender", promise);
// e.g.
// .render() will call the methods this.beforeRender, run itself, this.afterRender
// each lifecycle method will return a promise that is fulfilled after the method runs
/*

lifeCycleMethod: function() {
    var $deferred = $.Deferred();
    // This is basically a timeout, 0
    _.defer(function() {
        ...
    });
    return $deferred.promise();
}

$deferred.resolve()
$deferred.reject()

*/
// Example Methods:

// Setup Methods
// AfterInitialize
// BeforeRender
// Render
// RenderChildren
// AfterRenderChildren
// AfterRender
// BindEvents
// TearDown
// Destroy
