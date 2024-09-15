const BATCH_RESOLUTION = 30;

const CANVAS_WIDTH = 9 * BATCH_RESOLUTION;
const CANVAS_HEIGHT = 16 * BATCH_RESOLUTION;

let canvas;
let ctxt;
let game;
let previousTimestamp;
let deltaTime = 0;

document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
});

window.onload = () => {
    canvas = document.getElementById("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    ctxt = canvas.getContext("2d");

    canvas.addEventListener("click", registerDeviceMotion);

    game = new Game();

    ctxt.font = `${Math.floor(CANVAS_WIDTH / 10)}px arial`;
    ctxt.textAlign = "center";
    ctxt.textBaseline = "middle";
    ctxt.fillText("click to start", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
}

function registerDeviceMotion() {
    canvas.removeEventListener("click", registerDeviceMotion);

    if(typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission().then((permissionState) => {
            if(permissionState !== "granted") {
                alert("device motion access required, reload the page, got" + permissionState);
            }

            window.addEventListener("devicemotion", (e) => game.handleMotion(e), true);
        });
    } else {
        window.addEventListener("devicemotion", (e) => game.handleMotion(e), true);
    }

    previousTimestamp = Date.now();
    requestAnimationFrame(loop);
}

function loop() {
    let newTimestamp = Date.now();
    deltaTime = newTimestamp - previousTimestamp;
    previousTimestamp = newTimestamp;

    ctxt.clearRect(0, 0, canvas.width, canvas.height);

    ctxt.save();
    ctxt.setTransform(CANVAS_WIDTH, 0, 0, CANVAS_WIDTH, 0, 0);

    game.update(deltaTime);
    game.render(ctxt);

    ctxt.restore()

    requestAnimationFrame(loop);
}
