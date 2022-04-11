"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this._x = x;
        this._y = y;
        Vector2.index++;
    }
    Vector2.Create = function (p0, p1) {
        return new Vector2(p1.x - p0.x, p1.y - p0.y);
    };
    /** 两个向量叉乘 */
    Vector2.Cross = function (v1, v2) {
        return v1.x * v2.y - v2.x * v1.y;
    };
    Object.defineProperty(Vector2.prototype, "x", {
        get: function () { return this._x; },
        set: function (newX) { this._x = newX; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "y", {
        get: function () { return this._y; },
        set: function (newY) { this._y = newY; },
        enumerable: true,
        configurable: true
    });
    // 用于跟踪每次寻路需要创建几次的Vector2，避免大量创建导致效率低下
    Vector2.index = 0;
    return Vector2;
}());
exports.Vector2 = Vector2;
