class Game {
    constructor() {
        this.ball = new Ball(0.5, 0.5);
        this.platformGenerator = new PlatformGenerator();
        this.platforms = [
            new Platform(0.45, 1.2, 0.1, 0.02),
            this.platformGenerator.generatePlatform(),
            this.platformGenerator.generatePlatform(),
            this.platformGenerator.generatePlatform(),
            this.platformGenerator.generatePlatform(),
            this.platformGenerator.generatePlatform(),
            this.platformGenerator.generatePlatform(),
            this.platformGenerator.generatePlatform(),
            this.platformGenerator.generatePlatform(),
            this.platformGenerator.generatePlatform(),
        ];
        this.reachedHeight = 0;
        this.inputAcceleration = 0;
    }

    update(deltaTime) {
        this.ball.userInput(this.inputAcceleration);
        this.ball.computeNextPosition(deltaTime);
        for(let platform of this.platforms) {
            platform.update(deltaTime);
            platform.bounceBall(this.ball);
        }
        this.ball.update(deltaTime);

        this.reachedHeight = Math.min(this.reachedHeight, this.ball.y - 1);
    }

    render(ctxt) {
        ctxt.save();
        ctxt.translate(0, -this.reachedHeight);

        this.ball.render(ctxt);
        for(let platform of this.platforms) {
            platform.render(ctxt);
        }

        ctxt.restore();
    }

    handleMotion(e) {
        this.inputAcceleration = e.accelerationIncludingGravity.xAngle ?? 0;
    }
}
