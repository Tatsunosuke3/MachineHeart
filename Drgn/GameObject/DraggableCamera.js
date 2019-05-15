import Vector2 from "../Math/Vector2.js";
import Camera from "./Camera.js";
export default class DraggableCamera extends Camera {
    constructor(canvasWidth, canvasHeight, lookAt = new Vector2(canvasWidth / 2, canvasHeight / 2), up = 0, zoom = 1) {
        super(canvasWidth, canvasHeight, lookAt, up, zoom);
        this.mouse = undefined;
        this._prevX = 0;
        this._prevY = 0;
        this._prevZ = 0;
        this._movementX = 0;
        this._movementY = 0;
        this._movementZ = 0;
    }
    initialize() {
        if (this.mouse === undefined) {
            throw new Error("mouseプロパティの設定は必須です。");
        }
        this._prevX = this.mouse.offsetX;
        this._prevY = this.mouse.offsetY;
        this._prevZ = this.mouse.wheelX;
    }
    update() {
        this._movementX = this.mouse.offsetX - this._prevX;
        this._movementY = this.mouse.offsetY - this._prevY;
        this._movementZ = this.mouse.wheelX - this._prevZ;
        if (this.mouse.buttons & 0x0002)
            this._rotate();
        else if (this.mouse.buttons & 0x0004)
            this._translate();
        else if (this._movementZ != 0)
            this._scale();
        this._prevX = this.mouse.offsetX;
        this._prevY = this.mouse.offsetY;
        this._prevZ = this.mouse.wheelX;
    }
    _translate() {
        const v = new Vector2(this._movementX, this._movementY)
            .rotate(-this.up)
            .scalar(1 / this.zoom);
        this.lookAt = this.lookAt.sub(v);
    }
    _rotate() {
        if (this._movementX != 0 || this._movementY != 0) {
            const v1 = new Vector2(this._prevX - (this.canvasWidth / 2), this._prevY - (this.canvasHeight / 2));
            const v2 = new Vector2(this.mouse.offsetX - (this.canvasWidth / 2), this.mouse.offsetY - (this.canvasHeight / 2));
            const angle = v1.angle(v2);
            const sign = v1.cross(v2) < 0 ? -1 : 1;
            this.up += angle * sign;
        }
    }
    _scale() {
        this.zoom = Math.pow(2, this.mouse.wheelX / 100 * (-1));
    }
}
//# sourceMappingURL=DraggableCamera.js.map