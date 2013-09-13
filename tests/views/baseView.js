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

        describe("start method", function () {
            it("should exist", function () {
                should.exist(viewInstance.start);
            });
            it('should be a function', function () {
                viewInstance.start.should.be.a('function');
            });
            it('should return a promise', function () {
                var promise = viewInstance.start();
                promise.should.have.property('done');
                promise.should.not.have.property('resolve');
            });
            it('the promise should be resolved after start runs', function () {
                var listener = function () {

                };
                viewInstance.start().done(listener);
                //TODO: use sinon to spy on listener and make sure it was called
            });
            it('the promise should be rejected if beforeRender fails', function () {

            });
            it('the promise should be rejected if afterRender fails', function () {

            });
            describe("beforeRender method", function () {
                it("should trigger the onBeforeRender event on the view's channel", function (done) {
                    viewInstance.channels.views.on("BaseView:onBeforeRender", function () {
                        //TODO: use a sinon spy to check whether this anon function was called (use sinon-chai)
                        true.should.be.true;
                        done();
                    });
                    viewInstance.start();
                });
            });
            describe("render method", function () {
                it("should exist", function () {
                    should.exist(viewInstance.render);
                });
                it('should be a function', function () {
                    viewInstance.render.should.be.a('function');
                });
                it("should trigger the onRender event on the view's channel", function () {

                });
                describe("- if the beforeRender method returns a promise -", function () {
                    beforeEach(function () {
                        //TODO:create a base view that return a promise for beforeRender
                    });
                    it("the render method will only fire after the promise is resolved", function () {

                    });
                });
                describe("- if the beforeRender method doesn't return a promise-", function () {
                    it("the render method should fire immediately", function () {

                    });
                });
            });
            describe("afterRender method", function () {
                it("should trigger the onAfterRender event on the view's channel", function () {

                });
            });
        });

        describe("stop method", function () {
            // TODO: implement before aftter etc methods in the same was as for render
            // method should wrap View.remove
        });

        describe("channels", function () {
            it("can be triggered by one view and heard by another", function () {
                //TODO: create a second view instance
            });
        });
    });

});

// Example Methods:

// Setup Methods
// initialize (BB method)
//  afterInitialize
// start
//  bindEvents
//  beforeRender
//  render
//  beforeRenderChildren
//  renderChildren
//  afterRenderChildren
//  afterRender
// stop
//  beforeRemove
//  remove (BB method)
