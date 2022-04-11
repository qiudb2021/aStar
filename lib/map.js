"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapNode_1 = require("./node/mapNode");
var view_1 = require("./view/view");
var util_1 = require("./util");
var macro_1 = require("./macro");
var pathFinder_1 = require("./pathFinder");
var point_1 = require("./point");
var vector2_1 = require("./vector2");
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
        // 地图原始数据转化成地图节点数据
        this._dataList = [];
        for (var y = 0; y < this._height; y++) {
            var list = [];
            for (var x = 0; x < this._width; x++) {
                list.push(new mapNode_1.MapNode(x, y, oriList[y][x]));
            }
            this._dataList.push(list);
        }
        this._pathFinder = pathFinder_1.PathFinder.Create();
    }
    Map.Create = function (oriList) {
        return new Map(oriList);
    };
    Map.prototype.findPath = function (start, goal) {
        if (!this.walkable(start.x, start.y)) {
            console.error("起点%j不可通过", start);
            return null;
        }
        if (!this.walkable(goal.x, goal.y)) {
            console.error("终点%j不可通过", goal);
            return null;
        }
        var oriPathList = this._pathFinder.findPath(this, start, goal);
        // console.log(oriPathList.length);
        util_1.view(oriPathList, macro_1.COLORS.green, 5);
        this.floyd(oriPathList);
        util_1.view(oriPathList, macro_1.COLORS.yellow, 2, true);
        console.log(oriPathList.length);
        return oriPathList;
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
    Map.prototype.floyd = function (oriPathList) {
        if (!oriPathList || !oriPathList.length) {
            return null;
        }
        var len = oriPathList.length;
        if (len < 3) {
            // 不需要处理
            return oriPathList;
        }
        var vector = vector2_1.Vector2.Create(oriPathList[len - 2], oriPathList[len - 1]);
        var tmpVector = vector2_1.Vector2.Create(point_1.Point.Create(0, 0), point_1.Point.Create(0, 0));
        var p0, p1;
        for (var i = len - 3; i >= 0; i--) {
            p0 = oriPathList[i];
            p1 = oriPathList[i + 1];
            tmpVector.x = p1.x - p0.x;
            tmpVector.y = p1.y - p0.y;
            if (vector2_1.Vector2.Cross(vector, tmpVector) == 0) {
                oriPathList.splice(i + 1, 1);
            }
            else {
                vector.x = tmpVector.x;
                vector.y = tmpVector.y;
            }
        }
    };
    Map.prototype.view = function () {
        // 先画出地图格子
        for (var x = 0; x <= this._width; x++) {
            view_1.drawLine(util_1.convert(x, 0), util_1.convert(x, this._height), macro_1.COLORS.gray);
        }
        for (var y = 0; y <= this._height; y++) {
            view_1.drawLine(util_1.convert(0, y), util_1.convert(this._width, y), macro_1.COLORS.gray);
        }
        this._dataList.forEach(function (list) {
            list.forEach(function (mapNode) {
                mapNode.view();
            });
        });
    };
    return Map;
}());
exports.Map = Map;
