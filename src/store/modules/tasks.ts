import { Mutation, State } from "vuex-simple";
import { ITask } from "@/models";

export class TasksModule {
    @State()
    public tasks: ITask[] = [];

    constructor(tasks: ITask[]) {
        this.setTasks(tasks);
    }

    @Mutation()
    public setTasks(tasks: ITask[]) {
        this.tasks = tasks;
    }

    @Mutation()
    public addTask(task: ITask) {
        this.tasks.push(task);
    }

    @Mutation()
    public toggleCompleted(task: ITask) {
        task.checked = !task.checked;
    }
}
