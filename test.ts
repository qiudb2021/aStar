import { PriorityQueue } from "./lib/priorityQueue";

let queue = PriorityQueue.Create((a, b) => {
    return b - a;
});

[5, 200, 7, 20, 50, 700, 68, 1502, 702].forEach(e => {
    queue.enqueue(e);
});

while(!queue.empty()) {
    console.log("dequeue %j", queue.dequeue())
}