"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var map_1 = require("./lib/map");
var point_1 = require("./lib/point");
var view_1 = require("./lib/view/view");
var util_1 = require("./lib/util");
var macro_1 = require("./lib/macro");
var Graphical = require("graphical");
Graphical.graphical(8111);
var map = map_1.Map.Create(JSON.parse(fs.readFileSync("./config/map_data.json").toString()));
map.view();
var res = [];
res.push(map.findPath(point_1.Point.Create(2, 2), point_1.Point.Create(8, 4)));
res.push(map.findPath(point_1.Point.Create(1, 3), point_1.Point.Create(8, 8)));
res.push(map.findPath(point_1.Point.Create(1, 0), point_1.Point.Create(4, 0)));
res.forEach(function (pathList) {
    if (pathList && pathList.length) {
        for (var i = 0; i < pathList.length - 2; i++) {
            view_1.drawLine(util_1.convert(pathList[i].x, pathList[i].y, true), util_1.convert(pathList[i + 1].x, pathList[i + 1].y, true), macro_1.COLORS.red, 2);
        }
    }
});
