"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var priorityQueue_1 = require("./lib/priorityQueue");
var queue = priorityQueue_1.PriorityQueue.Create(function (a, b) {
    return b - a;
});
[5, 200, 7, 20, 50, 700, 68, 1502, 702].forEach(function (e) {
    queue.enqueue(e);
});
while (!queue.empty()) {
    console.log("dequeue %j", queue.dequeue());
}
