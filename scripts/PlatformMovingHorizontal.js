class PlatformMovingHorizontal extends Platform {
    constructor(x, y, width, height, speed, offset) {
        super(x, y, width, height);
        this.speed = speed;
        this.offset = offset;
    }

    update(deltaTime) {
        this.x = (Math.sin(this.speed * Date.now() / 1000) + 1) * 0.45;
    }
}
