import { Component, Prop } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";
import {VNode} from "vue";
import { ITask } from "@/models";
import TaskItem from "@/components/Tasks/TaskItem";

import styles from './TasksList.scss?module';

interface Props {
    tasks: ITask[]
}

@Component({
    name: 'TasksList',
})
export default class TasksList extends VueComponent<Props>{
    @Prop()
    private tasks!: ITask[];

    render(): VNode {
        return <div class={styles.TasksList}>
            <div>События</div>
            { this.tasks.map(task => <TaskItem task={task}/>) }
        </div>
    }
}
