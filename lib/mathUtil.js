"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MathUtil = /** @class */ (function () {
    function MathUtil() {
    }
    /**
     * @description 三点共线判断-
     * */
    MathUtil.inLine = function (p0, p1, p2) {
        return (p1.x - p0.x == p2.x - p1.x) && (p1.y - p0.y == p2.y - p1.y);
    };
    return MathUtil;
}());
exports.MathUtil = MathUtil;
