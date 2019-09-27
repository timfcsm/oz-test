import {VNode} from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import TaskItem from '@/components/Tasks/TaskItem';
import { ITask } from '@/models';
import { VueComponent } from '@/shims-vue';

import styles from './TasksList.scss?module';

interface IProps {
    tasks: ITask[];
}

@Component({
    name: 'TasksList',
})
export default class TasksList extends VueComponent<IProps> {
    @Prop()
    private tasks!: ITask[];

    render(): VNode {
        return <div class={styles.TasksList}>
            <div>События</div>
            { this.tasks.map((task) => <TaskItem task={task}/>) }
        </div>;
    }
}
