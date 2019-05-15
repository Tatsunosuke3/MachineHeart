import Vector2 from "../../../Drgn/Math/Vector2.js";
import Line from "../../../Drgn/Math/Shape/Line.js";
import GameObjects from "../../../Drgn/GameObject/GameObjects.js";
import DraggableCircle from "./DraggableCircle.js";
import Segment from "../../../Drgn/Math/Shape/Segment.js";
export default class DraggableLine extends Line {
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
        const invMat = this.camera.matrix.inverse();
        const tl = new Vector2(0, 0).transform(invMat);
        const tr = new Vector2(canvas.canvas.width, 0).transform(invMat);
        const br = new Vector2(canvas.canvas.width, canvas.canvas.height).transform(invMat);
        const bl = new Vector2(0, canvas.canvas.height).transform(invMat);
        const segments = [
            new Segment(tl, tr.sub(tl)),
            new Segment(tr, br.sub(tr)),
            new Segment(br, bl.sub(br)),
            new Segment(bl, tl.sub(bl))
        ];
        const points = [];
        segments.forEach((segment) => {
            const result = this.testForSegment(segment);
            if (result.isCollision) {
                points.push(result.intersectionPoint);
            }
        });
        if (points.length == 2) {
            canvas.strokeStyle = "rgb(255,255,255)";
            canvas.beginPath();
            canvas.moveTo(points[0].x, points[0].y);
            canvas.lineTo(points[1].x, points[1].y);
            canvas.stroke();
        }
    }
}
//# sourceMappingURL=DraggableLine.js.map