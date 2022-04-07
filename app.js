"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var map_1 = require("./lib/map");
var Graphical = require("graphical");
Graphical.graphical(8111);
var map = map_1.Map.Create(JSON.parse(fs.readFileSync("./config/map_data.json").toString()));
map.view();
