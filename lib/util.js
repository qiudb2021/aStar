"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("./point");
var macro_1 = require("./macro");
var view_1 = require("./view/view");
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
function view(pathList, color, width, center) {
    if (width === void 0) { width = 1; }
    if (center === void 0) { center = false; }
    if (pathList && pathList.length) {
        for (var i = 0; i < pathList.length - 1; i++) {
            view_1.drawLine(convert(pathList[i].x, pathList[i].y, true), convert(pathList[i + 1].x, pathList[i + 1].y, true), color, width);
        }
        if (center) {
            for (var i = 0; i < pathList.length; i++) {
                view_1.drawCircle(convert(pathList[i].x, pathList[i].y, true), 5, macro_1.COLORS.blue);
            }
        }
    }
}
exports.view = view;
