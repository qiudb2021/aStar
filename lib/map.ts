import { MapNode } from "./node/mapNode";
import { TreeNode } from "./node/treeNode";
import { drawLine } from "./view/view";
import { convert, view } from "./util";
import { COLORS } from "./macro";
import { PathFinder } from "./pathFinder";
import { Point } from "./point";
import { Vector2 } from "./vector2";

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

        let oriPathList = this._pathFinder.findPath(this, start, goal);
        // console.log(oriPathList.length);
        view(oriPathList, COLORS.green, 5);
        this.floyd(oriPathList);
        view(oriPathList, COLORS.yellow, 2, true);
        console.log(Vector2.index)
        return oriPathList;
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

    public floyd(oriPathList: Point[]): Point[] {
        if (!oriPathList || !oriPathList.length) {
            return null;
        }

        let len = oriPathList.length;
        if (len < 3) {
            // 不需要处理
            return oriPathList;
        }

        let vector: Vector2 = Vector2.Create(oriPathList[len - 2], oriPathList[len - 1])
        let tmpVector: Vector2 = Vector2.Create(Point.Create(0, 0), Point.Create(0, 0));
        let p0: Point, p1: Point;
        for (let i = len - 3; i >= 0; i--) {
            p0 = oriPathList[i];
            p1 = oriPathList[i+1];
            tmpVector.x = p1.x - p0.x;
            tmpVector.y = p1.y - p0.y;

            if (Vector2.Cross(vector, tmpVector) == 0) {
                oriPathList.splice(i+1, 1)
            } else {
                vector.x = tmpVector.x;
                vector.y = tmpVector.y;
            }
        }
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