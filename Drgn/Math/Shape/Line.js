export default class Line {
    constructor(anchor, vector) {
        this.anchor = anchor;
        this.vector = vector;
    }
    get _a() {
        return this.vector.y;
    }
    get _b() {
        return -this.vector.x;
    }
    get _c() {
        return (this.anchor.y + this.vector.y) * this.vector.x - (this.anchor.x + this.vector.x) * this.vector.y;
    }
    get endPoint() {
        return this.anchor.add(this.vector);
    }
    set endPoint(value) {
        this.vector = value.sub(this.anchor);
    }
    testForPoint(point) {
        const result = new CollisionResultOfLineAndPoint();
        result.t = this.vector.dot(point.sub(this.anchor)) / this.vector.lengthSq();
        result.rootPoint = this.anchor.add(this.vector.scalar(result.t));
        result.distance = point.sub(result.rootPoint).length();
        result.isCollision = result.distance < 0.0001;
        return result;
    }
    testForCircle(circle) {
    }
    testForLine(line) {
        const result = new CollisionResultOfLineAndLine();
        const crs_v1_v2 = this.vector.cross(line.vector);
        if (Math.abs(crs_v1_v2) <= 0.0001) {
            const resultOfLineAndPoint = this.testForPoint(line.anchor);
            if (resultOfLineAndPoint.isCollision) {
                result.isCollision = true;
                result.isParallel = true;
                result.distance = 0;
            }
            else {
                result.isCollision = false;
                result.isParallel = true;
                result.distance = resultOfLineAndPoint.distance;
            }
            return result;
        }
        const v = line.anchor.sub(this.anchor);
        const t1 = v.cross(line.vector) / crs_v1_v2;
        const t2 = v.cross(this.vector) / crs_v1_v2;
        const p = this.anchor.add(this.vector.scalar(t1));
        result.isCollision = true;
        result.isParallel = false;
        result.distance = 0;
        result.intersectionPoint = p;
        result.t1 = t1;
        result.t2 = t2;
        return result;
    }
    testForSegment(segment) {
        const result = new CollisionResultOfLineAndSegment();
        const crs_v1_v2 = this.vector.cross(segment.vector);
        if (crs_v1_v2 == 0) {
            result.isCollision = false;
            result.isParallel = true;
            return result;
        }
        const v = segment.anchor.sub(this.anchor);
        const t1 = v.cross(segment.vector) / crs_v1_v2;
        const t2 = v.cross(this.vector) / crs_v1_v2;
        if (0 <= t2 && t2 <= 1) {
            result.isCollision = true;
            result.intersectionPoint = segment.anchor.add(segment.vector.scalar(t2));
            return result;
        }
        return result;
    }
}
export class CollisionResultOfLineAndPoint {
    constructor() {
        this.isCollision = undefined;
        this.distance = undefined;
        this.t = undefined;
        this.rootPoint = undefined;
    }
}
export class CollisionResultOfLineAndLine {
    constructor() {
        this.isCollision = false;
        this.isParallel = false;
        this.distance = undefined;
        this.intersectionPoint = undefined;
        this.t1 = undefined;
        this.t2 = undefined;
    }
}
export class CollisionResultOfLineAndSegment {
    constructor() {
        this.isCollision = false;
        this.isParallel = false;
        this.distance = undefined;
        this.intersectionPoint = undefined;
        this.t1 = undefined;
        this.t2 = undefined;
    }
}
//# sourceMappingURL=Line.js.map