'use strict';

let dualShock = require('dualshock-controller');
let RollingSpider = require('rolling-spider');
let vertical = 50;
let horizontal = 50;
let top = 50;
let bottom = 50;
let speed = 50;

let ps4Controller = dualShock({
        config : "dualshock4-generic-driver",
        //smooths the output from the acelerometers (moving averages) defaults to true
        accelerometerSmoothing : true,
        //smooths the output from the analog sticks (moving averages) defaults to false
        analogStickSmoothing : false
    });

// Initialize Drone
// // We're not passing UUID because we only have 1 Rolling Spider in the room :D
let rollingSpider = new RollingSpider();

function printBattery() {
    console.log(`Battery: ${rollingSpider.status.battery}%`);
}

/**
 * Used to change horizontal/vertical values according to user input on the controller
 * @param  {String} direction What key did the user press
 * @return {Number}           The new value for vertical or horizontal
 */
function manipulateAxis(direction) {
    let baseIncrement = 10;
    let options = {
        dpadUp() {
            if (vertical <= 95) {
                vertical = vertical + baseIncrement;
            }
            return vertical;
        },
        dpadRight() {
            if (horizontal <= 95) {
                horizontal = horizontal + baseIncrement;
            }

            return horizontal;
        },
        dpadDown() {
            if (vertical >= 5) {
                vertical = vertical - baseIncrement;
            }

            return vertical;
        },
        dpadLeft() {
            if (horizontal >= 5) {
                horizontal = horizontal - baseIncrement;
            }
            return horizontal;
        },
        l1() {
            if (top <= 95) {
                top = top + baseIncrement;
            }

            return top;
        },
        r1() {
            if (bottom <= 95) {
                bottom = bottom + baseIncrement;
            }

            return bottom;
        }
    }

    if (options.hasOwnProperty(direction)) {
        console.log(`Vertical: ${vertical} / Horizontal: ${horizontal}`);
        return options[direction]();
    }
}

rollingSpider.connect(() => {
    rollingSpider.setup(() => {
        console.log(`Configured for Rolling Spider! ${rollingSpider.name}`);
        rollingSpider.flatTrim();
        rollingSpider.startPing();
        rollingSpider.flatTrim();

         rollingSpider.on('battery', printBattery);

        setTimeout(() => {
            console.log('Ready for Flight');
        }, 500);
    });
});

/**
 * Add listeners for the controller
 */
ps4Controller.on('dpadDown:press', (direction) => {
    rollingSpider.backward({steps: manipulateAxis(direction), speed: speed});
    console.log('Moving Backward');
});

ps4Controller.on('dpadUp:press', (direction) => {
    rollingSpider.forward({steps: manipulateAxis(direction), speed: speed});
    console.log('Moving forward');
});

ps4Controller.on('dpadRight:press', (direction) => {
    rollingSpider.right({steps: manipulateAxis(direction), speed: speed});
    console.log('Moving Right!');
});

ps4Controller.on('dpadLeft:press', (direction) => {
    rollingSpider.left({steps: manipulateAxis(direction), speed: speed});
    console.log('Moving Left!');
});

ps4Controller.on('share:press', () => {
    console.log('OFF');
    rollingSpider.land();
    process.exit(0);
});

ps4Controller.on('options:press', () => {
    console.log('ON');
    rollingSpider.flatTrim();
    rollingSpider.takeOff();
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

/**
 * UP / DOWN
 */
ps4Controller.on('l1:press', (direction) => {
    rollingSpider.up({steps: manipulateAxis(direction), speed: speed});
    console.log('Going up!!!');
});

ps4Controller.on('r1:press', (direction) => {
    rollingSpider.down({steps: manipulateAxis(direction), speed: speed});
    console.log('Going down!!!');
});


ps4Controller.connect();
