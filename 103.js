'use strict';

var dualShock = require('dualshock-controller');
var RollingSpider = require('rolling-spider');
var vertical = 50;
var horizontal = 50;

var ps4Controller = dualShock({
        config : "dualshock4-generic-driver",
        //smooths the output from the acelerometers (moving averages) defaults to true
        accelerometerSmoothing : true,
        //smooths the output from the analog sticks (moving averages) defaults to false
        analogStickSmoothing : false
    });

// Initialize Drone
// // We're not passing UUID because we only have 1 Rolling Spider in the room :D
var rollingSpider = new RollingSpider();

function printBattery() {
    console.log(`Battery: ${rollingSpider.status.battery}%`);
}

/**
 * Used to change horizontal/vertical values according to user input on the controller
 * @param  {String} direction What key did the user press
 * @return {Number}           The new value for vertical or horizontal
 */
function manipulateAxis(direction) {
    let options = {
        dpadUp() {
            if (vertical <= 95) {
                vertical = vertical + 5;
            }
            return vertical;
        },
        dpadRight() {
            if (horizontal <= 95) {
                horizontal = horizontal + 5
            }

            return horizontal;
        },
        dpadDown() {
            if (vertical >= 5) {
                vertical = vertical - 5
            }

            return vertical;
        },
        dpadLeft() {
            if (horizontal >= 5) {
                horizontal = horizontal - 5
            }
            return horizontal;
        },
    }

    if (options.hasOwnProperty(direction)) {
        return options[direction]();
    }
}

// rollingSpider.connect(function () {
//     rollingSpider.setup(function () {
//         console.log(`Configured for Rolling Spider! ${rollingSpider.name}`);
//         rollingSpider.flatTrim();
//         rollingSpider.startPing();
//         rollingSpider.flatTrim();

//          rollingSpider.on('battery', printBattery);

//         setTimeout(function () {
//             console.log('Ready for Flight');
//         }, 500);
//     });
// });

/**
 * Add listeners for the controller
 */
ps4Controller.on('dpadDown:press', (direction) => {
    console.log(manipulateAxis(direction))
    console.log('DOWN');
});

ps4Controller.on('dpadUp:press', (direction) => {
    console.log(manipulateAxis(direction))
    console.log('UUUP');
});

ps4Controller.on('dpadRight:press', (direction) => {
    console.log(manipulateAxis(direction))
    console.log('Right');
});

ps4Controller.on('dpadLeft:press', (direction) => {
    console.log(manipulateAxis(direction))
    console.log('Left');
});

ps4Controller.on('share:press', () => {
    console.log('OFF');
    rollingSpider.land();
    process.exit(0);
});

ps4Controller.on('options:press', () => {
    console.log('ON');
    rollingSpider.takeOff();
    rollingSpider.flatTrim();
});

/**
 * Rolling!
 */
ps4Controller.on('triangle:press', () => {
    console.log('FRONTFLIP');
    rollingSpider.frontFlip();
});

ps4Controller.on('circle:press', () => {
    console.log('RIGHT FLIP');
    rollingSpider.rightFlip();
});

ps4Controller.on('x:press', () => {
    console.log('BACKFLIP');
    rollingSpider.backFlip();
});

ps4Controller.on('square:press', () => {
    console.log('LEFTFLIP');
    rollingSpider.leftFlip();
});

ps4Controller.connect();


