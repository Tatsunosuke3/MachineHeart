import Vector2 from "../Vector2.js";
export default class AxisAlignedBoundingBox {
    constructor(left, top, right, bottom) {
        if (typeof left == "number" && typeof top == "number" && typeof right == "number" && typeof bottom == "number") {
            this._topLeft = new Vector2(left, top);
            this._bottomRight = new Vector2(right, bottom);
        }
        else if (left instanceof Vector2 && top instanceof Vector2) {
            this._topLeft = left;
            this._bottomRight = top;
        }
    }
    get center() {
        return this._topLeft.add(this._harf);
    }
    get _harf() {
        return this._bottomRight.sub(this._topLeft).scalar(0.5);
    }
    isOverlapped(aabb) {
        if ((this._harf.x + aabb._harf.x) < Math.abs(this.center.x - aabb.center.x))
            return false;
        if ((this._harf.y + aabb._harf.y) < Math.abs(this.center.y - aabb.center.y))
            return false;
        return true;
    }
}
//# sourceMappingURL=AxisAlignedBoundingBox.js.map