export default class Stack<T> {
    private data: T[] = Object.seal(new Array(32).fill(undefined))
    private count = 0

    push(element: T) {
        this.data[this.count] = element
        this.count++
    }

    pop(): T {
        this.count--
        return this.data[this.count]
    }

    peek(): T {
        return this.data[this.count - 1]
    }

    isEmpty(): boolean {
        return this.count <= 0
    }

    isFull(): boolean {
        return this.count >= this.data.length
    }
}