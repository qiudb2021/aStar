import { Map } from "./map";
import { Point } from "./point";
import { drawCircle } from "./view/view";
import { convert } from "./util";
import { COLORS } from "./macro";

export class PathFinder {
    public static Create(): PathFinder {
        return new PathFinder();
    }

    protected constructor() {}

    public findPath(map: Map, start: Point, goal: Point) {
        drawCircle(convert(start.x, start.y, true), 5, COLORS.green);
        drawCircle(convert(goal.x, goal.y, true), 5, COLORS.red);
        return null;
    }
}