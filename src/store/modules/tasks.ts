import { Mutation, State, Getter } from "vuex-simple";
import { ITask } from "@/models";

export class TasksModule {
    @State()
    public tasks: ITask[] = [];

    constructor(private root: any, tasks: ITask[]) {
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

    @Getter()
    public get tasksForCurrentDate() {
        const { currentDate } = this.root;
        const currentDateString = currentDate.toLocaleDateString();
        return this.tasks.filter(({date}) => date.toLocaleDateString() === currentDateString);
    }
}
