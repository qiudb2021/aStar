"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("./point");
var macro_1 = require("./macro");
/**
 * 格子坐标转换成像素坐标
 * @param gridX X轴坐标（格子坐标）
 * @param gridY Y轴坐标（格子坐标）
 * @param center 是否转成中心点坐标（默认-false）
 */
function convert(gridX, gridY, center) {
    if (center === void 0) { center = false; }
    var x = center ? gridX * macro_1.GRID_WIDTH + macro_1.GRID_WIDTH * 0.5 : gridX * macro_1.GRID_WIDTH;
    var y = center ? gridY * macro_1.GRID_HEIGHT + macro_1.GRID_HEIGHT * 0.5 : gridY * macro_1.GRID_HEIGHT;
    return point_1.Point.Create(x, y);
}
exports.convert = convert;
function createEndlessLoop(count) {
    return function () {
        while (count--) {
            return false;
        }
        return true;
    };
}
exports.createEndlessLoop = createEndlessLoop;
