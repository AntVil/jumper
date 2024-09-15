const GRAVITY = 0.00001;
const TRAIL_DELAY = 30;

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.nextX = x;
        this.nextY = y;
        this.r = 0.01;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.gravity = 0.00001;
        this.trail = [];
        for (let i = 0; i < 8; i++) {
            this.trail.push([this.x, this.y]);
        }
        this.timeTillNextTrail = TRAIL_DELAY;
    }

    userInput(xAcceleration) {
        this.xSpeed += xAcceleration;
    }

    computeNextPosition(deltaTime) {
        this.nextX += deltaTime * this.xSpeed;
        this.nextY += deltaTime * this.ySpeed;
    }

    update(deltaTime) {
        this.ySpeed += deltaTime * this.gravity;
        this.x = this.nextX;
        this.y = this.nextY;

        this.timeTillNextTrail -= deltaTime;

        if (this.timeTillNextTrail <= 0) {
            this.timeTillNextTrail += TRAIL_DELAY;
            this.trail.shift();
            this.trail.push([this.x, this.y]);
        }
    }

    render(ctxt) {
        ctxt.fillStyle = "#000";
        ctxt.beginPath();
        ctxt.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctxt.fill();

        ctxt.lineCap = "round";
        for (let i = 1; i < this.trail.length - 1; i++) {
            let fraction = Math.pow(i / this.trail.length, 2);
            ctxt.lineWidth = this.r * fraction;
            ctxt.fillStyle = `rgba(0, 0, 0, ${fraction})`;
            ctxt.beginPath();
            ctxt.moveTo(this.trail[i][0], this.trail[i][1]);
            ctxt.lineTo(this.trail[i + 1][0], this.trail[i + 1][1]);
            ctxt.stroke();
        }
    }

    jumpOff(platform) {
        this.ySpeed = -0.003;

        // continuous intersection correction
        let overShot = this.nextY - platform.y + this.r;
        this.nextY -= 2 * overShot;
    }
}
