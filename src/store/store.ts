import {Module, Mutation, State} from "vuex-simple";
import { TasksModule } from "@/store/modules/tasks";

export class MyStore {
    @Module()
    public tasks = new TasksModule(this, []);

    @State()
    public currentDate: Date = new Date();

    @Mutation()
    public setCurrentDate(date: Date) {
        this.currentDate = date;
    }
}
