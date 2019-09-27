import { Getter, Mutation, State } from 'vuex-simple';

import { ITask } from '@/models';

export class TasksModule {
    @State()
    tasks: ITask[] = [];

    constructor(private root: any, tasks: ITask[]) {
        this.setTasks(tasks);
    }

    @Mutation()
    setTasks(tasks: ITask[]) {
        this.tasks = tasks;
    }

    @Mutation()
    addTask(task: ITask) {
        this.tasks.push(task);
    }

    @Mutation()
    toggleCompleted(task: ITask) {
        task.checked = !task.checked;
    }

    @Getter()
    get tasksForCurrentDate() {
        const { currentDate } = this.root;
        const currentDateString = currentDate.toLocaleDateString();
        return this.tasks.filter(({date}) => date.toLocaleDateString() === currentDateString);
    }

    @Getter()
    get tasksDates(): string[] {
        return this.tasks
            .map(({date}) => date.toLocaleDateString())
            .filter((date, index, self) => self.indexOf(date) === index);
    }
}
