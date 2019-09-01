import {Component, Emit, Prop} from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";
import {VNode} from "vue";
import delay from "@/util/delay";
import { ITask } from "@/models";
import VTextInput from "@/components/Base/VTextInput";
import VButton from "@/components/Base/VButton";

import styles from './AddNewTask.scss?module';

interface Errors {
  [key: string]: Nullable<string>,
}

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
  isValidTime: boolean = false;
  errors: Errors = {
    time: null
  };

  @Emit('cancel')
  onCancel() {};
  @Emit('save')
  onSave(): ITask {
    const time = this.newTaskTime.split(':').map(Number);
    const date = new Date(this.currentDate);
    const title = this.newTaskName;
    date.setHours(time[0], time[1]);

    this.newTaskName = '';
    this.newTaskTime = '';

    return {
      checked: false,
      title,
      date,
    }
  };

  get isValidTask(): boolean {
    return !!(this.isValidTime && this.newTaskName);
  }

  async validateTime(): Promise<boolean> {
    await delay(2000);

    if (!this.newTaskTime) {
      return false;
    }

    let timeStringRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

    return timeStringRegex.test(this.newTaskTime);
  }

  async onChangeTime(value: string) {
    this.newTaskTime = value;

    const isValidTime = await this.validateTime();

    this.errors.time = isValidTime ? null : 'Введите валидное время';
    this.isValidTime = isValidTime;
  }

  onSaveClick(): void {
    if (this.isValidTask) {
      this.onSave();
    }
  }

  render(): VNode {
    return <div>
      <div class={['row', styles.inputs]} data-cy="new-task-inputs">
        <div class="col col-4">
          <VTextInput value={this.newTaskTime} onChange={this.onChangeTime}
                      data-cy="new-task-time"
          />
        </div>
        <div class="col col-8">
          <VTextInput value={this.newTaskName}
                      onChange={value => this.newTaskName = value}
                      disabled={!this.isValidTime}
                      data-cy="new-task-name"
          />
        </div>
        { this.errors.time && <div class={[styles.error, 'col col-12']}>{this.errors.time}</div> }
      </div>
      <div class="row">
        <div class="col col-6">
          <VButton onClick={this.onCancel} block={true}>Отмена</VButton>
        </div>
        <div class="col col-6">
          <VButton onClick={this.onSaveClick}
                   block={true}
                   disabled={!this.isValidTask}
                   data-cy="save-task-btn"
          >Сохранить</VButton>
        </div>
      </div>
    </div>
  }
}
