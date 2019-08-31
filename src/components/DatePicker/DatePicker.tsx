import {Component, Prop} from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";
import {VNode} from "vue";
import DatePickerDaysTable from "@/components/DatePicker/DatePickerDaysTable";

interface Props {
  currentDate: Date,
}

@Component
export default class DatePicker extends VueComponent<Props>{
  @Prop()
  private currentDate!: Date;

  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth();

  render(): VNode {
    return <div>
      <DatePickerDaysTable renderedMonth={this.selectedMonth}
                           renderedYear={this.selectedYear}
                           currentDate={this.currentDate}
      />
    </div>
  }
}
