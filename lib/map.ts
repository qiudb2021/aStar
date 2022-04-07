import { MapNode } from "./node/mapNode";
import { TreeNode } from "./node/treeNode";

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
    /** 已经创建的树节点（避免重复创建和销毁） */
    protected _poolList: TreeNode[];

    public static Create(oriList: number[][]) {
        return new Map(oriList);
    }

    public createTreeNode(x: number, y: number) {
        let node = this._poolList.pop();
        if (node) {
            node.reset()
            return node;
        }

        return TreeNode.Create(x, y);
    }


    public recycleTreeNode(node: TreeNode) {
        this._poolList.push(node);
    }

    public constructor(oriList: number[][]) {
        if (!oriList.length || !oriList[0].length) {
            throw new Error("地图原始数据出错");
        }

        this._width = oriList[0].length;
        this._height = oriList.length;

        this._poolList = [];

        // 地图原始数据转化成地图节点数据
        this._dataList = [];
        for (let y = 0; y < this._height; y++) {
            let list: MapNode[] = [];
            for (let x = 0; x < this._width; x++) {
                list.push(new MapNode(x, y, oriList[y][x]));
            }
            this._dataList.push(list);
        }
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
        return this.valid(x, y) && this._dataList[y][x];}
}