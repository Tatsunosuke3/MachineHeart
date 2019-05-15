export default class Matrix2x2 {
    constructor(_11 = 0, _21 = 0, _12 = 0, _22 = 0) {
        this.m = Array(4);
        this.m[0] = _11;
        this.m[1] = _21;
        this.m[2] = _12;
        this.m[3] = _22;
    }
    determinant() {
        return this.m[0] * this.m[3] - this.m[2] * this.m[1];
    }
}
//# sourceMappingURL=Matrix2x2.js.map