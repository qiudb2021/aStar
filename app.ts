import fs = require("fs");
import { Map } from "./lib/map";
import { Point } from "./lib/point";
import { drawLine } from "./lib/view/view";
import { convert } from "./lib/util";
import { COLORS } from "./lib/macro";

const Graphical = require("graphical");

Graphical.graphical(8111);

let map = Map.Create(JSON.parse(fs.readFileSync("./config/map_data.json").toString()))
map.view();

let res: Point[][] = [];
res.push(map.findPath(Point.Create(2,2), Point.Create(8,4)));
res.push(map.findPath(Point.Create(1, 3), Point.Create(8,8)));
res.push(map.findPath(Point.Create(1, 0), Point.Create(4,0)));


res.forEach(pathList => {
    if (pathList && pathList.length) {
        for(let i = 0; i < pathList.length - 2; i++) {
            drawLine(convert(pathList[i].x, pathList[i].y, true), convert(pathList[i+1].x, pathList[i+1].y, true), COLORS.red, 2);
        }
    }
});


