export default class Circle {
    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
    }
    testForPoint(point) {
        const result = new CollisionResultOfCircleAndPoint();
        result.isCollision = point.sub(this.position).lengthSq() <= Math.pow(this.radius, 2);
        return result;
    }
    testForCircle(circle) {
        const d = this.radius + circle.radius;
        const result = new CollisionResultOfCircleAndCircle();
        result.isCollision = circle.position.sub(this.position).lengthSq() <= Math.pow(d, 2);
        return result;
    }
    testForLine(line) {
    }
    testForSegment(segment) {
    }
    testForCapsule(capsule) {
    }
    clone() {
        return new Circle(this.position.clone(), this.radius);
    }
}
export class CollisionResultOfCircleAndPoint {
    constructor() {
        this.isCollision = false;
    }
}
export class CollisionResultOfCircleAndCircle {
    constructor() {
        this.isCollision = false;
    }
}
export class CollisionResultOfCircleAndLine {
    constructor() {
        this.isCollision = false;
        this.intersectionPoint1 = undefined;
        this.divisionRatio1 = undefined;
        this.intersectionPoint2 = undefined;
        this.divisionRatio2 = undefined;
        this.rootPoint = undefined;
    }
}
export class CollisionResultOfCircleAndSegment {
}
export class CollisionResultOfCircleAndCapsule {
}
//# sourceMappingURL=Circle.js.map