import { MapNode } from "./node/mapNode";
import { TreeNode } from "./node/treeNode";
import { drawLine } from "./view/view";
import { convert } from "./util";
import { COLORS } from "./macro";
import { PathFinder } from "./pathFinder";
import { Point } from "./point";

/**
 * Map 地图
 */
export class Map {
    /** 二维数组表示的地图数据 */
    protected _dataList: MapNode[][];
    /** 地图宽 */
    protected _width: number;
    /** 地图高 */
    protected _height: number;

    protected _pathFinder: PathFinder;

    public static Create(oriList: number[][]) {
        return new Map(oriList);
    }

    public constructor(oriList: number[][]) {
        if (!oriList.length || !oriList[0].length) {
            throw new Error("地图原始数据出错");
        }

        this._width = oriList[0].length;
        this._height = oriList.length;

        // 地图原始数据转化成地图节点数据
        this._dataList = [];
        for (let y = 0; y < this._height; y++) {
            let list: MapNode[] = [];
            for (let x = 0; x < this._width; x++) {
                list.push(new MapNode(x, y, oriList[y][x]));
            }
            this._dataList.push(list);
        }

        this._pathFinder = PathFinder.Create();
    }

    public findPath(start: Point, goal: Point): Point[] {
        if (!this.walkable(start.x, start.y)) {
            console.error("起点%j不可通过", start);
            return null;
        }

        if (!this.walkable(goal.x, goal.y)) {
            console.error("终点%j不可通过", goal);
            return null;
        }

        return this._pathFinder.findPath(this, start, goal);
    }
    /** 地图坐标点是否合法 */
    public valid(x: number, y: number): boolean {
        return (x >=0 && x < this._width) && (y >= 0 && y < this._height);
    }

    /** 地图坐标(x,y)所在节点是否可通过 */
    public walkable(x: number, y: number): boolean {
        return this.valid(x, y) && this._dataList[y][x].walkable();
    }

    public setVisited(x: number, y: number, current: number): void {
        if (this.valid(x, y)){
            this._dataList[y][x].visited = current;
        }
    }

    /** 是否访问过 */
    public isVisited(x: number, y: number, current: number): boolean {
        let node = this.getMapNode(x, y);
        if (!node) return false;
        return node.isVisited(current);
    }

    /** 获取地图节点 */
    public getMapNode(x: number, y: number) {
        return this.valid(x, y) && this._dataList[y][x];
    }

    public view(): void {
        // 先画出地图格子
        for (let x = 0; x <= this._width; x++) {
            drawLine(convert(x, 0), convert(x, this._height), COLORS.gray);
        }

        for (let y = 0; y <= this._height; y++) {
            drawLine(convert(0, y), convert(this._width, y), COLORS.gray);
        }
        this._dataList.forEach(list => {
            list.forEach(mapNode => {
                mapNode.view();
            });
        });
    }
}