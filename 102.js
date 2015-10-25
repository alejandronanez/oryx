'use strict';

var RollingSpider = require('rolling-spider');
var temporal = require('temporal');
var rollingSpider = new RollingSpider();



rollingSpider.connect(function () {
    rollingSpider.setup(function () {
        rollingSpider.flatTrim();
        rollingSpider.startPing();
        rollingSpider.flatTrim();
        rollingSpider.land();



        //temporal.queue([
        //    {
        //        delay: 2000,
        //        task: function () {
        //            rollingSpider.takeOff();
        //            rollingSpider.flatTrim();
        //            console.log('one...');
        //        }
        //    },
        //    {
        //        delay: 3000,
        //        task: function () {
        //            rollingSpider.forward();
        //            console.log('two...');
        //        }
        //    },
        //    {
        //        delay: 5000,
        //        task: function () {
        //            rollingSpider.frontFlip();
        //            console.log('FLIIIIIIIP');
        //        }
        //    },
        //    {
        //        delay: 5000,
        //        task: function () {
        //            rollingSpider.land();
        //            console.log('three...');
        //        }
        //    },
        //    {
        //        delay: 2000,
        //        task: function () {
        //            temporal.clear();
        //            process.exit(0);
        //            console.log('four...');
        //        }
        //    }
        //]);
    });
});