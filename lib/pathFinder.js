"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("./view/view");
var util_1 = require("./util");
var macro_1 = require("./macro");
var PathFinder = /** @class */ (function () {
    function PathFinder() {
    }
    PathFinder.Create = function () {
        return new PathFinder();
    };
    PathFinder.prototype.findPath = function (map, start, goal) {
        view_1.drawCircle(util_1.convert(start.x, start.y, true), 5, macro_1.COLORS.green);
        view_1.drawCircle(util_1.convert(goal.x, goal.y, true), 5, macro_1.COLORS.red);
        return null;
    };
    return PathFinder;
}());
exports.PathFinder = PathFinder;
