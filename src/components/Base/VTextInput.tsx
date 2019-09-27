import { VNode } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';

import { VueComponent } from '@/shims-vue';

import styles from './VTextInput.scss?module';

interface IEvents {
  onChange?: (value: string) => void;
}

interface IProps extends IEvents {
  value: string;
  disabled?: boolean;
}

@Component({
  name: 'VTextInput',
})
export default class TasksList extends VueComponent<IProps> {
  @Prop()
  private value!: string;
  @Prop()
  private disabled!: boolean;

  @Emit('change')
  onChange(event: InputEvent): string {
    return (event.target as HTMLInputElement).value;
  }

  render(): VNode {
    return <input class={styles.VTextInput}
                  type="text"
                  value={this.value}
                  onChange={this.onChange}
                  onInput={this.onChange}
                  disabled={this.disabled}
    />;
  }
}
