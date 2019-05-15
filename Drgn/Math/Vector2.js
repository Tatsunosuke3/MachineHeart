export default class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    static get zero() {
        return new Vector2(0, 0);
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }
    add(v) {
        return Vector2.add(this, v);
    }
    sub(v) {
        return Vector2.sub(this, v);
    }
    scalar(n) {
        return Vector2.scalar(this, n);
    }
    dot(v) {
        return Vector2.dot(this, v);
    }
    cross(v) {
        return Vector2.cross(this, v);
    }
    rotate(angle) {
        return Vector2.rotate(this, angle);
    }
    transform(m) {
        return Vector2.transform(this, m);
    }
    normalize() {
        return Vector2.normalize(this);
    }
    verticalVector(direction = "right") {
        return Vector2.verticalVector(this, direction);
    }
    angle(v) {
        return Vector2.angle(this, v);
    }
    assign(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    toString() {
        return `{ x:${this.x.toFixed(3)} y:${this.y.toFixed(3)} }`;
    }
    static add(v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }
    static sub(v1, v2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }
    static scalar(v, n) {
        return new Vector2(v.x * n, v.y * n);
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    static cross(v1, v2) {
        return v1.x * v2.y - v2.x * v1.y;
    }
    static rotate(v, angle) {
        return new Vector2(v.x * Math.cos(angle) - v.y * Math.sin(angle), v.x * Math.sin(angle) + v.y * Math.cos(angle));
    }
    static transform(v, m) {
        return new Vector2(v.x * m.m[0] + v.y * m.m[3] + 1 * m.m[6], v.x * m.m[1] + v.y * m.m[4] + 1 * m.m[7]);
    }
    static normalize(v) {
        const len = v.length();
        return new Vector2(v.x / len, v.y / len);
    }
    static verticalVector(v, direction) {
        if (direction == "left") {
            return new Vector2(-v.y, v.x);
        }
        else {
            return new Vector2(v.y, -v.x);
        }
    }
    static angle(v1, v2) {
        const cosA = Vector2.dot(v1, v2) / (v1.length() * v2.length());
        return Math.acos(cosA);
    }
}
//# sourceMappingURL=Vector2.js.map