var dualShock = require('dualshock-controller');
var RollingSpider = require('rolling-spider');

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

rollingSpider.connect(function () {
    rollingSpider.setup(function () {
        console.log(`Configured for Rolling Spider! ${rollingSpider.name}`);
        rollingSpider.flatTrim();
        rollingSpider.startPing();
        rollingSpider.flatTrim();

         rollingSpider.on('battery', printBattery);

        setTimeout(function () {
            console.log('Ready for Flight');
        }, 500);
    });
});

/**
 * Add listeners for the controller
 */
ps4Controller.on('dpadDown:press', (thing) => {
    console.log('DOWN');
});

ps4Controller.on('dpadUp:press', (thing) => {
    console.log('UUUP');
});

ps4Controller.on('share:press', (thing) => {
    console.log('OFF');
    rollingSpider.land();
    process.exit(0);
});

ps4Controller.on('options:press', (thing) => {
    console.log('ON');
    rollingSpider.takeOff();
});

/**
 * Rolling!
 */
ps4Controller.on('triangle:press', (thing) => {
    console.log('FRONTFLIP');
    rollingSpider.frontFlip();
});

ps4Controller.on('circle:press', (thing) => {
    console.log('RIGHT FLIP');
    rollingSpider.rightFlip();
});

ps4Controller.on('x:press', (thing) => {
    console.log('BACKFLIP');
    rollingSpider.backFlip();
});

ps4Controller.on('square:press', (thing) => {
    console.log('LEFTFLIP');
    rollingSpider.leftFlip();
});

ps4Controller.connect();


