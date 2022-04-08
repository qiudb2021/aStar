export class PriorityQueue<T> {
    protected compare: Function;
    protected list: T[];

    public static Create(compare: Function) {
        return new PriorityQueue(compare);
    }

    public constructor(compare: Function) {
        this.compare = compare;
        this.list = [];
    }

    public enqueue(e: T): void {
        // 入队
        this.list.push(e);

        // 指向最后一个元素
        let idx = this.list.length - 1;
        // idx的父节点下标
        let parentIdx = Math.floor((idx - 1) / 2);

        while(parentIdx >= 0) {
            if (this.compare.call(null, this.list[idx], this.list[parentIdx]) <= 0) {
                break;
            }

            this.swap(idx, parentIdx);

            // idx指向父节点
            idx = parentIdx;
            // 重新计算idx的父节点
            parentIdx = Math.floor((idx - 1) / 2)
        }
    }

    public dequeue() {
        if (this.empty()) {
            return null;
        }

        // 第1个元素出队
        let res = this.list[0];

        // 最后一个元素
        let last = this.list[this.list.length - 1];

        let idx = 0;
        this.list[idx] = last;

        while(true) {
            let leftChildIdx = idx * 2 + 1;
            let rightChildIdx = idx * 2 + 2;
            let targetIdx = idx;

            if (leftChildIdx < this.list.length && this.compare.call(null, this.list[targetIdx], this.list[leftChildIdx]) < 0) {
                targetIdx = leftChildIdx;
            }

            if (rightChildIdx < this.list.length && this.compare.call(null, this.list[targetIdx], this.list[rightChildIdx]) < 0) {
                targetIdx = rightChildIdx;
            }

            if (targetIdx == idx) {
                break;
            }

            this.swap(idx, targetIdx);

            idx = targetIdx;
        }

        this.list.length--;
        return res;
    }

    public empty(): boolean {
        return !this.list.length
    }
    protected swap(idx: number, parentIdx: number): void {
        let tmp = this.list[idx];
        this.list[idx] = this.list[parentIdx];
        this.list[parentIdx] = tmp;
    }
}