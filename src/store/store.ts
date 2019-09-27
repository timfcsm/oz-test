import {Module, Mutation, State} from 'vuex-simple';

import { TasksModule } from '@/store/modules/tasks';

export class MyStore {
    @Module()
    tasks = new TasksModule(this, []);

    @State()
    currentDate: Date = new Date();

    @Mutation()
    setCurrentDate(date: Date) {
        this.currentDate = date;
    }
}
