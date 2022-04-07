import fs = require("fs");
import { Map } from "./lib/map";

let map = Map.Create(JSON.parse(fs.readFileSync("./config/map_data.json").toString()))
console.log("%j", map)
