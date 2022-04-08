"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("../point");
var view_1 = require("../view/view");
var util_1 = require("../util");
var macro_1 = require("../macro");
var TreeNode = /** @class */ (function () {
    function TreeNode(x, y, g) {
        if (g === void 0) { g = 0; }
        this._index = ++TreeNode.index;
        this._pos = point_1.Point.Create(x, y);
        this._parent = null;
        this._childList = [];
        this._g = g;
        this._h = 0;
        this._f = 0;
    }
    TreeNode.Create = function (x, y, g) {
        var cache;
        while (cache = TreeNode._freeList.pop()) {
            cache.reset();
            cache.x = x;
            cache.y = y;
            cache.addG(g);
            TreeNode._useList.push(cache);
            return cache;
        }
        var node = new TreeNode(x, y, g);
        TreeNode._useList.push(node);
        return node;
    };
    /** 回收 */
    TreeNode.recycle = function () {
        var node;
        while (node = TreeNode._useList.pop()) {
            this._freeList.push(node);
        }
        // this._useList.length = 0;
    };
    Object.defineProperty(TreeNode.prototype, "x", {
        get: function () { return this._pos.x; },
        /** 更改x坐标 */
        set: function (x) { this._pos.x = x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "y", {
        get: function () { return this._pos.y; },
        /** 更改y坐标 */
        set: function (y) { this._pos.y = y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "pos", {
        get: function () { return this._pos; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "parent", {
        get: function () { return this._parent; },
        /** 设置父节点 */
        set: function (parent) {
            this._parent = parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "g", {
        get: function () { return this._g; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "h", {
        get: function () { return this._h; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "f", {
        get: function () { return this._f; },
        enumerable: true,
        configurable: true
    });
    /** 添加子节点 */
    TreeNode.prototype.addChild = function (child) {
        this._childList.push(child);
    };
    /** 累加G值-当前代价 */
    TreeNode.prototype.addG = function (g) {
        this._g += g;
    };
    /** 计算h值（曼哈顿距离）- 当前点到目标点预估代价 */
    TreeNode.prototype.calcH = function (goal) {
        var dx = Math.abs(goal.x - this.x);
        var dy = Math.abs(goal.y - this.y);
        this._h = (dx + dy) * 10;
    };
    /** 计算总代价 */
    TreeNode.prototype.calcF = function () {
        this._f = this._g + this._h;
    };
    TreeNode.prototype.reset = function () {
        this._pos.x = -1;
        this._pos.y = -1;
        this._parent = null;
        this._childList.length = 0;
        this._g = 0;
        this._h = 0;
        this._f = 0;
    };
    TreeNode.prototype.view = function (center) {
        if (center === void 0) { center = false; }
        return;
        if (center) {
            view_1.drawCircle(util_1.convert(this.x, this.y, center), 5, macro_1.COLORS.blue);
        }
        else {
            // let leftUp: Point = convert(this._pos.x, this._pos.y)
            // drawRectangle(leftUp, GRID_WIDTH, GRID_HEIGHT, COLORS.green);
            // let size = 10;
            // leftUp.y += size;
            // drawText(leftUp, "g: "+this._g+";   h:"+this._h, COLORS.yellow, size);
            // leftUp.y += size;
            // drawText(leftUp, "f: " + this.f, COLORS.yellow, size);
            // leftUp.y += size;
            // drawText(leftUp, "(x:"+this.x+",y:"+this.y+")", COLORS.black, size);
            // leftUp.y += size*2;
            // drawText(leftUp, "index:"+this._index, COLORS.black, size);
        }
    };
    TreeNode.index = 0;
    TreeNode._freeList = [];
    TreeNode._useList = [];
    return TreeNode;
}());
exports.TreeNode = TreeNode;
