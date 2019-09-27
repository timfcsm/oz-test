import padStart from 'lodash.padstart';
import { VNode, VNodeChildren } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';

import { VueComponent } from '@/shims-vue';

import styles from './DatePicker.scss?module';

interface IEvents {
  onSelect?: (date: Date) => void;
}

interface IProps extends IEvents {
  renderedYear: number;
  renderedMonth: number;
  currentDate: Date;
  datesWithEvents: string[];
}

@Component({
  name: 'DatePickerDaysTable',
})
export default class DatePicker extends VueComponent<IProps> {
  @Prop()
  private currentDate!: Date;
  @Prop()
  private renderedMonth!: number;
  @Prop()
  private renderedYear!: number;
  @Prop()
  private datesWithEvents!: string[];

  @Emit()
  select(day: number): Date {
    return new Date(this.renderedYear, this.renderedMonth, day);
  }

  get daysFromPreviousMonth(): number {
    const monthString = padStart(String(this.renderedMonth + 1), 2, '0');
    const dateString = `${this.renderedYear}-${monthString}-01T00:00:00+00:00`;
    const startMonth = new Date(dateString).getDay();
    return (6 + startMonth) % 7;
  }

  get daysInMonth(): number {
    return new Date(this.renderedYear, this.renderedMonth + 1, 0).getDate();
  }

  get weeksCount(): number {
    return Math.ceil((this.daysInMonth + this.daysFromPreviousMonth) / 7);
  }

  renderRows(): VNode {
    let days: VNodeChildren = [];
    const weeks: VNodeChildren = [];
    const monthString: string = padStart(String(this.renderedMonth + 1), 2, '0');
    const yearString: string = String(this.renderedYear);

    for (let i = this.daysFromPreviousMonth - 1; i >= 0; i--) {
      days.push(this.$createElement('td'));
    }

    for (let i = 1; i <= this.daysInMonth; i++) {
      const localeDateString = `${padStart(String(i), 2, '0')}.${monthString}.${yearString}`;

      if (days.length === 7) {
        weeks.push(this.$createElement('tr', undefined, days));
        days = [];
      }

      const isSelected = (i === this.currentDate.getDate() &&
            this.renderedMonth === this.currentDate.getMonth() &&
            this.renderedYear === this.currentDate.getFullYear()
      );

      const button = this.$createElement('span', {
        class: [styles.dayButton, {
          [styles.dayButtonSelected]: isSelected,
          [styles.hasEvents]: this.datesWithEvents.includes(localeDateString),
        }],
        on: {
          click: this.select.bind(this, i),
        },
      }, String(i));

      days.push(this.$createElement('td', undefined, [button]));
    }

    if (days.length) {
      weeks.push(this.$createElement('tr', undefined, days));
    }

    return this.$createElement('tbody', undefined, weeks);
  }

  render(): VNode {
    return <div class={styles.DatePickerDaysTable}>
      <table>
        <thead>
          <tr>
            <th class={styles.dayName}>пн</th>
            <th class={styles.dayName}>вт</th>
            <th class={styles.dayName}>ср</th>
            <th class={styles.dayName}>чт</th>
            <th class={styles.dayName}>пт</th>
            <th class={styles.dayName}>сб</th>
            <th class={styles.dayName}>вс</th>
          </tr>
        </thead>
        {this.renderRows()}
      </table>
    </div>;
  }
}
