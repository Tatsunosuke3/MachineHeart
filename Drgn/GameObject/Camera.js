import Vector2 from "../Math/Vector2.js";
import Matrix3x3 from "../Math/Matrix3x3.js";
export default class Camera {
    constructor(canvasWidth, canvasHeight, lookAt = new Vector2(canvasWidth / 2, canvasHeight / 2), up = 0, zoom = 1) {
        this.canvasWidth = 640;
        this.canvasHeight = 480;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.lookAt = lookAt;
        this.up = up;
        this.zoom = zoom;
    }
    get matrix() {
        return Matrix3x3.translate(this.canvasWidth / 2, this.canvasHeight / 2)
            .scale(this.zoom, this.zoom)
            .rotate(this.up)
            .translate(-this.lookAt.x, -this.lookAt.y);
    }
    initialize() { }
    update() { }
    draw(canvas) { }
}
//# sourceMappingURL=Camera.js.map