import { Point } from "./point";
import { GRID_WIDTH, GRID_HEIGHT } from "./macro";


/**
 * 格子坐标转换成像素坐标
 * @param gridX X轴坐标（格子坐标）
 * @param gridY Y轴坐标（格子坐标）
 * @param center 是否转成中心点坐标（默认-false）
 */
export function convert(gridX: number, gridY: number, center: boolean = false) {
    let x = center ? gridX * GRID_WIDTH + GRID_WIDTH * 0.5 : gridX * GRID_WIDTH;
    let y = center ? gridY * GRID_HEIGHT + GRID_HEIGHT * 0.5 : gridY * GRID_HEIGHT;
    return Point.Create(x, y);
}