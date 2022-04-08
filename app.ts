import fs = require("fs");
import { Map } from "./lib/map";
import { Point } from "./lib/point";
import { drawLine } from "./lib/view/view";
import { convert } from "./lib/util";
import { COLORS } from "./lib/macro";
import { TreeNode } from "./lib/node/treeNode";

const Graphical = require("graphical");

Graphical.graphical(8111);

let map = Map.Create(JSON.parse(fs.readFileSync("./config/map_data.json").toString()))
map.view();

// view(map.findPath(Point.Create(1, 3), Point.Create(8,8)));
// view(map.findPath(Point.Create(1, 0), Point.Create(4,0)));
console.time("findpath");
view(map.findPath(Point.Create(2, 2), Point.Create(120, 26)));
console.timeEnd("findpath")

console.log(TreeNode.index)


function view(pathList: Point[]) {
    if (pathList && pathList.length) {
        for(let i = 0; i < pathList.length - 2; i++) {
            drawLine(convert(pathList[i].x, pathList[i].y, true), convert(pathList[i+1].x, pathList[i+1].y, true), COLORS.red, 2);
        }
    }
}


