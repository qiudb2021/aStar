import { Point } from "./point";
import { GRID_WIDTH, GRID_HEIGHT } from "./macro";


/**
 * 格子坐标转换成像素坐标
 * @param gridX X轴坐标（格子坐标）
 * @param gridY Y轴坐标（格子坐标）
 */
export function convert(gridX: number, gridY: number) {
    return Point.Create(
        gridX * GRID_WIDTH,
        gridY * GRID_HEIGHT
    );
}