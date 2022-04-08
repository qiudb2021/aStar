import { Map } from "./map";
import { Point } from "./point";
import { drawCircle, drawLine } from "./view/view";
import { convert, createEndlessLoop } from "./util";
import { COLORS, DIRECTION } from "./macro";
import { TreeNode } from "./node/treeNode";
import { PriorityQueue } from "./priorityQueue";

export class PathFinder {
    /** 已经创建的树节点（避免重复创建和销毁） */
    protected _poolList: TreeNode[];
    protected _index: number;
    
    public static Create(): PathFinder {
        return new PathFinder();
    }

    protected constructor() {
        this._poolList = [];
        this._index = 0;
    }


    public findPath(map: Map, start: Point, goal: Point): Point[] {
        this._index++;

        drawCircle(convert(start.x, start.y, true), 5, COLORS.green);
        drawCircle(convert(goal.x, goal.y, true), 5, COLORS.red);

        let treeRoot = this.createTreeNode(start.x, start.y);
        treeRoot.addG(0);
        treeRoot.calcH(goal);
        treeRoot.calcF();
        let current = treeRoot;
        map.setVisited(current.x, current.y, this._index);

        let queue: PriorityQueue<TreeNode> = new PriorityQueue<TreeNode>((a: TreeNode, b: TreeNode) => {
            return b.f - a.f;
        });
        let child: TreeNode;
        let x: number = -1;
        let y: number = -1;
        let success: boolean = false;

        while(current) {
            for (let i = 0; i < 4; i++) {
                switch(i) {
                    case DIRECTION.Up:
                        x = current.x;
                        y = current.y - 1;
                        break;
                    case DIRECTION.Right:
                        x = current.x + 1;
                        y = current.y;
                        break;
                    case DIRECTION.Down:
                        x = current.x;
                        y = current.y + 1;
                        break;
                    case DIRECTION.Left:
                        x = current.x - 1;
                        y = current.y;
                        break;
                    default:
                        break;
                }

                if (!map.walkable(x, y)) {
                    continue;
                }
    
                if (map.isVisited(x, y, this._index)) {
                    continue;
                }
    
                map.setVisited(x, y, this._index);
    
                child = TreeNode.Create(x, y, current.g);
                child.parent = current;
                child.addG(10);
                child.calcH(goal);
                child.calcF();
                child.view();
                current.addChild(child);
    
                queue.enqueue(child);
            }

            // 找到openList中f最小的树节点
            if (queue.empty()) {
                // 寻路失败
                console.warn("寻路失败")
                break;
            }

            if (this.reachGoal(current, goal)) {
                console.log("到达终点")
                success = true;
                break;
            }

            current = queue.dequeue();
            current.view(true);
        }


        let pathList: Point[] = [];
        if (success) {
            while(current) {
                pathList.push(current.pos);
                current = current.parent;
            }
            pathList.reverse();
        } else {
            pathList = null;
        }

        // 回收树节点
        TreeNode.recycle();

        return pathList;
    }

    protected reachGoal(current: TreeNode, goal: Point): boolean {
        return current.x === goal.x && current.y === goal.y
    }

    protected findMin(openList: TreeNode[]): [number, TreeNode] {
        let lastIdx = openList.length - 1;
        let min: TreeNode = openList[lastIdx];
        let idx: number = lastIdx;
        for (let i = lastIdx - 1; i >= 0; i--) {
            if (min.f > openList[i].f) {
                min = openList[i];
                idx = i;
            }
        }
        return [idx, min];
    }

    public createTreeNode(x: number, y: number, g: number = 0) {
        let node = this._poolList.pop();
        if (node) {
            node.reset()
            node.x = x;
            node.y = y;
            node.addG(g)
            return node;
        }

        return TreeNode.Create(x, y, g);
    }


    public recycleTreeNode(node: TreeNode) {
        this._poolList.push(node);
    }
}