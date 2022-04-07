/**
 * Point X-Y坐标点
 */
export class Point {
    protected _x: number;
    protected _y: number;

    public static Create(x: number, y: number) {
        return new Point(x, y);
    }

    protected constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    /** X轴坐标 */
    public get x() {
        return this._x;
    }

    /** 设置X轴坐标 */
    public set x(newX: number) {
        this._x = newX;
    }

    /** Y轴坐标 */
    public get y() {
        return this._y;
    }

    public set y(newY: number) {
        this._y = newY;
    }


}