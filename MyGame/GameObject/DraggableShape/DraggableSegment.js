import Segment from "../../../Drgn/Math/Shape/Segment.js";
import DraggableCircle from "./DraggableCircle.js";
import GameObjects from "../../../Drgn/GameObject/GameObjects.js";
export default class DraggableSegment extends Segment {
    constructor(anchor, vector, mouse, camera) {
        super(anchor, vector);
        this.mouse = mouse;
        this.camera = camera;
        this.gameObjects = new GameObjects();
        this.startCircle = new DraggableCircle(this.anchor, 4, this.mouse, this.camera);
        this.endCircle = new DraggableCircle(this.endPoint, 4, this.mouse, this.camera);
        this.gameObjects.push(this.startCircle, this.endCircle);
    }
    initialize() {
        this.gameObjects.initialize();
    }
    update() {
        this.gameObjects.update();
        this.anchor = this.startCircle.position;
        this.endPoint = this.endCircle.position;
    }
    draw(canvas) {
        this.gameObjects.draw(canvas);
        canvas.strokeStyle = "rgb(255,255,255)";
        canvas.beginPath();
        canvas.moveTo(this.anchor.x, this.anchor.y);
        canvas.lineTo(this.endPoint.x, this.endPoint.y);
        canvas.stroke();
    }
}
//# sourceMappingURL=DraggableSegment.js.map