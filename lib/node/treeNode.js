"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("../point");
var TreeNode = /** @class */ (function () {
    function TreeNode(x, y) {
        this._pos = point_1.Point.Create(x, y);
        this._parent = null;
        this._childList = [];
    }
    TreeNode.Create = function (x, y) {
        return new TreeNode(x, y);
    };
    Object.defineProperty(TreeNode.prototype, "x", {
        /** 更改x坐标 */
        set: function (x) { this._pos.x = x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "y", {
        /** 更改y坐标 */
        set: function (y) { this._pos.y = y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "parent", {
        /** 设置父节点 */
        set: function (parent) {
            this._parent = parent;
        },
        enumerable: true,
        configurable: true
    });
    /** 添加子节点 */
    TreeNode.prototype.addChild = function (child) {
        this._childList.push(child);
    };
    TreeNode.prototype.reset = function () {
        this._pos.x = -1;
        this._pos.y = -1;
        this._parent = null;
        this._childList.length = 0;
    };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
