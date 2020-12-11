type Task<T> = () => Promise<T>

class Scheduler<T> {
  private queue: Task<T>[] = []
  private concurrent_tasks_count = 0

  public constructor(private max_concurrency: number) {}

  public queue_task(task: Task<T>) {
    this.queue.push(task)
  }

  public start() {
    let interval: NodeJS.Timeout
    return new Promise<void>((resolve, reject) => {
      interval = setInterval(() => {
        if (this.queue.length === 0 && this.concurrent_tasks_count === 0) resolve()

        const dequeue_count = this.max_concurrency - this.concurrent_tasks_count
        const tasks = this.queue.splice(0, dequeue_count)
        this.concurrent_tasks_count += tasks.length
        for (const task of tasks) {
          task()
            .then(() => this.concurrent_tasks_count--)
            .catch(reject)
        }
      }, 10)
    }).finally(() => clearInterval(interval))
  }
}

export { Scheduler }
