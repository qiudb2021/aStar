import { Point } from "./point";

export class Vector2 {
    // 用于跟踪每次寻路需要创建几次的Vector2，避免大量创建导致效率低下
    public static index: number = 0;
    protected _x: number;
    protected _y: number;

    public static Create(p0: Point, p1: Point): Vector2 {
        return new Vector2(p1.x - p0.x, p1.y - p0.y);
    }

    /** 两个向量叉乘 */
    public static Cross(v1: Vector2, v2: Vector2): number {
        return v1.x * v2.y - v2.x * v1.y;
    }

    protected constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
        Vector2.index++;
    }

    public get x(): number {return this._x;}

    public get y(): number {return this._y;}

    public set x(newX: number) {this._x = newX;}

    public set y(newY: number) {this._y = newY;}

}