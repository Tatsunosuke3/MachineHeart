export default class Shape {
    /**
     *
     * @param anchor
     * @param vector
     * @param point
     */
    static calcProjectedRatio(anchor, vector, point) {
        return vector.dot(point.sub(anchor)) / vector.lengthSq();
    }
}
//# sourceMappingURL=Shape.js.map