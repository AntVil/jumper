const BIOME_STANDARD = 0;
const BIOME_MOVING_HORIZONTAL = 1;
const BIOME_MOVING_HIDING = 2;

class PlatformGenerator {
    constructor() {
        this.biomes = [
            BIOME_STANDARD
        ];
        this.biome = BIOME_STANDARD;
        this.generationCount = 0;
        this.height = 1.2;
    }

    generatePlatform() {
        this.generationCount++;

        switch (this.biome) {
        case BIOME_STANDARD:
            if(Math.random() < 0.6) {
                this.height -= 0.4;
            } else {
                this.height -= 0.2;
            }

            return new PlatformHiding(
                Math.random() * 0.9,
                this.height,
                0.1,
                0.02
            )

            return new PlatformMovingHorizontal(
                Math.random() * 0.9,
                this.height,
                0.1,
                0.02,
                Math.random() + 0.5,
                0
            )
        default:
            alert("something went wrong!");
        }
    }
}
