import Circle from "../../../Drgn/Math/Shape/Circle.js";
import Vector2 from "../../../Drgn/Math/Vector2.js";
import Matrix3x3 from "../../../Drgn/Math/Matrix3x3.js";
export default class DraggableCircle extends Circle {
    constructor(position, radius, mouse, camera) {
        super(position, radius);
        this.prvButtons = 0;
        this.isGrabbed = false;
        this.grabbedPosition = Vector2.zero;
        this.isHover = false;
        this.mouse = mouse;
        this.camera = camera;
    }
    initialize() {
    }
    update() {
        const triggers = (this.mouse.buttons ^ this.prvButtons) & this.mouse.buttons;
        this.prvButtons = this.mouse.buttons;
        const invMat = Matrix3x3.inverse(this.camera.matrix);
        const cursorPos = new Vector2(this.mouse.offsetX, this.mouse.offsetY).transform(invMat);
        const v = cursorPos.sub(this.position);
        const len = v.length();
        if (this.isGrabbed && this.mouse.buttons & 0x01) {
            this.position = cursorPos.sub(this.grabbedPosition);
        }
        else if (this.isGrabbed && !(this.mouse.buttons & 0x01)) {
            this.isGrabbed = false;
            this.grabbedPosition = null;
        }
        if (len <= this.radius) {
            this.isHover = true;
        }
        else {
            this.isHover = false;
        }
        if (this.isHover && (triggers & 0x01)) {
            this.isGrabbed = true;
            this.grabbedPosition = v;
        }
    }
    draw(canvas) {
        canvas.beginPath();
        if (this.isGrabbed) {
            canvas.fillStyle = "rgba(255, 200, 200, 0.6)";
            canvas.strokeStyle = "rgb(255, 200, 200)";
        }
        else if (this.isHover) {
            canvas.fillStyle = "rgba(255, 255, 255, 0.5)";
            canvas.strokeStyle = "rgb(255, 255, 255)";
        }
        else {
            canvas.fillStyle = "rgba(255, 255, 255, 0.25)";
            canvas.strokeStyle = "rgb(255, 255, 255)";
        }
        canvas.lineWidth = 1;
        canvas.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        canvas.closePath();
        canvas.fill();
        canvas.stroke();
    }
}
//# sourceMappingURL=DraggableCircle.js.map