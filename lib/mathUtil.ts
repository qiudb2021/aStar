import { Point } from "./point";

export class MathUtil {
    /** 
     * @description 三点共线判断-
     * */
    public static inLine(p0: Point, p1: Point, p2: Point): boolean {
        return (p1.x - p0.x == p2.x - p1.x) && (p1.y - p0.y == p2.y - p1.y);
    }
}