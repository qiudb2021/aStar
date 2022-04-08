"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var list = JSON.parse(fs.readFileSync("./config/map_data.json").toString());
var width = 198;
var height = 196;
var results = [];
while (list.length) {
    results.push(list.splice(0, width));
}
fs.writeFileSync("./config/map_data.json", JSON.stringify(results));
