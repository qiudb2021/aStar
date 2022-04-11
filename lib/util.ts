import { Point } from "./point";
import { GRID_WIDTH, GRID_HEIGHT, COLORS } from "./macro";
import { drawLine, drawCircle } from "./view/view";


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

export function createEndlessLoop(count: number): Function {
    return function() {
        while(count--) {
            return false;
        }
        return true;
    }
}

export function view(pathList: Point[], color: COLORS, width: number = 1, center: boolean = false) {
    if (pathList && pathList.length) {
        for(let i = 0; i < pathList.length - 1; i++) {
            drawLine(convert(pathList[i].x, pathList[i].y, true), convert(pathList[i+1].x, pathList[i+1].y, true), color, width);
        }

        if (center) {
            for (let i = 0; i < pathList.length; i++) {
                drawCircle(convert(pathList[i].x, pathList[i].y, true), 5, COLORS.blue);
            }
        }
    }


}