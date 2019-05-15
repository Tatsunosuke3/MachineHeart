import Walls from "./Walls.js";
import AppendableWalls from "./AppendableWalls.js";
export default class Stage {
    constructor() {
        this.walls = undefined;
    }
    initialize() {
        if (this.walls === undefined) {
            this.walls = new Walls();
        }
        this.walls.initialize();
    }
    update() {
        this.walls.update();
    }
    draw(canvas) {
        this.walls.draw(canvas);
    }
}
class BasicAlphaStage extends Stage {
    constructor() {
        super();
        const walls = new AppendableWalls();
        this.walls = walls.toReadonly();
    }
}
//# sourceMappingURL=Stage.js.map