import {Component, Emit, Prop} from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";
import {VNode} from "vue";
import { ITask } from "@/models";
import VTextInput from "@/components/Base/VTextInput";
import VButton from "@/components/Base/VButton";

import styles from './AddNewTask.scss?module';

interface Events {
  onCancel: () => void,
  onSave: (task: ITask) => void,
}

interface Props extends Events {
  currentDate: Date,
}

@Component({
  name: 'AddNewTask',
})
export default class TasksList extends VueComponent<Props>{
  @Prop()
  private currentDate!: Date;

  newTaskName: string = '';
  newTaskTime: string = '';

  @Emit('cancel')
  onCancel() {};
  @Emit('save')
  onSave(): ITask {
    const time = this.newTaskTime.split(':').map(Number);
    const date = new Date(this.currentDate);
    date.setHours(time[0], time[1]);

    return {
      checked: false,
      title: this.newTaskName,
      date,
    }
  };

  validateTime() {

  }

  render(): VNode {
    return <div>
      <div class={['row', styles.inputs]}>
        <div class="col col-4">
          <VTextInput value={this.newTaskTime} onChange={value => this.newTaskTime = value} />
        </div>
        <div class="col col-8">
          <VTextInput value={this.newTaskName} onChange={value => this.newTaskName = value} />
        </div>
      </div>
      <div class="row">
        <div class="col col-6">
          <VButton onClick={this.onCancel} block={true}>Отмена</VButton>
        </div>
        <div class="col col-6">
          <VButton onClick={this.onSave} block={true}>Сохранить</VButton>
        </div>
      </div>
    </div>
  }
}
