import { Component, Vue } from 'vue-property-decorator';
import {useStore} from "vuex-simple";
import {ITask} from "@/models";
import TasksList from '@/components/Tasks/TasksList';
import VButton from "@/components/Base/VButton";
import VPlate from "@/components/Base/VPlate";
import AddNewTask from "@/components/Tasks/AddNewTask";
import DatePicker from "@/components/DatePicker/DatePicker";

import { MyStore } from '@/store/store';

import '@/styles/bootstrap-reboot.scss';
import './App.css'

@Component
export default class App extends Vue {
  isNewTaskMode: boolean = false;

  public store: MyStore = useStore(this.$store);

  saveTask(task: ITask) {
    this.store.tasks.addTask(task);
  }

  mounted() {
    // this.store.tasks.setTasks(tasks);
  }

  render() {
    return (
        <div id="app">
          <div class="row">
            <div class="col col-6">
              <VPlate>
                <DatePicker data-cy="datepicker"
                            currentDate={this.store.currentDate}
                            onSelect={this.store.setCurrentDate}
                            datesWithEvents={this.store.tasks.tasksDates}
                />
              </VPlate>
            </div>
            <div class="col col-6">
              <VPlate>
                <TasksList tasks={this.store.tasks.tasksForCurrentDate}
                           data-cy="tasks"
                />
                { this.isNewTaskMode ?
                    <AddNewTask onSave={this.saveTask}
                                onCancel={() => this.isNewTaskMode = false }
                                currentDate={this.store.currentDate}
                                data-cy="new-task-form"
                    /> :
                    <VButton type={'default'}  onClick={() => this.isNewTaskMode = true }
                             data-cy="add-new-task-btn"
                    >Добавить</VButton>
                }
              </VPlate>
            </div>
          </div>
        </div>
    )
  }
}
