import fs = require("fs");
import { Map } from "./lib/map";
import { Point } from "./lib/point";

const Graphical = require("graphical");

Graphical.graphical(8111);

let map = Map.Create(JSON.parse(fs.readFileSync("./config/map_data.json").toString()))
map.view();
map.findPath(Point.Create(2,2), Point.Create(8,4))
