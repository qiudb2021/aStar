"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("../point");
var view_1 = require("../view/view");
var util_1 = require("../util");
var macro_1 = require("../macro");
var MapNode = /** @class */ (function () {
    function MapNode(x, y, value) {
        this._pos = point_1.Point.Create(x, y);
        this._visited = 0;
        this._g = 0;
        this._f = 0;
        this._h = 0;
        this._value = value;
    }
    Object.defineProperty(MapNode.prototype, "pos", {
        /** 获取地图节点坐标 */
        get: function () { return this._pos; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapNode.prototype, "visited", {
        /** 设置访问过 */
        set: function (currentVal) { this._visited = currentVal; },
        enumerable: true,
        configurable: true
    });
    /** 是否访问过 */
    MapNode.prototype.isVisited = function (currentVal) {
        return this._visited == currentVal;
    };
    /** 累加G值-当前代价 */
    MapNode.prototype.addG = function (g) {
        this._g += g;
    };
    /** 计算h值（曼哈顿距离）- 当前点到目标点预估代价 */
    MapNode.prototype.calcH = function (goal) {
        var dx = Math.abs(goal.pos.x - this.pos.x);
        var dy = Math.abs(goal.pos.y - this.pos.y);
        this._h = dx + dy;
    };
    /** 计算总代价 */
    MapNode.prototype.calcF = function () {
        this._f = this._g + this._h;
    };
    MapNode.prototype.walkable = function () {
        return this._value == 0;
    };
    MapNode.prototype.view = function () {
        if (!this.walkable()) {
            view_1.drawRectangle(util_1.convert(this._pos.x, this._pos.y), macro_1.GRID_WIDTH, macro_1.GRID_HEIGHT, macro_1.COLORS.black);
        }
    };
    return MapNode;
}());
exports.MapNode = MapNode;
