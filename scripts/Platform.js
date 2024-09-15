class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    touchedBall(ball) {
        return (
            ball.ySpeed > 0 &&
            ball.x + ball.r > this.x &&
            ball.x - ball.r < this.x + this.width &&
            // ball travels through platform (continuous intersection)
            ball.y + ball.r < this.y &&
            ball.nextY + ball.r > this.y
        )
    }

    bounceBall(ball) {
        if(this.touchedBall(ball)) {
            ball.jumpOff(this);
        }
    }

    update(deltaTime) {

    }

    render(ctxt) {
        ctxt.fillStyle = "#000";
        ctxt.fillRect(this.x, this.y, this.width, this.height);
    }
}
