"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("./view/view");
var util_1 = require("./util");
var macro_1 = require("./macro");
var treeNode_1 = require("./node/treeNode");
var priorityQueue_1 = require("./priorityQueue");
var PathFinder = /** @class */ (function () {
    function PathFinder() {
        this._poolList = [];
        this._index = 0;
    }
    PathFinder.Create = function () {
        return new PathFinder();
    };
    PathFinder.prototype.findPath = function (map, start, goal) {
        this._index++;
        view_1.drawCircle(util_1.convert(start.x, start.y, true), 5, macro_1.COLORS.green);
        view_1.drawCircle(util_1.convert(goal.x, goal.y, true), 5, macro_1.COLORS.red);
        var treeRoot = this.createTreeNode(start.x, start.y);
        treeRoot.addG(0);
        treeRoot.calcH(goal);
        treeRoot.calcF();
        var current = treeRoot;
        map.setVisited(current.x, current.y, this._index);
        var queue = new priorityQueue_1.PriorityQueue(function (a, b) {
            return b.f - a.f;
        });
        var child;
        var x = -1;
        var y = -1;
        var success = false;
        while (current) {
            for (var i = 0; i < 4; i++) {
                switch (i) {
                    case macro_1.DIRECTION.Up:
                        x = current.x;
                        y = current.y - 1;
                        break;
                    case macro_1.DIRECTION.Right:
                        x = current.x + 1;
                        y = current.y;
                        break;
                    case macro_1.DIRECTION.Down:
                        x = current.x;
                        y = current.y + 1;
                        break;
                    case macro_1.DIRECTION.Left:
                        x = current.x - 1;
                        y = current.y;
                        break;
                    default:
                        break;
                }
                if (!map.walkable(x, y)) {
                    continue;
                }
                if (map.isVisited(x, y, this._index)) {
                    continue;
                }
                map.setVisited(x, y, this._index);
                child = treeNode_1.TreeNode.Create(x, y, current.g);
                child.parent = current;
                child.addG(10);
                child.calcH(goal);
                child.calcF();
                child.view();
                current.addChild(child);
                queue.enqueue(child);
            }
            // ??????openList???f??????????????????
            if (queue.empty()) {
                // ????????????
                console.warn("????????????");
                break;
            }
            if (this.reachGoal(current, goal)) {
                // console.log("????????????")
                success = true;
                break;
            }
            current = queue.dequeue();
            current.view(true);
        }
        var pathList = [];
        if (success) {
            while (current) {
                pathList.push(current.pos);
                current = current.parent;
            }
            pathList.reverse();
        }
        else {
            pathList = null;
        }
        // ???????????????
        treeNode_1.TreeNode.recycle();
        return pathList;
    };
    PathFinder.prototype.reachGoal = function (current, goal) {
        return current.x === goal.x && current.y === goal.y;
    };
    PathFinder.prototype.createTreeNode = function (x, y, g) {
        if (g === void 0) { g = 0; }
        var node = this._poolList.pop();
        if (node) {
            node.reset();
            node.x = x;
            node.y = y;
            node.addG(g);
            return node;
        }
        return treeNode_1.TreeNode.Create(x, y, g);
    };
    PathFinder.prototype.recycleTreeNode = function (node) {
        this._poolList.push(node);
    };
    return PathFinder;
}());
exports.PathFinder = PathFinder;
