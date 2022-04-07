import { Point } from "../point";
import { drawRectangle } from "../view/view";
import { convert } from "../util";
import { GRID_WIDTH, GRID_HEIGHT, COLORS } from "../macro";

export class MapNode {
    /** 地图节点坐标 */
    protected _pos: Point;
    /** 地图访问标志 */
    protected _visited: number;
    /** g值 */
    protected _g: number;
    /** h值 */
    protected _h: number;
    /** f值 */
    protected _f: number;

    protected _value: number;

    public constructor(x: number, y: number, value: number) {
        this._pos = Point.Create(x, y);
        this._visited = 0;
        this._g = 0;
        this._f = 0;
        this._h = 0;
        this._value = value;
    }

    /** 获取地图节点坐标 */
    public get pos () {return this._pos;}

    /** 设置访问过 */
    public set visited(currentVal: number) {this._visited = currentVal;}

    /** 是否访问过 */
    public isVisited(currentVal: number): boolean {
        return this._visited == currentVal;
    }

    /** 累加G值-当前代价 */
    public addG(g: number): void {
        this._g += g;
    }

    /** 计算h值（曼哈顿距离）- 当前点到目标点预估代价 */
    public calcH(goal: MapNode): void {
        let dx = Math.abs(goal.pos.x - this.pos.x);
        let dy = Math.abs(goal.pos.y - this.pos.y);
        this._h = dx + dy;
    }

    /** 计算总代价 */
    public calcF(): void {
        this._f = this._g + this._h;
    }

    public walkable(): boolean {
        return this._value == 0;
    }

    public view(): void {
        if (!this.walkable()) {
            drawRectangle(convert(this._pos.x, this._pos.y), GRID_WIDTH, GRID_HEIGHT, COLORS.black);
        }
    }
}