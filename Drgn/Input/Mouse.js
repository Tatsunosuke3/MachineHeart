export default class Mouse {
    constructor(canvasElement) {
        this._offsetX = 0;
        this._offsetY = 0;
        this._wheelX = 0;
        this._buttons = 0;
        if (canvasElement === undefined) {
            const nodeList = document.getElementsByTagName("canvas");
            if (nodeList.length == 0)
                throw new Error("document内にcanvas要素がある状態で使用してください。");
            canvasElement = nodeList[0];
        }
        this._element = canvasElement;
        this._mouseEventListener = (e) => {
            let x, y;
            const style = window.getComputedStyle(this._element);
            const objectFit = style.objectFit;
            const converter = new CoordinateConverter(this._element.width, this._element.height, this._element.clientWidth, this._element.clientHeight, objectFit);
            const xy = converter.convert(e.offsetX, e.offsetY);
            this._offsetX = xy[0];
            this._offsetY = xy[1];
            this._buttons = e.buttons;
        };
        this._wheelEventListener = (e) => {
            this._wheelX += e.deltaY;
        };
        this._element.addEventListener("mousedown", this._mouseEventListener);
        this._element.addEventListener("mouseup", this._mouseEventListener);
        this._element.addEventListener("mouseover", this._mouseEventListener);
        this._element.addEventListener("mouseout", this._mouseEventListener);
        this._element.addEventListener("mousemove", this._mouseEventListener);
        this._element.addEventListener("wheel", this._wheelEventListener);
    }
    get offsetX() {
        return this._offsetX;
    }
    get offsetY() {
        return this._offsetY;
    }
    get wheelX() {
        return this._wheelX;
    }
    get buttons() {
        return this._buttons;
    }
    dispose() {
        this._element.removeEventListener("mousedown", this._mouseEventListener);
        this._element.removeEventListener("mouseup", this._mouseEventListener);
        this._element.removeEventListener("mouseover", this._mouseEventListener);
        this._element.removeEventListener("mouseout", this._mouseEventListener);
        this._element.removeEventListener("mousemove", this._mouseEventListener);
        this._element.removeEventListener("wheel", this._wheelEventListener);
        this._element = null;
    }
}
class CoordinateConverter {
    constructor(canvasWidth, canvasHeight, elementWidth, elementHeight, objectFit = "fill") {
        this.objectFit = objectFit;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.elementWidth = elementWidth;
        this.elementHeight = elementHeight;
    }
    convert(x, y) {
        let xy;
        switch (this.objectFit) {
            case "fill":
                xy = this._ifFillXY(x, y);
                break;
            case "contain":
                xy = this._ifContainXY(x, y);
                break;
            case "cover":
                xy = this._ifCoverXY(x, y);
                break;
            case "none":
                xy = this._ifNoneXY(x, y);
                break;
            case "scale-down":
                xy = this._ifScaleDownXY(x, y);
                break;
        }
        return xy;
    }
    _ifFillXY(x, y) {
        return [this.canvasWidth * (x / this.elementWidth), this.canvasHeight * (y / this.elementHeight)];
    }
    _ifContainXY(x, y) {
        const cnvAsp = this.canvasHeight / this.canvasWidth;
        const elmAsp = this.elementHeight / this.elementWidth;
        let cnvPrcW, cnvPrcH, sx, sy;
        if (cnvAsp > elmAsp) {
            cnvPrcH = this.elementHeight;
            cnvPrcW = cnvPrcH * (this.canvasWidth / this.canvasHeight);
            sx = (this.elementWidth - cnvPrcW) / 2;
            sy = 0;
        }
        else {
            cnvPrcW = this.elementWidth;
            cnvPrcH = cnvPrcW * (this.canvasHeight / this.canvasWidth);
            sx = 0;
            sy = (this.elementHeight - cnvPrcH) / 2;
        }
        return [(x - sx) * (this.canvasWidth / cnvPrcW), (y - sy) * (this.canvasHeight / cnvPrcH)];
    }
    _ifCoverXY(x, y) {
        throw new Error(`"object-fit: cover"に対応していません。`);
    }
    _ifNoneXY(x, y) {
        throw new Error(`"object-fit: none"に対応していません。`);
    }
    _ifScaleDownXY(x, y) {
        throw new Error(`"object-fit: scale-down"に対応していません。`);
    }
}
//# sourceMappingURL=Mouse.js.map