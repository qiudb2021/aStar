"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var map_1 = require("./lib/map");
var map = map_1.Map.Create(JSON.parse(fs.readFileSync("./config/map_data.json").toString()));
console.log("%j", map);
