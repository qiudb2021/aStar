"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapNode_1 = require("./node/mapNode");
var treeNode_1 = require("./node/treeNode");
/**
 * Map 地图
 */
var Map = /** @class */ (function () {
    function Map(oriList) {
        if (!oriList.length || !oriList[0].length) {
            throw new Error("地图原始数据出错");
        }
        this._width = oriList[0].length;
        this._height = oriList.length;
        this._poolList = [];
        // 地图原始数据转化成地图节点数据
        this._dataList = [];
        for (var y = 0; y < this._height; y++) {
            var list = [];
            for (var x = 0; x < this._width; x++) {
                list.push(new mapNode_1.MapNode(x, y, oriList[y][x]));
            }
            this._dataList.push(list);
        }
    }
    Map.Create = function (oriList) {
        return new Map(oriList);
    };
    Map.prototype.createTreeNode = function (x, y) {
        var node = this._poolList.pop();
        if (node) {
            node.reset();
            return node;
        }
        return treeNode_1.TreeNode.Create(x, y);
    };
    Map.prototype.recycleTreeNode = function (node) {
        this._poolList.push(node);
    };
    /** 地图坐标点是否合法 */
    Map.prototype.valid = function (x, y) {
        return (x >= 0 && x < this._width) && (y >= 0 && y < this._height);
    };
    /** 地图坐标(x,y)所在节点是否可通过 */
    Map.prototype.walkable = function (x, y) {
        return this.valid(x, y) && this._dataList[y][x].walkable();
    };
    Map.prototype.setVisited = function (x, y, current) {
        if (this.valid(x, y)) {
            this._dataList[y][x].visited = current;
        }
    };
    /** 是否访问过 */
    Map.prototype.isVisited = function (x, y, current) {
        var node = this.getMapNode(x, y);
        if (!node)
            return false;
        return node.isVisited(current);
    };
    /** 获取地图节点 */
    Map.prototype.getMapNode = function (x, y) {
        return this.valid(x, y) && this._dataList[y][x];
    };
    return Map;
}());
exports.Map = Map;