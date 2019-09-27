import { VNode } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';

import DatePickerDaysTable from '@/components/DatePicker/DatePickerDaysTable';
import { VueComponent } from '@/shims-vue';

import styles from './DatePicker.scss?module';

interface IEvents {
  onSelect?: (date: Date) => void;
}

interface IProps extends IEvents {
  currentDate: Date;
  datesWithEvents: string[];
}

const monthsNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

@Component({
  name: 'DatePicker',
})
export default class DatePicker extends VueComponent<IProps> {
  @Prop()
  private currentDate!: Date;
  @Prop()
  private datesWithEvents!: string[];

  private selectedYear: number = new Date().getFullYear();
  private selectedMonth: number = new Date().getMonth();

  @Emit('select')
  selectDate(date: Date): Date {
    return date;
  }

  incrementMonth(): void {
    this.selectedMonth = (this.selectedMonth + 13) % 12;

    if (this.selectedMonth === 0) {
      this.selectedYear++;
    }
  }

  decrementMonth(): void {
    this.selectedMonth = (this.selectedMonth - 1 + 12) % 12;

    if (this.selectedMonth === 11) {
      this.selectedYear--;
    }
  }

  render(): VNode {
    return <div>
      <div class={styles.header}>
        <div class={styles.monthAndYear}>
          <span>{monthsNames[this.selectedMonth]} </span>
          <span>{this.selectedYear}</span>
        </div>
        <div>
          <button class={styles.button} onClick={this.decrementMonth}>&#706;</button>
          <button class={styles.button} onClick={this.incrementMonth}>&#707;</button>
        </div>
      </div>
      <DatePickerDaysTable renderedMonth={this.selectedMonth}
                           renderedYear={this.selectedYear}
                           currentDate={this.currentDate}
                           onSelect={this.selectDate}
                           datesWithEvents={this.datesWithEvents}
      />
    </div>;
  }
}
