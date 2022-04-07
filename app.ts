import fs = require("fs");
import { Map } from "./lib/map";

const Graphical = require("graphical");

Graphical.graphical(8111);

let map = Map.Create(JSON.parse(fs.readFileSync("./config/map_data.json").toString()))
map.view();
