"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var map_1 = require("./lib/map");
var point_1 = require("./lib/point");
var treeNode_1 = require("./lib/node/treeNode");
var Graphical = require("graphical");
Graphical.graphical(8111);
var map = map_1.Map.Create(JSON.parse(fs.readFileSync("./config/map_data.json").toString()));
map.view();
// view(map.findPath(Point.Create(1, 3), Point.Create(8,8)));
// view(map.findPath(Point.Create(1, 0), Point.Create(4,0)));
console.time("findpath");
var count = 1;
while (count--)
    map.findPath(point_1.Point.Create(2, 2), point_1.Point.Create(110, 26));
console.timeEnd("findpath");
console.log(treeNode_1.TreeNode.index);
