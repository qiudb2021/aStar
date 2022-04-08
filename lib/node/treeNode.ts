import { Point } from "../point";
import { drawRectangle, drawText, drawCircle } from "../view/view";
import { convert } from "../util";
import { GRID_WIDTH, GRID_HEIGHT, COLORS } from "../macro";

export class TreeNode {
    public static index = 0;
    protected static _freeList: TreeNode[] = [];
    protected static _useList: TreeNode[] = [];

    /** 树节点坐标 */
    protected _pos: Point;
    /** 父节点 */
    protected _parent: TreeNode;
    /** 子节点列表 */
    protected _childList: TreeNode[];

    protected _g: number;
    protected _h: number;
    protected _f: number;
    protected _index: number;

    public static Create(x: number, y: number, g: number) {
        let cache: TreeNode;
        while (cache = TreeNode._freeList.pop()) {
            cache.reset();
            cache.x = x;
            cache.y = y;
            cache.addG(g);

            TreeNode._useList.push(cache);
            return cache;
        }

        let node = new TreeNode(x, y, g);
        TreeNode._useList.push(node);
        return node;
    }

    /** 回收 */
    public static recycle() {
        let node: TreeNode;
        while(node = TreeNode._useList.pop()) {
            this._freeList.push(node);
        }

        // this._useList.length = 0;
        console.log("free count %d, useCount %d", this._freeList.length, this._useList.length)
    }


    public constructor(x: number, y: number, g: number = 0) {
        this._index = ++TreeNode.index;
        this._pos = Point.Create(x, y);
        this._parent = <TreeNode><unknown>null;
        this._childList = [];
        this._g = g;
        this._h = 0;
        this._f = 0;
    }

    /** 更改x坐标 */
    public set x(x: number) {this._pos.x = x;} 
    /** 更改y坐标 */
    public set y(y: number) {this._pos.y = y;}

    public get x(): number {return this._pos.x;}

    public get y(): number {return this._pos.y;}

    public get pos(): Point {return this._pos;}
    /** 设置父节点 */
    public set parent(parent: TreeNode) {
        this._parent = parent;
    }

    public get parent(): TreeNode {return this._parent;}

    public get g(): number {return this._g;}

    public get h(): number {return this._h;}

    public get f(): number {return this._f;}

    /** 添加子节点 */
    public addChild(child: TreeNode) {
        this._childList.push(child);
    }

    /** 累加G值-当前代价 */
    public addG(g: number): void {
        this._g += g;
    }

    /** 计算h值（曼哈顿距离）- 当前点到目标点预估代价 */
    public calcH(goal: Point): void {
        let dx = Math.abs(goal.x - this.x);
        let dy = Math.abs(goal.y - this.y);
        this._h = (dx + dy) * 10;
    }

    /** 计算总代价 */
    public calcF(): void {
        this._f = this._g + this._h;
    }

    public reset(): void {
        this._pos.x = -1;
        this._pos.y = -1;
        this._parent = null;
        this._childList.length = 0;
        this._g = 0;
        this._h = 0;
        this._f = 0;
    }

    public view(center: boolean = false): void {
        return;
        if (center) {
            drawCircle(convert(this.x, this.y, center), 5, COLORS.blue)
        } else {
            let leftUp: Point = convert(this._pos.x, this._pos.y)
            drawRectangle(leftUp, GRID_WIDTH, GRID_HEIGHT, COLORS.green);
    
            let size = 10;
            leftUp.y += size;
            drawText(leftUp, "g: "+this._g+";   h:"+this._h, COLORS.yellow, size);
    
            leftUp.y += size;
            drawText(leftUp, "f: " + this.f, COLORS.yellow, size);
    
            leftUp.y += size;
            drawText(leftUp, "(x:"+this.x+",y:"+this.y+")", COLORS.black, size);

            leftUp.y += size*2;
            drawText(leftUp, "index:"+this._index, COLORS.black, size);

        }
    }

    
}