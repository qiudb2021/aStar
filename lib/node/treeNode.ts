import { Point } from "../point";

export class TreeNode {
    /** 树节点坐标 */
    protected _pos: Point;
    /** 父节点 */
    protected _parent: TreeNode;
    /** 子节点列表 */
    protected _childList: TreeNode[];

    public static Create(x: number, y: number) {
        return new TreeNode(x, y);
    }

    public constructor(x: number, y: number) {
        this._pos = Point.Create(x, y);
        this._parent = <TreeNode><unknown>null;
        this._childList = [];
    }

    /** 更改x坐标 */
    public set x(x: number) {this._pos.x = x;} 
    /** 更改y坐标 */
    public set y(y: number) {this._pos.y = y;}

    /** 设置父节点 */
    public set parent(parent: TreeNode) {
        this._parent = parent;
    }

    /** 添加子节点 */
    public addChild(child: TreeNode) {
        this._childList.push(child);
    }

    public reset(): void {
        this._pos.x = -1;
        this._pos.y = -1;
        this._parent = <TreeNode><unknown>null;
        this._childList.length = 0;
    }
}