export default class DebugBox {
    constructor() {
        this.isGrabbed = false;
        this.grabbedX = 0;
        this.grabbedY = 0;
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.left = "680px";
        this.element.style.top = "8px";
        this.element.style.width = "300px";
        this.element.style.height = "300px";
        this.element.style.background = "rgb(30, 30, 100)";
        this.element.style.color = "rgb(255,255,255)";
        this.element.style.overflow = "auto";
        document.body.appendChild(this.element);
        const mousedownEventtListener = (e) => {
            this.isGrabbed = (e.buttons & 0x0001) ? true : false;
            if (this.isGrabbed) {
                this.grabbedX = e.offsetX;
                this.grabbedY = e.offsetY;
            }
        };
        const mouseEventtListener = (e) => {
            this.isGrabbed = (e.buttons & 0x0001) ? true : false;
            if (this.isGrabbed) {
                this.element.style.left = `${e.clientX - this.grabbedX}px`;
                this.element.style.top = `${e.clientY - this.grabbedY}px`;
            }
        };
        this.element.addEventListener("mousedown", mousedownEventtListener);
        this.element.addEventListener("mouseup", mouseEventtListener);
        this.element.addEventListener("mousemove", mouseEventtListener);
        this.element.addEventListener("mouseup", mouseEventtListener);
        this.element.addEventListener("mouseover", mouseEventtListener);
    }
    clear() {
        this.element.innerHTML = "";
    }
    writeLine(text) {
        this.element.innerHTML += `${text}<br />`;
    }
    write(text) {
        this.element.innerHTML += text;
    }
}
//# sourceMappingURL=DebugBox.js.map