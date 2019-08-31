import { Mutation, State } from "vuex-simple";

export class TasksModule {
    @State()
    public tasks: any[] = [];

    constructor(tasks: any[]) {
        this.tasks = tasks;
    }

    @Mutation()
    public addTask(task: any) {
        this.tasks.push(task);
    }
}
