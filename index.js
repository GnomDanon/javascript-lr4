function siftDown(array, size, index) {
	while (true) {
		let largest = index;
		const left = 2 * index + 1;
		const right = 2 * index + 2;

		if (left < size && array[left] > array[largest]) {
			largest = left;
		}

		if (right < size && array[right] > array[largest]) {
			largest = right;
		}

		if (largest === index) {
			break;
		}

		[array[index], array[largest]] = [array[largest], array[index]];

		index = largest;
	}
}

function heapSort(array) {
	const length = array.length;

	for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
		siftDown(array, length, i);
	}

	for (let end = length - 1; end > 0; end--) {
		[array[0], array[end]] = [array[end], array[0]];
		siftDown(array, end, 0);
	}

	return array;
}

// const numbers = [8, 3, 5, 1, 9, 2, 7, 4, 6];

// console.log(`Исходный массив: ${numbers}`);
// console.log(`После сортировки: ${heapSort(numbers)}`);


class Heap {
	constructor(hasHigherPriority) {
		this.data = [];
		this.hasHigherPriority = hasHigherPriority;
	}

	get size() {
		return this.data.length;
	}

	peek() {
		return this.data.length > 0 ? this.data[0] : undefined;
	}

	push(value) {
		this.data.push(value);
		this.siftUp(this.data.length - 1);
	}

	pop() {
		if (this.data.length === 0) {
			return undefined;
		}

		const root = this.data[0];
		const last = this.data.pop();

		if (this.data.length > 0) {
			this.data[0] = last;
			this.siftDown(0);
		}

		return root;
	}

	siftUp(index) {
		while (index > 0) {
			const parent = Math.floor((index - 1) / 2);

			if (!this.hasHigherPriority(this.data[index], this.data[parent])) {
				break;
			}

			[this.data[index], this.data[parent]] = [this.data[parent], this.data[index]];

			index = parent;
		}
	}

	siftDown(index) {
		const size = this.data.length;

		while (true) {
			let best = index;
			const left = 2 * index + 1;
			const right = 2 * index + 2;

			if (left < size && this.hasHigherPriority(this.data[left], this.data[best])) {
				best = left;
			}

			if (right < size && this.hasHigherPriority(this.data[right], this.data[best])) {
				best = right;
			}

			if (best === index) {
				break;
			}

			[this.data[index], this.data[best]] = [this.data[best], this.data[index]];

			index = best;
		}
	}
}

function topKLargest(array, k) {
	if (!Number.isInteger(k) || k < 0 || k > array.length) {
		throw new RangeError("k должно быть от 0 до длины массива");
	}

	const heap = new Heap((a, b) => a < b);

	for (const value of array) {
		if (heap.size < k) {
			heap.push(value);
		} else if (k > 0 && value > heap.peek()) {
			heap.pop();
			heap.push(value);
		}
	}

	const result = [];

	while (heap.size > 0) {
		result.push(heap.pop());
	}

	return result.reverse();
}

function topKSmallest(array, k) {
	if (!Number.isInteger(k) || k < 0 || k > array.length) {
		throw new RangeError("k должно быть от 0 до длины массива");
	}

	const heap = new Heap((a, b) => a > b);

	for (const value of array) {
		if (heap.size < k) {
			heap.push(value);
		} else if (k > 0 && value < heap.peek()) {
			heap.pop();
			heap.push(value);
		}
	}

	const result = [];

	while (heap.size > 0) {
		result.push(heap.pop());
	}

	return result;
}

// const values = [7, 2, 9, 4, 1, 8, 3, 6, 5];

// console.log("Топ-3 сверху:", topKLargest(values, 3));
// console.log("Топ-3 снизу:", topKSmallest(values, 3));

class PriorityQueue {
	constructor() {
		this.heap = new Heap((a, b) => a.priority > b.priority);
	}

	get size() {
		return this.heap.size;
	}

	enqueue(value, priority) {
		this.heap.push({ value, priority });
	}

	dequeue() {
		const item = this.heap.pop();
		return item ? item.value : undefined;
	}

	peek() {
		const item = this.heap.peek();
		return item ? item.value : undefined;
	}

	isEmpty() {
		return this.size === 0;
	}
}

const queue = new PriorityQueue();

queue.enqueue("Обычная задача", 1);
queue.enqueue("Срочная задача", 10);
queue.enqueue("Важная задача", 5);

console.log("Следующая задача:", queue.peek());

while (!queue.isEmpty()) {
	console.log("Выполняется:", queue.dequeue());
}
