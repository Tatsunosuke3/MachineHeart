import Line from "./Line.js";
import AxisAlignedBoundingBox from "./AxisAlignedBoundingBox.js";
export default class Segment {
    constructor(anchor, vector) {
        this.anchor = anchor;
        this.vector = vector;
    }
    get endPoint() {
        return this.anchor.add(this.vector);
    }
    set endPoint(value) {
        this.vector = value.sub(this.anchor);
    }
    testForPoint(point) {
        const test_l_p = this.toLine().testForPoint(point);
        if (0 <= test_l_p.t && test_l_p.t <= 1) {
            const result = new CollisionResultOfSegmentAndPoint();
            result.t = test_l_p.t;
            result.rootPoint = test_l_p.rootPoint;
            result.distance = test_l_p.distance;
            result.isCollision = test_l_p.isCollision;
            return result;
        }
        let endPoint, t;
        if (test_l_p.t < 0) {
            endPoint = this.anchor;
            t = 0;
        }
        else if (test_l_p.t > 1) {
            endPoint = this.endPoint;
            t = 1;
        }
        const result = new CollisionResultOfSegmentAndPoint();
        result.t = t;
        result.rootPoint = endPoint;
        result.distance = point.sub(result.rootPoint).length();
        result.isCollision = result.distance < 0.0001;
        return result;
    }
    testForCircle(circle) {
    }
    testForLine(line) {
        const crs_v1_v2 = this.vector.cross(line.vector);
        if (crs_v1_v2 == 0) {
        }
        const v = line.anchor.sub(this.anchor);
        const t = v.cross(line.vector) / crs_v1_v2;
        if (0 <= t && t <= 1) {
        }
    }
    testForSegment(segment) {
        //2つの線分が平行な場合
        const crs_v1_v2 = this.vector.cross(segment.vector);
        if (Math.abs(crs_v1_v2) <= 0.0001) {
            return this._testForSegment_IfParallel(segment);
        }
        //2つの直線と見たときの交点を求める。(交点 = 始点 + t * ベクトル)
        const test_l_l = this.toLine().testForLine(segment.toLine());
        //交点が互いの線分内に収まっている場合
        if (0 <= test_l_l.t1 && test_l_l.t1 <= 1 && 0 <= test_l_l.t2 && test_l_l.t2 <= 1) {
            const result = new CollisionResultOfSegmentAndSegment();
            result.isCollision = true;
            result.distance = 0;
            result.t1 = test_l_l.t1;
            result.rootPoint1 = test_l_l.intersectionPoint.clone();
            result.t2 = test_l_l.t2;
            result.rootPoint2 = test_l_l.intersectionPoint.clone();
            return result;
        }
        //直線同士の交点を求めた際の、線分A(this)の媒介変数t1を0～1内にクランプした点から、線分Bに垂線を降ろしてみる。
        const t1_Clamp = test_l_l.t1 < 0 ? 0 : test_l_l.t1 > 1 ? 1 : test_l_l.t1;
        const endPoint1 = this.anchor.add(this.vector.scalar(t1_Clamp));
        const test_l_p1 = segment.toLine().testForPoint(endPoint1);
        //降ろした垂線が線分内に収まる場合
        if (0 <= test_l_p1.t && test_l_p1.t <= 1) {
            const result = new CollisionResultOfSegmentAndSegment();
            result.isCollision = false;
            result.distance = test_l_p1.distance;
            result.t1 = t1_Clamp;
            result.rootPoint1 = endPoint1;
            result.t2 = test_l_p1.t;
            result.rootPoint2 = test_l_p1.rootPoint;
            return result;
        }
        //今度は線分Bの媒介変数t2を0～1内にクランプし、線分A(this)に垂線を垂らしてみる。
        const t2_Clamp = test_l_l.t2 < 0 ? 0 : test_l_l.t2 > 1 ? 1 : test_l_l.t2;
        const endPoint2 = segment.anchor.add(segment.vector.scalar(t2_Clamp));
        const test_l_p2 = this.toLine().testForPoint(endPoint2);
        //降ろした垂線が線分内に収まる場合
        if (0 <= test_l_p2.t && test_l_p2.t <= 1) {
            const result = new CollisionResultOfSegmentAndSegment();
            result.isCollision = false;
            result.distance = test_l_p2.distance;
            result.t1 = test_l_p2.t;
            result.rootPoint1 = test_l_p2.rootPoint;
            result.t2 = t2_Clamp;
            result.rootPoint2 = endPoint2;
            return result;
        }
        //2つの線分が互いに外側のため端点同士が最短。最も近い端点同士を見つける。
        const result = this._testForSegment_IfEndToEnd(segment);
        result.isParallel = false;
        return result;
    }
    _testForSegment_IfParallel(segment) {
        //線分同士の間で垂線を垂らせるか        
        const testResult1 = this.toLine().testForPoint(segment.anchor);
        const testResult2 = this.toLine().testForPoint(segment.endPoint);
        //垂線を垂らせる場合
        if (0 <= testResult1.t && testResult1.t <= 1 ||
            0 <= testResult2.t && testResult2.t <= 1 ||
            Math.min(testResult1.t, testResult2.t) < 0 && 1 < Math.max(testResult1.t, testResult2.t)) {
            const result = new CollisionResultOfSegmentAndSegment();
            result.isParallel = true;
            result.distance = testResult1.distance;
            result.isCollision = testResult1.isCollision;
            result.rootPoint1 = undefined;
            result.rootPoint2 = undefined;
            result.t1 = undefined;
            result.t2 = undefined;
            return result;
        }
        //端点同士が最短
        const result = this._testForSegment_IfEndToEnd(segment);
        result.isParallel = true;
        return result;
    }
    _testForSegment_IfEndToEnd(segment) {
        const result = new CollisionResultOfSegmentAndSegment();
        result.isParallel = undefined;
        const ssLenSq = segment.anchor.sub(this.anchor).lengthSq();
        const seLenSq = segment.endPoint.sub(this.anchor).lengthSq();
        const esLenSq = segment.anchor.sub(this.endPoint).lengthSq();
        const eeLenSq = segment.endPoint.sub(this.endPoint).lengthSq();
        const minLenSq = Math.min(ssLenSq, seLenSq, esLenSq, eeLenSq);
        if (ssLenSq == minLenSq) {
            result.rootPoint1 = this.anchor.clone();
            result.t1 = 0;
            result.rootPoint2 = segment.anchor.clone();
            result.t2 = 0;
        }
        else if (seLenSq == minLenSq) {
            result.rootPoint1 = this.anchor.clone();
            result.t1 = 0;
            result.rootPoint2 = segment.endPoint.clone();
            result.t2 = 1;
        }
        else if (esLenSq == minLenSq) {
            result.rootPoint1 = this.endPoint.clone();
            result.t1 = 1;
            result.rootPoint2 = segment.anchor.clone();
            result.t2 = 0;
        }
        else if (eeLenSq == minLenSq) {
            result.rootPoint1 = this.endPoint.clone();
            result.t1 = 1;
            result.rootPoint2 = segment.endPoint.clone();
            result.t2 = 1;
        }
        result.distance = result.rootPoint2.sub(result.rootPoint1).length();
        result.isCollision = result.distance < 0.0001;
        return result;
    }
    testForCapsule(capsule) {
        const testResult = this.testForSegment(capsule.toSegment());
        const result = new CollisionResultOfSegmentAndCapsule();
        result.isParallel = testResult.isParallel;
        result.t1 = testResult.t1;
        result.rootPoint1 = testResult.rootPoint1;
        result.t2 = testResult.t2;
        result.rootPoint2 = testResult.rootPoint2;
        result.distance = testResult.distance;
        result.isCollision = result.distance <= capsule.radius;
        return result;
    }
    isOverlapped(aabb) {
        return this.toAabb().isOverlapped(aabb);
    }
    toLine() {
        return new Line(this.anchor.clone(), this.vector.clone());
    }
    toAabb() {
        const left = this.anchor.x < this.endPoint.x ? this.anchor.x : this.endPoint.x;
        const top = this.anchor.y < this.endPoint.y ? this.anchor.y : this.endPoint.y;
        const right = this.anchor.x > this.endPoint.x ? this.anchor.x : this.endPoint.x;
        const bottom = this.anchor.y > this.endPoint.y ? this.anchor.y : this.endPoint.y;
        return new AxisAlignedBoundingBox(left, top, right, bottom);
    }
}
export class CollisionResultOfSegmentAndPoint {
    constructor() {
        this.isCollision = undefined;
        this.distance = undefined;
        this.t = undefined;
        this.rootPoint = undefined;
    }
}
export class CollisionResultOfSegmentAndSegment {
    constructor() {
        this.isCollision = undefined;
        this.isParallel = undefined;
        this.distance = undefined;
        this.rootPoint1 = undefined;
        this.rootPoint2 = undefined;
        this.t1 = undefined;
        this.t2 = undefined;
    }
}
export class CollisionResultOfSegmentAndCapsule {
    constructor() {
        this.isCollision = undefined;
        this.isParallel = undefined;
        this.distance = undefined;
        this.rootPoint1 = undefined;
        this.rootPoint2 = undefined;
        this.t1 = undefined;
        this.t2 = undefined;
    }
}
//# sourceMappingURL=Segment.js.map