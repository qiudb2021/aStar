"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 颜色枚举 */
var COLORS;
(function (COLORS) {
    COLORS["red"] = "red";
    COLORS["gray"] = "gray";
    COLORS["black"] = "black";
    COLORS["blue"] = "blue";
    COLORS["yellow"] = "yellow";
    COLORS["green"] = "green";
    COLORS["orange"] = "orange";
    COLORS["pink"] = "pink";
    COLORS["brown"] = "brown";
    COLORS["purple"] = "purple";
})(COLORS = exports.COLORS || (exports.COLORS = {}));
/** 地图节点（格子）宽度 */
exports.GRID_WIDTH = 20;
/** 地图节点（格子）高度 */
exports.GRID_HEIGHT = 20;
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["Up"] = 0] = "Up";
    DIRECTION[DIRECTION["Right"] = 1] = "Right";
    DIRECTION[DIRECTION["Down"] = 2] = "Down";
    DIRECTION[DIRECTION["Left"] = 3] = "Left";
})(DIRECTION = exports.DIRECTION || (exports.DIRECTION = {}));
