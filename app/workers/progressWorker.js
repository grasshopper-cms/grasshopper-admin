// Taken from : http://jsfiddle.net/SLv78/60/
//(function() {
//    $(function() {
//        var $progressBarSmooth = $('#progressSmooth'),
//            $progressBarMax = $('#progressMax'),
//            $progressBarActual = $('#progressActual'),
//            initialSpeed = 0.1,
//            maxUpdateAcceleration = 0.001,
//            maxDistance = 0,
//            maxSpeed = 0.5,
//            progressBar = {
//                velocity : initialSpeed,
//                distance : 0,
//                deccelerate : function(delta) {
//                    this.velocity = Math.max(maxUpdateAcceleration, this.velocity - (5 * maxUpdateAcceleration) * delta);
//                },
//                accelerate : function(delta) {
//                    this.velocity = this.velocity + maxUpdateAcceleration * delta;
//                },
//                calcDistanceSince : function (delta, actual) {
//                    this.distance += this.velocity * delta;
//                }
//            },
//            fileProgress = 0,
//            maxFileProgress = 10000,
//            progressInterval,
//            updateProgress,
//            visualProgress = 0,
//            time = 0;
//
//        progressInterval = setInterval(function() {
//            fileProgress += Math.random() * 500 + 100;
//        }, 250);
//
//        updateProgress = setInterval(function() {
//            var actualProgress,
//                smoothProgress,
//                maxProgress;
//
//            time += 10;
//            progressBar.calcDistanceSince(10, fileProgress);
//
//            if (progressBar.distance < fileProgress) {
//                progressBar.accelerate(10);
//            } else {
//                progressBar.deccelerate(10);
//            }
//
//            actualProgress = fileProgress / maxFileProgress;
//            smoothProgress = progressBar.distance / maxFileProgress;
//
//            showProgress($progressBarSmooth, smoothProgress);
//            showProgress($progressBarActual, actualProgress);
//
//            if( progressBar.distance > maxFileProgress ) {
//                clearInterval(progressInterval);
//                clearInterval(updateProgress);
//            }
//        }, 10);
//
//        function showProgress($el, progress) {
//            $el.css({width: (progress * 100) + '%'});
//        };
//    });
//}());