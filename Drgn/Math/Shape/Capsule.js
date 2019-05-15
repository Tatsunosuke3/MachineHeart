import Segment from "./Segment.js";
import Line from "./Line.js";
import AxisAlignedBoundingBox from "./AxisAlignedBoundingBox.js";
export default class Capsule {
    constructor(anchor, vector, radius) {
        this.anchor = anchor;
        this.vector = vector;
        this.radius = radius;
    }
    get endPoint() {
        return this.anchor.add(this.vector);
    }
    set endPoint(value) {
        this.vector = value.sub(this.anchor);
    }
    toSegment() {
        return new Segment(this.anchor.clone(), this.vector.clone());
    }
    toAabb() {
        const left = (this.anchor.x < this.endPoint.x ? this.anchor.x : this.endPoint.x) - this.radius;
        const top = (this.anchor.y < this.endPoint.y ? this.anchor.y : this.endPoint.y) - this.radius;
        const right = (this.anchor.x > this.endPoint.x ? this.anchor.x : this.endPoint.x) + this.radius;
        const bottom = (this.anchor.y > this.endPoint.y ? this.anchor.y : this.endPoint.y) + this.radius;
        return new AxisAlignedBoundingBox(left, top, right, bottom);
    }
    toLine() {
        return new Line(this.anchor.clone(), this.vector.clone());
    }
}
//# sourceMappingURL=Capsule.js.map