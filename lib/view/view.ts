import { Point } from "../point";
import { COLORS } from "../macro";

const Graphical = require("graphical");

export function drawLine(from: Point, to: Point, color: COLORS = COLORS.red, width: number = 1): void {
    let line = new Graphical.Line();
    line.setPos(from.x, from.y);
    line.setPos2(to.x, to.y);
    line.setColor(color);
    line.setWidth(width);
}

export function drawCircle(o: Point, r: number, color: COLORS=COLORS.red): void {
    let circle = new Graphical.Circle();
    circle.setPos(o.x, o.y);
    circle.setRadius(r);
    circle.setColor(color);
}

export function drawRectangle(leftUp: Point, width: number, height: number, color: COLORS = COLORS.red): void {
    let rect = new Graphical.Rectangle();
    rect.setPos(leftUp.x, leftUp.y);
    rect.setSize(width, height);
    rect.setColor(color);
}

export function drawText(start: Point, context: string, color: COLORS = COLORS.red, size: number=10): void {
    let text = new Graphical.Text();
    text.setText(context);
    text.setPos(start.x, start.y);
    let front = "bold "+ size + "px Arial";
    text.setFont(front);
    text.setColor(color);
    // text.setOutlineWidth(1);
    // text.setOutlineColor("black")
}