"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("./point");
var macro_1 = require("./macro");
/**
 * 格子坐标转换成像素坐标
 * @param gridX X轴坐标（格子坐标）
 * @param gridY Y轴坐标（格子坐标）
 */
function convert(gridX, gridY) {
    return point_1.Point.Create(gridX * macro_1.GRID_WIDTH, gridY * macro_1.GRID_HEIGHT);
}
exports.convert = convert;
