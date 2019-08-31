import padStart from 'lodash.padstart';
import { Component, Prop } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";
import {VNode} from "vue";
import { ITask } from "@/models";
import VCheckbox from "@/components/Base/VCheckbox";

import styles from './TaskItem.scss?module';

interface Props {
    task: ITask
}

@Component({
    name: 'TaskItem',
})
export default class TasksList extends VueComponent<Props>{
    @Prop()
    private task!: ITask;

    render(): VNode {
        const hours: number = this.task.date.getHours();
        const minutes: number = this.task.date.getMinutes();

        return <div class={styles.TaskItem}>
            <div class={styles.check}><VCheckbox checked={this.task.checked} /></div>
            <div class={styles.time}>{`${padStart(String(hours), 2, '0')}:${padStart(String(minutes), 2, '0')}`}</div>
            <div class={styles.title}>{this.task.title}</div>
        </div>
    }
}
