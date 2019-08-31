import padStart from 'lodash.padstart';
import {Component, Prop} from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";
import {VNode} from "vue";

interface Props {
  renderedYear: number,
  renderedMonth: number,
  currentDate: Date,
}

@Component
export default class DatePicker extends VueComponent<Props>{
  @Prop()
  private currentDate!: Date;

  @Prop()
  private renderedMonth!: number;
  @Prop()
  private renderedYear!: number;

  get daysFromPreviousMonth(): number {
    const monthString = padStart(String(this.renderedMonth + 1), 2, '0');
    const dateString = `${this.renderedYear}-${monthString}-01T00:00:00+00:00`;
    const startMonth = new Date(dateString).getDay();
    return 7 - startMonth;
  }

  get daysInMonth(): number {
    return new Date(this.renderedYear, this.renderedMonth + 1, 0).getDate();
  }

  get weeksCount(): number {
    return Math.ceil((this.daysInMonth + this.daysFromPreviousMonth)/7);
  }

  render(): VNode {
    return <div>
      <div>{this.daysFromPreviousMonth}</div>
      <div>{this.daysInMonth}</div>
      <div>{this.weeksCount}</div>
    </div>
  }
}
