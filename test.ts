import fs = require("fs");

let list: number[] = JSON.parse(fs.readFileSync("./config/map_data.json").toString());
let width = 198;
let height = 196;

let results: number[][] = [];
while(list.length) {
    results.push(list.splice(0, width));
}


fs.writeFileSync("./config/map_data.json", JSON.stringify(results));
