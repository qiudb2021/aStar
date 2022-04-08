"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue(compare) {
        this.compare = compare;
        this.list = [];
    }
    PriorityQueue.Create = function (compare) {
        return new PriorityQueue(compare);
    };
    PriorityQueue.prototype.enqueue = function (e) {
        // 入队
        this.list.push(e);
        // 指向最后一个元素
        var idx = this.list.length - 1;
        // idx的父节点下标
        var parentIdx = Math.floor((idx - 1) / 2);
        while (parentIdx >= 0) {
            if (this.compare.call(null, this.list[idx], this.list[parentIdx]) <= 0) {
                break;
            }
            this.swap(idx, parentIdx);
            // idx指向父节点
            idx = parentIdx;
            // 重新计算idx的父节点
            parentIdx = Math.floor((idx - 1) / 2);
        }
    };
    PriorityQueue.prototype.dequeue = function () {
        if (this.empty()) {
            return null;
        }
        // 第1个元素出队
        var res = this.list[0];
        // 最后一个元素
        var last = this.list[this.list.length - 1];
        var idx = 0;
        this.list[idx] = last;
        while (true) {
            var leftChildIdx = idx * 2 + 1;
            var rightChildIdx = idx * 2 + 2;
            var targetIdx = idx;
            if (leftChildIdx < this.list.length && this.compare.call(null, this.list[targetIdx], this.list[leftChildIdx]) < 0) {
                targetIdx = leftChildIdx;
            }
            if (rightChildIdx < this.list.length && this.compare.call(null, this.list[targetIdx], this.list[rightChildIdx]) < 0) {
                targetIdx = rightChildIdx;
            }
            if (targetIdx == idx) {
                break;
            }
            this.swap(idx, targetIdx);
            idx = targetIdx;
        }
        this.list.length--;
        return res;
    };
    PriorityQueue.prototype.empty = function () {
        return !this.list.length;
    };
    PriorityQueue.prototype.swap = function (idx, parentIdx) {
        var tmp = this.list[idx];
        this.list[idx] = this.list[parentIdx];
        this.list[parentIdx] = tmp;
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;
