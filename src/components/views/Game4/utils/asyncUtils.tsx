export function waitFor(delayInSecs = 1): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), delayInSecs * 1000);
    });
}

type AsyncQueueFn = () => Promise<void>;


export class AsyncQueue {
    private readonly queue: AsyncQueueFn[] = [];
    private paused = false;
    private processing = false;

    public pause() {
        this.paused = true;
    }

    public resume() {
        this.paused = false;
    }

    public isProcessing() {
        return this.processing;
    }

    public isPaused() {
        return this.processing;
    }


    public async add(fn: AsyncQueueFn, autoStart = true) {
        this.queue.push(fn);
        if (autoStart) await this.process();
    }

    public async process() {
        if (this.processing) return;
        this.processing = true;
        while (this.queue.length) {
            if (this.paused) {
                await waitFor(0.1);
            } else {
                const fn = this.queue.shift();
                if (fn) await fn();
            }
        }
        this.processing = false;
    }

    public clear() {
        this.queue.length = 0;
        this.processing = false;
        this.paused = false;
    }
}
