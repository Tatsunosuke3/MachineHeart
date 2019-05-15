import Capsule from "../../../Drgn/Math/Shape/Capsule.js";
import Vector2 from "../../../Drgn/Math/Vector2.js";
import DraggableCircle from "./DraggableCircle.js";
import GameObjects from "../../../Drgn/GameObject/GameObjects.js";
export default class DraggableCapsule extends Capsule {
    constructor(anchor, vector, radius, mouse, camera) {
        super(anchor, vector, radius);
        this.mouse = mouse;
        this.camera = camera;
        this.gameObjects = new GameObjects();
        this.startCircle = new DraggableCircle(this.anchor, this.radius, this.mouse, this.camera);
        this.endCircle = new DraggableCircle(this.endPoint, this.radius, this.mouse, this.camera);
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
        const nv = new Vector2(-this.vector.y, this.vector.x).normalize().scalar(this.radius);
        const sl = this.anchor.add(nv);
        const sr = this.anchor.sub(nv);
        const el = this.endPoint.add(nv);
        const er = this.endPoint.sub(nv);
        canvas.strokeStyle = "rgb(255, 255, 255)";
        canvas.beginPath();
        canvas.moveTo(sl.x, sl.y);
        canvas.lineTo(el.x, el.y);
        canvas.moveTo(sr.x, sr.y);
        canvas.lineTo(er.x, er.y);
        canvas.stroke();
    }
}
//# sourceMappingURL=DraggableCapsule.js.map