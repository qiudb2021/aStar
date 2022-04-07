"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Point X-Y坐标点
 */
var Point = /** @class */ (function () {
    function Point(x, y) {
        this._x = x;
        this._y = y;
    }
    Point.Create = function (x, y) {
        return new Point(x, y);
    };
    Object.defineProperty(Point.prototype, "x", {
        /** X轴坐标 */
        get: function () {
            return this._x;
        },
        /** 设置X轴坐标 */
        set: function (newX) {
            this._x = newX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        /** Y轴坐标 */
        get: function () {
            return this._y;
        },
        set: function (newY) {
            this._y = newY;
        },
        enumerable: true,
        configurable: true
    });
    return Point;
}());
exports.Point = Point;
