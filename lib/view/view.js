"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var macro_1 = require("../macro");
var Graphical = require("graphical");
function drawLine(from, to, color, width) {
    if (color === void 0) { color = macro_1.COLORS.red; }
    if (width === void 0) { width = 1; }
    var line = new Graphical.Line();
    line.setPos(from.x, from.y);
    line.setPos2(to.x, to.y);
    line.setColor(color);
    line.setWidth(width);
}
exports.drawLine = drawLine;
function drawCircle(o, r, color) {
    if (color === void 0) { color = macro_1.COLORS.red; }
    var circle = new Graphical.Circle();
    circle.setPos(o.x, o.y);
    circle.setRadius(r);
    circle.setColor(color);
}
exports.drawCircle = drawCircle;
function drawRectangle(leftUp, width, height, color) {
    if (color === void 0) { color = macro_1.COLORS.red; }
    var rect = new Graphical.Rectangle();
    rect.setPos(leftUp.x, leftUp.y);
    rect.setSize(width, height);
    rect.setColor(color);
}
exports.drawRectangle = drawRectangle;
function drawText(start, context, color, size) {
    if (color === void 0) { color = macro_1.COLORS.red; }
    if (size === void 0) { size = 10; }
    var text = new Graphical.Text();
    text.setText(context);
    text.setPos(start.x, start.y);
    var front = "bold " + size + "px Arial";
    text.setFont(front);
    text.setColor(color);
    // text.setOutlineWidth(1);
    // text.setOutlineColor("black")
}
exports.drawText = drawText;
