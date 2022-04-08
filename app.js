"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var map_1 = require("./lib/map");
var point_1 = require("./lib/point");
var view_1 = require("./lib/view/view");
var util_1 = require("./lib/util");
var macro_1 = require("./lib/macro");
var treeNode_1 = require("./lib/node/treeNode");
var Graphical = require("graphical");
Graphical.graphical(8111);
var map = map_1.Map.Create(JSON.parse(fs.readFileSync("./config/map_data.json").toString()));
map.view();
// view(map.findPath(Point.Create(1, 3), Point.Create(8,8)));
// view(map.findPath(Point.Create(1, 0), Point.Create(4,0)));
view(map.findPath(point_1.Point.Create(2, 2), point_1.Point.Create(8, 4)));
console.log(treeNode_1.TreeNode.index);
function view(pathList) {
    if (pathList && pathList.length) {
        for (var i = 0; i < pathList.length - 2; i++) {
            view_1.drawLine(util_1.convert(pathList[i].x, pathList[i].y, true), util_1.convert(pathList[i + 1].x, pathList[i + 1].y, true), macro_1.COLORS.red, 2);
        }
    }
}
