import Matrix2x2 from "./Matrix2x2.js";
export default class Matrix3x3 {
    constructor(_11 = 0, _21 = 0, _31 = 0, _12 = 0, _22 = 0, _32 = 0, _13 = 0, _23 = 0, _33 = 0) {
        this.m = Array(9);
        this.m[0] = _11;
        this.m[3] = _12;
        this.m[6] = _13;
        this.m[1] = _21;
        this.m[4] = _22;
        this.m[7] = _23;
        this.m[2] = _31;
        this.m[5] = _32;
        this.m[8] = _33;
    }
    determinant() {
        let a, b, c, d, e, f;
        a = this.m[0] * this.m[4] * this.m[8];
        b = this.m[3] * this.m[7] * this.m[2];
        c = this.m[6] * this.m[1] * this.m[5];
        d = this.m[6] * this.m[4] * this.m[2];
        e = this.m[0] * this.m[7] * this.m[5];
        f = this.m[3] * this.m[1] * this.m[8];
        return a + b + c - d - e - f;
    }
    mul(mat) {
        return Matrix3x3.mul(this, mat);
    }
    translate(x, y) {
        return this.mul(Matrix3x3.translate(x, y));
    }
    rotate(rad) {
        return this.mul(Matrix3x3.rotate(rad));
    }
    scale(x, y) {
        return this.mul(Matrix3x3.scale(x, y));
    }
    scalar(n) {
        return Matrix3x3.scalar(this, n);
    }
    flip() {
        return Matrix3x3.flip(this);
    }
    cut(row, column) {
        const mat2x2 = new Matrix2x2();
        let ri = 0;
        for (let r = 0; r < 3; r++) {
            if (r == row)
                continue;
            let ci = 0;
            for (let c = 0; c < 3; c++) {
                if (c == column)
                    continue;
                mat2x2.m[ri * 2 + ci] = this.m[r * 3 + c];
                ci++;
            }
            ri++;
        }
        return mat2x2;
    }
    inverse() {
        return Matrix3x3.inverse(this);
    }
    assign(mat) {
        this.m[0] = mat.m[0];
        this.m[3] = mat.m[3];
        this.m[6] = mat.m[6];
        this.m[1] = mat.m[1];
        this.m[4] = mat.m[4];
        this.m[7] = mat.m[7];
        this.m[2] = mat.m[2];
        this.m[5] = mat.m[5];
        this.m[8] = mat.m[8];
    }
    clone() {
        return new Matrix3x3(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5], this.m[6], this.m[7], this.m[8]);
    }
    static mul(a, b) {
        const res = new Matrix3x3();
        res.m[0] = a.m[0] * b.m[0] + a.m[3] * b.m[1] + a.m[6] * b.m[2];
        res.m[1] = a.m[1] * b.m[0] + a.m[4] * b.m[1] + a.m[7] * b.m[2];
        res.m[2] = a.m[2] * b.m[0] + a.m[5] * b.m[1] + a.m[8] * b.m[2];
        res.m[3] = a.m[0] * b.m[3] + a.m[3] * b.m[4] + a.m[6] * b.m[5];
        res.m[4] = a.m[1] * b.m[3] + a.m[4] * b.m[4] + a.m[7] * b.m[5];
        res.m[5] = a.m[2] * b.m[3] + a.m[5] * b.m[4] + a.m[8] * b.m[5];
        res.m[6] = a.m[0] * b.m[6] + a.m[3] * b.m[7] + a.m[6] * b.m[8];
        res.m[7] = a.m[1] * b.m[6] + a.m[4] * b.m[7] + a.m[7] * b.m[8];
        res.m[8] = a.m[2] * b.m[6] + a.m[5] * b.m[7] + a.m[8] * b.m[8];
        return res;
    }
    static translate(x, y) {
        return new Matrix3x3(1, 0, 0, 0, 1, 0, x, y, 1);
    }
    static rotate(rad) {
        return new Matrix3x3(Math.cos(rad), Math.sin(rad), 0, -Math.sin(rad), Math.cos(rad), 0, 0, 0, 1);
    }
    static scale(x, y) {
        return new Matrix3x3(x, 0, 0, 0, y, 0, 0, 0, 1);
    }
    static flip(mat) {
        const res = new Matrix3x3();
        res.m[0] = mat.m[0];
        res.m[3] = mat.m[1];
        res.m[6] = mat.m[2];
        res.m[1] = mat.m[3];
        res.m[4] = mat.m[4];
        res.m[7] = mat.m[5];
        res.m[2] = mat.m[6];
        res.m[5] = mat.m[7];
        res.m[8] = mat.m[8];
        return res;
    }
    static scalar(mat, n) {
        const res = mat.clone();
        res.m[0] *= n;
        res.m[3] *= n;
        res.m[6] *= n;
        res.m[1] *= n;
        res.m[4] *= n;
        res.m[7] *= n;
        res.m[2] *= n;
        res.m[5] *= n;
        res.m[8] *= n;
        return res;
    }
    static inverse(mat) {
        const cofactor = new Matrix3x3();
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                cofactor.m[r * 3 + c] = mat.cut(r, c).determinant() * (((r + c) % 2 == 0) ? 1 : -1);
            }
        }
        return cofactor.scalar(1 / mat.determinant()).flip();
    }
    static get zero() { return new Matrix3x3(0, 0, 0, 0, 0, 0, 0, 0, 0); }
    static get identity() { return new Matrix3x3(1, 0, 0, 0, 1, 0, 0, 0, 1); }
}
//# sourceMappingURL=Matrix3x3.js.map